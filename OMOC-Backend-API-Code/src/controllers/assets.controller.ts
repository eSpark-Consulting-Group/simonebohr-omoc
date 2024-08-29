import { RequestHandler } from 'express';
import { thumbnailService, uploadService } from '../services';
import { IFileObject } from '../interfaces';
import { CLOUD_FOLDERS, HTTP_STATUS, imageExtensions } from '../constants';
import { handleResponse, logger } from '../utils';
import { NotFoundError, UnprocessableEntityError } from '../errors';
import { extname } from 'path';
export class AssetsController {
  uploadFile: RequestHandler = async (req, res, next) => {
    try {
      if (!req?.file) {
        throw new UnprocessableEntityError('File not found');
      }
      const file: any = await uploadService.uploadFile(req?.file as unknown as IFileObject, CLOUD_FOLDERS.PRODUCTS);

      let thumbnailData: any;
      if (req?.body?.isThumbnail) {
        const buffer = await thumbnailService.createThumbnail(req?.file?.buffer, req?.file?.originalname);
        thumbnailData = await uploadService.uploadFromBuffer(buffer, CLOUD_FOLDERS.THUMBNAILS);
      }
      return res.status(HTTP_STATUS.OK).json(
        handleResponse('File Uploaded successfully', {
          publicId: file?.public_id,
          url: file?.url,
          thumbnailData,
          thumbnailUrl: thumbnailData?.secure_url,
        }),
      );
    } catch (err) {
      logger.error(`AssetsController :: uploadFiles :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  deleteFile: RequestHandler = async (req, res, next) => {
    try {
      const publicId = req.query?.id;
      if (!publicId) {
        throw new UnprocessableEntityError('Id is required');
      }
      const response = await uploadService.deleteFile(publicId as string);
      if (response.result === 'ok') {
        return res.status(HTTP_STATUS.OK).json(handleResponse('File Deleted successfully'));
      } else if (response.result === 'not found') {
        throw new NotFoundError('File with this id not found');
      } else {
        throw new Error('Something went wrong while deleting file');
      }
    } catch (err) {
      logger.error(`AssetsController :: uploadFiles :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  private async uploadMultipleFilesHandler(files: any[]) {
    try {
      const fileUrls = [];
      for (let fileData of files) {
        const file: any = await uploadService.uploadFile(fileData as unknown as IFileObject, CLOUD_FOLDERS.FILES);

        let thumbnailData: any;
        if (imageExtensions.includes(extname(fileData?.originalname))) {
          const buffer = await thumbnailService.createThumbnail(fileData?.buffer, fileData?.originalname);
          thumbnailData = await uploadService.uploadFromBuffer(buffer, CLOUD_FOLDERS.THUMBNAILS);
        }
        fileUrls.push({
          url: file?.secure_url,
          thumbnail: thumbnailData && thumbnailData?.secure_url,
        });
      }
      return fileUrls;
    } catch (err) {
      console.log('🚀 ~ AssetsController ~ uploadMultipleFilesHandler ~ err:', err);
      throw err;
    }
  }
  uploadMultipleFiles: RequestHandler = async (req, res, next) => {
    try {
      if (!req?.files?.length) {
        throw new UnprocessableEntityError('Files not found');
      }
      const files = await this.uploadMultipleFilesHandler(req?.files as any);
      return res.status(HTTP_STATUS.OK).json(handleResponse('File Uploaded successfully', files));
    } catch (err) {
      logger.error(`AssetsController :: uploadFiles :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const assetsController = new AssetsController();
