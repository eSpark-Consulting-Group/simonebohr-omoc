import { Types } from 'mongoose';
import { Posts, UserBlocks, Videos } from '../models';
import { postsRepository, videosRepository } from '../repository';

class VideosHelper {
  async getAllVideosAndCount(userId: string, query: any, where: any = {}) {
    const { pageSize, page, sort } = query;
    const createdAt = sort === 'true' ? -1 : 1;
    try {
      const currentUserId = new Types.ObjectId(userId);
      const getBlockedUsers = await UserBlocks.find({
        $or: [
          {
            blockedId: currentUserId,
          },
          {
            blockerId: currentUserId,
          },
        ],
      }).lean();
      const blockedUserIds = getBlockedUsers?.map(user => {
        if (userId === user?.blockerId?.toString()) {
          return user?.blockedId;
        } else {
          return user?.blockerId;
        }
      });
      const whereCondition = {
        userId: {
          $nin: blockedUserIds,
        },
        isDeleted: false,
        files: {
          $ne: [],
        },
        ...where,
      };
      const countPromise = Videos.countDocuments(whereCondition);

      const videosPromise = videosRepository.getAllVideos({
        videosWhere: whereCondition,
        sort: { createdAt },
        userId: userId,
        page: +page,
        pageSize: +pageSize,
      });
      return Promise.all([countPromise, videosPromise]);
    } catch (err) {
      throw err;
    }
  }
}

export const videosHelper = new VideosHelper();
