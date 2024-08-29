import React from "react";
import { Icon } from "@iconify/react";
import { placeholder, strings } from "../../../utils/strings";
import Modal from "react-modal";
import shoe from "../../../assets/image/shoe-img.png";

function TagProductModal({
  openTagProductModal,
  setOpenTagProductModal,
  isTagProduct,
  setIsTagProduct,
}) {
  return (
    <>
      <Modal
        isOpen={openTagProductModal}
        onRequestClose={() => {
          setOpenTagProductModal(false);
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
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-2xl">{strings.TAG_PRODUCT}</h3>
          <Icon
            icon="ep:close"
            width="26"
            height="26"
            cursor={"pointer"}
            onClick={() => setOpenTagProductModal(false)}
          />
        </div>
        <div>
          <div className="searchFieldClass flex justify-between items-center py-3 gap-4">
            <label
              htmlFor="search"
              className="flex py-2 px-5 justify-between items-center w-1/2 max-sm:w-[80%]"
            >
              <input
                className="w-full py-1"
                type="text"
                id="search"
                placeholder={placeholder.SEARCH_PRODUCT_SKU}
              />
              <Icon icon="uil:search" width="24" height="24" />
            </label>
            <label className="rounded-xl border-[#EDEDED] border-2  py-3 px-5 w-[20%]  max-sm:w-[50%]">
              <select className="w-full">
                <option>XYZ</option>
              </select>
            </label>
          </div>
          <div className="py-4">
            <div className="rounded-xl bg-[#F5F5F5] flex w-full items-center py-3">
              <p className="text-base font-normal text-[#404040] w-[40%] text-center">
                {strings.PRODUCT_NAME}
              </p>
              <p className="text-base font-normal text-[#404040] w-[30%] text-center">
                {strings.PRICE}
              </p>
              <p className="text-base font-normal text-[#404040] w-[30%] text-center">
                {strings.STOCK}
              </p>
            </div>
            <div className="border-b-2 flex w-full items-center py-5">
              <div className="flex items-center justify-center gap-12 w-[40%]">
                <div className="flex items-center gap-4">
                  <img src={shoe} alt="product" />
                  <p className="text-base font-semibold ">Nike Air Jordan</p>
                </div>
              </div>
              <p className="text-base font-normal text-[#757575]  w-[30%] text-center">
                $1.120
              </p>
              <p className="text-base font-normal text-[#757575]  w-[30%] text-center">
                123
              </p>
            </div>
            {/* ================================= */}
            <div className="border-b-2 flex w-full items-center py-5">
              <div className="flex items-center justify-center gap-12 w-[40%]">
                <div className="flex items-center gap-4">
                  <img src={shoe} alt="product" />
                  <p className="text-base font-semibold ">Nike Air Jordan</p>
                </div>
              </div>
              <p className="text-base font-normal text-[#757575]  w-[30%] text-center">
                $1.120
              </p>
              <p className="text-base font-normal text-[#757575]  w-[30%] text-center">
                123
              </p>
            </div>
            {/* =================================== */}
            <div className="flex items-center justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setIsTagProduct(true);
                  setOpenTagProductModal(false);
                }}
                className="newInvoice-btn !px-4 !py-3 text-white text-base font-semibold"
              >
                {strings.ADD_PRODUCT}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TagProductModal;
