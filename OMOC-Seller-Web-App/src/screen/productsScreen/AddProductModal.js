import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { strings } from "../../utils/strings";
import { useNavigate } from "react-router-dom";

const AddProductModal = ({ closeModal }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold text-2xl">{strings.ADD_NEW_PRODUCT}</p>
        <button onClick={closeModal}>
          <Icon icon="system-uicons:cross" style={{ width: 24, height: 24 }} />
        </button>
      </div>
      <div
        onClick={() => {
          navigate("/Product/Add-new-product-Step-1");
        }}
        className="w-full border-2 rounded-xl py-6 px-4 mt-5 cursor-pointer"
      >
        <p className="text-base font-semibold	">{strings.ADD_NEW_PRODUCT}</p>
        <p className="text-sm text-[#7A7A7A]">
          {strings.CREATE_PHYSICAL_PRODUCT_DEC}
        </p>
      </div>
      <div
        onClick={() => navigate("/Product/Add-new-digitalProduct-Step-1")}
        className="w-full border-2 rounded-xl py-6 px-4 mt-5 cursor-pointer"
      >
        <p className="text-base font-semibold	">
          {strings.ADD_NEW_DIGITAL_PROFUCT}
        </p>
        <p className="text-sm text-[#7A7A7A]">
          {strings.CREATE_YOUR_DIGITAL_PRODUCT}
        </p>
      </div>
    </div>
  );
};

export default AddProductModal;
