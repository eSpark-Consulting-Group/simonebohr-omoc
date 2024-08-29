import { UserFollows } from '../models';

class UserFollowsRepository {
  getFollowCount(userId: any) {
    return UserFollows.aggregate([
      {
        $facet: {
          followingCount: [
            {
              $match: {
                $or: [
                  {
                    followerId: userId,
                  },
                  {
                    followingId: userId,
                    isMutual: true,
                  },
                ],
              },
            },
            { $count: 'count' },
          ],
          followerCount: [
            {
              $match: {
                $or: [
                  {
                    followingId: userId,
                  },
                  {
                    followerId: userId,
                    isMutual: true,
                  },
                ],
              },
            },
            { $count: 'count' },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          followingCount: { $ifNull: [{ $arrayElemAt: ['$followingCount.count', 0] }, 0] },
          followerCount: { $ifNull: [{ $arrayElemAt: ['$followerCount.count', 0] }, 0] },
        },
      },
    ]);
  };
}

export const userFollowRepo = new UserFollowsRepository();
