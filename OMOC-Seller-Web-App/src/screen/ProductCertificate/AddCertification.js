import React from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import { placeholder, strings } from "../../utils/strings";
import shirt from "../../assets/image/shirt_pic.png";
import shoe from "../../assets/image/shoe-img.png";

function AddCertification({
  openAddCertificate,
  setOpenAddCertificate,
  productsId,
  setProductsId,
  productList,
  addCertificateHandle,
  productKey,
  setProductKey,
  fetchProduct,
}) {
  return (
    <>
      <Modal
        isOpen={openAddCertificate}
        onRequestClose={() => {
          setOpenAddCertificate(false);
        }}
        style={{
          content: {
            left: "auto",
            right: "25%",
            width: "50%",
            borderRadius: "15px",
          },
        }}
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <div className="flex justify-between items-center mb-7">
            <h3 className="text-2xl font-bold">{strings.ADD_CERTIFICATION}</h3>
            <button
              onClick={() => {
                setOpenAddCertificate(false);
              }}
            >
              <Icon
                icon="system-uicons:cross"
                style={{ width: 24, height: 24 }}
              />
            </button>
          </div>
          <label
            htmlFor="search"
            className="flex py-2 px-5 justify-between items-center w-full border rounded-3xl"
          >
            <input
              className="w-full py-1"
              type="text"
              id="search"
              value={productKey}
              onChange={(e) => {
                setProductKey(e.target.value);
                fetchProduct(e.target.value);
              }}
              placeholder={placeholder.SEARCH_PRODUCT}
            />
            <Icon icon="uil:search" width="24" height="24" />
          </label>
          <div className="rounded-xl bg-[#F5F5F5] my-4 p-4">
            <p className="text-base font-normal w-4/12 text-center">
              {strings.PRODUCT_NAME}
            </p>
          </div>
          {productList &&
            productList?.map((items, index) => (
              <div
                key={index}
                className="border-b-2 flex items-center gap-12 py-4"
              >
                <div>
                  <input
                    type="checkbox"
                    className="w-6 h-6 ml-2"
                    onChange={(e) => {
                      if (e.target.checked) {
                        let value = [...productsId];
                        value.push({ id: items._id });
                        setProductsId(value);
                      } else {
                        let value = productsId.filter(
                          (val) => items._id !== val.id
                        );
                        setProductsId(value);
                      }
                    }}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={items?.images[0]?.url}
                    className="rounded-xl w-[72px] h-[72px] bg-[#EDEDED] p-2"
                  />
                  <div>
                    <p className="text-base font-semibold mb-1">
                      {items?.name}
                    </p>
                    <p className="text-[#7A7A7A] text-sm font-normal">
                      1239u1023
                    </p>
                  </div>
                </div>
              </div>
            ))}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                addCertificateHandle();
              }}
              className="rounded-3xl text-white text-base bg-[#0094FF] font-semibold py-4 px-5"
            >
              {strings.APPLY_CERTIFICATION}
              {` (${productsId.length}) `}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddCertification;
