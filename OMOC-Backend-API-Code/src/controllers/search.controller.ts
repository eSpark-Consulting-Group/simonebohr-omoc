import { RequestHandler } from 'express';
import { ICustomRequest } from '../interfaces';
import { EXPLORE_TYPES, EntityTypes, HTTP_STATUS, MODEL_NAMES, PAGINATION } from '../constants';
import { userHistoryRepo, userRepo } from '../repository';
import { BusinessInfos, Posts, Products, UserFeedHistory, UserInfos, Videos } from '../models';
import { commonHelper, postsHelper, userHelper, videosHelper } from '../helpers';
import { calculateIsNext, handleResponse, logger } from '../utils';
import { Types, isValidObjectId } from 'mongoose';
import { NotFoundError, UnprocessableEntityError } from '../errors';

class SearchController {
  searchFeeds: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { page = PAGINATION.PAGE, pageSize = PAGINATION.PAGE_SIZE, text = '' } = req?.query;

      let response = [];
      if (text) {
        const userInterests = await UserInfos.findOne({ userId: userDetails?.id });
        const interests = userInterests?.interests || [];

        const regex = '.*' + text + '.*';

        // Fetching User Suggestions
        const userProfilePromise = UserInfos.aggregate(
          userRepo.getSuggestionDataPipeline({
            userId: userDetails?.id as string,
            interests,
            page: +page,
            pageSize: +pageSize,
            ...(text && { nameRegex: regex }),
          }),
        );

        // Fetching products
        const productsPromise = Products.find({
          name: { $regex: regex, $options: 'i' },
        })
          .skip(+page)
          .limit(+pageSize);

        // Fetching Shops

        const shopsPromise = BusinessInfos.find({
          name: { $regex: regex, $options: 'i' },
        })
          .skip(+page)
          .limit(+pageSize);

        const [userSuggestions, products, shops] = await Promise.all([userProfilePromise, productsPromise, shopsPromise]);

        response = userHelper.prepareSearchFeedResponse(userSuggestions, products, shops);
      }

