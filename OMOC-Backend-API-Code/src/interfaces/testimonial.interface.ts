import { ObjectId } from "mongoose";

export interface ITestimonialResponse {
    userId: ObjectId;
    shopId: ObjectId;
    productId: ObjectId;
    reviewId: ObjectId;
    response: string;
    status: string
}