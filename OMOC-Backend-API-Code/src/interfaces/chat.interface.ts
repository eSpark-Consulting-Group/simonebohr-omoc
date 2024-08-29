import { ObjectId } from 'mongoose';
import { ROLES } from '../constants';
import { CHAT_STATUS, CHAT_TYPES } from '../constants/chat.constant';
import { IFilesSchema } from './assets.interface';

interface IChatUser {
  role: ROLES;
  userId: ObjectId;
}
export interface IChats {
  name: string;
  isGroup: boolean;
  users: IChatUser[];
  latestMessage: ObjectId;
  groupAdmins: IChatUser[];
  isActive: boolean;
  isDeleted: boolean;
  image: {
    url: string;
    thumbnail: string;
  };
  type: CHAT_TYPES;
  shopId: ObjectId;
  status: CHAT_STATUS;
}

export interface IMessages {
  sender: IChatUser;
  message: string;
  chatId: ObjectId;
  readBy: IChatUser[];
  isDeleted: boolean;
  isEdited: boolean;
  files: IFilesSchema[];
  productIds: ObjectId[];
}
