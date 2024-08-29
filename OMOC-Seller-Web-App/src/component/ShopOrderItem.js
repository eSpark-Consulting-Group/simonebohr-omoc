import React from "react";
import { strings } from "../utils/strings";
import productImg from "../assets/image/image 9.png";
import chat from "../assets/icon/message_icon.svg";
import printer from "../assets/icon/printer.svg";
import { Icon } from "@iconify/react";
import Moment from "react-moment";

function ShopOrderItem({
  btnText,
  isDelivered,
  readyToDeliver,
  isComplain,
  showModal,
  items,
  index,
}) {
  return (
    <section className="rounded-xl bg-white p-3 mb-3 w-[852px]" key={index}>
      {isComplain ? (
        <div className="flex items-center justify-between gap-2 border-b border-slate-300 py-3">
          <div className="flex items-center gap-2">
            {index == 2 ? (
              <span>
                <Icon
                  icon="ep:warning"
                  color="#22c55e"
                  width="24"
                  height="24"
                />
              </span>
            ) : (
              <span>
                <Icon
                  icon="ep:warning"
                  color="#c80000"
                  width="24"
                  height="24"
                />
              </span>
            )}
            <p
              className={`${
                index == 2 ? "text-[#22c55e]" : "text-[#C80000]"
              } text-xs font-medium`}
            >
              {/* {response.message} */}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="py-2 px-2 bg-[#F5F5F5] rounded-2xl	text-xs	text-[#0094FF] flex items-center gap-1">
              <span>
                <Icon
                  icon="formkit:time"
                  color="#0094ff"
                  width="18"
                  height="18"
                />
              </span>
              3 Days 24 Hours
            </p>
            <p className="py-2 px-2 bg-red-100 rounded-2xl text-xs	text-red-700">
              {strings.COMPLAIN}
            </p>
          </div>
        </div>
      ) : (
        <div className="border-b border-slate-300 flex justify-between items-center py-3">
          <p>
            <span className="text-[#757575] font-semibold text-sm">#1001</span>{" "}
            /{" "}
            <span className="text-[#757575] font-medium text-xs">
              <Moment format="DD MMMM YYYY">
                {items.orderDetails.orderDate}
              </Moment>
            </span>{" "}
            /{" "}
            <span className="text-[#757575] font-normal text-xs">
              {items.userAddress.name}
            </span>
          </p>
          <p className="bg-green-100 py-2 px-2 rounded-2xl text-xs text-green-700">
            {strings.NEW_ORDER}
          </p>
        </div>
      )}
      <div className="border-b border-slate-300 py-4 flex justify-between items-start mx-2">
        <div
          className={`${
            isComplain ? "w-3/12" : "w-2/5"
          } flex justify-center items-start gap-3 `}
        >
          {!isComplain && (
            <div>
              <input
                type="checkbox"
                className="w-6 h-6 max-xl:w-5 max-xl:h-5"
              />
            </div>
          )}
          <img
            src={items.productDetails.images[0].url}
            alt="product-image"
            className="w-20 h-20 rounded-2xl"
          />
          <div>
            <p className="text-sm font-semibold text-[#2E2E2E]">
              {items.productDetails.name}
            </p>
            <p className="text-sm font-normal text-[#757575] my-2">
              CODE123123124124
            </p>
            <p className="text-sm font-medium text-[#757575] mb-2">
              $ {items.productDetails.price}
            </p>
            {!isComplain && (
              <p className="text-sm font-normal text-[#757575]">
                Note: add sticker fragile please thanks
              </p>
            )}
          </div>
        </div>
        {isComplain && (
          <div className="w-[20%]">
            <p className="text-sm font-semibold text-[#2E2E2E]">
              {strings.DETAIL}
            </p>
            <p className="text-sm font-normal text-[#757575] my-2">
              Reason: the color doesn't match the picture!!
            </p>
            <p className="text-sm font-normal text-[#757575]">
              Proof: <span>A</span>
            </p>
          </div>
        )}
        <div className="w-2/12">
          <p className="text-sm font-semibold text-[#2E2E2E]">
            {strings.ADDRESS_TEXT}
          </p>
          <p className="text-sm font-medium text-[#757575] my-2">
            {items.userAddress.name}
          </p>
          <p className="text-sm font-normal text-[#757575]">
            {items.userAddress.address}
          </p>
        </div>
        {!isComplain && (
          <div>
            <p className="text-sm font-semibold text-[#2E2E2E]">
              {strings.COURIER}
            </p>
            <p className="text-sm font-normal text-[#757575] my-2">
              {items.courierDetails.name}
            </p>
            <p className="text-sm font-medium text-[#757575] mb-2">
              {`( ${items.courierDetails.shippingCharge} Fee )`}
            </p>
            <p className="text-sm font-normal text-[#757575]">
              ID : 1230123931
            </p>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-[#2E2E2E]">
            {strings.TOTAL_PRICE}
          </p>
          <p className="text-lg font-semibold text-[#757575] my-2">
            $ {items.productDetails.price}
          </p>
        </div>
      </div>
      <div
        className={`${
          isComplain && index == 3 ? "justify-end" : "justify-between"
        } py-3 flex items-center`}
      >
        {isComplain ? (
          index != 3 && (
            <p className=" cursor-pointer rounded-3xl text-[#0094FF] font-sm font-normal py-3 px-4 border border-[#0094FF] flex items-center justify-center gap-2">
              <Icon
                icon="solar:chat-dots-outline"
                color="#0094ff"
                width="24"
                height="24"
              />
              {strings.CHAT_BUYER}
            </p>
          )
        ) : (
          <div className={` flex  items-center gap-5`}>
            {!isDelivered && (
              <div className="flex justify-center items-center gap-2">
                <img src={chat} alt="chat" />
                <p className="text-xs font-medium text-[#757575]">
                  {strings.CHAT_BUYER}
                </p>
              </div>
            )}
            <div className="flex justify-center items-center gap-2">
              <img src={printer} alt="printer" />
              <p className="text-xs font-medium text-[#757575]">
                {strings.PRINT_LABEL}
              </p>
            </div>
            {isDelivered && (
              <div>
                <p className="rounded-3xl text-[#757575] bg-[#EDEDED] font-normal text-xs py-2.5 px-3.5">
                  {strings.PRINTED}
                </p>
              </div>
            )}
            {readyToDeliver && (
              <div>
                <p className=" text-[#757575]  font-normal text-xs">
                  {strings.PRINTED}
                </p>
              </div>
            )}
          </div>
        )}
        <div className={` flex items-center justify-center gap-4`}>
          {isDelivered && (
            <p className=" cursor-pointer rounded-3xl text-[#0094FF] font-sm font-normal py-3 px-4 border border-[#0094FF] flex items-center justify-center gap-2">
              <Icon
                icon="solar:chat-dots-outline"
                color="#0094ff"
                width="24"
                height="24"
              />
              {strings.CHAT_BUYER}
            </p>
          )}
          {isComplain ? (
            <button className=" bg-[#0094FF] rounded-3xl text-white font-sm font-normal py-3 px-4">
              {/* {response.btnName} */}
            </button>
          ) : (
            <button className=" bg-[#0094FF] rounded-3xl text-white font-sm font-normal py-3 px-4">
              {btnText}
            </button>
          )}
          {isComplain  && (
            <p
              className=" cursor-pointer rounded-3xl text-[#0094FF] font-sm font-normal py-3 px-4 border border-[#0094FF] flex items-center justify-center gap-2"
              onClick={showModal}
            >
              {/* {response.btnName2} */}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ShopOrderItem;
