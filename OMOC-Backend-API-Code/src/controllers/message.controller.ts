import { RequestHandler } from 'express';
import { ICustomRequest } from '../interfaces';
import { HTTP_STATUS } from '../constants';
import { handleResponse, logger } from '../utils';
import { Chats, Messages } from '../models';
import { Types, isValidObjectId } from 'mongoose';
import { NotFoundError, UnprocessableEntityError } from '../errors';

class MessageController {
  getAllMessages: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const chatId = req?.params?.chatId;

      if (!isValidObjectId(chatId)) {
        throw new UnprocessableEntityError('Invalid Chat Id');
      }
      const messages = await Messages.find({
        chatId: new Types.ObjectId(chatId),
      })
        .populate('sender.userId', 'name pic email')
        .populate('chatId');

      return res.status(HTTP_STATUS.OK).json(handleResponse('Fetched All Messages', messages));
    } catch (err) {
      logger.error(`MessageController :: getAllMessages :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  sendMessage: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { message, productIds, files } = req?.body;
      const chatId = req?.params?.chatId;
      if (!isValidObjectId(chatId)) {
        throw new UnprocessableEntityError('Invalid Chat Id');
      }

      const chatFound = await Chats.findOne({
        _id: new Types.ObjectId(chatId),
        isGroup: false,
        isDeleted: false,
        $and: [
          {
            'users.userId': userDetails?.id,
            'users.role': userDetails?.role,
          },
        ],
      });
      if (!chatFound) {
        throw new NotFoundError('Chat not found');
      }

      if (!message) {
        throw new UnprocessableEntityError('message is required');
      }
      const messageCreated: any = await Messages.create({
        sender: { userId: userDetails?.id, role: userDetails?.role },
        message,
        productIds,
        files,
        chatId,
      });

      chatFound.latestMessage = messageCreated._id;
      chatFound.save();

      const messages = await Messages.findOne({
        _id: messageCreated?._id,
      })
        .populate('sender.userId', 'name pic email')
        .populate('chatId');

      const io = req?.app.get('io');

      io.emit('chat-message', messages);
      return res.status(HTTP_STATUS.OK).json(handleResponse('Message Sent Successfully', messageCreated));
    } catch (err) {
      logger.error(`MessageController :: sendMessage :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const messageController = new MessageController();
