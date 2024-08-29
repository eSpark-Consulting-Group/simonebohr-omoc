import { Request } from 'express';
import { EntityTypes, MODEL_NAMES, audioExtensions, imageExtensions, videoExtensions } from '../constants';

export class CommonHelper {
  assignValues(target: Record<string, any>, source: Record<string, any>) {
    for (const key in source) {
      if (source?.hasOwnProperty(key)) {
        const value = source[key];
        if (
          value !== undefined &&
          value !== null &&
          !(typeof value === 'string' && value.trim() === '') &&
          !(Array.isArray(value) && value.length === 0)
        ) {
          target[key] = value;
        }
      }
    }
    return target;
  }

  parseBody(body: any) {
    const parsedBody: Record<string, any> = {};

    Object.keys(body).forEach(key => {
      let parsedValue;
      try {
        parsedValue = JSON.parse(body[key]);
      } catch (error) {
        parsedValue = body[key];
      }
      parsedBody[key] = parsedValue;
    });
    return parsedBody;
  }

  getFileType(fileName: string) {
    const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

    if (audioExtensions.includes(fileExtension)) {
      return 'audio';
    } else if (videoExtensions.includes(fileExtension)) {
      return 'video';
    } else if (imageExtensions.includes(fileExtension)) {
      return 'image';
    } else {
      return 'unknown';
    }
  }

  getDateAfter24Hours() {
    const currentDate = new Date();
    return new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  }

  getDateAfterDays(days: number = 1) {
    const currentDate = new Date();
    return new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
  }

  lookupUserSeller(localField: string = 'userId') {
    return [
      {
        $lookup: {
          from: MODEL_NAMES.USERS,
          localField,
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: MODEL_NAMES.SELLERS,
          localField,
          foreignField: '_id',
          as: 'seller',
        },
      },
    ];
  }

  userSellerLookupCondition() {
    return {
      if: { $gt: [{ $size: '$user' }, 0] },
      then: '$user',
      else: '$seller',
    };
  }

  findDataForSearch(...models: { model: any; entityType: EntityTypes }[]) {
    const promise: any = [];
    models?.forEach((data: any) => {
      promise.push(
        data?.model?.aggregate([
          {
            $match: {
              isDeleted: false,
              files: { $ne: [] },
            },
          },
          ...commonHelper.lookupUserSeller(),
          {
            $addFields: {
              type: data?.entityType,
              createdBy: {
                $arrayElemAt: [{ $cond: commonHelper.userSellerLookupCondition() }, 0],
              },
            },
          },
        ]),
      );
    });
    return Promise.all(promise);
  }
}

export const commonHelper = new CommonHelper();
