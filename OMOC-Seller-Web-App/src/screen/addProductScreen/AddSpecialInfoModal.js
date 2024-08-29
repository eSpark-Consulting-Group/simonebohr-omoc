import { Icon } from "@iconify/react";
import React from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../utils/strings";

function AddSpecialInfoModal({ specialInfoModal, setSpecialInfoModal }) {
  return (
    <>
      <Modal
        isOpen={specialInfoModal}
        onRequestClose={() => {
          setSpecialInfoModal(false);
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
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">
              {strings.ADD_SPECIAL_INFOS}
            </h3>
            <Icon
              icon="ep:close"
              width="26"
              height="26"
              cursor={"pointer"}
              onClick={() => setSpecialInfoModal(false)}
            />
          </div>
          <input
            type="text"
            className="w-full p-4 border rounded-xl my-7"
            placeholder={placeholder.TITLE_DELIVERY_INGREDIENTS}
          />
          <textarea
            className=" resize-none h-44 w-full p-4 border rounded-xl"
            placeholder={placeholder.WRITE_AN_EXPLANATION}
          />
          <p className="text-[#9E9E9E] text-sm font-medium">
            Example: This shoe product is very good both in terms of quality and
            also comfort
          </p>
          <p className="flex gap-2 items-center my-4 text-[#0094ff] text-base font-semibold cursor-pointer">
            <span>
              <Icon icon="uil:plus" color="#0094ff" width="25" height="25" />
            </span>
            {strings.ADD_MORE_SPECIAL_INFOS}
          </p>
          <div className="flex items-center mb-5 justify-end">
            <button className="py-3 px-6 bg-[#0094FF] text-base font-semibold text-white rounded-3xl">
              {strings.SAVE}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddSpecialInfoModal;
