import React, { useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import { Switch } from "@mui/material";
import { placeholder, strings } from "../../utils/strings";

function CustomOrderSettiing({ orderSetting, setOrderSetting }) {
  const [switchValue, setSwitchValue] = useState(false);
  return (
    <>
      <Modal
        isOpen={orderSetting}
        onRequestClose={() => {
          setOrderSetting(false);
        }}
        style={{
          content: {
            left: "auto",
            right: "25%",
            width: "50%",
            borderRadius: "15px",
            height: "auto",
          },
        }}
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              {strings.CUSTOM_ORDER_SETTING}
            </h3>
            <button
              onClick={() => {
                setOrderSetting(false);
              }}
            >
              <Icon
                icon="system-uicons:cross"
                style={{ width: 24, height: 24 }}
              />
            </button>
          </div>
          <div className="my-6">
            <div className="flex items-baseline mb-6 gap-6">
              <p className="text-base font-medium w-3/12">
                {strings.ENABLE_PRE_ORDER}
              </p>
              <div className="w-[70%]">
                <Switch onChange={(e) => setSwitchValue(e.target.checked)} />
                <p className="pl-3 text-[#9E9E9E] text-base font-normal">
                  {strings.UNCHECK_THIS_OPTION}
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-baseline mb-6">
              <p className="text-base font-medium w-3/12">
                {strings.DEFAULT_ADD_TO_CART}
              </p>
              <div className="pl-3 w-[70%]">
                <input
                  type="text"
                  className="py-4 px-3 border rounded-xl w-full"
                  placeholder={placeholder.PRE_ORDER_NOW}
                />
                <p className="text-[#9E9E9E] text-base font-normal">
                  {strings.THIS_TEXT_WILL_BE_REPLACED}
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-baseline mb-6">
              <p className="text-base font-medium w-3/12">
                {strings.AVAILABLE_QUANTITY}
              </p>
              <div className="pl-3 w-[70%]">
                <input
                  type="text"
                  className="py-4 px-3 border rounded-xl w-full"
                  placeholder={placeholder.WRITE_THE_NUMBER_OF_PRODUCT}
                />
              </div>
            </div>
            <div className="flex gap-6 items-baseline mb-6">
              <p className="text-base font-medium w-3/12">
                {strings.AVAILABLE_DATE}
              </p>
              <div className="pl-3 w-[70%] flex gap-2">
                <input
                  type="date"
                  className="py-4 px-3 border rounded-xl w-full"
                  placeholder={placeholder.WRITE_THE_NUMBER_OF_PRODUCT}
                />
                <input
                  type="time"
                  className="py-4 px-3 border rounded-xl w-1/2"
                  placeholder={placeholder.WRITE_THE_NUMBER_OF_PRODUCT}
                />
              </div>
            </div>
            <div className="flex gap-6 items-center mb-6">
              <p className="text-base font-medium w-3/12">
                {strings.MANAGE_DISCOUNT}
              </p>
              <div className="pl-3 w-[70%]">
                <input
                  type="checkbox"
                  className="w-5 h-5 mt-2"
                  placeholder={placeholder.WRITE_THE_NUMBER_OF_PRODUCT}
                />
              </div>
            </div>
            <div className="flex gap-6 items-center mb-6">
              <p className="text-base font-medium w-3/12">
                {strings.DISCOUNT_TYPE}
              </p>
              <div className="pl-3 w-[70%]">
                <select className="py-4 px-3 border rounded-xl w-full">
                  <option>Fixed</option>
                </select>
              </div>
            </div>
            <div className="flex gap-6 items-center mb-6">
              <p className="text-base font-medium w-3/12">
                {strings.DISCOUNT_PRICE_PERCENTAGE}
              </p>
              <div className="pl-3 w-[70%]">
                <input
                  type="text"
                  className="py-4 px-3 border rounded-xl w-full"
                  placeholder={placeholder.WRITE_DOWN_YOUR_PRICE_PERCENTAGE}
                />
              </div>
            </div>
            <div
              className={`${
                switchValue ? "" : "hidden"
              } flex gap-6 items-center mb-6`}
            >
              <p className="text-base font-medium w-3/12">
                {strings.DISCOUNT_TYPE}
              </p>
              <div className="pl-3 w-[70%]">
                <select className="py-4 px-3 border rounded-xl w-full">
                  <option>Fixed</option>
                </select>
              </div>
            </div>
            <div
              className={`${
                switchValue ? "" : "hidden"
              } flex gap-6 items-center mb-6`}
            >
              <p className="text-base font-medium w-3/12">
                {strings.DISCOUNTED_PRICE_PERCENTAGE}
              </p>
              <div className="pl-3 w-[70%]">
                <input
                  type="text"
                  className="py-4 px-3 border rounded-xl w-full"
                  placeholder={placeholder.WRITE_DOWN_YOUR_PRICE}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="rounded-3xl py-3 w-44 px-10 bg-[#0094FF] text-white text-base font-semibold">
              {strings.SAVE}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CustomOrderSettiing;
