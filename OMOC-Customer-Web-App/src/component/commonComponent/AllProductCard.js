import React from "react";
import tracksuit from "../../assets/images/trackSuit.png";
import { strings } from "../../utils/strings";

const AllProductCard = ({ selected, itemValue, clickEvent }) => {
  console.log(itemValue, itemValue.images[0]);
  return (
    <div>
      <div className="relative h-[310px]" onClick={() => clickEvent()}>
        <img
          className="rounded-[24px] w-full h-full"
          src={itemValue?.images[0]?.url}
        />
        {selected && (
          <input className="absolute top-4 left-4" type="checkbox" />
        )}
      </div>
      <div className="my-2">
        <p className="text-2xl font-medium">{strings.HOODIE_HAVANA}</p>
        <div className="flex gap-2 items-center">
          <p className="text-ld">$98.00</p>
          <del className="text-sm text-[#9E9E9E]">$1799 </del>
          <p>-15%</p>
        </div>
      </div>
    </div>
  );
};

export default AllProductCard;
