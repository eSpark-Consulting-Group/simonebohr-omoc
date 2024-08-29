import { RequestHandler } from 'express';
import { ICustomRequest } from '../interfaces';
import { handleResponse, logger } from '../utils';
import { STATES, Types, isValidObjectId } from 'mongoose';
import { NotFoundError, UnprocessableEntityError } from '../errors';
import { Chats, UserFollows } from '../models';
import { FOLLOW_STATUS, HTTP_STATUS } from '../constants';
import { CHAT_STATUS, CHAT_TYPES } from '../constants/chat.constant';
import { userRepo } from '../repository';

class ChatController {
  getOne2OneChat: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest).user;
      const { userId } = req?.body;
      if (!isValidObjectId(userId)) {
        throw new UnprocessableEntityError('Please enter valid userId');
      }
      const role = await userRepo.getUserRole(userId);
      if (!role) {
        throw new NotFoundError('User not found');
      }

      let chatFound: any = await Chats.findOne({
        isGroup: false,
        isDeleted: false,
        ...(userDetails?.shopId && { shopId: userDetails?.shopId }),
        $and: [
          {
            'users.userId': userDetails?.id,
            'users.role': userDetails?.role,
          },
          {
            'users.userId': userId,
            'users.role': role,
          },
        ],
      }).populate('users.userId');

      // Checking if the user has relation with the id or not
      const findRelation = await UserFollows.findOne({
        $or: [
          {
            followerId: new Types.ObjectId(userDetails?.id),
            followingId: new Types.ObjectId(userId),
          },
          {
            followerId: new Types.ObjectId(userId),
            followingId: new Types.ObjectId(userDetails?.id),
          },
        ],
        status: FOLLOW_STATUS.ACTIVE,
      }).select('id');

      if (!chatFound) {
        const chatCreated = await Chats.create({
          isGroup: false,
          ...(userDetails?.shopId && { shopId: userDetails?.shopId }),
          users: [
            {
              userId: userDetails?.id,
              role: userDetails?.role,
              status: CHAT_STATUS.ACCEPTED,
            },
            {
              userId: userId,
              role,
              status: findRelation ? CHAT_STATUS.ACCEPTED : CHAT_STATUS.PENDING,
            },
          ],
        });

        chatFound = await Chats.findOne({ _id: chatCreated._id }).populate('users', '-password');
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Chat Found', chatFound));
    } catch (err) {
      logger.error(`ChatController :: getOne2OneChat :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllChats: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest).user;
      const { pageSize, page } = req?.query;
      const type = req?.query?.type === CHAT_TYPES.SUPPORT ? CHAT_TYPES?.SUPPORT : CHAT_TYPES.PERSONAL;

      const where = {
        isDeleted: false,
        'users.userId': userDetails?.id,
        type,
        'users.status': CHAT_STATUS.ACCEPTED,
        'users.role': userDetails?.role,
        ...(userDetails?.shopId && { shopId: userDetails?.shopId }),
      };

      const chatPromise = Chats.find(where)
        .populate('users.userId', '-password')
        .populate('groupAdmins.userId', '-password')
        .populate('latestMessage')
        .sort({ updatedAt: -1 })
        .limit(+(pageSize as unknown as number))
        .skip(+(page as unknown as number));

      const countPromise = Chats?.countDocuments(where);

      const [chats, count] = await Promise.all([chatPromise, countPromise]);

      return res.status(HTTP_STATUS.OK).json(handleResponse('All Chats Found', { count, chats }));
    } catch (err) {
      logger.error(`ChatController :: getAllChats :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllChatRequests: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest).user;
      const { pageSize, page, isGroup } = req?.query;
      const isGroupChat = isGroup === 'true' ? true : false;
      const where = {
        isDeleted: false,
        'users.userId': userDetails?.id,
        'users.status': {
          $in: [CHAT_STATUS.PENDING, CHAT_STATUS.REJECTED],
        },
        ...(isGroup && { isGroup: isGroupChat }),
        ...(userDetails?.shopId && { shopId: userDetails?.shopId }),
      };
      const chatPromise = Chats.find(where)
        .populate('users.userId', '-password')
        .populate('groupAdmins.userId', '-password')
        .populate('latestMessage')
        .sort({ updatedAt: -1 })
        .limit(+(pageSize as unknown as number))
        .skip(+(page as unknown as number));

      const countPromise = Chats?.countDocuments(where);

      const [chats, count] = await Promise.all([chatPromise, countPromise]);

      return res.status(HTTP_STATUS.OK).json(handleResponse('All Chats Found', { count, chats }));
    } catch (err) {
      logger.error(`ChatController :: getAllChatRequests :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  createGroupChat: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest).user;
      const { users, name, image } = req?.body;

      const userIds: any = Array.from(new Set(users || []))?.map((id: any) => new Types.ObjectId(id));

      const userList = await userRepo.getAllUsersRole(userIds);

      // Filtering users for uniques
      const findRelation = await UserFollows.find({
        $or: [
          {
            followerId: new Types.ObjectId(userDetails?.id),

            followingId: {
              $in: userIds,
            },
          },
          {
            followerId: {
              $in: userIds,
            },
            followingId: new Types.ObjectId(userDetails?.id),
          },
        ],
        status: FOLLOW_STATUS.ACTIVE,
      });

      const currentUser = {
        userId: userDetails?.id,
        role: userDetails?.role,
        status: CHAT_STATUS.ACCEPTED,
      };

      const usersDataToCreateChat = userList?.map((user: any) => {
        const relationFound = findRelation?.find(data => {
          data?.followerId?.toString() === user?._id?.toString() || data?.followingId?.toString() === userDetails?.id?.toString();
        });
        return {
          userId: user?._id,
          role: user?.role,
          status: relationFound ? CHAT_STATUS.ACCEPTED : CHAT_STATUS.PENDING,
        };
      });

      const createdGroup = await Chats.create({
        isGroup: true,
        ...(userDetails?.shopId && { shopId: userDetails?.shopId }),
        name,
        image,
        users: [...usersDataToCreateChat, currentUser],
        groupAdmins: [currentUser],
      });

      const fullGroupChat = await Chats.findOne({ _id: createdGroup._id })
        .populate('users.userId', '-password')
        .populate('groupAdmins.userId', '-password');

      return res.status(HTTP_STATUS.OK).json(handleResponse('Group Chat Created Successfully', fullGroupChat));
    } catch (err) {
      logger.error(`ChatController :: createGroupChat :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  renameGroup: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest).user;
      const { chatId, name } = req?.body;
      const updatedChat = await Chats.findOneAndUpdate(
        {
          _id: chatId,
          'groupAdmins.userId': userDetails?.id,
          'groupAdmins.role': userDetails?.role,
          isDeleted: false,
        },
        {
          name,
        },
        {
          new: true,
        },
      )
        .populate('users.userId', '-password')
        .populate('groupAdmins.userId', '-password');

      if (!updatedChat) {
        res.status(404);
        throw new Error('Chat Not Found');
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Renamed Group', updatedChat));
    } catch (err) {
      logger.error(`ChatController :: renameGroup :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  removeFromGroup: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest).user;
      const { chatId, userIds } = req?.body;

      const updatedChat = await Chats.findOneAndUpdate(
        {
          _id: chatId,
          'groupAdmins.userId': userDetails?.id,
          'groupAdmins.role': userDetails?.role,
          isDeleted: false,
        },
        {
          $pull: {
            users: {
              userId: {
                $in: userIds,
              },
            },
          },
        },
        {
          new: true,
        },
      )
        .populate('users.userId', '-password')
        .populate('groupAdmins.userId', '-password');

      if (!updatedChat) {
        res.status(404);
        throw new Error('Chat Not Found');
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Removed SuccessFully ', updatedChat));
    } catch (err) {
      logger.error(`ChatController :: removeFromGroup :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  addUsersToGroup: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest).user;
      const { chatId, userIds } = req?.body;

      const chatFound = await Chats.findOne({
        _id: chatId,
        'groupAdmins.userId': userDetails?.id,
        'groupAdmins.role': userDetails?.role,
        isDeleted: false,
      });

      if (!chatFound) {
        throw new NotFoundError('Chat not found');
      }

      const filteredIDs = userIds.filter((id: any) => {
        return !chatFound?.users?.some(obj => obj.userId?.toString() === id);
      });

      const users = await userRepo.getAllUsersRole(filteredIDs);

      const added = await Chats.findByIdAndUpdate(
        chatId,
        {
          $push: { users },
        },
        {
          new: true,
        },
      )
        .populate('users.userId', '-password')
        .populate('groupAdmins.userId', '-password');

      return res.status(HTTP_STATUS.OK).json(handleResponse('User has been added SuccessFully ', added));
    } catch (err) {
      logger.error(`ChatController :: addUsersToGroup :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updateChatStatus: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest).user;
      const { chatId, status } = req?.body;

      const chatFound = await Chats.findOne({
        _id: chatId,
        'users.userId': userDetails?.id,
        isDeleted: false,
      });

      if (!chatFound) {
        throw new NotFoundError('Chat not found');
      }

      chatFound.users = chatFound?.users?.map(user => {
        return {
          ...JSON.parse(JSON.stringify(user)),
          ...(status && user?.userId?.toString() === userDetails?.id && { status }),
        };
      });

      await chatFound.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('Chat Status has been updated'));
    } catch (err) {
      logger.error(`ChatController :: updateChatStatus :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const chatController = new ChatController();
