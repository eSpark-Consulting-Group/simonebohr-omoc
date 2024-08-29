import React from "react";
import trackSuit from "../../assets/images/trackSuit.png";
import { Icon } from "@iconify/react";
import { strings } from "../../utils/strings";
import { useNavigate } from "react-router-dom";

const PriceItemCard = ({ discount, items }) => {
  // console.log("DATA",items)
  const navigate = useNavigate();
  return (
    <div>
      <img
        className="rounded-lg my-3 w-full h-[294px] object-cover bg-[#F5F5F5]"
        src={items?.images?.length ? items?.images[0]?.url : trackSuit}
        onClick={() => {
          navigate(`/Detail-Product/${items._id}`);
        }}
      />
      <div className="flex items-center">
        <Icon icon="bitcoin-icons:verify-filled" color="#3d9ffb" />
        <p className="text-sm font-medium">{items?.addedBy?.name}</p>
      </div>
      <p className="text-2xl font-medium landing-7">{items?.name}</p>
      <div className="flex items-center gap-1">
        <p className="text-lg ">${items?.price}</p>
        {discount && (
          <>
            <del className="text-xs text-[#E0E0E0]">$1799</del>
            <p className="text-xs">-15%</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PriceItemCard;
