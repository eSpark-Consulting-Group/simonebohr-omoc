import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { notificationsController } from '../controllers';
import { checkJwt, validateRoles } from '../middlewares';
import { ROLES } from '../constants';
import { settingValidation, validate } from '../validations';

class SettingsRoutes implements IRoutes {
  public router = Router();
  public path = '/settings';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/user-notification', checkJwt, validateRoles([ROLES.USER]), notificationsController.getUserNotificationsSettings);

    this.router.post(
      '/user-notification',
      checkJwt,
      validateRoles([ROLES.USER]),
      validate(settingValidation.userNotificationSettings),
      notificationsController.saveUserNotificationSettings,
    );

    this.router.get('/newsletter', checkJwt, validateRoles([ROLES.USER]), notificationsController.getNewsLetterSettings);

    this.router.post(
      '/newsletter',
      checkJwt,
      validateRoles([ROLES.USER]),
      validate(settingValidation.newsLetterSettings),
      notificationsController.saveNewsLetterSettings,
    );
  }
}

export const settingsRoutes = new SettingsRoutes();
