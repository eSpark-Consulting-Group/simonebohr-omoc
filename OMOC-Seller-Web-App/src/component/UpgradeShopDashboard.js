import React from "react";
import back_icon from "../assets/icon/back_icon.svg";
import { strings } from "../utils/strings";
import "../assets/CommonStyling/CommonStyling.css"
import { Icon } from '@iconify/react';

const UpgradeShopDashboard = () => {
  return (
    <div className="justify-end mt-24 md:me-4">
      <div className="w-full bg-[#fff] mr-6 p-4 mb-4 rounded-2xl">
        <div className="flex justify-between">
          <p className="text-base font-semibold">Upgrade Shop</p>
          <Icon icon="mingcute:down-line" color="#969696" width="24" height="24" />
        </div>
        <div className="">
          <ul className="progressBar">
            <li className="activeProgress"><span></span><p className="activeLine text-sm font-medium">{strings.SHOP_NAME}</p></li>
            <li className="activeProgress"><span></span><p className="activeLine text-sm font-medium">{strings.PERSONALIZE_STORE}</p></li>
            <li className="activeProgress"><span></span><p className="text-sm font-medium">{strings.ADD_YOUR_FIRST_PRODUCT} </p></li>
            <li className=""><span></span><p className="text-sm font-medium"> {strings.DO_YOUR_FIRST_POST} </p></li>
            <li className=""><span></span><p className="text-sm font-medium">{strings.CONNECT_WITH_SHIPPING_PROVIDER}</p></li>
            <li className=""><span></span><p className="text-sm font-medium">{strings.DO_YOUR_FIRST_STREAM}</p></li>
          </ul>
        </div>
        <div className="flex justify-between">
          <p>{strings.READY_TO_SELL}</p>
          <p>20%</p>
        </div>
        <input className="w-[87%]" type="range" />
        <p>Need 80% again to ready to sell.</p>
      </div>
    </div>
  );
};

export default UpgradeShopDashboard;
