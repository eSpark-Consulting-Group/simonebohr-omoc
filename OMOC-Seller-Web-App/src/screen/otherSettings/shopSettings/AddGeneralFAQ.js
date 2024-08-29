import React from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";

function AddGeneralFAQ({ addGeneralFAQ, setAddGeneralFAQ }) {
  return (
    <Modal
      isOpen={addGeneralFAQ}
      onRequestClose={() => {
        setAddGeneralFAQ(false);
      }}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          borderRadius: "15px",
        },
      }}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-2xl font-semibold">{strings.ADD_GENERAL_FAQ}</h3>
        <Icon
          icon="ep:close"
          width="25"
          height="25"
          cursor={"pointer"}
          onClick={() => setAddGeneralFAQ(false)}
        />
      </div>
      <div>
        <div className="mt-6">
          <textarea
            className=" resize-none h-44 w-full p-4 border rounded-xl"
            placeholder={placeholder.ENTER_A_QUESTION}
          />
          <p className="text-[#9E9E9E] text-sm font-medium">
            {strings.EXAMPLE_WHAT_DOES_THIS}
          </p>
        </div>
        <div className="mt-6">
          <textarea
            className=" resize-none h-44 w-full p-4 border rounded-xl"
            placeholder={placeholder.ENTER_A_ANSWER}
          />
          <p className="text-[#9E9E9E] text-sm font-medium">
            {strings.EXAMPLE_THIS_SHOP_SELLS}{" "}
          </p>
        </div>
      </div>
      <div className="flex justify-end items-center mt-3">
        <button className="text-white bg-[#0094FF] rounded-3xl text-base font-semibold py-3 px-10">
          {strings.SAVE}
        </button>
      </div>
    </Modal>
  );
}
export default AddGeneralFAQ;
