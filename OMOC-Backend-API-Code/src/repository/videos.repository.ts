import { Types } from 'mongoose';
import { EntityTypes, MODEL_NAMES, ROLES } from '../constants';
import { commonHelper } from '../helpers';
import { Videos } from '../models';

class VideosRepository {
  getAllVideos({
    userId,
    isFavorite,
    videosWhere = {},
    page,
    pageSize,
    sort,
  }: {
    userId: string;
    isFavorite?: boolean;
    videosWhere?: any;
    page: number;
    pageSize: number;
    sort?: any;
  }) {
    return Videos.aggregate([
      { $match: { isDeleted: false, ...videosWhere } },
      {
        $lookup: {
          from: MODEL_NAMES.LIKES,
          let: { postId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    // conditions for views table to match the record
                    { $eq: [{ $toString: '$entityId' }, { $toString: '$$postId' }] },
                    { $eq: ['$entityType', EntityTypes.POSTS] },
                    { $eq: ['$isLiked', true] },
                  ],
                },
              },
            },
            ...commonHelper.lookupUserSeller('userId'),
            {
              $addFields: {
                likedUsers: {
                  $cond: {
                    if: { $gt: [{ $size: ['$user'] }, 0] },
                    then: '$user',
                    else: '$seller',
                  },
                },
              },
            },
            {
              $project: {
                'likedUsers._id': 1,
                'likedUsers.name': 1,
                'likedUsers.userName': 1,
                'likedUsers.profileImg': 1,
                'likedUsers.isOfficial': 1,
              },
            },
            {
              $unwind: '$likedUsers',
            },
            {
              $replaceRoot: { newRoot: '$likedUsers' },
            },
          ],
          as: 'likes',
        },
      },
      {
        $lookup: {
          from: MODEL_NAMES.COMMENTS,
          let: { postId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    // conditions for views table to match the record
                    { $eq: [{ $toString: '$entityId' }, { $toString: '$$postId' }] },
                    { $eq: ['$entityType', EntityTypes.POSTS] },
                    { $eq: ['$isDeleted', false] },
                  ],
                },
              },
            },
          ],
          as: 'comments',
        },
      },
      ...commonHelper.lookupUserSeller('userId'),
      // Lookup for checking if the post is fav or not
      {
        $lookup: {
          from: MODEL_NAMES.FAVORITES,
          let: { postId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    // conditions for views table to match the record
                    { $eq: [{ $toString: '$entityId' }, { $toString: '$$postId' }] },
                    { $eq: [{ $toString: '$userId' }, userId] },
                    { $eq: ['$entityType', EntityTypes.POSTS] },
                  ],
                },
              },
            },
          ],
          as: 'favByUsers',
        },
      },
      // -----------
      {
        $addFields: {
          createdBy: {
            $let: {
              vars: {
                firstUser: {
                  $arrayElemAt: [
                    {
                      $cond: commonHelper.userSellerLookupCondition(),
                    },
                    0,
                  ],
                },
              },
              in: {
                _id: '$$firstUser._id',
                name: '$$firstUser.name',
                userName: '$$firstUser.userName',
                profileImgUrl: '$$firstUser.profileImg',
                isOfficial: '$$firstUser.isOfficial',
              },
            },
          },
          likesCount: {
            $cond: {
              if: '$hideLikeViewCount',
              then: 0,
              else: { $size: '$likes' },
            },
          },
          type: EntityTypes.VIDEOS,
          comments: { $size: '$comments' },
          // likeUsers:
          isLikedByCurrentUser: { $cond: { if: { $in: [new Types.ObjectId(userId), '$likes._id'] }, then: true, else: false } },

          isSavedByCurrentUser: { $cond: { if: { $in: [new Types.ObjectId(userId), '$favByUsers.userId'] }, then: true, else: false } },
        },
      },
      {
        $match: {
          ...(isFavorite &&
            typeof isFavorite === 'boolean' && {
              favByUsers: { $exists: true, $not: { $size: 0 } },
            }),
        },
      },

      { $project: { favByUsers: 0, seller: 0, user: 0 } },
      { $sort: sort },
      { $skip: page },
      { $limit: pageSize },
    ]);
  }
}

export const videosRepository = new VideosRepository();
