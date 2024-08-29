import { Icon } from "@iconify/react";
import React from "react";
import Modal from "react-modal";
import { strings } from "../../../utils/strings";
import hoverBag from "../../../assets/icon/bag-happy-hover.svg";
import Bag from "../../../assets/icon/bag-happy-black.svg";
import hoverProfile from "../../../assets/icon/profile-hover.svg";
import Profile from "../../../assets/icon/profile-black.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
  },
};
const SelectSubscriptionModal = ({ closeModal, isOpen, general, certain }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Select Type of Subscription"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {strings.SELECT_TYPE_SUBSCRIPTION}
          </h1>
          <Icon
            className=" cursor-pointer"
            onClick={closeModal}
            width="30"
            icon="ion:close-outline"
          />
        </div>
        <div className="flex gap-4 my-5 max-md:flex-wrap">
          <div
            className="flex items-center gap-4 border-[1px] rounded-lg py-6 px-4 hover:bg-[#E8F5FF] cursor-pointer"
            onClick={() => general(true)}
          >
            <div>
              <img src={Bag} />
            </div>
            <div className="w-[90%]">
              <p className="font-semibold">{strings.GENERAL_SUBSCRIPTION}</p>
              <p className="text-[#7A7A7A] text-sm">
                {strings.GENERAL_SUBSCRIPTION_DESC}
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-4  border-[1px] rounded-lg py-6 px-4 hover:bg-[#E8F5FF]"
            onClick={() => certain(true)}
          >
            <div>
              <img src={Profile} />
            </div>
            <div className="w-[90%]">
              <p className="font-semibold">{strings.CERTAIN_SUBSCRIPTION}</p>
              <p className="text-[#7A7A7A] text-sm">
                {strings.CERTAIN_SUBSCRIPTION_DESC}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SelectSubscriptionModal;
