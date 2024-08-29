export enum WEIGHT_UNITS {
  KG = 'kg',
  LBS = 'lbs',
}

export enum DIMENSION_UNITS {
  CM = 'cm',
  INCHES = 'inches',
  FT = 'ft',
  M = 'm',
}

export enum GENDERS {
  MALE = 'male',
  FEMALE = 'female',
  CHILD = 'child',
  BOY = 'boy',
  GIRL = 'girl',
}

export const DEFAULT_CATEGORIES = {
  FASHION: 'Fashion',
  SPORTS: 'Sports',
  ART: 'Arts',
  ANIMALS: 'Animals',
  TECHNOLOGY: 'Technology',
  CAR: 'Car',
  ACCESSORIES: 'Accessories',
  ARCHITECTURE: 'Architecture',
  DECORATION: 'Decoration',
  GAMING: 'Gaming',
  DESIGN: 'Design',
  GADGET: 'Gadget',
};

export const DEFAULT_CATEGORY_LINKS: Record<string, string> = {
  Fashion: 'https://freepngimg.com/thumb/sunglasses_emoji/37042-1-sunglasses-emoji-photos.png',
  Sports: 'https://freepngimg.com/thumb/shoes/112092-converse-black-shoes-free-download-image.png',
};

export const FAQ_TYPES = {
  PRODUCT: 'product',
  GENERAL: 'general',
};

export enum PRODUCT_CERTIFICATES_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export const DEFAULT_CART_TEXT = 'Add to Cart';

export enum PRODUCT_TYPES {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICES = 'services',
}

export const PRODUCT_SORTING = {
  highest: {
    price: -1,
  },
  lowest: {
    price: 1,
  },
  newest: {
    createdAt: -1,
  },
};
