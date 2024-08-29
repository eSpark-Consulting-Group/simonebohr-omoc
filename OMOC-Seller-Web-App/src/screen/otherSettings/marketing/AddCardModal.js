import { Icon } from "@iconify/react";
import React from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../../utils/strings";

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
const AddCardModal = ({ addCard, setAddCard }) => {
  return (
    <div>
      <Modal
        isOpen={addCard}
        onRequestClose={() => setAddCard(false)}
        style={customStyles}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {strings.ENTER_PAYMENT_DETAILS}
          </h1>
          <Icon
            className=" cursor-pointer"
            onClick={() => setAddCard(false)}
            width="30"
            icon="ion:close-outline"
          />
        </div>

        <input
          className="border-[1px] rounded-xl px-2 py-3 w-full my-5"
          placeholder={placeholder.NAME_ON_CARD}
        />
        <input
          className="border-[1px] rounded-xl px-2 py-3 w-full my-5"
          placeholder={placeholder.CARD_NUMBER}
        />
        <div className="flex gap-5">
          <input
            className="border-[1px] rounded-xl px-2 py-3 w-full my-5"
            placeholder={placeholder.EXPIRY_DATE}
          />
          <input
            className="border-[1px] rounded-xl px-2 py-3 w-full my-5"
            placeholder={placeholder.CVC_CVV}
          />
        </div>
        <select className="border-[1px] rounded-xl px-2 py-3 w-full my-5">
          <option>Country or Region</option>
        </select>
        <button className="bg-[#F5F5F5] rounded-[30px] px-8 py-4 float-right	">
          <p className="text-[#C2C2C2]">Save Card</p>
        </button>
      </Modal>
    </div>
  );
};

export default AddCardModal;
