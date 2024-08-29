import { ObjectId, Types } from 'mongoose';
import { Sellers, UserInfos, Users } from '../models';
import { FOLLOW_STATUS, MODEL_NAMES, ROLES } from '../constants';

class UserRepository {
  private getSuggestionCountPipeLine = (userId: string, name?: string) => {
    const nameRegex = '.*' + name + '.*';

    const array = [
      {
        $match: {
          $and: [
            {
              userId: {
                $ne: userId,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          userIdObject: { $toObjectId: '$userId' },
        },
      },
      {
        $lookup: {
          from: MODEL_NAMES.USERS,
          localField: 'userIdObject',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $match: {
          'userDetails.name': {
            $nin: ['', null, undefined],
          },
        },
      },
    ];
    if (name) {
      array.push({
        $match: {
          'userDetails.name': {
            $regex: nameRegex,
            $options: 'i', // Optional: 'i' for case-insensitive
          },
        },
      } as any);
    }
    array.push({
      $count: 'totalCount',
    } as any);
    return array;
  };

  // Aggregate pipeline to get the paginated data
  getSuggestionDataPipeline = (data: { userId: string; interests: any[]; page: number; pageSize: number; nameRegex?: any }): any => {
    const { userId, interests, page, pageSize, nameRegex } = data;
    return [
      {
        $match: {
          $and: [
            {
              userId: {
                $ne: userId,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          userIdObject: { $toObjectId: '$userId' },
        },
      },
      {
        $addFields: {
          matchScore: {
            $size: {
              $setIntersection: ['$interests', interests],
            },
          },
        },
      },
      {
        $sort: {
          matchScore: -1,
        },
      },
      {
        $lookup: {
          from: MODEL_NAMES.USERS,
          localField: 'userIdObject',
          foreignField: '_id',
          ...(nameRegex && {
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $regexMatch: {
                          input: '$name',
                          regex: nameRegex,
                          options: 'i', // Optional: 'i' for case-insensitive
                        },
                      },
                    ],
                  },
                },
              },
            ],
          }),
          as: 'userDetails',
        },
      },
      {
        $addFields: {
          userDetails: { $arrayElemAt: ['$userDetails', 0] },
        },
      },
      //   ----------  Adding Lookup for follow count
      {
        $lookup: {
          from: MODEL_NAMES.USER_FOLLOWS,
          let: { userId: '$userIdObject' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$followerId', new Types.ObjectId(userId)],
                    },
                    { $eq: ['$followingId', '$$userId'] },
                    {
                      $eq: ['$status', FOLLOW_STATUS.ACTIVE],
                    },
                    { $eq: ['$unFollowDateTime', null] },
                  ],
                },
              },
            },
            {
              $count: 'followCount',
            },
          ],
          as: 'followCounts',
        },
      },
      {
        $addFields: {
          followCount: {
            $cond: {
              if: { $gt: [{ $size: '$followCounts' }, 0] },
              then: { $arrayElemAt: ['$followCounts.followCount', 0] },
              else: 0,
            },
          },
        },
      },
      //   ---   Is current user following -----
      {
        $lookup: {
          from: MODEL_NAMES.USER_FOLLOWS,
          let: { userId: '$userIdObject' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$followerId', new Types.ObjectId(userId)],
                    },
                    { $eq: ['$followingId', '$$userId'] },
                    {
                      $eq: ['$status', FOLLOW_STATUS.ACTIVE],
                    },
                  ],
                },
              },
            },
            {
              $count: 'isFollowing',
            },
          ],
          as: 'isFollowingArray',
        },
      },
      {
        $addFields: {
          isFollowing: {
            $cond: {
              if: { $gt: [{ $size: '$isFollowingArray' }, 0] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $skip: page,
      },
      {
        $limit: pageSize,
      },
    ];
  };

  getUserSuggestions(
    userId: string,
    interests: (ObjectId | string)[],
    options: {
      page: number;
      pageSize: number;
    },
    name?: string,
  ) {
    return Promise.all([
      UserInfos.aggregate(this.getSuggestionCountPipeLine(userId, name)),
      UserInfos.aggregate(
        this.getSuggestionDataPipeline({
          userId,
          interests,
          page: options?.page,
          pageSize: options?.pageSize,
          ...(name && { nameRegex: '.*' + name + '.*' }),
        }),
      ),
    ]);
  }

  async getUserRole(userId: string) {
    try {
      const userFound = await Users.countDocuments({ _id: userId });
      if (userFound) {
        return ROLES.USER;
      }

      const sellerFound = await Sellers.countDocuments({ _id: userId });
      if (userFound) {
        return ROLES.SELLER;
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async getAllUsersRole(userIds: (string | ObjectId)[]) {
    try {
      const userList: any = [];
      const userFound = await Users.find({
        _id: {
          $in: userIds,
        },
        isActive: true,
      }).select('id');

      if (userFound?.length) {
        userFound.forEach(user => {
          userList?.push({
            userId: user.id,
            role: ROLES.USER,
          });
        });
      }

      if (userList?.length < userIds?.length) {
      }

      const sellerFound = await Sellers.find({
        _id: {
          $in: userIds,
        },
      }).select('id');

      if (sellerFound?.length) {
        sellerFound.forEach(seller => {
          userList?.push({
            userId: seller.id,
            role: ROLES.SELLER,
          });
        });
      }

      return userList;
    } catch (err) {
      throw err;
    }
  }

  async getUserDetailsById(userId: string, role: ROLES) {
    const model = role === ROLES.SELLER ? Sellers : Users;
    return model.findOne({ _id: userId });
  }
}

export const userRepo = new UserRepository();
