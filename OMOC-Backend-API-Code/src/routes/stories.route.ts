import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { storiesController } from '../controllers';
import { checkJwt, setPagination, validateRoles } from '../middlewares';
import { FILE_FIELDS, ROLES } from '../constants';
import { handleMultipleFiles } from '../middlewares/handleFiles';
import { storiesValidations, validate } from '../validations';
import { storiesHelper } from '../helpers';

class StoriesRoutes implements IRoutes {
  public router = Router();
  public path = '/stories';
  private storyRoles = [ROLES.USER, ROLES.SELLER];
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      checkJwt,
      validateRoles(this.storyRoles),
      handleMultipleFiles(FILE_FIELDS.FILE),
      validate(storiesValidations.createStory),
      storiesController.createStory,
    );

    this.router.get('/', checkJwt, validateRoles(this.storyRoles), setPagination, storiesController.getUsersHavingStories);

    this.router.post('/view', checkJwt, validateRoles(this.storyRoles), storiesController.viewStories);

    this.router.post(
      '/comment',
      checkJwt,
      validateRoles(this.storyRoles),
      validate(storiesValidations.commentOnStory),
      storiesController.commentOnStories,
    );

    this.router.post(
      '/comment/like',
      checkJwt,
      validateRoles(this.storyRoles),
      validate(storiesValidations.likeAComment),
      storiesController.likeAComment,
    );

    this.router.post(
      '/comment-reply',
      checkJwt,
      validateRoles(this.storyRoles),
      validate(storiesValidations.replayComment),
      storiesController.replyComment,
    );

    this.router.get('/comment/:storyId', checkJwt, validateRoles(this.storyRoles), setPagination, storiesController.getAllCommentsOfStory);

    this.router.get('/my-stories', checkJwt, validateRoles(this.storyRoles), setPagination, storiesController.getMyStories);

    this.router.get('/:userId', checkJwt, validateRoles(this.storyRoles), setPagination, storiesController.getUserStoryByUserId);
  }
}

export const storiesRoutes = new StoriesRoutes();
