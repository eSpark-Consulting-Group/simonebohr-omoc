import React from "react";
import { Icon } from "@iconify/react";
import { strings } from "../../utils/strings";
import { useNavigate } from "react-router-dom";

const EditOrderModal = ({ closeModal }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <p className="font-bold text-2xl">{strings.EDIT_ORDER_ID_FORMAT}</p>
          <button onClick={closeModal}>
            <Icon
              icon="system-uicons:cross"
              style={{ width: 24, height: 24 }}
            />
          </button>
        </div>
        <p className="my-5 text-[#616161] text-base	">
          {strings.EDIT_ORDER_ID_DESCRIPTION}
        </p>

        <div className="flex w-full">
          <div className="w-1/2">
            <p className="my-5">{strings.PREFIX}</p>
            <input className="h-14 w-[95%] border-2 rounded-xl" />
          </div>
          <div className="w-1/2">
            <p className="my-5">{strings.SUFFIX}</p>
            <input className="h-14 w-[95%] border-2 rounded-xl" />
          </div>
        </div>
        <p className="font-medium text-base	text-[#757575] my-5">
          {strings.YOUR_ORDER_ID_WILL_APPEAR}
        </p>
        <div className="flex lg:justify-end justify-center">
          <button
            className="h-14 w-52 rounded-[30px] bg-[#0094FF]"
            onClick={() => {
              navigate("/Order/Ready-For-Packaging");
            }}
          >
            <p className="text-base font-semibold text-white">{strings.SAVE}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;
