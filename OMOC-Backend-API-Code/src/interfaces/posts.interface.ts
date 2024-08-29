import { ObjectId } from 'mongoose';
import { POST_SHARED_WITH } from '../constants';

export interface IPostFiles {
  type: 'image' | 'audio' | 'video';
  path: string;
  audio?: string;
}

export interface IStories {
  userId: ObjectId;
  shopId: String;
  isDeleted: boolean;
  type: 'image' | 'audio' | 'video';
  expiresAt: Date;
  sharedWith: POST_SHARED_WITH;
  viewsCount: number;
  likesCount: number;
  role: string;
  commentsCount: number;
  file: any;
  labels: any;
  texts: any;
  caption: string;
  scheduledAt: Date;
  isPublished: boolean;
  extension: string;
  thumbnail: string;
  url: string;
  size: number;
  unit: string;
  width: number;
  height: number;
  ratio: number;
  translateX: number;
  rotateDeg: number;
  translateY: number;
}

export interface ILikes {
  userId: ObjectId;
  entityId: string;
  entityType: string;
  isLiked: boolean;
  isDeleted: boolean;
  shopId: string;
}

export interface IComments {
  userId: ObjectId;
  entityId: string;
  entityType: string;
  comment: string;
  isDeleted: boolean;
  likesCount: number;
  repliesCount: number;
  shopId: string;
}

export interface ILabels {
  zIndex: Number;
  x: Number;
  y: Number;
  fontSize: Number;
  height: Number;
  width: Number;
  ratio: Number;
  text: String;
  type: String;
}

export interface ITexts extends Omit<ILabels, 'type'> {
  color: string;
  textAlign: string;
  textBg: boolean;
}

export interface IPosts {
  userId: ObjectId;
  role: String;
  caption: String;
  isDeleted: boolean;
  tags: string[];
  files: any[];
  location: any;
  hideLikeViewCount: boolean;
  isCommentingOff: boolean;
  isSensitiveContent: boolean;
  isPublished: boolean;
  isPrePurchased: boolean;
  cartText: string;
  availableQuantity: number;
  availableDate: Date;
  discountType: string;
  discountPercentage: number;
  productIds: string[];
  sharedWith: POST_SHARED_WITH;
  scheduledAt: Date;
  shopId: string;
}

export interface IFavorites {
  userId: ObjectId;
  role: string;
  entityId: string;
  entityType: string;
}

export interface IVideos {
  userId: ObjectId;
  role: String;
  caption: String;
  isDeleted: boolean;
  tags: string[];
  files: any[];
  location: any;
  hideLikeViewCount: boolean;
  isCommentingOff: boolean;
  isSensitiveContent: boolean;
  isPublished: boolean;
  isPrePurchased: boolean;
  cartText: string;
  availableQuantity: number;
  availableDate: Date;
  discountType: string;
  discountPercentage: number;
  productIds: string[];
  sharedWith: POST_SHARED_WITH;
  scheduledAt: Date;
  shopId: string;
}
