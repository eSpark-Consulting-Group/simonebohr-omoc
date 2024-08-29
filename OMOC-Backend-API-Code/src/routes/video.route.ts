import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { videosController } from '../controllers';
import { checkJwt, optionalValidateShop, setPagination, validateRoles } from '../middlewares';
import { ROLES } from '../constants';
import { postsValidations, validate } from '../validations';

class VideosRoutes implements IRoutes {
  public router = Router();
  public path = '/videos';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      checkJwt,
      validateRoles([ROLES.USER, ROLES.SELLER]),
      optionalValidateShop,
      validate(postsValidations.createPosts),
      videosController.createVideos,
    );

    this.router.get('/', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), setPagination, videosController.getAllVideos);

    this.router.put('/', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, videosController.updateVideos);

    this.router.delete('/:postId', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, videosController.deleteVideos);

    this.router.post('/like', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, videosController.likeVideos);

    this.router.post('/comment', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, videosController.commentOnVideos);

    this.router.get('/comment/:postId', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), setPagination, videosController.getAllCommentsOfVideos);

    this.router.post('/comment-reply', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, videosController.replyComment);

    this.router.post('/comment-like', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, videosController.likeAComment);

    this.router.post(
      '/save-unsave',
      checkJwt,
      validateRoles([ROLES.USER]),
      validate(postsValidations.saveUnSavePosts),
      videosController.saveRemoveVideo,
    );

    this.router.get('/favorites', checkJwt, validateRoles([ROLES.USER]), setPagination, videosController.getFavoriteVideos);

    this.router.post('/report', checkJwt, validateRoles([ROLES.USER]), validate(postsValidations.reportPost), videosController.reportVideo);

    this.router.get('/:videoId', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), setPagination, videosController.getVideoById);
  }
}

export const videoRoute = new VideosRoutes();
