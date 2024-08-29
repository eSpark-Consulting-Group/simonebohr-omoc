import { RequestHandler } from 'express';
import { handleResponse, isValidUrl, logger } from '../utils';
import { ICustomRequest, IVideos } from '../interfaces';
import { Comments, Favorites, Likes, Products, Reports, UserBlocks, Videos } from '../models';
import { EntityTypes, HTTP_STATUS, PAGINATION, ROLES } from '../constants';

import { BadRequestError, NotFoundError, UnprocessableEntityError } from '../errors';
import { Types, isValidObjectId } from 'mongoose';
import { videosRepository } from '../repository';
import { commonHelper, videosHelper } from '../helpers';

class VideosController {
  constructor() {}
  createVideos: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const {
        files,
        location,
        tags,
        caption,
        hideLikeViewCount,
        isCommentingOff,
        isSensitiveContent,
        productIds,
        scheduledAt,
        sharedWith,
        isPublished,
        isPrePurchased,
        cartText,
        availableQuantity,
        availableDate,
        discountType,
        discountPercentage,
      } = req?.body;

      if (!files?.length) {
        throw new UnprocessableEntityError('Please upload at least one video');
      }

      const notVideoFiles = files.filter((file: any) => !isValidUrl(file?.url))?.length;

      if (notVideoFiles) {
        throw new UnprocessableEntityError('Please enter only video urls');
      }

