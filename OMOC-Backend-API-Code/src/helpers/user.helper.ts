import mongoose, { isValidObjectId } from 'mongoose';
import { BOT_SHOP_ID } from '../config';
import { DEFAULT_CATEGORIES_LENGTH, EXPLORE_TYPES, PAGINATION } from '../constants';
import { IUser, IUserInfos } from '../interfaces';
import { Categories, UserInfos } from '../models';
import { userRepo } from '../repository';

class UserHelper {
  async prepareProfileResponse(userFound: IUser | any) {
    return {
      _id: userFound?.id,
      email: userFound?.email ?? '',
      name: userFound?.name ?? '',
      userName: userFound?.userName ?? '',
      phone: userFound?.phone ?? '',
      bio: userFound?.bio ?? '',
      language: userFound?.language ?? '',
      profileImg: userFound?.profileImg ?? '',
      interests: await this.getUserInterests(userFound?.id),
    };
  }

  async getUserInterests(userId: string) {
    const userInfos = await UserInfos.findOne({ userId }).populate('interests');
    const select = { _id: 1, title: 1, image: 1, thumbnail: 1 };

    const interests = (userInfos?.interests || [])?.filter(interest => isValidObjectId(interest));
    const interestsObjectId = interests.map(interest => new mongoose.Types.ObjectId(interest as unknown as string));
    const limit = DEFAULT_CATEGORIES_LENGTH - (interests?.length || 0);

    const categoriesFound = await Categories.find({
      isActive: true,
      isDeleted: false,
      _id: {
        $in: interestsObjectId,
      },
    })
      .select(select)
      .lean();

    let categories: any[] = [];
    if (limit > 0) {
      const [unSelectedCategories] = await Categories.aggregate([
        {
          $facet: {
            orgCategories: [
              {
                $match: {
                  shopId: {
                    $ne: BOT_SHOP_ID,
                  },
                  _id: {
                    $nin: interestsObjectId,
                  },
                  isActive: true,
                  isDeleted: false,
                },
              },
              {
                $project: select,
              },
              {
                $limit: limit,
              },
            ],
            botCategories: [
              {
                $match: {
                  shopId: BOT_SHOP_ID,
                  isActive: true,
                  isDeleted: false,
                  _id: {
                    $nin: interestsObjectId,
                  },
                },
              },
              {
                $project: select,
              },
              {
                $limit: limit,
              },
            ],
          },
        },
        {
          $project: {
            categories: { $concatArrays: ['$orgCategories', '$botCategories'] },
          },
        },
        {
          $limit: limit,
        },
      ]);
      categories = unSelectedCategories?.categories ?? [];
    }
    return { selected: categoriesFound ?? [], otherCategories: (categories ?? [])?.slice(0, limit) };
  }

  prepareSearchFeedResponse = (userSuggestions: any, products: any, shops: any) => {
    const userProfile = userSuggestions
      .map((data: any) => {
        const { userDetails } = data;
        return {
          id: userDetails?._id,
          type: EXPLORE_TYPES.USERS,
          name: userDetails?.name || '',
          image: userDetails?.profileImg || '',
          userName: userDetails?.userName || '',
          email: userDetails?.email || '',
          phone: userDetails?.phone || '',
          followers: data.followCount || 0,
          isFollowing: data?.isFollowing || false,
        };
      })
      ?.filter((data: any) => data?.name);

    const productsRes = products?.map((data: any) => {
      return {
        id: data?._id,
        type: EXPLORE_TYPES.PRODUCTS,
        name: data?.name || '',
        image: (data?.images || [])[0]?.url || '',
      };
    });

    const shop = shops?.map((data: any) => {
      return {
        id: data?._id,
        type: EXPLORE_TYPES.SHOP,
        name: data?.name || '',
        image: data?.logo || '',
      };
    });

    return [...userProfile, ...productsRes, ...shop];
  };

  getUserSuggestionWithPreRes = async (userDetails: any, query: any) => {
    const { pageSize, page, text } = query;

    try {
      const userInterests = await UserInfos.findOne({ userId: userDetails?.id });
      const interests = userInterests?.interests || [];

      const [[count], userSuggestions] = await userRepo.getUserSuggestions(
        userDetails?.id as string,
        interests,
        {
          pageSize: +pageSize,
          page: +page,
        },
        text as string,
      );
      const response = userSuggestions
        .map((data: any) => {
          const { userDetails } = data;
          return {
            id: userDetails?._id,
            name: userDetails?.name,
            profileImg: userDetails?.profileImg,
            userName: userDetails?.userName,
            email: userDetails?.email,
            phone: userDetails?.phone,
            followers: data.followCount || 0,
            isFollowing: data?.isFollowing || false,
          };
        })
        ?.filter(data => data?.name);
      return [count?.totalCount || 0, response];
    } catch (err) {
      throw err;
    }
  };
}

export const userHelper = new UserHelper();
