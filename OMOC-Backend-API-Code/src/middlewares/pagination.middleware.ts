import { RequestHandler } from 'express';
import { IQueryObject } from '../interfaces';
import { PAGINATION } from '../constants';

export const setPagination: RequestHandler = async (req, res, next) => {
  const pagination = req.query as IQueryObject;
  // Setting page size to default if no size is provided
  pagination.pageSize = +(pagination?.pageSize || PAGINATION.PAGE_SIZE);
  pagination.page = +(pagination?.page || PAGINATION.PAGE);
  // Setting the page to default if no page is provided
  pagination.page = ((+pagination?.page <= 1 ? 1 : +pagination?.page) - 1) * pagination.pageSize;
  req.query = { ...req?.query, ...pagination } as Record<string, string>;
  return next();
};
