import Joi from "joi";

class TestimonialValidations {
    reportResponseTestimonial =  Joi.object({
        reviewId: Joi.string().hex().length(24).required(),
        response: Joi.string().required(),
    })
}

export const testimonialValidate = new TestimonialValidations();