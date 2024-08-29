import { Icon } from "@iconify/react";
import React from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../../utils/strings";
import profile from "../../../assets/image/Ellipse 647.png";

function AddReason({ addReasonModal, setAddReasonModal }) {
  return (
    <Modal
      isOpen={addReasonModal}
      onRequestClose={() => {
        setAddReasonModal(false);
      }}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          borderRadius: "15px",
        },
      }}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-2xl font-semibold">{strings.ADD_REASON}</h3>
        <Icon
          icon="ep:close"
          width="25"
          height="25"
          cursor={"pointer"}
          onClick={() => setAddReasonModal(false)}
        />
      </div>
      <div className="h-[420px]">
        <div className="my-4">
          <textarea
            className=" resize-none h-44 w-full p-4 border rounded-xl"
            placeholder={placeholder.WRITE_A_REASON}
          />
          <p className="text-[#9E9E9E] text-sm font-medium">
            Example: Certain product offerings are not available
          </p>
        </div>
        <div className="p-3 border rounded-xl">
          <p className="font-normal text-base">{strings.TAG_EMPLOYEES}</p>
          <div className="flex gap-4 items-center my-2 flex-wrap">
            {[1, 2, 3, 4].map(() => (
              <div className="bg-[#F5F5F5] flex items-center gap-3 p-2 rounded-3xl">
                <p className="flex items-center gap-2">
                  <img src={profile} className="w-8 h-8" />
                  Gloria Hany
                </p>
                <Icon
                  icon="ep:close"
                  width="21"
                  height="21"
                  cursor={"pointer"}
                />
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm font-medium text-[#FACC15]">
          {strings.ONLY_TAGGED_EMPLOYEES_CAN}
        </p>
        <div className="flex justify-end py-3">
          <button className="bg-[#0094FF] text-white text-base font-semibold px-6 py-3 rounded-3xl">
            {strings.SAVE}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddReason;