      return res.status(HTTP_STATUS.OK).json(handleResponse('Search data found', response));
    } catch (err) {
      logger.error(`UserController :: SearchController :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  explore: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0 } = req?.query;
      const { type, search } = req?.body;
      const response: any = {
        list: [],
        count: 0,
      };
      const regex = {
        $regex: new RegExp(search, 'i'),
      };

      // Saving History
      // if (type && type !== EXPLORE_TYPES.USERS) {
      await userHistoryRepo.saveUserFeedHistory({
        userId: userDetails?.id as string,
        type,
        text: search,
      });
      // }

      if (type === EXPLORE_TYPES.USERS) {
        const userInterests = await UserInfos.findOne({ userId: userDetails?.id });
        const interests = userInterests?.interests || [];

        const [[count], userSuggestions] = await userRepo.getUserSuggestions(
          userDetails?.id as string,
          interests,
          {
            pageSize: +pageSize,
            page: +page,
          },
          search as string,
        );

        const suggestionResponse = userSuggestions
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
              followings: data?.followingCounts || 0,
              isFollowing: data?.isFollowing || false,
            };
          })
          ?.filter(data => data?.name);

        response.list = suggestionResponse;
        response.count = count;
      }
      if (type === EXPLORE_TYPES.PRODUCTS) {
        response.list = await Products.find({
          isDeleted: false,
          name: regex,
        });
      }

      if (type === EXPLORE_TYPES.SHOP) {
        // return follow following count and is current User following
        const where = {
          isVerified: true,
          name: regex,
        };
        response.count = await BusinessInfos.countDocuments({ name: regex });
        response.list = await BusinessInfos.aggregate([
          {
            $match: where,
          },
          // {
          //   $lookup: {
          //     from: MODEL_NAMES.USER_FOLLOWS,
          //     localField: '_id',
          //     foreignField: 'followingId',
          //     as: 'following',
          //   },
          // $match: {
          // 'following.followerType': { $eq: EntityTypes?.id },
          //   },
          // },
        ]);
      }

      if (type === EXPLORE_TYPES.POSTS) {
        const [count, posts] = await postsHelper.getAllPostAndCount(userDetails?.id as string, req?.query);
        response.list = posts;
        response.count = count;
      }

      if (type === EXPLORE_TYPES.VIDEOS) {
        const [count, videos] = await videosHelper.getAllVideosAndCount(userDetails?.id as string, req?.query);
        response.count = count;
        response.list = videos;
      }

      return res.status(HTTP_STATUS.OK).json(handleResponse('Results Found successfully', response));
    } catch (err) {
      logger.error(`SearchController :: explore :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getFeedSearchHistory: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = 0, page = 0 } = req?.query;

      const where = {
        userId: userDetails?.id,
        isDeleted: false,
      };

      const historyDataPromise = await UserFeedHistory.aggregate([
        {
          $addFields: {
            entityIdObjectId: { $toObjectId: '$entityId' }, // Convert entityId to ObjectId
          },
        },
        {
          $match: where,
        },
        {
          $lookup: {
            from: MODEL_NAMES.USERS,
            localField: 'entityIdObjectId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: MODEL_NAMES.BUSINESS_INFO,
            localField: 'entityIdObjectId',
            foreignField: '_id',
            as: 'shop',
          },
        },
        {
          $lookup: {
            from: MODEL_NAMES.PRODUCTS,
            localField: 'entityIdObjectId',
            foreignField: '_id',
            as: 'product',
          },
        },
        { $addFields: { user: { $arrayElemAt: ['$user', 0] }, shop: { $arrayElemAt: ['$shop', 0] }, product: { $arrayElemAt: ['$product', 0] } } },
        {
          $sort: {
            searchAt: -1,
          },
        },
        {
          $skip: +page,
        },
        {
          $limit: +pageSize,
        },
      ]);

      const countPromise = UserFeedHistory.countDocuments(where);
      const [count, history] = await Promise.all([countPromise, historyDataPromise]);
      const historyResponse = history?.map((history: any) => {
        let objectKey = '';
        if (history?.type === EXPLORE_TYPES.PRODUCTS) {
          objectKey = 'product';
        }
        // if (history?.type === EXPLORE_TYPES.SHOP) {
        //   objectKey = 'shop';
        // }
        if (history?.type === EXPLORE_TYPES.USERS) {
          objectKey = 'user';
        }
        const historyFound = history[objectKey];

        if (historyFound && historyFound?._id) {
          return {
            id: historyFound?._id,
            historyId: history?._id,
            type: history?.type,
            name: historyFound?.name || '',
            image: historyFound?.profileImg || (historyFound?.images ?? [])[0]?.url || historyFound?.logo || '',
          };
        } else {
          return {
            historyId: history?._id ?? '',
            name: history?.text ?? history?.type ?? '',
            type: history?.type,
          };
        }
      });
      return res
        .status(HTTP_STATUS.OK)
        .json(handleResponse('History Found successfully', { count, isNext: calculateIsNext(count, +page, +pageSize), history: historyResponse }));
    } catch (err) {
      logger.error(`SearchController :: getFeedSearchHistory :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  deleteSearchHistory: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { historyId } = req?.query;
      if (historyId && !isValidObjectId(historyId)) {
        throw new UnprocessableEntityError('Invalid History Id');
      }
      if (historyId) {
        const historyFound = await UserFeedHistory.findOne({ _id: new Types.ObjectId(historyId as string), userId: userDetails?.id });
        if (!historyFound || historyFound?.isDeleted) {
          throw new NotFoundError('History Not Found');
        }
        historyFound.isDeleted = true;
        await historyFound.save();
      } else {
        await UserFeedHistory.updateMany({ userId: userDetails?.id }, { $set: { isDeleted: true } });
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('History Deleted successfully'));
    } catch (err) {
      logger.error(`SearchController :: deleteSearchHistory :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  exploreSearchList: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      const [postCount, posts] = await postsHelper.getAllPostAndCount(userDetails?.id as string, req?.query);

      const [videoCount, videos] = await videosHelper.getAllVideosAndCount(userDetails?.id as string, req?.query);
      const combinedContent = [...videos, ...posts];

      // Shuffle the combined content
      const shuffledContent = combinedContent.sort(() => Math.random() - 0.5);
      const response = shuffledContent?.map(data => {
        return {
          id: data?._id,
          type: data?.type,
          tags: data?.tags,
          files: data?.files,
          createdBy: {
            id: data?.createdBy?._id,
            name: data?.createdBy?.name,
            image: data?.createdBy?.profileImg,
            isOfficial: data?.createdBy?.isOfficial,
          },
        };
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Search Result', { count: videoCount + postCount, searchList: response }));
    } catch (err) {
      logger.error(`SearchController :: searchMain :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getTrendingList: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { search } = req?.query as any;

      const response: any = [];
      if (search) {
        // For userSuggestion add key to query for filter
        req.query.text = search;
        const regex = {
          $regex: new RegExp(search, 'i'),
        };

        const postPromise = postsHelper.getAllPostAndCount(userDetails?.id as string, req?.query, {
          ...(search && { caption: regex }),
        });

        const videoPromise = videosHelper.getAllVideosAndCount(userDetails?.id as string, req?.query, { ...(search && { caption: regex }) });

        const userPromise = userHelper.getUserSuggestionWithPreRes(userDetails, req?.query);

        const productPromise = Products.find({
          isDeleted: false,
          ...(search && { name: regex }),
        });

        const [[postCount, posts], [videoCount, videos], [usersCount, users], products] = await Promise.all([
          postPromise,
          videoPromise,
          userPromise,
          productPromise,
        ]);
        response.push({
          type: EXPLORE_TYPES.POSTS,
          count: postCount,
          list: posts,
        });

        response.push({
          type: EXPLORE_TYPES.VIDEOS,
          count: videoCount,
          list: videos,
        });

        response.push({
          type: EXPLORE_TYPES.USERS,
          count: usersCount,
          list: users,
        });

        response.push({
          type: EXPLORE_TYPES.PRODUCTS,
          count: usersCount,
          list: products,
        });
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Trending List found', response));
    } catch (err) {
      logger.error(`SearchController :: getTrendingList :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}
export const searchController = new SearchController();
