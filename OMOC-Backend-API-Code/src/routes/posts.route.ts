import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { postsController } from '../controllers';
import { checkJwt, optionalValidateShop, setPagination, validateRoles } from '../middlewares';
import { ROLES } from '../constants';
import { postsValidations, validate } from '../validations';

class PostsRoutes implements IRoutes {
  public router = Router();
  public path = '/posts';
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
      postsController.createPosts,
    );

    this.router.get('/', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), setPagination, postsController.getAllPosts);

    this.router.put('/', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, postsController.updatePosts);

    this.router.delete('/:postId', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, postsController.deletePosts);

    this.router.post('/like', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, postsController.likePosts);

    this.router.post('/comment', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, postsController.commentOnPosts);

    this.router.get('/comment/:postId', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), setPagination, postsController.getAllCommentsOfPosts);

    this.router.post('/comment-reply', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, postsController.replyComment);

    this.router.post('/comment-like', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), optionalValidateShop, postsController.likeAComment);

    this.router.post(
      '/save-unsave',
      checkJwt,
      validateRoles([ROLES.USER]),
      validate(postsValidations.saveUnSavePosts),
      postsController.saveRemovePosts,
    );

    this.router.get('/favorites', checkJwt, validateRoles([ROLES.USER]), setPagination, postsController.getFavoritePosts);

    this.router.post('/report', checkJwt, validateRoles([ROLES.USER]), validate(postsValidations.reportPost), postsController.reportPost);

    this.router.get('/:postId', checkJwt, validateRoles([ROLES.USER, ROLES.SELLER]), setPagination, postsController.getPostById);
  }
}

export const postsRoute = new PostsRoutes();
