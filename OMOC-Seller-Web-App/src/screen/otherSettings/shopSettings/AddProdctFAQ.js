import React from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import product from "../../../assets/image/productImg/product 2.png";

function AddProductFAQ({ addProductFAQ, setAddProductFAQ }) {
  return (
    <Modal
      isOpen={addProductFAQ}
      onRequestClose={() => {
        setAddProductFAQ(false);
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
        <h3 className="text-2xl font-semibold">{strings.ADD_PRODUCT_FAQ}</h3>
        <Icon
          icon="ep:close"
          width="25"
          height="25"
          cursor={"pointer"}
          onClick={() => setAddProductFAQ(false)}
        />
      </div>
      <div>
        <label
          htmlFor="search"
          className="flex py-2 px-5 justify-between items-center w-full border rounded-3xl mt-5 mb-4"
        >
          <input
            className="w-full py-1"
            type="text"
            id="search"
            placeholder={placeholder.SEARCH_PRODUCT}
          />
          <Icon icon="uil:search" width="22" height="22" />
        </label>
        <div className="p-3 bg-[#F5F5F5] rounded-xl mb-4">
          <p className="text-base font-normal w-[40%] text-center">
            {strings.PRODUCT_NAME}
          </p>
        </div>
        <div className="overflow-auto">
          <div className="max-h-80">
            {[1, 2, 3, 4, 5, 6].map(() => (
              <div className="flex items-center gap-8 py-3 border-b-2">
                <input type="radio" className="w-6 h-6" />
                <div className="flex items-center gap-4">
                  <img
                    src={product}
                    className="w-16 h-16 rounded-xl p-1 bg-[#F7F6F4]"
                  />
                  <div>
                    <p className="text-base font-semibold">Hoodie Havana V1</p>
                    <span className="text-sm font-normal text-[#7A7A7A]">
                      1239u1023
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end items-center mt-4">
          <button className="text-white bg-[#0094FF] rounded-3xl text-base font-semibold py-3 px-5">
            {strings.CREATE_FAQ}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddProductFAQ;
