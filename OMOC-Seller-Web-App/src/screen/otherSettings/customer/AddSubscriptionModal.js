import React from "react";
import { strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import Modal from "react-modal";
import { auto } from "@popperjs/core";

const subscriptionStyles = {
  content: {
    left: auto,
    right: "27%",
    width: "46%",
  },
};
const AddSubscriptionModal = ({ closeModal, openNewOffer, isOpen }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={subscriptionStyles}
        contentLabel="Change Solution Modal"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {strings.ADD_NEW_GENERAL_SUBSCRIPTION}
          </h1>
          <Icon
            className=" cursor-pointer"
            onClick={closeModal}
            width="30"
            icon="ion:close-outline"
          />
        </div>
        <div className="flex justify-between items-center mr-1 my-5 ">
          <p className="text-xl font-semibold">
            {strings.SUBSCRIPTION_DETAILS_1}
          </p>
          <Icon icon="fluent:ios-arrow-24-filled" rotate={1} />
        </div>
        <div className="border-b-2 pb-4">
          <div className="grid grid-cols-2 gap-4 ">
            <p className="col-span-1 font-medium	">{strings.PRODUCT}</p>
            <p className="col-span-1 font-medium	">{strings.PRODUCT_TYPE}</p>
          </div>
          <div className="grid grid-cols-2 my-5 gap-4">
            <select className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2 text-[#9E9E9E]">
              <option className="text-[#9E9E9E]">Choose Product...</option>
            </select>
            <select className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2">
              <option>Physical</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <p className="col-span-1 font-medium	">{strings.PRODUCT_PRICE}</p>
            <p className="col-span-1 font-medium	">{strings.FREQUENCY}</p>
          </div>
          <div className="grid grid-cols-2 my-5 gap-4">
            <select className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2 text-[#9E9E9E]">
              <option className="text-[#9E9E9E]">
                Write the price of products...
              </option>
            </select>
            <select className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2">
              <option>Choose Frequency...</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <p className="col-span-1 font-medium	">
              {strings.NEXT_BILLING_DATE}
            </p>
            <p className="col-span-1 font-medium	">
              {strings.SUBSCRIPTION_STATUS}
            </p>
          </div>
          <div className="grid grid-cols-2 my-5 gap-4">
            <select className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2 text-[#9E9E9E]">
              <option className="text-[#9E9E9E]">Choose a date...</option>
            </select>
            <select className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2">
              <option>Active</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center mr-1 my-5 ">
          <p className="text-xl font-semibold">
            {strings.SHIPPING_INFORMATION}
          </p>
          <Icon icon="fluent:ios-arrow-24-filled" rotate={1} />
        </div>
        <div className="border-b-2 pb-4">
          <div className="grid grid-cols-2 gap-4 ">
            <p className="col-span-1 font-medium	">{strings.SHIPPING_NUMBER}</p>
            <p className="col-span-1 font-medium	">{strings.SHIPPING_COST}</p>
          </div>
          <div className="grid grid-cols-2 my-5 gap-4">
            <select className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2 text-[#9E9E9E]">
              <option className="text-[#9E9E9E]">
                Write the price of products...
              </option>
            </select>
            <select className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2">
              <option>Write the price of products...</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 ">
            <p className="col-span-1 font-medium	">{strings.SHIPPING_METHOD}</p>
          </div>
          <div className="grid grid-cols-1 my-5 gap-4">
            <select className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2 text-[#9E9E9E]">
              <option className="text-[#9E9E9E]">Choose Product...</option>
            </select>
          </div>
        </div>
        <div className="border-b-2 pb-4">
          <div className="flex justify-between items-center mr-1 my-5 ">
            <p className="text-xl font-semibold">
              {strings.SUBSCRIPTION_OFFER_3}
            </p>
            <Icon icon="fluent:ios-arrow-24-filled" rotate={1} />
          </div>
          <div
            className="flex items-center gap-3 text-[#0094FF] cursor-pointer"
            onClick={openNewOffer}
          >
            <Icon width="20" icon="mi:add" rotate={1} />
            <p className="font-semibold">{strings.ADD_SUBSCRIPTION_OFFER}</p>
          </div>
        </div>
        <div className="flex gap-5 justify-end my-5">
          <button className="border-2 px-8 py-4 border-[#0094FF] rounded-[30px]">
            <p className="text-[#0094FF] font-semibold">{strings.CANCEL}</p>
          </button>
          <button className="border-2 px-8 py-4 border-[#0094FF] bg-[#0094FF] rounded-[30px]">
            <p className="text-white font-semibold">{strings.CONFIRM}</p>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddSubscriptionModal;
