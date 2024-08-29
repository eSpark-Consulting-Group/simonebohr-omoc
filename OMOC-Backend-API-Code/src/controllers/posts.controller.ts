import { RequestHandler } from 'express';
import { handleResponse, logger } from '../utils';
import { ICustomRequest, IPosts } from '../interfaces';
import { Comments, Favorites, Likes, Products, Reports, UserBlocks } from '../models';
import { EntityTypes, HTTP_STATUS, MODEL_NAMES, PAGINATION, ROLES } from '../constants';

import { BadRequestError, NotFoundError, UnprocessableEntityError } from '../errors';
import { Posts } from '../models/posts.model';
import { Types, isValidObjectId } from 'mongoose';
import { postsRepository } from '../repository';
import { commonHelper, postsHelper } from '../helpers';

class PostsController {
  constructor() {}
  createPosts: RequestHandler = async (req, res, next) => {
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

      const postsData: Partial<IPosts> = {
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
          postsData.productIds = productIds;
        }

        if (tags?.length) {
          postsData.tags = tags;
        }

        postsData.scheduledAt = sharedWith ? scheduledAt : new Date();
        postsData.sharedWith = sharedWith;
        postsData.isPublished = isPublished;
        postsData.isPrePurchased = isPrePurchased;
        postsData.cartText = cartText;
        postsData.availableQuantity = availableQuantity;
        postsData.availableDate = availableDate;
        postsData.discountType = discountType;
        postsData.discountPercentage = discountPercentage;
        postsData.shopId = userDetails?.shopId;
      }
      const createdPost = await Posts.create(postsData);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Posts Saved Successfully', { id: createdPost?.id }));
    } catch (err) {
      logger.error(`PostsController :: createPosts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  likePosts: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { postId, isLiked } = req?.body;

      if (!postId || typeof isLiked !== 'boolean') {
        throw new UnprocessableEntityError('Please enter valid postId and isLiked');
      }

      if (!postId || !isValidObjectId(postId)) {
        throw new UnprocessableEntityError('Please enter valid postId');
      }

      const postFound = await Posts.findOne({
        _id: postId,
      });

      if (!postFound) {
        throw new NotFoundError('Story not found');
      }

      const viewCountFound = await Likes.findOne({
        entityId: postId,
        entityType: EntityTypes.POSTS,
        userId: userDetails?.id,
        isDeleted: false,
        ...(!userDetails?.isUser && { shopId: userDetails?.shopId }),
      });

      if (!viewCountFound) {
        await Likes.create({
          entityId: postId,
          entityType: EntityTypes.POSTS,
          userId: userDetails?.id,
          isLiked: !!isLiked,
          ...(!userDetails?.isUser && { shopId: userDetails?.shopId }),
        });
      } else {
        viewCountFound.isLiked = !!isLiked;
        viewCountFound.save();
      }

      return res.status(HTTP_STATUS.OK).json(handleResponse(`Post ${isLiked ? 'liked' : 'unLiked'} successfully`));
    } catch (err) {
      logger.error(`PostsController :: likePosts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllPosts: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const [count, posts] = await postsHelper.getAllPostAndCount(userDetails?.id as string, req?.query);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Posts Saved Successfully', { count, posts, length: posts?.length }));
    } catch (err) {
      logger.error(`PostsController :: getAllPosts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  commentOnPosts: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { postId, comment } = req?.body;

      if (!postId || !isValidObjectId(postId)) {
        throw new UnprocessableEntityError('Please enter valid postId');
      }

      const postFound = await Posts.findOne({
        _id: postId,
      });

      if (!postFound) {
        throw new NotFoundError('Post not found');
      }
      if (postFound.isCommentingOff) {
        throw new BadRequestError(`Can't comment on this post`);
      }
      await Comments.create({
        entityId: postId,
        entityType: EntityTypes.POSTS,
        userId: userDetails?.id,
        comment,
        ...(!userDetails?.isUser && { shopId: userDetails?.shopId }),
      });
      return res.status(HTTP_STATUS.OK).json(handleResponse('Success'));
    } catch (err) {
      logger.error(`PostsController :: commentOnPosts :: ${(err as Error)?.message}`);
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
      logger.error(`PostsController :: PostsController :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  // replyComment: RequestHandler = async (req, res, next) => {
  //   try {
  //     const userDetails = (req as ICustomRequest)?.user;
  //     const { commentId, comment } = req?.body;

  //     if (!commentId || !isValidObjectId(commentId)) {
  //       throw new UnprocessableEntityError('Please enter valid commentId');
  //     }

  //     const commentFound = await Comments.findOne({
  //       _id: commentId,
  //     });

  //     if (!commentFound) {
  //       throw new NotFoundError('Comment not found');
  //     }

  //     await Comments.create({
  //       entityId: commentId,
  //       entityType: EntityTypes.COMMENT,
  //       userId: userDetails?.id,
  //       comment,
  //     });

  //     commentFound.repliesCount = (commentFound?.repliesCount || 0) + 1;
  //     await commentFound.save();

  //     return res.status(HTTP_STATUS.OK).json(handleResponse('Success', commentFound));
  //   } catch (err) {
  //     logger.error(`PostsController :: replyComment :: ${(err as Error)?.message}`);
  //     return next(err);
  //   }
  // };

  saveRemovePosts: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { postId, isFavorite } = req?.body;

      const postFound = await Posts.findOne({
        _id: new Types.ObjectId(postId),
        isDeleted: false,
      });

      if (!postFound) {
        throw new NotFoundError(`Posts not found`);
      }

      const favorites = await Favorites.findOne({
        userId: userDetails?.id,
        entityId: postId,
        entityType: EntityTypes.POSTS,
      });

      // If isFavorite and favorites the the post is already liked
      if (isFavorite && favorites) {
        throw new BadRequestError('Already saved');
      }

      // If isFavorite and !favorites then there is no saved present then save the post
      if (isFavorite && !favorites) {
        await Favorites.create({
          userId: userDetails?.id,
          role: userDetails?.role,
          entityId: postId,
          entityType: EntityTypes.POSTS,
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
      logger.error(`PostsController :: saveRemovePosts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getFavoritePosts: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize, page } = req?.query as any;

      const posts = await postsRepository.getAllPosts({
        userId: userDetails?.id as string,
        isFavorite: true,
        page: +page,
        pageSize: +pageSize,
      });
      return res.status(HTTP_STATUS.OK).json(
        handleResponse('Success', {
          posts,
        }),
      );
    } catch (err) {
      logger.error(`PostsController :: getFavoritePosts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  reportPost: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      const { postId, reason, blockUser } = req?.body;

      const postFound = await Posts.findOne({
        _id: postId,
        isDeleted: false,
        userId: {
          $ne: userDetails?.id,
        },
      });

      if (!postFound) {
        throw new NotFoundError('Post not found');
      }

      const report = await Reports.create({
        entityId: postId,
        entityType: EntityTypes.POSTS,
        reason,
        userId: userDetails?.id,
        role: userDetails?.role,
      });

      if (blockUser) {
        const blockFound = await UserBlocks.findOne({
          blockerId: userDetails?.id,
          blockedId: postFound?.userId,
        }).lean();

        if (!blockFound) {
          await UserBlocks.create({
            blockerId: userDetails?.id,
            blockedId: postFound?.userId,
          });
        }
      }

      return res.status(HTTP_STATUS.OK).json(handleResponse('Success', report));
    } catch (err) {
      logger.error(`PostsController :: reportPost :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllCommentsOfPosts: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { page = PAGINATION.PAGE, pageSize = PAGINATION.PAGE_SIZE } = req?.query;

      const postId = req?.params?.postId;

      if (!postId || !isValidObjectId(postId)) {
        throw new UnprocessableEntityError('Please enter valid postId');
      }
      const where = {
        entityId: postId,
        entityType: EntityTypes.POSTS,
      };
      const countPromise = await Comments.countDocuments(where);

      const commentsPromise = await Comments.aggregate([
        // Match primary comments related to the postId
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
      logger.error(`PostsController :: getAllCommentsOfPosts :: ${(err as Error)?.message}`);
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
      logger.error(`PostsController :: replyComment :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  deletePosts: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const postId = req?.params?.postId;
      if (!isValidObjectId(postId)) {
        throw new UnprocessableEntityError('Invalid post id');
      }
      const postFound = await Posts.findOne({
        _id: postId,
        isDeleted: false,
        userId: userDetails?.id,
        ...(!userDetails?.isUser && { shopId: userDetails?.shopId }),
      });
      if (!postFound) {
        throw new NotFoundError('Post not found');
      }
      postFound.isDeleted = true;
      await postFound.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Post has been deleted successfully'));
    } catch (err) {
      logger.error(`PostsController :: deletePosts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updatePosts: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const {
        postId,
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

      if (!isValidObjectId(postId)) {
        throw new UnprocessableEntityError('Invalid post id');
      }
      const postFound = await Posts?.findOne({
        _id: postId,
        isDeleted: false,
        userId: userDetails?.id,
        ...(!userDetails?.isUser && { shopId: userDetails?.shopId }),
      });
      if (!postFound) {
        throw new NotFoundError('Post not found');
      }

      const postsData: Partial<IPosts> = {
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
          postsData.productIds = productIds;
        }

        if (tags?.length) {
          postsData.tags = tags;
        }

        postsData.scheduledAt = sharedWith ? scheduledAt : new Date();
        postsData.sharedWith = sharedWith;
        postsData.isPublished = isPublished;
        postsData.isPrePurchased = isPrePurchased;
        postsData.cartText = cartText;
        postsData.availableQuantity = availableQuantity;
        postsData.availableDate = availableDate;
        postsData.discountType = discountType;
        postsData.discountPercentage = discountPercentage;
      }
      commonHelper.assignValues(postFound, postsData);
      postFound?.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('Post have been updated Successfully'));
    } catch (err) {
      logger.error(`PostsController :: updatePosts :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getPostById: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const postId = req?.params?.postId;
      if (!isValidObjectId(postId)) {
        throw new UnprocessableEntityError(`Invalid postId Id`);
      }

      const [foundCount, foundPost] = await postsHelper.getAllPostAndCount(userDetails?.id as string, req?.query, {
        _id: new Types.ObjectId(postId),
      });

      const [count, posts] = await postsHelper.getAllPostAndCount(userDetails?.id as string, req?.query, {
        ...(foundCount && {
          _id: {
            $ne: new Types.ObjectId(postId),
          },
        }),
      });

      return res.status(HTTP_STATUS.OK).json(
        handleResponse('Posts Found', {
          count: foundCount + count,
          posts: [...foundPost, ...posts],
        }),
      );
    } catch (err) {
      logger.error(`PostsController :: getPostId :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const postsController = new PostsController();
