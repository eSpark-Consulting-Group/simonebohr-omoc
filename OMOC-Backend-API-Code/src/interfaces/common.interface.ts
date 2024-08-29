import { Request, Router } from 'express';
import { IUser } from './user.interface';

export interface IBaseMongoModel {
  _id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IResponseData<T = any> {
  message: string;
  data: T | null;
  status: boolean;
}

export interface IRoutes {
  path: string;
  router: Router;
}

export interface ICustomRequest<T = Record<string, any>> extends Request {
  body: T;
  user?: { role?: string; id?: string; shopId?: string; isUser?: boolean };
  role?: string;
}

export interface IImagesObj {
  url?: String;
  publicId?: String;
}

export interface IQueryObject {
  page?: number;
  pageSize?: number;
}

export interface IFileObject {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}
