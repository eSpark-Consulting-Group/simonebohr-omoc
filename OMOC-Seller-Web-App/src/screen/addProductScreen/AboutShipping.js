import React from "react";
import { strings } from "../../utils/strings";

function AboutShipping() {
  return (
    <>
      <div className="w-2/3 max-sm:w-full">
        <div className="py-2">
          <p className="text-2xl font-semibold">{strings.PRODUCT_WEIGHT}</p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
          </p>
          <p className="flex items-center gap-2 text-[#616161] text-base font-semibold w-1/2 p-4 rounded-xl border my-7 max-md:w-full">
            <input
              className="text-base font-normal pl-2 w-full"
              type="text"
              placeholder="Stock total"
            />
            lbs
          </p>
        </div>
        <div className="py-2">
          <p className="text-2xl font-semibold">{strings.SHIPPING_SERVICES}</p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
          </p>
          <div className="flex justify-between items-center my-8 w-3/5 max-sm:w-full flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <input type="radio" className="w-6 h-6" />
              <p className="text-base font-medium w-[90%]">
                {strings.DEFAULT_SETTINGS}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input type="radio" className="w-6 h-6" />
              <p className="text-base font-medium w-[90%]">
                {strings.CUSTOM_SHIPPING}
              </p>
            </div>
          </div>
        </div>
        <div className="py-2">
          <p className="text-2xl font-semibold">{strings.SHIPPING_TIME}</p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
          </p>
          <select className="w-full rounded-xl border-[#E0E0E0] border py-4 px-4 my-8">
            <option>Select estimate shipping time</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default AboutShipping;
