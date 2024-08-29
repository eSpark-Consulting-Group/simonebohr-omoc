import React from "react";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";

function DigitalProductDescription() {
  return (
    <>
      <div className="w-4/6 max-sm:w-full">
        <div className="mb-10 mt-2">
          <p className="text-2xl font-semibold">{strings.PRODUCT_NAME}</p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
          </p>
          <input
            type="text"
            className="w-full p-4 border rounded-xl mt-8 mb-1"
            placeholder={placeholder.EXAMPLE_SHOE_BRANDNAME_TYPE}
          />
          <p className="flex justify-between items-center text-sm font-medium mb-7">
            <span>{strings.TOOLTIPS}</span>
            <span>0/70</span>
          </p>
        </div>
        <div className="mb-10">
          <p className="text-2xl font-semibold">
            {strings.RECOMMENDATION_CATEGOIE}
          </p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
          </p>
          <div className="flex items-center gap-3 mt-8">
            <input type="radio" name="categoriesProduct" className="w-6 h-6" />
            <p className="text-base font-medium">
              {strings.FASHION_WOMAN_SNEAKERS}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-7">
            <input type="radio" name="categoriesProduct" className="w-6 h-6" />
            <p className="text-base font-medium">
              {strings.FASHION_MAN_SNEAKERS}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-7">
            <input type="radio" name="categoriesProduct" className="w-6 h-6" />
            <p className="text-base font-medium">
              {strings.FASHION_CHILD_SNEAKERS}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-7">
            <input type="radio" name="categoriesProduct" className="w-6 h-6" />
            <p className="text-base font-medium">
              {strings.FASHION_WOMAN_HEELS}
            </p>
          </div>
        </div>
        <div className="mb-10">
          <p className="text-2xl font-semibold">{strings.CATEGORIE}</p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
          </p>
          <select className="w-full rounded-xl border-[#E0E0E0] border py-4 px-4 mt-8">
            <option>Choose Categorie</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="text-2xl font-semibold">{strings.TAG_PRODUCT}</p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
          </p>
          <div className="mt-8 border-2 rounded-xl p-3 mb-1">
            <p className="font-semibold text-base mb-2">
              {strings.ADD_TAG_MAX}
            </p>
            <div className="flex items-center gap-4 py-2 flex-wrap">
              {[1, 2, 3].map(() => (
                <p className="rounded-3xl flex items-center gap-1 text-sm font-medium bg-[#F5F5F5] py-2 px-3">
                  Jeans
                  <Icon
                    icon="iconamoon:close-light"
                    color="#101010"
                    width="20"
                    height="20"
                  />
                </p>
              ))}
            </div>
          </div>
          <p className="text-sm font-medium text-[#9E9E9E]">
            <span className="text-black">{strings.SUGGESTED}</span> fashion,
            cheap, tshirt
          </p>
        </div>
      </div>
    </>
  );
}

export default DigitalProductDescription;
