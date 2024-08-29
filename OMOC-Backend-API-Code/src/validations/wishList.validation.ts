import Joi from 'joi';

class WishListValidations {
  createWishList = Joi.object({
    name: Joi.string().required(),
    isPrivate: Joi.boolean().optional(),
    isGroup: Joi.boolean().optional(),
    productIds: Joi.array().items(Joi.string().hex().length(24)),
    sharedWith: Joi.array().items(Joi.string().hex().length(24)),
  });
}

export const wishListValidations = new WishListValidations();
