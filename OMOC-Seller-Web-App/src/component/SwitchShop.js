import React from "react";

import rigth_icon from "../assets/icon/right_icon.svg";
import flash_icon from "../assets/icon/flash_icon.svg";
import logoImg from "../assets/image/logoImg.png";
import { strings } from "../utils/strings";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shopDetails } from "../Store/Slices/DashboardSlice";
const shopNameData = [
  {
    image: logoImg,
    shopName: "Omoc Shop 1",
    isSelected: rigth_icon,
    show: true,
  },
  {
    image: logoImg,
    shopName: "Omoc Shop 2",
    isSelected: rigth_icon,
    show: false,
  },
];

const SwitchShop = ({ onSelectShop }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shopsList } = useSelector((state) => state.dashboard.dashboard);
  const { shopInfo } = useSelector((state) => state.dashboard);
  const handleShopClick = async (shop) => {
    await dispatch(shopDetails(shop));
  };
  return (
    <div className="flex w-80 justify-center absolute z-10 top-10 max-sm:w-72">
      <div className="w-full bg-[#fff] rounded-xl shadow-xl">
        <div
          className="flex justify-between px-3 h-[63px] items-center "
          style={{ borderBottomWidth: 1, borderBottomColor: "#0094FF0D" }}
        >
          <p className="font-semibold text-base">{strings.SWITCH_SHOP}</p>
          <button onClick={() => navigate("/Seller-enqury")}>
            <p className="font-medium text-sm	">{strings.ADD_NEW_SHOP}</p>
          </button>
        </div>
        <div className="overflow-auto max-h-[200px] ">
          {shopsList &&
            shopsList.map((val, index) => {
              return (
                <>
                  <div
                    className="flex items-center justify-between py-2.5 px-4 cursor-pointer"
                    key={index}
                    onClick={() => handleShopClick(val)}
                  >
                    <div className="flex items-center gap-2 ">
                      <img src={logoImg} className="w-9 h-9" />
                      <p>{val.name}</p>
                    </div>
                    {shopInfo._id == val._id && <img src={rigth_icon} />}
                  </div>
                </>
              );
            })}
        </div>
        <div
          style={{ borderTopWidth: 1}}
          className=" h-14 flex  w-full"
        >
          <button
            className="w-full flex justify-center items-center gap-3"
            // style={{ borderRightWidth: 1, marginTop: 10, marginBottom: 10 }}
          >
            <img src={flash_icon} />
            <p className="text-center text-[#9039FF]">{strings.TEST_MODE}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwitchShop;
