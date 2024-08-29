import { Router } from 'express';
import { IRoutes } from '../interfaces';
import { userController, searchController } from '../controllers';
import { checkJwt, setPagination, validateRoles } from '../middlewares';
import { FILE_FIELDS, ROLES } from '../constants';
import { UserValidations, validate } from '../validations';
import { handleSingleFile } from '../middlewares/handleFiles';

class UserRoutes implements IRoutes {
  public router = Router();
  public path = '/user';
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/profile', checkJwt, validateRoles([ROLES.USER]), userController.getUserProfile);

    this.router.put(
      '/profile',
      checkJwt,
      validateRoles([ROLES.USER]),
      handleSingleFile(FILE_FIELDS.PROFILE),
      validate(UserValidations.updateProfile),
      userController.updateUserProfile,
    );

    this.router.get('/user-info', checkJwt, validateRoles([ROLES.USER]), userController.getUserInfos);

    this.router.put('/user-info', checkJwt, validateRoles([ROLES.USER]), userController.updateUserInfo);

    this.router.get('/interests', checkJwt, validateRoles([ROLES.USER]), userController.getUserInterests);

    // Getting suggestions for user to follow
    this.router.get('/suggestions', checkJwt, validateRoles([ROLES.USER]), setPagination, userController.getUserSuggestions);

    // Follow any user
    this.router.post('/follow', checkJwt, validateRoles([ROLES.USER]), userController.followUser);

    this.router.post('/un-follow', checkJwt, validateRoles([ROLES.USER]), userController.unFollowUser);

    this.router.get('/profile/:userId', checkJwt, validateRoles([ROLES.USER]), userController.getUserProfileById);

    this.router.get('/following', checkJwt, validateRoles([ROLES.USER]), userController.getFollowingUsers);

    this.router.get('/search-feed', checkJwt, validateRoles([ROLES.USER]), searchController.searchFeeds);

    this.router.post('/explore', checkJwt, setPagination, validateRoles([ROLES.USER]), searchController.explore);

    this.router.get('/explore-search', checkJwt, setPagination, validateRoles([ROLES.USER]), searchController.exploreSearchList);

    this.router.get('/feed-history', checkJwt, setPagination, searchController.getFeedSearchHistory);

    this.router.delete('/feed-history', checkJwt, searchController.deleteSearchHistory);

    this.router.get('/search-trending', checkJwt, setPagination, searchController.getTrendingList);

    this.router.post('/get-vouchers', checkJwt, setPagination, userController.getAllUserVouchers);

    this.router.delete('/', checkJwt, userController.deleteAccount);
  }
}

export const userRoutes = new UserRoutes();
