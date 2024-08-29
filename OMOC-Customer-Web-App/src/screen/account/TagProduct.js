import React, { useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import { Grid } from "@mui/material";
import product from "../../assets/images/product 4.png";
import shoe from "../../assets/images/shoe-img.png";
import { placeholder, strings } from "../../utils/strings";

function TagProduct({ isTagProduct, setIsTagProduct }) {
  const [isTagged, setIsTagged] = useState(false);
  return (
    <>
      <Modal
        isOpen={isTagProduct}
        onRequestClose={() => {
          setIsTagProduct(false);
        }}
        style={{
          content: {
            left: "auto",
            right: "20%",
            width: "60%",
            borderRadius: "15px",
            padding: "20px 0px 0px 0px",
          },
        }}
        overlayClassName={"tagProductClass"}
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <div className="flex justify-between items-center border-b-2 pb-4 px-5">
            <Icon
              icon="ep:close"
              width="26"
              height="26"
              cursor={"pointer"}
              onClick={() => setIsTagProduct(false)}
            />
            <h3 className="font-bold text-2xl">{strings.TAG_PRODUCT}</h3>
            <p className="text-lg font-medium text-[#0094FF]">{strings.SAVE}</p>
          </div>
          <Grid container className="">
            <Grid xs={12} sm={12} lg={6}>
              <div>
                <img src={product} className="w-full h-full" />
              </div>
            </Grid>
            <Grid xs={12} sm={12} lg={6}>
              <div>
                <div className="flex items-center justify-around">
                  <p
                    onClick={() => setIsTagged(false)}
                    className={`${
                      isTagged
                        ? "text-[#AEAEAE]"
                        : "text-[#0094FF] border-[#0094FF]"
                    } text-lg font-semibold border-b-4 w-full text-center py-3 cursor-pointer`}
                  >
                    {strings.TAG_PRODUCT}
                  </p>
                  <p
                    onClick={() => setIsTagged(true)}
                    className={`${
                      isTagged
                        ? "text-[#0094FF] border-[#0094FF]"
                        : "text-[#AEAEAE]"
                    } text-lg font-semibold border-b-4 w-full text-center py-3 cursor-pointer`}
                  >
                    {strings.PRODUCT_TAGGED} {"(1)"}
                  </p>
                </div>
                {!isTagged ? (
                  <div className="p-4">
                    <p>{strings.CLICK_ON_THE_PHOTO_TO_TAG}</p>
                    <label
                      htmlFor="search"
                      className="flex py-2 px-5 justify-between items-center w-full rounded-3xl border my-5"
                    >
                      <input
                        className="w-full py-1"
                        type="text"
                        id="search"
                        placeholder={placeholder.SEARCH_PRODUCT_SKU}
                      />
                      <Icon icon="uil:search" width="24" height="24" />
                    </label>
                    <div>
                      {" "}
                      <div className="flex justify-between items-center my-5">
                        <div className="flex gap-4 items-center">
                          <img
                            src={shoe}
                            className="w-16 h-16 p-2 rounded-xl bg-[#F7F6F4]"
                          />
                          <div>
                            <p className="text-base font-semibold">
                              Nike Air Jordan
                            </p>
                            <p className="text-sm font-medium text-[#757575]">
                              1239u1023
                            </p>
                            <p className="text-sm font-medium text-[#757575]">
                              <span>{strings.PRICE}: $1.25</span>{" "}
                              <span>{strings.STOCK}: 14</span>
                            </p>
                          </div>
                        </div>
                        <button className="text-sm font-medium border-[#0094FF] border py-3 px-5 rounded-3xl text-[#0094FF] ">
                          {/* {strings.TAG} */}Tag
                        </button>
                      </div>
                      {/* ======================================== */}
                      <div className="flex justify-between items-center my-5">
                        <div className="flex gap-4 items-center">
                          <img
                            src={shoe}
                            className="w-16 h-16 p-2 rounded-xl bg-[#F7F6F4]"
                          />
                          <div>
                            <p className="text-base font-semibold">
                              Nike Air Jordan
                            </p>
                            <p className="text-sm font-medium text-[#757575]">
                              1239u1023
                            </p>
                            <p className="text-sm font-medium text-[#757575]">
                              <span>{strings.PRICE}: $1.25</span>{" "}
                              <span>{strings.STOCK}: 14</span>
                            </p>
                          </div>
                        </div>
                        <button className="text-sm font-medium border-[#0094FF] border py-3 px-5 rounded-3xl text-[#0094FF] ">
                          {strings.TAG}
                        </button>
                      </div>
                      {/* ============================================== */}
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="flex justify-between items-center my-5">
                      <div className="flex gap-4 items-center">
                        <img
                          src={shoe}
                          className="w-16 h-16 p-2 rounded-xl bg-[#F7F6F4]"
                        />
                        <div>
                          <p className="text-base font-semibold">
                            Nike Air Jordan
                          </p>
                          <p className="text-sm font-medium text-[#757575]">
                            1239u1023
                          </p>
                          <p className="text-sm font-medium text-[#757575]">
                            <span>{strings.PRICE}: $1.25</span>{" "}
                            <span>{strings.STOCK}: 14</span>
                          </p>
                        </div>
                      </div>
                      <button className="text-sm font-medium border-[#0094FF] border py-3 px-5 rounded-3xl text-[#0094FF] ">
                        {strings.REMOVE}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
}

export default TagProduct;
