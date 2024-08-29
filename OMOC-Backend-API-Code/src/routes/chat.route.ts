import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { chatController } from '../controllers';
import { checkJwt, setPagination, validateRoles } from '../middlewares';
import { ROLES } from '../constants';
import { chatValidation, validate } from '../validations';

class ChatRoutes implements IRoutes {
  public router = Router();
  public path = '/chat';
  constructor() {
    this.initializeRoutes();
  }
  private ALL_CHAT_ROLES = [ROLES.USER, ROLES.SELLER];

  private initializeRoutes(): void {
    // Get and create one 2 one chat
    this.router.post('/', checkJwt, validateRoles(this.ALL_CHAT_ROLES), validate(chatValidation.chatUser), chatController.getOne2OneChat);

    // Get all chat
    this.router.get('/all', checkJwt, validateRoles(this.ALL_CHAT_ROLES), chatController.getAllChats);

    this.router.post('/group', checkJwt, validateRoles(this.ALL_CHAT_ROLES), chatController.createGroupChat);

    this.router.post(
      '/remove-user',
      checkJwt,
      validateRoles(this.ALL_CHAT_ROLES),
      validate(chatValidation.addRemoveUserFromGroup),
      chatController.removeFromGroup,
    );

    this.router.post(
      '/add-user',
      checkJwt,
      validateRoles(this.ALL_CHAT_ROLES),
      validate(chatValidation.addRemoveUserFromGroup),
      chatController.addUsersToGroup,
    );

    this.router.get('/request', checkJwt, validateRoles(this.ALL_CHAT_ROLES), setPagination, chatController.getAllChatRequests);

    this.router.put(
      '/request',
      checkJwt,
      validate(chatValidation.updateChatStatus),
      validateRoles(this.ALL_CHAT_ROLES),
      chatController.updateChatStatus,
    );
  }
}

export const chatRoutes = new ChatRoutes();
