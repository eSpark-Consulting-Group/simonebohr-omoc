import React from "react";
import { Icon } from "@iconify/react";
import { strings } from "../../utils/strings";


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
const ResendInvoiceModal = ({ closeModal }) => {
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <p className="font-bold text-2xl">{strings.RESEND_INVOICE}</p>
          <button onClick={closeModal}>
            <Icon
              icon="system-uicons:cross"
              style={{ width: 24, height: 24 }}
            />
          </button>
        </div>
        <p className="my-5 text-[20px] text-[#616161]">
          {strings.WOULD_YOU_LIKE_TO_RESEND_INVOICE}
        </p>
        <div className="flex justify-end gap-6">
          <button
            className="h-14 w-28 rounded-[30px] border-2 border-[#0094FF]"
            onClick={closeModal}
          >
            <p className="text-base font-semibold text-[#0094FF]">
              {strings.CANCEL}
            </p>
          </button>
          <button className="h-14 w-28 rounded-[30px] bg-[#0094FF]">
            <p className="text-base font-semibold text-[#fff]">
              {strings.RESEND}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResendInvoiceModal;
