import Joi from 'joi';
import { objectIdValidation } from './base.validation';
import { POST_SHARED_WITH } from '../constants';

class PostsValidations {
  createPosts = Joi.object({
    caption: Joi.string().optional(),
    files: Joi.array().required(),
    location: Joi.any(),
    tags: Joi.array().items(objectIdValidation),
    hideLikeViewCount: Joi.boolean(),
    isCommentingOff: Joi.boolean(),
    isSensitiveContent: Joi.boolean(),
    productIds: Joi.array().items(objectIdValidation),
    scheduledAt: Joi.date(),
    sharedWith: Joi.string().valid(...Object.values(POST_SHARED_WITH)),
    isPublished: Joi.boolean(),
    isPrePurchased: Joi.boolean(),
    cartText: Joi.string(),
    availableQuantity: Joi.number(),
    availableDate: Joi.date(),
    discountType: Joi.string(),
    discountPercentage: Joi.number(),
  });

  saveUnSavePosts = Joi.object({
    postId: objectIdValidation.required(),
    isFavorite: Joi.boolean().required(),
  });

  reportPost = Joi.object({
    postId: objectIdValidation.required(),
    reason: Joi.string().required(),
    blockUser: Joi.boolean().required(),
  });
}

export const postsValidations = new PostsValidations();
