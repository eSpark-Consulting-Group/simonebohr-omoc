import { RequestHandler } from 'express';
import { calculateIsNext, getValuesFromArray, handleResponse, logger } from '../utils';
import { ICustomRequest } from '../interfaces';
import { BusinessInfos, Products, UserFeedHistory, UserFollows, UserInfos, Users, Vouchers, WishLists } from '../models';
import { CLOUD_FOLDERS, EXPLORE_TYPES, FOLLOW_STATUS, HTTP_STATUS, MODEL_NAMES, PAGINATION, VOUCHER_TYPES } from '../constants';
import { commonHelper, postsHelper, userHelper, wishListHelper } from '../helpers';
import { AlreadyExistsError, ApiError, NotFoundError, UnprocessableEntityError } from '../errors';
import { uploadService } from '../services';
import { userHistoryRepo, userRepo } from '../repository';
import { Types, isValidObjectId } from 'mongoose';
import { userFollowRepo } from '../repository/userFollows.repository';

class UserController {
  constructor() {}
  getUserProfile: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const userFound = await Users.findOne({ _id: userDetails?.id, isActive: true }).select(
        'email name email phone bio language profileImg userName',
      );

      const response = await userHelper.prepareProfileResponse(userFound);

      return res.status(HTTP_STATUS.OK).json(handleResponse('User Profile Found', response));
    } catch (err) {
      logger.error(`UserController :: getUserProfile :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updateUserProfile: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { name, bio, language, password, interests, phone, email, userName } = req?.body;
      const phoneNumber = phone ? `${phone}` : undefined;
      const userFound = await Users.findOne({ _id: userDetails?.id, isActive: true });
      if (!userFound) {
        throw new NotFoundError('User Not Found');
      }
      // Updating user profile
      if (req?.file) {
        //! Delete Old Profile Image Also
        const profileImg = await uploadService.uploadFile(req?.file, CLOUD_FOLDERS.PROFILES);
        req.body.profileImg = (profileImg as { url: string })?.url ?? '';
      }
      if (phoneNumber) {
        const checkPhoneExists = await Users.findOne({
          phone: phoneNumber,
          isActive: true,
          _id: {
            $ne: userFound?.id,
          },
        }).select('id phone');
        if (checkPhoneExists) {
          throw new AlreadyExistsError('phone number is already in use by another user');
        }
      }

      if (email) {
        const checkEmailExists = await Users.findOne({
          email,
          isActive: true,
          _id: {
            $ne: userFound?.id,
          },
        }).select('id email');
        if (checkEmailExists) {
          throw new AlreadyExistsError('email is already in use by another user');
        }
      }

      const updatedUser = commonHelper.assignValues(userFound, {
        name,
        bio,
        language,
        password,
        ...(phoneNumber && { phone: phoneNumber }),
        userName,
        ...(req.body.profileImg && { profileImg: req.body.profileImg }),
      });
      await updatedUser.save();

      if (interests?.length) {
        const userInfoFound = await UserInfos.findOne({ userId: userFound?.id });
        if (!userInfoFound) {
          await UserInfos.create({ userId: userFound?.id, interests });
        } else {
          userInfoFound.interests = interests;
          await userInfoFound?.save();
        }
      }

      return res.status(HTTP_STATUS.OK).json(handleResponse('User Profile Updated Successfully'));
    } catch (err) {
      logger.error(`UserController :: updateUserProfile :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getUserInterests: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const userInterests = await userHelper.getUserInterests(userDetails?.id as string);

      return res.status(200).json(handleResponse('User interests Found', { interests: userInterests }));
    } catch (err) {
      logger.error(`UserController :: getUserInterests :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getUserSuggestions: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0, text } = req?.query;

      const userInterests = await UserInfos.findOne({ userId: userDetails?.id });
      const interests = userInterests?.interests || [];

      const [[count], userSuggestions] = await userRepo.getUserSuggestions(
        userDetails?.id as string,
        interests,
        {
          pageSize: +pageSize,
          page: +page,
        },
        text as string,
      );

      const response = userSuggestions
        .map((data: any) => {
          const { userDetails } = data;
          return {
            id: userDetails?._id,
            name: userDetails?.name,
            profileImg: userDetails?.profileImg,
            userName: userDetails?.userName,
            email: userDetails?.email,
            phone: userDetails?.phone,
            followers: data.followCount || 0,
            isFollowing: data?.isFollowing || false,
          };
        })
        ?.filter(data => data?.name);

      return res.status(200).json(
        handleResponse('User interests Found', {
          count: (count as any)?.totalCount || 0,
          usersList: response,
        }),
      );
    } catch (err) {
      logger.error(`UserController :: getUserSuggestions :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  followUser: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { userId } = req.body;
      if (!userId || !isValidObjectId(userId)) {
        throw new UnprocessableEntityError('Please validate userId');
      }
      const followPresent = await UserFollows.findOne({
        followerId: userDetails?.id,
        followingId: userId,
      });

      if (followPresent && followPresent.status === FOLLOW_STATUS.ACTIVE) {
        throw new AlreadyExistsError('You are already following this user');
      }

      if (followPresent) {
        followPresent.status = FOLLOW_STATUS.ACTIVE;
        (followPresent as any).unFollowDateTime = null;
        await followPresent.save();
      } else {
        await UserFollows.create({ followerId: userDetails?.id, followingId: userId });
      }

      return res.status(HTTP_STATUS.OK).json(handleResponse('Following user successfully'));
    } catch (err) {
      logger.error(`UserController :: followUser :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getUserProfileById: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;

      if (!isValidObjectId(req?.params?.userId)) {
        throw new UnprocessableEntityError('Please validate userId');
      }
      const userId = new Types.ObjectId(req?.params?.userId);
      const userFound = await Users.findOne({ _id: userId, isActive: true });
      if (!userFound) {
        throw new NotFoundError('User Not Found');
      }
      const isCurrentUserFollowing = await UserFollows.countDocuments({ followerId: userDetails?.id, followingId: userFound?.id });

      const userInfos = await UserInfos.findOne({ userId });
      let otherUserWishList: any = [];

      if (!userInfos?.isPrivateAccount || isCurrentUserFollowing) {
        const wishLists = await WishLists.find({ isDeleted: false, userId })
          .populate({
            path: 'productIds',
            select: 'images',
          })
          .lean();
        otherUserWishList = wishListHelper.prepareWishListResponse(wishLists);
      }
      const response = {
        userDetails: {
          name: userFound?.name,
          profileImg: userFound?.profileImg,
        },
        isCurrentUserFollowing: !!isCurrentUserFollowing,
        otherUserWishList,
      };
      const [countResult] = await userFollowRepo.getFollowCount(userId);
      // Save to history if present
      if (req?.query?.isSearched === 'true') {
        await userHistoryRepo.saveUserFeedHistory({
          userId: userDetails?.id as string,
          type: EXPLORE_TYPES.USERS,
          entityId: userId,
        });
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('User Found successfully', { ...response, ...countResult }));
    } catch (err) {
      logger.error(`UserController :: getUserProfileById :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  unFollowUser: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { userId } = req.body;
      if (!userId || !isValidObjectId(userId)) {
        throw new UnprocessableEntityError('Please validate userId');
      }
      const followPresent = await UserFollows.findOne({
        followerId: userDetails?.id,
        followingId: userId,
        status: FOLLOW_STATUS.ACTIVE,
        unFollowDateTime: null,
      });

      if (!followPresent) {
        return res.status(200).json(handleResponse('Follow relationship not found or already ended.'));
      }

      followPresent.status = FOLLOW_STATUS.INACTIVE;

      followPresent.unFollowDateTime = new Date();

      await followPresent.save();

      return res.status(HTTP_STATUS.OK).json(handleResponse('UnFollow  user successfully'));
    } catch (err) {
      logger.error(`UserController :: unFollowUser :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getFollowingUsers: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0 } = req?.query;

      const where = {
        followerId: userDetails?.id,
        status: FOLLOW_STATUS.ACTIVE,
      };
      const followingCount = UserFollows.countDocuments(where);
      const userFollowing = UserFollows.find(where).populate('followingId', '-password').limit(+pageSize).skip(+page);

      const [following, count] = await Promise.all([userFollowing, followingCount]);
      const followingList = following?.map((data: any) => {
        return data?.followingId;
      });
      return res
        .status(HTTP_STATUS.OK)
        .json(handleResponse('User Found successfully', { count, isNext: calculateIsNext(count, +page, +pageSize), followingList }));
    } catch (err) {
      logger.error(`UserController :: getFollowingUsers :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  updateUserInfo: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const { isChatTourCompleted } = req?.body;

      const userInfo = await UserInfos.findOne({ userId: userDetails?.id });
      if (!userInfo) {
        throw new NotFoundError('User Infos not found');
      }
      userInfo.isChatTourCompleted = !!isChatTourCompleted;
      await userInfo.save();
      return res.status(HTTP_STATUS.OK).json(handleResponse('User Info Updated Successfully'));
    } catch (err) {
      logger.error(`UserController :: updateUserInfo :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getUserInfos: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const userInfo = await UserInfos.findOne({ userId: userDetails?.id });
      return res.status(HTTP_STATUS.OK).json(handleResponse('User Info Found Successfully', userInfo));
    } catch (err) {
      logger.error(`UserController :: getUserInfos :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  getAllUserVouchers: RequestHandler = async (req, res, next) => {
    try {
      const { pageSize = PAGINATION.PAGE_SIZE, page = 0 } = req?.query;
      const userDetails = (req as ICustomRequest)?.user;
      const { productIds, type = VOUCHER_TYPES.PRODUCT } = req?.body;

      const getProductShops = await Products?.find({
        _id: productIds?.map((id: string) => new Types.ObjectId(id)),
      });

      const shopIds = getProductShops?.map(product => new Types.ObjectId(product?.addedBy));

      const vouchers = await Vouchers?.find({
        shopId: { $in: shopIds },
        type: VOUCHER_TYPES.PRODUCT,
        isDeleted: false,
        endDate: { $gte: new Date() },
        startDate: { $lte: new Date() },
        forAllBuyers: true,
      });
      // Add Check for followers

      return res.status(HTTP_STATUS.OK).json(
        handleResponse('Vouchers Found', {
          // length: vouchers,
          vouchers,
        }),
      );
    } catch (err) {
      logger.error(`VoucherController :: getAllUserVouchers :: ${(err as Error)?.message}`);
      return next(err);
    }
  };

  deleteAccount: RequestHandler = async (req, res, next) => {
    try {
      const userDetails = (req as ICustomRequest)?.user;
      const userFound = await Users.findOne({ _id: new Types.ObjectId(userDetails?.id), isActive: true });
      if (userFound) {
        userFound.isActive = false;
        userFound?.save();
      }
      return res.status(HTTP_STATUS.OK).json(handleResponse('Account Deleted'));
    } catch (err) {
      logger.error(`VoucherController :: deleteAccount :: ${(err as Error)?.message}`);
      return next(err);
    }
  };
}

export const userController = new UserController();
