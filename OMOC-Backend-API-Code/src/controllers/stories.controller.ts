import { RequestHandler } from 'express';
import { EntityTypes, HTTP_STATUS, MODEL_NAMES, PAGINATION, ROLES } from '../constants';
import { ICustomRequest } from '../interfaces';
import { handleResponse, logger } from '../utils';
import { Comments, Stories, Likes } from '../models';
import { NotFoundError, UnprocessableEntityError } from '../errors';
import { commonHelper, storiesHelper } from '../helpers';
import { Types, isValidObjectId } from 'mongoose';

class StoriesController {
  createStory: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      // Prepare stories response
      const storiesData = storiesHelper.prepareStoryData(req?.body, userDetails);

      const createdStory = await Stories.insertMany(storiesData);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Story has been created', createdStory));
    } catch (err) {
      logger.error(`StoriesController :: createStory :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getUsersHavingStories: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0 } = req?.query;

      const myStoryExists = await Stories.countDocuments({
        userId: userDetails?.id,
        expiresAt: { $gte: new Date() },
        scheduledAt: { $lte: new Date() },
        isDeleted: false,
      });

      const storyList = await Stories.aggregate([
        {
          $match: {
            userId: {
              $ne: userDetails?.id ? new Types.ObjectId(userDetails.id) : null,
            },
            expiresAt: { $gte: new Date() },
            scheduledAt: { $lte: new Date() },
            isDeleted: false,
          },
        },
        {
          $group: {
            _id: '$userId',
            story: { $first: '$$ROOT' }, // Get the first document for each user
          },
        },
        {
          $replaceRoot: { newRoot: '$story' }, // Replace the root with the 'story' field
        },
        {
          $addFields: {
            storyRole: {
              $cond: {
                if: {
                  $eq: ['$role', ROLES.SELLER],
                },
                then: MODEL_NAMES.SELLERS,
                else: MODEL_NAMES.USERS,
              },
            },
          },
        },
        {
          $lookup: {
            from: 'users', // Assuming the users collection name is 'users'
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: 'sellers', // Lookup collection for sellers
            localField: 'userId',
            foreignField: '_id',
            as: 'seller',
          },
        },
        {
          $addFields: {
            user: {
              $cond: {
                if: { $eq: ['$storyRole', 'users'] },
                then: { $arrayElemAt: ['$user', 0] },
                else: { $arrayElemAt: ['$seller', 0] },
              },
            },
          },
        },
        {
          $unwind: '$user',
        },
        {
          $project: {
            _id: '$user._id',
            profileImg: '$user.profileImg',
            email: '$user.email',
            name: '$user.name',
            role: 1, // Include 'role' if you need it
            createdAt: 1, // Include other fields if needed
            // Add other fields you need here
          },
        },
        {
          $sort: {
            createdAt: 1,
          },
        },
        {
          $skip: +page,
        },
        {
          $limit: +pageSize,
        },
      ]);
      // const users = storyList?.flatMap(data => data?.userId);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Stories Found', { myStory: !!myStoryExists, storyList }));
    } catch (err) {
      logger.error(`StoriesController :: getUsersHavingStories :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getUserStoryByUserId: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      const userId = req?.params?.userId;

      if (!userId || !isValidObjectId(userId)) {
        throw new UnprocessableEntityError('Please enter valid userId');
      }
      const stories = await Stories.aggregate([
        {
          $lookup: {
            from: MODEL_NAMES.LIKES,
            let: { storyId: '$_id' }, //create variable for storyId
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      // conditions for views table to match the record
                      { $eq: ['$userId', new Types.ObjectId(userDetails?.id)] },
                      { $eq: [{ $toString: '$entityId' }, { $toString: '$$storyId' }] },
                      { $eq: ['$entityType', EntityTypes.STORY] },
                      { $eq: ['$isLiked', true] },
                    ],
                  },
                },
              },
            ],
            as: 'likes',
          },
        },
        {
          $match: {
            expiresAt: {
              $gte: new Date(),
            },
            userId: new Types.ObjectId(userId),
            scheduledAt: {
              $lte: new Date(),
            },
            isPublished: true,
          },
        },
        {
          $sort: {
            scheduledAt: -1,
          },
        },
        {
          $addFields: {
            isLikedByCurrentUser: { $cond: { if: { $gt: [{ $size: '$likes' }, 0] }, then: true, else: false } },
          },
        },
        { $project: { likes: 0 } },
      ]);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Stories Found for user', stories));
    } catch (err) {
      logger.error(`StoriesController :: getUserStoryByUserId :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  viewStories: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { storyId, isLiked } = req?.body;

      if (!storyId || !isValidObjectId(storyId)) {
        throw new UnprocessableEntityError('Please enter valid storyId');
      }

      const storyFound = await Stories.findOne({
        _id: storyId,
      });

      if (!storyFound) {
        throw new NotFoundError('Story not found');
      }

      const viewCountFound = await Likes.findOne({
        entityId: storyId,
        entityType: EntityTypes.STORY,
        userId: userDetails?.id,
      });

      if (!viewCountFound) {
        await Likes.create({
          entityId: storyId,
          entityType: EntityTypes.STORY,
          userId: userDetails?.id,
          isLiked: !!isLiked,
        });

        storyFound.viewsCount = (storyFound?.viewsCount || 0) + 1;
        if (isLiked) {
          storyFound.likesCount = (storyFound.likesCount || 0) + 1;
        }
      } else {
        if (viewCountFound.isLiked && !isLiked) {
          storyFound.likesCount = (storyFound.likesCount || 0) - 1;
          viewCountFound.isLiked = false;
        }
        if (!viewCountFound.isLiked && isLiked) {
          storyFound.likesCount = (storyFound.likesCount || 0) + 1;
          viewCountFound.isLiked = true;
        }
        await viewCountFound?.save();
      }
      await storyFound.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Story viewed successfully', storyFound));
    } catch (err) {
      logger.error(`StoriesController :: viewStories :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  commentOnStories: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { storyId, comment } = req?.body;

      if (!storyId || !isValidObjectId(storyId)) {
        throw new UnprocessableEntityError('Please enter valid storyId');
      }

      const storyFound = await Stories.findOne({
        _id: storyId,
      });

      if (!storyFound) {
        throw new NotFoundError('Story not found');
      }

      await Comments.create({
        entityId: storyId,
        entityType: EntityTypes.STORY,
        userId: userDetails?.id,
        comment,
      });
      storyFound.commentsCount = (storyFound.commentsCount || 0) + 1;
      await storyFound.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Success', storyFound));
    } catch (err) {
      logger.error(`StoriesController :: commentOnStories :: ${(err as Error)?.message}`);
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
      logger.error(`StoriesController :: likeAComment :: ${(err as Error)?.message}`);
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
      logger.error(`StoriesController :: replyComment :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllCommentsOfStory: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { page = PAGINATION.PAGE, pageSize = PAGINATION.PAGE_SIZE } = req?.query;

      const storyId = req?.params?.storyId;

      if (!storyId || !isValidObjectId(storyId)) {
        throw new UnprocessableEntityError('Please enter valid storyId');
      }

      const comments = await Comments.aggregate([
        // Match primary comments related to the storyId
        {
          $match: {
            entityId: storyId, // Fetch comments related to the story
          },
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
                      { $eq: ['$entityType', 'comment'] }, // Ensure it's a comment
                    ],
                  },
                },
              },

              // Lookup for replies
              ...commonHelper.lookupUserSeller('userId'),

              {
                $addFields: {
                  user: {
                    $arrayElemAt: [
                      {
                        $map: {
                          input: {
                            $cond: {
                              if: {
                                $gt: [{ $size: '$user' }, 0],
                              },
                              then: '$user',
                              else: '$seller',
                            },
                          },
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
                cond: { $eq: ['$$reply.entityType', 'comment'] }, // Ensure it's a reply, not another type of entity
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
      return res.status(HTTP_STATUS.OK).json(handleResponse('Comments Found', comments));
    } catch (err) {
      logger.error(`StoriesController :: getAllComments :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getMyStories: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0, sort, isDraft, isScheduled } = req?.query;
      const isPublished = isDraft !== 'true';
      const userId = userDetails?.id;
      const createdAt = sort === 'true' ? -1 : 1;
      if (!userId || !isValidObjectId(userId)) {
        throw new UnprocessableEntityError('Please enter valid userId');
      }
      const where = {
        userId: new Types.ObjectId(userDetails?.id),
        isDeleted: false,
        expiresAt: {
          $gte: new Date(),
        },
        scheduledAt: {
          [isScheduled ? '$gte' : '$lte']: new Date(),
        },
        isPublished,
      };
      const count = await Stories.countDocuments(where);
      const stories = await Stories.aggregate([
        {
          $match: where,
        },
        // Getting view for all users
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
                      { $eq: ['$entityType', EntityTypes.STORY] },
                    ],
                  },
                },
              },
              {
                $lookup: {
                  from: MODEL_NAMES.USERS,
                  localField: 'userId',
                  foreignField: '_id',
                  as: 'users',
                },
              },
              {
                $project: {
                  isLiked: 1,
                  'users._id': 1,
                  'users.name': 1,
                  'users.userName': 1,
                  'users.profileImg': 1,
                },
              },
              {
                $unwind: '$users',
              },
              {
                $replaceRoot: { newRoot: { $mergeObjects: ['$users', { isLiked: '$isLiked' }] } },
              },
            ],
            as: 'views',
          },
        },
        // --------------
        { $project: { likes: 0 } },
        {
          $addFields: {
            isLikedByCurrentUser: {
              $gt: [
                {
                  $size: {
                    $filter: {
                      input: '$views',
                      as: 'view',
                      cond: {
                        $and: [{ $eq: ['$$view.isLiked', true] }, { $eq: ['$$view._id', new Types.ObjectId(userId)] }],
                      },
                    },
                  },
                },
                0,
              ],
            },
          },
        },
        { $sort: { createdAt } },
        {
          $limit: +pageSize,
        },
        { $skip: +page },
      ]);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Stories Found for user', { count, stories }));
    } catch (err) {
      logger.error(`StoriesController :: getMyStories :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const storiesController = new StoriesController();
