import React, { useState } from "react";
import { strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import Modal from "react-modal";
import bag from "../../../assets/icon/bag-happy-black.svg";
import boldBag from "../../../assets/icon/bag-happy-hover.svg";
import { useNavigate } from "react-router-dom";

function TypeOfAdsModal({ openTypeModal, setOpenTypeModal }) {
  const [onHover, setOnHover] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      <Modal
        isOpen={openTypeModal}
        onRequestClose={() => {
          setOpenTypeModal(false);
        }}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            borderRadius: "15px",
          },
        }}
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">
              {strings.SELECT_TYPE_OF_ADS}
            </h3>
            <Icon
              icon="ep:close"
              width="26"
              height="26"
              cursor={"pointer"}
              onClick={() => setOpenTypeModal(false)}
            />
          </div>
          <div className="flex justify-between items-center gap-4 mt-6 max-sm:flex-wrap">
            <div
              onMouseOver={() => {
                setOnHover(1);
              }}
              onMouseLeave={() => {
                setOnHover(0);
              }}
              onClick={() => {
                navigate("/Other-settings/Marketing/Create-your-ads-step-1", {
                  state: { type: "product" },
                });
              }}
              className="flex items-center gap-4 border-2 rounded-2xl px-4 py-6 hover:bg-[#E8F5FF] cursor-pointer"
            >
              {onHover == 1 ? (
                <img src={boldBag} className="w-6 h-6" />
              ) : (
                <img src={bag} className="w-6 h-6" />
              )}
              <div>
                <p className="text-base font-semibold">{strings.PRODUCT_ADS}</p>
                <p className="text-[#7A7A7A] text-sm font-normal">
                  {strings.TAG_THE_PRODUCT_YOU_WANT}
                </p>
              </div>
            </div>
            <div
              onMouseOver={() => {
                setOnHover(2);
              }}
              onMouseLeave={() => {
                setOnHover(0);
              }}
              className="flex items-center gap-4 border-2 rounded-2xl px-4 py-6 hover:bg-[#E8F5FF] cursor-pointer"
            >
              {onHover == 2 ? (
                <Icon
                  icon="solar:gallery-bold"
                  color="#0094ff"
                  width="24"
                  height="24"
                  hFlip={true}
                />
              ) : (
                <Icon
                  icon="solar:gallery-linear"
                  width="24"
                  height="24"
                  hFlip={true}
                />
              )}
              <div className="w-11/12">
                <p className="text-base font-semibold">
                  {strings.FULL_IMAGE_BANNER_ADS}
                </p>
                <p className="text-[#7A7A7A] text-sm font-normal">
                  {strings.SELL_NUMEROUS_ITEMS_OR_PRODUCT}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TypeOfAdsModal;
