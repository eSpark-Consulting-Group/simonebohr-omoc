import React, { useState } from "react";
import "../../assets/commonStyling/commonStyling.css";
import { strings } from "../../utils/strings";
import { useNavigate } from "react-router-dom";
import tShirt from "../../assets/images/tShirtWishlist.png";
import { Icon } from "@iconify/react";
const WishListCard = ({
  path,
  productName,
  count,
  id,
  image,
  isDetail,
  activeClass,
  setWishId,
  isCheck,
  isPrivate,
}) => {
  // console.log(data[0].productName);
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div
      onClick={() => {
        navigate(path, { state: { id: id, name: productName } });
        setWishId && setWishId(id);
      }}
      className={`${
        isDetail ? "h-[200px] cursor-pointer" : "h-[310px]"
      } ${"relative my-3 bg-black rounded-xl"} ${activeClass}`}
    >
      <img
        className=" opacity-50 h-full w-full rounded-xl"
        src={image ? image : tShirt}
      />
      <div className="items-center bg-red-400 mt-10">
        {isCheck && (
          <input type="checkbox" className="absolute top-2 left-3 " />
        )}
        {isPrivate && (
          <div className="h-8 w-24 bg-white absolute top-2 left-10 rounded-xl ">
            <div className="flex items-center justify-center mt-1">
              <Icon icon="tabler:lock" />
              <p>{strings.PRIVATE}</p>
            </div>
          </div>
        )}
      </div>
      {!isDetail && (
        <Icon
          className="cursor-pointer absolute top-2 right-2"
          icon="ph:dots-three-vertical-bold"
          color="white"
          onClick={() => {
            setShowInfo(!showInfo);
          }}
        />
      )}
      {showInfo && (
        <div className="bg-white p-4 rounded-xl shadow-lg mt-3 absolute right-6 top-2">
          <p className="font-medium text-xs text-[#C80000]">
            {strings.REPORT_PRODUCT}
          </p>
          <p className="font-medium text-xs my-3">{strings.SHARE_PRODUCT}</p>
          <p className="font-medium text-xs ">{strings.COPY_LINK}</p>
        </div>
      )}
      <p className="absolute bottom-10 left-3 text-[32px] font-medium text-white">
        {productName}
      </p>
      <p className="absolute bottom-4 left-3 text-[#E0E0E0]">
        {count ? count : 0} Product
      </p>
    </div>
  );
};

export default WishListCard;
