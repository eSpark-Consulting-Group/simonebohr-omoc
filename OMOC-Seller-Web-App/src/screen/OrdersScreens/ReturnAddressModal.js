import { Icon } from "@iconify/react";
import React from "react";
import { strings } from "../../utils/strings";

const ReturnAddressModal = ({ closeModal }) => {
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <p className="font-bold text-2xl">{strings.RETURN_ADDRESS}</p>
          <button onClick={closeModal}>
            <Icon
              icon="system-uicons:cross"
              style={{ width: 24, height: 24 }}
            />
          </button>
        </div>
        <div className="flex justify-between my-5">
          <p className="text-xl font-semibold">
            {strings.SEND_ADDRESS_TO_BUYER}
          </p>
          <button>
            <p className="text-base font-medium	text-[#0094FF]">
              {strings.CHANGE_ADDRESS}
            </p>
          </button>
        </div>
        <div className="border-2 rounded-lg	p-5">
          <p className="text-base font-medium">Arya Kurniawan</p>
          <p className="text-sm	font-medium	text-[#9E9E9E]">
            Jl. Petemon IV No 32 RT 014/RW 08, Kel, Petemon, Kec. Sawahan, Kota
            Surabaya, Jawa Timur, 60252.
          </p>
          <p className="text-base text-[#9E9E9E]">No Hp</p>
          <p className="text-base text-[#2A2A2A]">+62 8987690281</p>
        </div>
        <button className="h-14	w-52 rounded-[30px] bg-[#0094FF] mt-5 float-right	">
          <p className="text-white">{strings.SEND}</p>
        </button>
      </div>
    </div>
  );
};

export default ReturnAddressModal;
