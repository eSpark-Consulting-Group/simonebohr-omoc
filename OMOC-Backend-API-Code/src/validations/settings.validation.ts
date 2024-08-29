import Joi from 'joi';

class SettingsValidation {
  userNotificationSettings = Joi.object({
    omocNotification: Joi.boolean().optional(),
    messageNotification: Joi.boolean().optional(),
    newPostNotification: Joi.boolean().optional(),
    shopsNotification: Joi.boolean().optional(),
    selectedShops: Joi.array().items(Joi.string().hex().length(24)),
    favProductsAvailable: Joi.boolean().optional(),
    productUpdates: Joi.boolean().optional(),
    productInStock: Joi.boolean().optional(),
  });

  newsLetterSettings = Joi.object({
    omocNewsLetterByEmail: Joi.boolean().optional(),
    newProductNotification: Joi.boolean().optional(),
    eventsNotification: Joi.boolean().optional(),
    saleNotification: Joi.boolean().optional(),
  });
}

export const settingValidation = new SettingsValidation();
