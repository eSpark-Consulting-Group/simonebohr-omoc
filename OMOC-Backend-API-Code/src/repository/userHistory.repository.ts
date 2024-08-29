import { ObjectId, Types } from 'mongoose';
import { EXPLORE_TYPES } from '../constants';
import { UserFeedHistory } from '../models';

class UserHistoryRepository {
  // find or create user FEED history
  async saveUserFeedHistory(historyData: {
    userId: string | Types.ObjectId;
    type: EXPLORE_TYPES;
    entityId?: string | Types.ObjectId;
    text?: string;
  }) {
    const data = {
      ...historyData,
    };
    const historyFound = await UserFeedHistory.findOne({
      userId: data?.userId,
      type: data?.type,
      ...(data?.entityId && { entityId: data?.entityId }),
      ...(data?.text && { text: data?.text }),
    });

    if (historyFound) {
      historyFound.isDeleted = false;
      historyFound.searchAt = new Date();
      await historyFound.save();
      return historyFound;
    } else {
      return UserFeedHistory.create(data);
    }
  }
}

export const userHistoryRepo = new UserHistoryRepository();
