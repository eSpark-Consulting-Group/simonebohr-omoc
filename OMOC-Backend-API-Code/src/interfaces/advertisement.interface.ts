import { ADD_ACTIONS, ADD_BUDGETS, ADD_DESTINATIONS, ADD_GOAL_TYPES, ADD_POST_TYPES, ADVERTISEMENT_TYPES, GENDERS } from '../constants';

export interface IAdvertisement {
  shopId: string;
  createdBy: string;
  name: string;
  type: ADVERTISEMENT_TYPES;
  postType: ADD_POST_TYPES;
  files: any[];
  goalType: ADD_GOAL_TYPES;
  destinationType: ADD_DESTINATIONS;
  actionType: ADD_ACTIONS;
  entityIds: any[];
  maxTargetAudience: number;
  minTargetAudience: number;
  budgetType: ADD_BUDGETS;
  amount: number;
  startTime: Date;
  endTime: Date;
  industryType: string;
  minAge: number;
  maxAge: number;
  gender: GENDERS;
  isPaymentDone: boolean;
  paymentMethod: string;
  tax: number;
  totalAmountPaid: number;
  isEndDate: boolean;
}
