import { ObjectId } from 'mongoose';

export interface IReports {
  userId: ObjectId;
  role: string;
  entityId: string;
  entityType: string;
  reason: string;
  status: string;
  isDeleted: boolean;
  isResolved: boolean;
  resolvedAt: Date;
  resolvedBy: ObjectId;
  resolvedByRole: string;
  files: any[];
}
