import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import omocLogo from "../../assets/icon/omoc_black_logo.svg";
import { strings } from "../../utils/strings";
import CustomButton from "../commonComponent/CustomButton";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const VisitingModal = ({ isOpen, closeModal }) => {
  return (
    <div>
      <Modal isOpen={isOpen} style={customStyles} contentLabel="Example Modal">
        <div>
          <div
            className="cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          >
            <Icon
              width={24}
              height={24}
              style={{ float: "right" }}
              icon="radix-icons:cross-2"
            />
          </div>
          <div className="mx-auto w-2/3">
            <img
              className="mx-auto"
              width="102px"
              height="102px"
              src={omocLogo}
            />
            <p className="text-xl text-center font-semibold">
              {strings.THANKS_FOR_VISITING_OMOC}
            </p>
          </div>
          <div className="w-[377px] mt-2">
            <textarea className="bg-[#F1F1F1] w-full h-40 rounded-xl p-2" />
            <button className="bg-[#0094FF] rounded-3xl	w-full py-3 my-2">
              <p className="text-white">{strings.ACCEPT}</p>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VisitingModal;
