import Joi from 'joi';
import { objectIdValidation } from './base.validation';
import { POST_SHARED_WITH } from '../constants';

class StoriesValidations {
  commentOnStory = Joi.object({
    comment: Joi.string().required(),
    storyId: Joi.string().required(),
  });

  likeAComment = Joi.object({
    isLiked: Joi.boolean(),
    commentId: Joi.string().required(),
  });

  replayComment = Joi.object({
    comment: Joi.string(),
    commentId: Joi.string().required(),
  });

  labelValidation = Joi.object({
    zIndex: Joi.number(),
    x: Joi.number(),
    y: Joi.number(),
    fontSize: Joi.number(),
    height: Joi.number(),
    width: Joi.number(),
    ratio: Joi.number(),
    text: Joi.string(),
    type: Joi.string(),
  });

  textValidation = this.labelValidation.keys({
    color: Joi.string(),
    textAlign: Joi.string(),
    textBg: Joi.boolean(),
  });

  storyDataValidation = Joi.object({
    url: Joi.string().required(),
    thumbnail: Joi.string(),
    type: Joi.string(),
    size: Joi.number(),
    unit: Joi.string(),
    width: Joi.number(),
    height: Joi.number(),
    ratio: Joi.number(),
    translateX: Joi.number(),
    rotateDeg: Joi.number(),
    translateY: Joi.number(),
    labels: Joi.array().items(this.labelValidation),
    texts: Joi.array().items(this.textValidation),
    caption: Joi.string(),
    productsIds: Joi.array().items(objectIdValidation),
    tags: Joi.array().items(objectIdValidation), //users to tags
    scheduledAt: Joi.date(),
  }).unknown(true);

  createStory = Joi.object({
    storyData: Joi.array().items(this.storyDataValidation).min(1),
    isPublished: Joi.boolean(),
    sharedWith: Joi.string().valid(...Object.values(POST_SHARED_WITH)),
  });
}

export const storiesValidations = new StoriesValidations();
