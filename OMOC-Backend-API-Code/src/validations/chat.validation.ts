import Joi from 'joi';
import { CHAT_STATUS, ROLES } from '../constants';

class ChatValidation {
  chatUser = Joi.object({
    userId: Joi.string().hex().length(24).required(),
  });

  addRemoveUserFromGroup = Joi.object({
    userIds: Joi.array().items(Joi.string().hex().length(24).required()).required(),
    chatId: Joi.string().hex().length(24).required(),
  });

  updateChatStatus = Joi.object({
    chatId: Joi.string().hex().length(24).required(),
    status: Joi.string()
      .required()
      .valid(...Object.values(CHAT_STATUS)),
  });

  sendMessage = Joi.object({
    message: Joi.string().optional(),
    productIds: Joi.array().items(Joi.string().hex().length(24)).optional(),
    files: Joi.array().items(Joi.any()).optional(),
  });
}

export const chatValidation = new ChatValidation();
