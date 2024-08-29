import { RequestHandler } from 'express';
import { ICustomRequest } from '../interfaces';
import { handleResponse, logger } from '../utils';
import { UserNotificationSettings } from '../models';
import { HTTP_STATUS, defaultNewsLetterSettings, defaultUserNotifications } from '../constants';
import { commonHelper } from '../helpers';
import { NewsLetterSettings } from '../models/newsLetterSettings.model';

class NotificationController {
  getUserNotificationsSettings: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      let userNotifications = await UserNotificationSettings.findOne({ userId: userDetails?.id });

      if (!userNotifications) userNotifications = await UserNotificationSettings.create({ userId: userDetails?.id, ...defaultUserNotifications });

      return res.status(HTTP_STATUS.OK).json(handleResponse('Users Notifications Settings', userNotifications));
    } catch (err) {
      logger.error(`NotificationController :: getUserNotificationsSettings :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  saveUserNotificationSettings: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      const userNotifications = await UserNotificationSettings.findOne({ userId: userDetails?.id });
      if (userNotifications) {
        const notificationData = commonHelper.assignValues(userNotifications ?? {}, req?.body);

        await notificationData?.save();
        return res.status(HTTP_STATUS.OK).json(handleResponse('Users Notifications Settings Saved Successfully', notificationData));
      } else {
        const notificationData = commonHelper.assignValues(req?.body ?? {}, defaultUserNotifications);
        const data = await UserNotificationSettings.create({ ...notificationData, userId: userDetails?.id });
        return res.status(HTTP_STATUS.OK).json(handleResponse('Users Notifications Settings Saved Successfully', data));
      }
    } catch (err) {
      logger.error(`NotificationController :: saveUserNotificationSettings :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getNewsLetterSettings: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      let newsLetterSettings = await NewsLetterSettings.findOne({ userId: userDetails?.id });

      if (!newsLetterSettings) newsLetterSettings = await NewsLetterSettings.create({ userId: userDetails?.id, ...defaultNewsLetterSettings });

      return res.status(HTTP_STATUS.OK).json(handleResponse('News Letter Settings', newsLetterSettings));
    } catch (err) {
      logger.error(`NotificationController :: getNewsLetterSettings :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  saveNewsLetterSettings: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      const newsLetterSettings = await NewsLetterSettings.findOne({ userId: userDetails?.id });
      if (newsLetterSettings) {
        const newsLetterData = commonHelper.assignValues(newsLetterSettings ?? {}, req?.body);

        await newsLetterData?.save();
        return res.status(HTTP_STATUS.OK).json(handleResponse('News Letter Settings Saved Successfully', newsLetterData));
      } else {
        const notificationData = commonHelper.assignValues(req?.body ?? {}, defaultNewsLetterSettings);
        const data = await NewsLetterSettings.create({ ...notificationData, userId: userDetails?.id });
        return res.status(HTTP_STATUS.OK).json(handleResponse('News Letter Settings Saved Successfully', data));
      }
    } catch (err) {
      logger.error(`NotificationController :: saveNewsLetterSettings :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const notificationsController = new NotificationController();
