import React from "react";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";

function ManagementProduct() {
  return (
    <>
      <div>
        <div className="w-2/3 max-md:w-full my-3">
          <p className="text-2xl font-semibold">{strings.PRODUCT_STATUS}</p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.SET_YOUR_PRODUCT_STATUS}
          </p>
          <select className="w-full rounded-xl border-[#E0E0E0] border py-4 px-4 my-7">
            <option>Active</option>
          </select>
        </div>
        <div className="w-2/3 max-md:w-full my-3">
          <p className="text-2xl font-semibold">{strings.STOCK_PRODUCT}</p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
          </p>
          <select className="w-full rounded-xl border-[#E0E0E0] border py-4 px-4 mt-7 mb-4">
            <option>Select Warehouse</option>
          </select>
          <div className="flex items-center gap-4 flex-wrap mb-4">
            {[1, 2, 3].map(() => (
              <p className="rounded-3xl flex items-center gap-2 text-sm font-medium border-2 border-[#EDEDED] py-3 px-4">
                London
                <Icon
                  icon="gg:close-o"
                  color="#101010"
                  width="18"
                  height="18"
                />
              </p>
            ))}
          </div>
          <input
            type="text"
            className="w-full p-4 border border-[#E0E0E0] rounded-xl mb-1"
            placeholder="Stock total"
          />
        </div>
        <div className="w-2/3 max-md:w-full my-3">
          <p className="text-2xl font-semibold mt-8">
            {strings.STOCK_KEEPING_UNIT}
          </p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
          </p>
          <input
            type="text"
            className="w-full p-4 border border-[#E0E0E0] rounded-xl my-7"
            placeholder="ID"
          />
        </div>
        <div className="w-2/3 max-md:w-full my-3">
          <p className="text-2xl font-semibold">
            {strings.CERTAIN_PRICES_FOR_CERTAIN}
          </p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
          </p>
          <select className="w-full rounded-xl border-[#E0E0E0] border py-4 px-4 mt-7">
            <option>Select regions and countries </option>
          </select>
          <p className="flex gap-2 items-center my-3 text-[#0094ff] text-base font-semibold cursor-pointer">
            <span>
              <Icon icon="uil:plus" color="#0094ff" width="25" height="25" />
            </span>
            {strings.ADD_REGIONS_AND_COUNTRIES}
          </p>
        </div>
      </div>
    </>
  );
}

export default ManagementProduct;
