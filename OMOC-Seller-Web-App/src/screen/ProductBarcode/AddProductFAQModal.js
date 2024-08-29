import React from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import shirt from "../../assets/image/shirt_pic.png";
import shoe from "../../assets/image/shoe-img.png";

function AddProductFAQModal({ openProductFAQModal, setOpenProductFAQModal }) {
  return (
    <>
      <Modal
        isOpen={openProductFAQModal}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => {
          setOpenProductFAQModal(false);
        }}
        style={{
          content: {
            left: "auto",
            right: "30%",
            width: "40%",
            borderRadius: "15px",
          },
        }}
      >
        <div>
          <div className="flex justify-between pb-1">
            <p className="font-bold text-2xl">{strings.ADD_PRODUCT_FAQ}</p>
            <button
              onClick={() => {
                setOpenProductFAQModal(false);
              }}
            >
              <Icon icon="ep:close" width="28" height="28" />
            </button>
          </div>
          <div className="searchFieldClass my-6">
            <label
              htmlFor="search"
              className="flex py-2 px-5 justify-between items-center w-full"
            >
              <input
                className="w-full py-1"
                type="text"
                id="search"
                placeholder={placeholder.SEARCH_PRODUCT}
              />
              <Icon icon="uil:search" width="22" height="22" />
            </label>
          </div>
          {/* ============================================= */}
          <div>
            <div className="flex gap-8 items-center pb-3 border-b">
              <input type="checkbox" className="w-5 h-5" />
              <div className="flex gap-4 items-center">
                <img
                  src={shirt}
                  className="w-20 h-20 p-3 rounded-xl bg-[#F7F6F4]"
                />
                <div>
                  <p className="text-base font-semibold">Shirt Havana V1</p>
                  <p className="text-sm font-normal text-[#7A7A7A]">12345678</p>
                </div>
              </div>
            </div>
            <div className="flex gap-8 items-center py-8 border-b justify-between px-14">
              <div className="flex items-center gap-10">
                <input type="checkbox" className="w-5 h-5" />
                <p className="text-base font-semibold">Blue</p>
              </div>
              <div className="flex items-center gap-10 ">
                {" "}
                <p className="text-base font-semibold">{strings.STOCK}: 12</p>
                <p className="text-base font-semibold">$420</p>
              </div>
            </div>
            <div className="flex gap-8 items-center py-8 border-b justify-between px-14">
              <div className="flex items-center gap-10">
                <input type="checkbox" className="w-5 h-5" />
                <p className="text-base font-semibold">Blue</p>
              </div>
              <div className="flex items-center gap-10 ">
                {" "}
                <p className="text-base font-semibold">{strings.STOCK}: 12</p>
                <p className="text-base font-semibold">$420</p>
              </div>
            </div>
          </div>
          {/* ============================================= */}
          <div>
            <div className="flex gap-8 items-center pb-3 border-b mt-4">
              <input type="checkbox" className="w-5 h-5" />
              <div className="flex gap-4 items-center">
                <img
                  src={shoe}
                  className="w-20 h-20 p-3 rounded-xl bg-[#F7F6F4]"
                />
                <div>
                  <p className="text-base font-semibold">Shoe V1</p>
                  <p className="text-sm font-normal text-[#7A7A7A]">12345678</p>
                </div>
              </div>
            </div>
            <div className="flex gap-8 items-center py-8 border-b justify-between px-14">
              <div className="flex items-center gap-10">
                <input type="checkbox" className="w-5 h-5" />
                <p className="text-base font-semibold">Yello</p>
              </div>
              <div className="flex items-center gap-10 ">
                {" "}
                <p className="text-base font-semibold">{strings.STOCK}: 12</p>
                <p className="text-base font-semibold">$420</p>
              </div>
            </div>
            <div className="flex gap-8 items-center py-8 border-b justify-between px-14">
              <div className="flex items-center gap-10">
                <input type="checkbox" className="w-5 h-5" />
                <p className="text-base font-semibold">Yellow</p>
              </div>
              <div className="flex items-center gap-10 ">
                {" "}
                <p className="text-base font-semibold">{strings.STOCK}: 12</p>
                <p className="text-base font-semibold">$420</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mt-6">
            <button
              className="rounded-3xl text-white font-base font-semibold
             py-2.5 px-6 border-2 bg-[#0094FF] border-[#0094FF] flex items-center justify-center gap-2"
            >
              {strings.ADD}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddProductFAQModal;
