import React, { useState } from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";

function AddAdminModal({ addAdmin, setAddAdmin }) {
  const [chooseType, setChooseType] = useState(false);
  const [adminName, setAdminName] = useState("");
  return (
    <Modal
      isOpen={addAdmin}
      onRequestClose={() => {
        setAddAdmin(false);
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
        <h3 className="text-xl font-semibold">
          {strings.ADD_ADMIN_AND_PERMISSION}
        </h3>
        <Icon
          icon="ep:close"
          width="24"
          height="24"
          cursor={"pointer"}
          onClick={() => setAddAdmin(false)}
        />
      </div>
      <div className="mt-6">
        <input
          type="text"
          placeholder={placeholder.ADMIN_NAME}
          onChange={(e) => setAdminName(e.target.value)}
          className="p-3 w-full rounded-xl border mb-4"
        />
        <input
          type="text"
          placeholder={placeholder.ADMIN_OMOC_EMAIL}
          className="p-3 w-full rounded-xl border mb-4"
        />
        <div className="relative mb-4">
          <p
            onClick={() => setChooseType(!chooseType)}
            className="p-3 w-full rounded-xl border text-base font-medium flex items-center justify-between"
          >
            Choose Type of access
            <Icon icon="iconamoon:arrow-down-2-light" width="24" height="24" />
          </p>
          <p className="text-[#979797] font-normal text-sm">
            Manage order, Manage etail product
          </p>
          {chooseType && <OptionBox />}
        </div>
        <div className="flex justify-end">
          <button
            className={`${
              adminName
                ? "bg-[#0094FF] text-white rounded-3xl text-base font-semibold py-3 px-5"
                : "bg-[#F5F5F5] py-3 px-5 rounded-3xl text-base font-semibold text-[#C2C2C2]"
            }`}
          >
            {strings.SEND_ACCESS}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddAdminModal;

function OptionBox() {
  return (
    <div className="bg-white !z-10 rounded-xl w-full text-start p-5 absolute !top-14 right-0 shadow-[3px_4px_16px_0_rgba(0,0,0,0.09)]">
      <div className="flex gap-5 items-center">
        <input type="checkbox" className="w-6 h-6" />
        <div>
          <p className="text-base font-medium leading-8">
            {strings.MANAGE_ORDERS}
          </p>
          <p className="text-[#979797] font-normal text-sm leading-8">
            {strings.MANAGE_ORDER_FROM_BUYER}
          </p>
        </div>
      </div>
      <div className="flex gap-5 items-center my-5">
        <input type="checkbox" className="w-6 h-6" />
        <div>
          <p className="text-base font-medium leading-8">
            {strings.MANAGE_DETAIL_PRODUCT}
          </p>
          <p className="text-[#979797] font-normal text-sm leading-8">
            {strings.MANAGE_DETAIL_FOR_PRODUCT_PAGE}
          </p>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <input type="checkbox" className="w-6 h-6" />
        <div>
          <p className="text-base font-medium leading-8">
            {strings.MANAGE_STOCK}
          </p>
          <p className="text-[#979797] font-normal text-sm leading-8">
            {strings.MANAGE_PRODUCT_STOCK}
          </p>
        </div>
      </div>
    </div>
  );
}
