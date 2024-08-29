import { Icon } from "@iconify/react";
import React from "react";
import { strings } from "../../utils/strings";

const BarCodeErrorModal = ({ closeModal }) => {
  return (
    <div>
      <div className="flex justify-center">
        <Icon
          icon="codicon:error"
          color="#c80000"
          className="h-36 w-36"
          style={{ alignSelf: "center", justifySelf: "center" }}
        />
      </div>

      <h1 className="text-2xl	text-[#2A2A2A] text-center my-5">
        {strings.THE_BARCODES_ARE_INCOMPATIBLE}
      </h1>
      <p className="text-base	text-[#757575] leading-7 text-center mx-5 font-normal	">
        {strings.BARCODE_ERROR_DESCRIPTION}
      </p>
      <div className="flex justify-center mt-5">
        <button
          className="h-14	w-96 bg-[#0094FF] rounded-[30px]"
          onClick={closeModal}
        >
          <p className="text-white font-semibold text-base">
            {strings.TRY_AGAIN}
          </p>
        </button>
      </div>
    </div>
  );
};

export default BarCodeErrorModal;
