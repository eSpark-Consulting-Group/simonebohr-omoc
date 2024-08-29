import React from "react";
import logo_icon from "../assets/icon/logo_icon.svg";
import { strings } from "../utils/strings";
import Barcode from "react-barcode";
import CustomButton from "../component/CustomButton";
import Header from "../component/Header";
import omocIcon from "../assets/icon/web-logo.svg";

const ShippingLabel = () => {
  return (
    <div className="bg-[#F2F2F2] h-screen">
      <div className=" w-full bg-[#fff] fixed top-0 z-20">
        <Header />
      </div>
      <div className="mx-10 xl:mx-52 pt-28">
        <div className="py-5">
          <h1 className="text-[32px] font-bold	">
            {strings.SHIPPING_LABEL_SETTING}
          </h1>
          <p className="text-sm text-[#7A7A7A] mt-3">
            {strings.MANGE_YOUR_SHOP_ORDER}
          </p>
        </div>
        <div className="lg:flex h-full">
          <div className=" bg-[#fff] w-full lg:w-2/3 xl:1/2 h-full">
            <div className="w-3/4 border-dashed border-2 border-black pb-5">
              <div className="w-[100%]  border-b-4">
                <div className="flex justify-center items-center h-20 shadow-md">
                  <img src={omocIcon} />
                  {/* <p>{strings.OMOC}</p> */}
                </div>
                <div className="flex justify-between pt-5 mx-5">
                  <div className="w-[25%]">
                    <p className="text-[#757575] text-xs font-semibold">
                      {strings.INVOIC}
                    </p>
                    <div className="flex justify-between mt-5">
                      <p className="text-[10px] text-[#616161]">
                        {strings.DHL_EXPRESS}
                      </p>
                      <p className="text-[10px] text-[#616161]">
                        {strings.PRICE}
                      </p>
                    </div>
                    <div className="flex justify-between w-[100%] mt-1">
                      <p className="text-xs	text-[#242424] font-semibold">
                        {strings.REGULAR_PACKAGE}
                      </p>
                      <p className="text-xs	text-[#242424] font-semibold">
                        {strings.FEE}
                      </p>
                    </div>
                    <p className="mt-5 font-semibold text-[10px]">
                      {strings.WEIGHT}
                    </p>
                    <p className="mt-1 text-xs font-semibold mb-5">
                      {strings.KG}
                    </p>
                  </div>
                  <div>{/* <Barcode value="002743446141" /> */}</div>
                </div>
              </div>
              <div className="flex justify-between  border-b-4">
                <div className="w-1/2 mx-5">
                  <p className="text-[10px] font-semibold mt-5">{strings.TO}</p>
                  <p className="text-xs font-semibold my-1">
                    {strings.JONNY_DEEP}
                  </p>
                  <p className="text-xs">{strings.ADDRESS}</p>
                  <p className="text-sm mb-5">{strings.NUMBER}</p>
                </div>
                <div className="w-1/2 mt-5">
                  <p className="text-[10px] font-semibold">{strings.FROM}</p>
                  <p className="text-xs font-semibold">{strings.OMOC_STORE}</p>
                  <p className="text-xs">{strings.ADDRESS1}</p>
                  <p className="text-xs">{strings.NUMBER}</p>
                </div>
              </div>
              <div className="flex justify-between mx-5 mt-5">
                <div>
                  <p className="text-[10px] semibold">{strings.PRODUCT}</p>
                  <p className="text-xs semibold mt-1">
                    {strings.HOODIE_HAVANA}
                  </p>
                </div>
                <div className="w-2/6">
                  <p className="text-[10px] font-semibold">{strings.AMOUNT}</p>
                  <p className="text-xs font-semibold">{strings.PCS}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-96 h-48 bg-[#fff] lg:ml-5">
            <p className="text-xl font-semibold m-5">{strings.PAPER_SIZE}</p>
            <div className="flex mx-5">
              <input className="mr-1 h-6 w-6	" type="radio" />
              <label>{strings.A4}</label>
              <input className="ml-5 h-6 w-6 mr-1" type="radio" />
              <label>{strings.A4}</label>
            </div>
            <div className="w-[90%] mx-5 mt-10">
              <CustomButton title="Print Label" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingLabel;
