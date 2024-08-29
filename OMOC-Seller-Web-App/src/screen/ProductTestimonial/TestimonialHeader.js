import React from "react";
import { strings } from "../../utils/strings";
import { NavLink } from "react-router-dom";
import "../../assets/CommonStyling/CommonStyling.css"

function TestimonialHeader() {
  return (
    <section className="rounded-xl bg-white mb-4 mt-6 p-4 w-max">
      <div className="flex justify-around items-center invoiceHeader-class w-max">
        <p className="!w-[200px] text-center"><NavLink to="/Product/Testimonial/All-testimonial" defaultChecked={true}>{strings.ALL_TESTIMONIAL}</NavLink></p>
        <p className="!w-[180px] text-center"><NavLink to="/Product/Testimonial/Need-to-action">{strings.NEED_TO_ACTION}</NavLink></p>
        <p className="!w-[200px] text-center"><NavLink to="/Product/Testimonial/Approved-testimonial">{strings.APPROVED_TESTIMONIAL}</NavLink></p>
        <p className="!w-[180px] text-center"><NavLink to="/Product/Testimonial/complain">{strings.COMPLAIN}</NavLink></p>
      </div>
    </section>
  );
}

export default TestimonialHeader;