      const videosData: Partial<IVideos> = {
        userId: userDetails?.id as any,
        files,
        location,
        tags,
        hideLikeViewCount,
        isCommentingOff,
        isSensitiveContent,
        caption,
        role: userDetails?.role,
      };
      if (userDetails?.role === ROLES.SELLER) {
        if (productIds?.length) {
          const productFound = await Videos?.find({
            _id: productIds?.map((id: string) => new Types.ObjectId(id)),
            addedBy: new Types.ObjectId(userDetails?.shopId),
            isDeleted: false,
          });

          if (productFound?.length !== productFound?.length) {
            throw new BadRequestError('Check Valid Ids');
          }
          videosData.productIds = productIds;
        }

        if (tags?.length) {
          videosData.tags = tags;
        }

        videosData.scheduledAt = sharedWith ? scheduledAt : new Date();
        videosData.sharedWith = sharedWith;
        videosData.isPublished = isPublished;
        videosData.isPrePurchased = isPrePurchased;
        videosData.cartText = cartText;
        videosData.availableQuantity = availableQuantity;
        videosData.availableDate = availableDate;
        videosData.discountType = discountType;
        videosData.discountPercentage = discountPercentage;
        videosData.shopId = userDetails?.shopId;
      }
      const createdVideo = await Videos.create(videosData);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Videos Saved Successfully', { id: createdVideo?.id }));
    } catch (err) {
      logger.error(`VideosController :: createVideos :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  likeVideos: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { videoId, isLiked } = req?.body;

      if (!videoId || typeof isLiked !== 'boolean') {
        throw new UnprocessableEntityError('Please enter valid videoId and isLiked');
      }

      if (!videoId || !isValidObjectId(videoId)) {
        throw new UnprocessableEntityError('Please enter valid videoId');
      }

      const videoFound = await Videos.findOne({
        _id: videoId,
      });

      if (!videoFound) {
        throw new NotFoundError('Story not found');
      }

      const viewCountFound = await Likes.findOne({
        entityId: videoId,
        entityType: EntityTypes.VIDEOS,
        userId: userDetails?.id,
        isDeleted: false,
        ...(!userDetails?.isUser && { shopId: userDetails?.shopId }),
      });

      if (!viewCountFound) {
        await Likes.create({
          entityId: videoId,
          entityType: EntityTypes.VIDEOS,
          userId: userDetails?.id,
          isLiked: !!isLiked,
          ...(!userDetails?.isUser && { shopId: userDetails?.shopId }),
        });
      } else {
        viewCountFound.isLiked = !!isLiked;
        viewCountFound.save();
      }

      return res.status(HTTP_STATUS.OK).json(handleResponse(`Video ${isLiked ? 'liked' : 'unLiked'} successfully`));
    } catch (err) {
      logger.error(`VideosController :: likeVideos :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllVideos: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const [count, videos] = await videosHelper.getAllVideosAndCount(userDetails?.id as string, req?.query);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Videos Saved Successfully', { count, videos }));
    } catch (err) {
      logger.error(`VideosController :: getAllVideos :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  commentOnVideos: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { videoId, comment } = req?.body;

      if (!videoId || !isValidObjectId(videoId)) {
        throw new UnprocessableEntityError('Please enter valid videoId');
      }

      const videoFound = await Videos.findOne({
        _id: videoId,
      });

      if (!videoFound) {
        throw new NotFoundError('Video not found');
      }
      if (videoFound.isCommentingOff) {
        throw new BadRequestError(`Can't comment on this video`);
      }
      await Comments.create({
        entityId: videoId,
        entityType: EntityTypes.VIDEOS,
        userId: userDetails?.id,
        comment,
        ...(!userDetails?.isUser && { shopId: userDetails?.shopId }),
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Success'));
    } catch (err) {
      logger.error(`VideosController :: commentOnVideos :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  likeAComment: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { commentId, isLiked } = req?.body;

      if (!commentId || !isValidObjectId(commentId)) {
        throw new UnprocessableEntityError('Please enter valid CommentId');
      }

      const commentFound = await Comments.findOne({
        _id: commentId,
      });

      if (!commentFound) {
        throw new NotFoundError('Comment not found');
      }

      const likeFound = await Likes.findOne({
        entityId: commentId,
        entityType: EntityTypes.COMMENT,
        userId: userDetails?.id,
      });

      if (!likeFound) {
        await Likes.create({
          entityId: commentId,
          entityType: EntityTypes.COMMENT,
          userId: userDetails?.id,
          isLiked: !!isLiked,
        });
        commentFound.likesCount = (commentFound.likesCount || 0) + 1;
      } else {
        if (likeFound.isLiked && !isLiked) {
          commentFound.likesCount = (commentFound.likesCount || 0) - 1;
          likeFound.isLiked = false;
        }
        if (!likeFound.isLiked && isLiked) {
          commentFound.likesCount = (commentFound.likesCount || 0) + 1;
          likeFound.isLiked = true;
        }
        await likeFound?.save();
      }
      await commentFound.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Success', commentFound));
    } catch (err) {
      logger.error(`VideosController :: likeAComment  :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  saveRemoveVideo: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { videoId, isFavorite } = req?.body;

      const videoFound = await Videos.findOne({
        _id: new Types.ObjectId(videoId),
        isDeleted: false,
      });

      if (!videoFound) {
        throw new NotFoundError(`Videos not found`);
      }

      const favorites = await Favorites.findOne({
        userId: userDetails?.id,
        entityId: videoId,
        entityType: EntityTypes.VIDEOS,
      });

      // If isFavorite and favorites the the Videos is already liked
      if (isFavorite && favorites) {
        throw new BadRequestError('Already saved');
      }

      // If isFavorite and !favorites then there is no saved present then save the video
      if (isFavorite && !favorites) {
        await Favorites.create({
          userId: userDetails?.id,
          role: userDetails?.role,
          entityId: videoId,
          entityType: EntityTypes.VIDEOS,
        });
      }

      if (!isFavorite && favorites) {
        await favorites.deleteOne();
      }

      if (!isFavorite && !favorites) {
        throw new BadRequestError('Record not found');
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Success'));
    } catch (err) {
      logger.error(`VideosController :: saveRemoveVideo :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getFavoriteVideos: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize, page } = req?.query as any;

      const videos = await videosRepository.getAllVideos({
        userId: userDetails?.id as string,
        isFavorite: true,
        page: +page,
        pageSize: +pageSize,
      });
      return res.status(HTTP_STATUS.OK).json(
        handleResponse('Success', {
          videos,
        }),
      );
    } catch (err) {
      logger.error(`VideosController :: getFavoriteVideos :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  reportVideo: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      const { videoId, reason, blockUser } = req?.body;

      const videoFound = await Videos.findOne({
        _id: videoId,
        isDeleted: false,
        userId: {
          $ne: userDetails?.id,
        },
      });

      if (!videoFound) {
        throw new NotFoundError('Videos not found');
      }

      const report = await Reports.create({
        entityId: videoId,
        entityType: EntityTypes.VIDEOS,
        reason,
        userId: userDetails?.id,
        role: userDetails?.role,
      });

      if (blockUser) {
        const blockFound = await UserBlocks.findOne({
          blockerId: userDetails?.id,
          blockedId: videoFound?.userId,
        }).lean();

        if (!blockFound) {
          await UserBlocks.create({
            blockerId: userDetails?.id,
            blockedId: videoFound?.userId,
          });
        }
      }

      return res.status(HTTP_STATUS.OK).json(handleResponse('Success', report));
    } catch (err) {
      logger.error(`VideosController :: reportVideo :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllCommentsOfVideos: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { page = PAGINATION.PAGE, pageSize = PAGINATION.PAGE_SIZE } = req?.query;

      const videoId = req?.params?.videoId;

      if (!videoId || !isValidObjectId(videoId)) {
        throw new UnprocessableEntityError('Please enter valid videoId');
      }
      const where = {
        entityId: videoId,
        entityType: EntityTypes.VIDEOS,
      };
      const countPromise = await Comments.countDocuments(where);

      const commentsPromise = await Comments.aggregate([
        // Match primary comments related to the videoId
        {
          $match: where,
        },
        ...commonHelper.lookupUserSeller('userId'),

        // Lookup replies (child comments) for each primary comment
        {
          $lookup: {
            from: 'comments',
            let: { parentId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: [{ $toObjectId: '$entityId' }, '$$parentId'] }, // Convert entityId to ObjectId
                      { $eq: ['$entityType', EntityTypes.COMMENT] }, // Ensure it's a comment
                    ],
                  },
                },
              },
              ...commonHelper.lookupUserSeller('userId'),
              {
                $addFields: {
                  user: {
                    $arrayElemAt: [
                      {
                        $map: {
                          input: { $cond: commonHelper.userSellerLookupCondition() },
                          as: 'user',
                          in: {
                            _id: '$$user._id',
                            name: '$$user.name',
                            profileImg: '$$user.profileImg',
                          },
                        },
                      },
                      0,
                    ],
                  },
                },
              },
              {
                $project: {
                  seller: 0,
                },
              },
            ],
            as: 'replies',
          },
        },
        // Project to include only primary comments (excluding replies)
        {
          $addFields: {
            replies: {
              // Remove replies from the primary comments
              $filter: {
                input: '$replies',
                as: 'reply',
                cond: { $eq: ['$$reply.entityType', EntityTypes.COMMENT] }, // Ensure it's a reply, not another type of entity
              },
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        // Skip comments for pagination
        {
          $skip: +page,
        },
        // Limit comments per page
        {
          $limit: +pageSize,
        },

        // Likes condition for current user
        // Lookup likes by the current user for each comment
        {
          $lookup: {
            from: 'likes',
            let: { commentId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$userId', new Types.ObjectId(userDetails?.id)] },
                      { $eq: [{ $toString: '$entityId' }, { $toString: '$$commentId' }] },
                      { $eq: ['$isLiked', true] },
                    ],
                  },
                },
              },
            ],
            as: 'likes',
          },
        },
        // Add a field indicating whether the current user has liked each comment
        {
          $addFields: {
            isLikedByCurrentUser: { $gt: [{ $size: '$likes' }, 0] },
            // User Fields for main object
            user: {
              $arrayElemAt: [
                {
                  $map: {
                    input: {
                      $cond: commonHelper.userSellerLookupCondition(),
                    },
                    as: 'user',
                    in: {
                      _id: '$$user._id',
                      name: '$$user.name',
                      profileImg: '$$user.profileImg',
                      isOfficial: '$$user.isOfficial',
                    },
                  },
                },
                0,
              ],
            },
          },
        },
        // Project to exclude the likes array
        {
          $unset: 'likes',
        },
        {
          $project: {
            seller: 0,
          },
        },
      ]);

      const [comments, count] = await Promise.all([commentsPromise, countPromise]);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Comments Found', { comments, count }));
    } catch (err) {
      logger.error(`VideosController :: getAllCommentsOfVideos :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  replyComment: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { commentId, comment } = req?.body;

      if (!commentId || !isValidObjectId(commentId)) {
        throw new UnprocessableEntityError('Please enter valid commentId');
      }

      if (!comment) {
        throw new UnprocessableEntityError('Please enter valid comment');
      }

      const commentFound = await Comments.findOne({
        _id: commentId,
      });

      if (!commentFound) {
        throw new NotFoundError('Comment not found');
      }

      await Comments.create({
        entityId: commentId,
        entityType: EntityTypes.COMMENT,
        userId: userDetails?.id,
        comment,
      });

      commentFound.repliesCount = (commentFound?.repliesCount || 0) + 1;
      await commentFound.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Success', commentFound));
    } catch (err) {
      logger.error(`VideosController :: replyComment :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  deleteVideos: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const videoId = req?.params?.videoId;
      if (!isValidObjectId(videoId)) {
        throw new UnprocessableEntityError('Invalid video id');
      }
      const videoFound = await Videos.findOne({
        _id: videoId,
        isDeleted: false,
        userId: userDetails?.id,
        ...(!userDetails?.isUser && { shopId: userDetails?.shopId }),
      });
      if (!videoFound) {
        throw new NotFoundError('Video not found');
      }
      videoFound.isDeleted = true;
      await videoFound.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Video has been deleted successfully'));
    } catch (err) {
      logger.error(`VideosController :: deleteVideos :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updateVideos: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const {
        videoId,
        files,
        location,
        tags,
        caption,
        hideLikeViewCount,
        isCommentingOff,
        isSensitiveContent,
        productIds,
        scheduledAt,
        sharedWith,
        isPublished,
        isPrePurchased,
        cartText,
        availableQuantity,
        availableDate,
        discountType,
        discountPercentage,
      } = req?.body;

      if (!isValidObjectId(videoId)) {
        throw new UnprocessableEntityError('Invalid video id');
      }
      const videoFound = await Videos?.findOne({
        _id: videoId,
        isDeleted: false,
        userId: userDetails?.id,
        ...(!userDetails?.isUser && { shopId: userDetails?.shopId }),
      });
      if (!videoFound) {
        throw new NotFoundError('Video not found');
      }

      const videosData: Partial<IVideos> = {
        userId: userDetails?.id as any,
        files,
        location,
        tags,
        hideLikeViewCount,
        isCommentingOff,
        isSensitiveContent,
        caption,
        role: userDetails?.role,
      };
      if (userDetails?.role === ROLES.SELLER) {
        if (productIds?.length) {
          const productFound = await Products?.find({
            _id: productIds?.map((id: string) => new Types.ObjectId(id)),
            addedBy: new Types.ObjectId(userDetails?.shopId),
            isDeleted: false,
          });

          if (productFound?.length !== productFound?.length) {
            throw new BadRequestError('Check Valid Ids');
          }
          videosData.productIds = productIds;
        }

        if (tags?.length) {
          videosData.tags = tags;
        }

        videosData.scheduledAt = sharedWith ? scheduledAt : new Date();
        videosData.sharedWith = sharedWith;
        videosData.isPublished = isPublished;
        videosData.isPrePurchased = isPrePurchased;
        videosData.cartText = cartText;
        videosData.availableQuantity = availableQuantity;
        videosData.availableDate = availableDate;
        videosData.discountType = discountType;
        videosData.discountPercentage = discountPercentage;
      }
      commonHelper.assignValues(videoFound, videosData);
      videoFound?.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Videos have been updated Successfully'));
    } catch (err) {
      logger.error(`VideosController :: updateVideos :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getVideoById: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const videoId = req?.params?.videoId;
      if (!isValidObjectId(videoId)) {
        throw new UnprocessableEntityError(`Invalid video Id`);
      }
      const [foundCount, foundVideo] = await videosHelper.getAllVideosAndCount(userDetails?.id as string, req?.query, {
        _id: new Types.ObjectId(videoId),
      });

      const [count, videos] = await videosHelper.getAllVideosAndCount(userDetails?.id as string, req?.query, {
        _id: {
          $ne: new Types.ObjectId(videoId),
        },
      });

      return res.status(HTTP_STATUS.OK).json(
        handleResponse('Videos Found', {
          count: foundCount + count,
          videos: [...foundVideo, ...videos],
        }),
      );
    } catch (err) {
      logger.error(`VideosController :: getVideoById :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const videosController = new VideosController();
