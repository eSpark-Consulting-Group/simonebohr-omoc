import { Types } from 'mongoose';
import { Posts, UserBlocks } from '../models';
import { postsRepository } from '../repository';

class PostsHelper {
  async getAllPostAndCount(userId: string, query: any, where = {}) {
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

      const countPromise = Posts.countDocuments(whereCondition);

      const postsPromise = postsRepository.getAllPosts({
        postsWhere: whereCondition,
        sort: { createdAt },
        userId: userId,
        page: +page,
        pageSize: +pageSize,
      });
      return Promise.all([countPromise, postsPromise]);
    } catch (err) {
      throw err;
    }
  }
}

export const postsHelper = new PostsHelper();
