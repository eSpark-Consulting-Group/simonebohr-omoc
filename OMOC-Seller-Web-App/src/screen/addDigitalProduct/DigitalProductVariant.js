import React from "react";
import { strings } from "../../utils/strings";

function DigitalProductVariant() {
  return (
    <>
      <div>
        <div className="flex justify-between items-center gap-5 flex-wrap mb-7">
          <div className="w-2/3 max-sm:w-full">
            <p className="text-2xl font-semibold">
              {strings.ADD_PRODUCT_VARIANT}
            </p>
            <p className="text-sm text-[#404040] font-medium">
              {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
            </p>
          </div>
          <button className="border-2 border-[#0094FF] text-[#0094FF] text-base font-semibold rounded-3xl py-2.5 px-4">
            {strings.ADD_PRODUCT_VARIANT}
          </button>
        </div>
      </div>
    </>
  );
}

export default DigitalProductVariant;
