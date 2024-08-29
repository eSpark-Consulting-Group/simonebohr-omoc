import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { checkJwt, validateRoles } from '../middlewares';
import { ROLES } from '../constants';
import { messageController, ordersController } from '../controllers';
import { OrdersValidation, chatValidation, validate } from '../validations';

class MessageRoutes implements IRoutes {
  public router = Router();
  public path = '/message';
  constructor() {
    this.initializeRoutes();
  }

  private chatRoles = [ROLES.USER, ROLES.SELLER];

  private initializeRoutes(): void {
    // Send Messages to conversation
    this.router.post('/:chatId', checkJwt, validateRoles(this.chatRoles), validate(chatValidation.sendMessage), messageController.sendMessage);

    this.router.get('/:chatId', checkJwt, validateRoles(this.chatRoles), messageController.getAllMessages);
  }
}

export const messageRoutes = new MessageRoutes();
