import Joi from 'joi';
export class ProductsValidation {
  static addProducts = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    discountPrice: Joi.number().optional(),
    // Optional
    productType: Joi.string().optional(),
    originalPrice: Joi.number().optional(),
    quantity: Joi.number().optional(),
    brand: Joi.string().optional(),
    currencyType: Joi.string().optional(),
  });

  static imageObject = Joi.object({
    url: Joi.string().optional(),
    publicId: Joi.string().optional(),
  });

  static productInfo = Joi.object({
    name: Joi.string().required(),
    isActive: Joi.boolean().optional(),
    description: Joi.string().optional(),
    recommendedCategory: Joi.string().optional(),
    images: Joi.array().items(this.imageObject).optional(),
    thumbnail: Joi.string(),
    category: Joi.string().optional(),
    price: Joi.number().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    brand: Joi.string().optional(),
    type: Joi.string().optional().allow(null),
    maxOrderLimit: Joi.number().optional(),
    genders: Joi.array().items(Joi.string()).optional(),
    expectedShippingTime: Joi.string().optional().allow(null, ''),
    size: Joi.string().optional(),
    weight: Joi.number().optional(),
    weightUnit: Joi.string().optional(),
    stock: Joi.number().optional(),
    originalPrice: Joi.number().optional(),
  });

  static productVariant = Joi.object({
    color: Joi.string().required(),
    price: Joi.number().optional(),
    stock: Joi.number().optional(),
    sku: Joi.string().optional(),
    status: Joi.boolean(),
    barCode: Joi.string(),
    size: Joi.string(),
  });

  static productManagement = Joi.object({
    assignGeneratedSKU: Joi.boolean().optional(),
    quantity: Joi.number().optional(),
    wareHouseId: Joi.string().optional(),
    sku: Joi.string().optional(),
    barCode: Joi.string().optional(),
  });

  static addProductValidations = Joi.object({
    productInfo: this.productInfo.unknown(true),
    productVariants: Joi.array().items(this.productVariant.unknown(true)).optional(),
    productManagement: this.productManagement,
    faqs: Joi.array().items().optional(),
  }).unknown(true);
}
