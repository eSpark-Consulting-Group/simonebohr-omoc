import { POST_SHARED_WITH, ROLES } from '../constants';
import { ICustomRequest } from '../interfaces';
import { commonHelper } from './common.helper';
import { datesHelper } from './dates.helper';

class StoriesHelper {
  prepareStoryData = (body: any, userDetails: any) => {
    const { storyData, isPublished, sharedWith } = body;

    if (storyData?.length) {
      return storyData.map((story: any) => {
        const scheduledAt = story?.scheduledAt || new Date();
        const expiresAt = datesHelper.getDateAfterPeriod(1, scheduledAt);
        return {
          url: story?.url,
          thumbnail: story?.thumbnail ?? '',
          extension: story?.extension,
          width: story?.width,
          height: story?.height,
          ratio: story?.ratio,
          translateX: story?.translateX,
          translateY: story?.translateY,
          rotateDeg: story?.rotateDeg,
          caption: story?.caption ?? '',
          ...(story?.labels?.length && { labels: story?.labels }),
          ...(story?.texts?.length && { texts: story?.texts }),
          // ------------- //
          type: commonHelper.getFileType(story?.url),
          scheduledAt,
          expiresAt,
          userId: userDetails?.id,
          ...(storyData?.url && { type: commonHelper.getFileType(storyData?.url) }),
          role: userDetails?.role,
          isPublished: userDetails?.role === ROLES.USER ? true : isPublished,
          sharedWith: userDetails?.role === ROLES.USER ? sharedWith : POST_SHARED_WITH.PUBLIC,
        };
      });
    } else {
      return [];
    }
  };
}

export const storiesHelper = new StoriesHelper();
