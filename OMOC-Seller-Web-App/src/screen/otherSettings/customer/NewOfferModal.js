import { Icon } from "@iconify/react";
import React from "react";
import { placeholder, strings } from "../../../utils/strings";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "33%",
  },
};
const NewOfferModal = ({ closeModal, isOpen }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{strings.ADD_NEW_OFFER_FORM}</h1>
          <Icon
            className=" cursor-pointer"
            onClick={closeModal}
            width="30"
            icon="ion:close-outline"
          />
        </div>
        <div>
          <h2 className="font-semibold text-xl my-5">
            {strings.OFFER_DETAILS}
          </h2>
          <div>
            <div className="grid grid-cols-1 my-5">
              <p className="">{strings.OFFER_NAME}</p>
              <input
                className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2 text-[#9E9E9E] my-5"
                placeholder={placeholder.WRITE_DESCRIPTION}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <p className="col-span-1 font-medium	">{strings.DISCOUNT_TYPE}</p>
              <p className="col-span-1 font-medium	">{strings.DISCOUNT_VALUE}</p>
            </div>
            <div className="grid grid-cols-2 my-5 gap-4">
              <select className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2 text-[#9E9E9E]">
                <option className="text-[#9E9E9E]">Choose Type...</option>
              </select>
              <div className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 flex items-center gap-3   p-2">
                <p className="border-r-2 pr-2 ">%</p>
                <input type="number" placeholder="15" />
              </div>
            </div>
            <div className="grid grid-cols-1 my-5">
              <p className="">{strings.MINIMUM_SUBSCRIPTION_DURATION}</p>
              <input
                className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2 text-[#9E9E9E] my-5"
                placeholder={placeholder.WRITE_DESCRIPTION}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <p className="col-span-1 font-medium	">{strings.START_DATE}</p>
              <p className="col-span-1 font-medium	">{strings.END_DATE}</p>
            </div>
            <div className="grid grid-cols-2 my-5 gap-4">
              <input
                type="date"
                placeholder="date"
                className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2 text-[#9E9E9E]"
              />
              <input
                type="date"
                placeholder="date"
                className="border-[1px] border-[#EDEDED] rounded-lg h-14 col-span-1 p-2 text-[#9E9E9E]"
              />
            </div>
            <div className="flex gap-5 justify-end my-5">
              <button className="border-2 px-8 py-4 border-[#0094FF] rounded-[30px]">
                <p className="text-[#0094FF] font-semibold">{strings.CANCEL}</p>
              </button>
              <button className="border-2 px-8 py-4 border-[#0094FF] bg-[#0094FF] rounded-[30px]">
                <p className="text-white font-semibold">{strings.ADD}</p>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewOfferModal;
