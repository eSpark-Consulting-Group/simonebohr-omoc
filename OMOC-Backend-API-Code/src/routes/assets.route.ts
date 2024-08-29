import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { filterVideoFilesOnly, handleMultipleFiles, handleSingleFile } from '../middlewares/handleFiles';
import { assetsController } from '../controllers';
import { FILE_FIELDS } from '../constants';
import { addToBody, checkJwt } from '../middlewares';

class AssetsRoutes implements IRoutes {
  public router = Router();
  public path = '/assets';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', checkJwt, handleSingleFile(FILE_FIELDS.PRODUCTS), assetsController.uploadFile);

    this.router.delete('/', checkJwt, handleSingleFile(FILE_FIELDS.PRODUCTS), assetsController.deleteFile);

    this.router.post('/upload-multiple', checkJwt, handleMultipleFiles(FILE_FIELDS.FILE), assetsController.uploadMultipleFiles);

    this.router.post(
      '/upload-multiple-videos',
      checkJwt,
      handleMultipleFiles(FILE_FIELDS.FILE, filterVideoFilesOnly),
      assetsController.uploadMultipleFiles,
    );
  }
}

export const assetsRoutes = new AssetsRoutes();
