import React, { useState } from "react";
import hoodie from "../../assets/image/image 9.png";
import trash from "../../assets/icon/trash.svg";
import { Icon } from "@iconify/react";
import printer from "../../assets/icon/boldPrinter.svg";
import { strings } from "../../utils/strings";

function BarcodeProductItem({ productItems }) {
  return productItems.map((items, index) => (
    <div className="flex items-center rounded-xl border py-3 px-4 justify-between w-full mb-4 gap-4">
      <div className="flex items-center w-full gap-5 max-sm:flex-wrap max-sm:gap-1">
        <img src={hoodie} alt="product" className="rounded-xl w-14 h-14" />
        <p className="text-xs font-semibold">{items.productName}</p>
      </div>
      <div className="flex items-center w-[80%] justify-between text-sm font-normal text-[#121212]">
        <p>{items.assignTo}</p>
        <Icon
          icon="teenyicons:down-small-outline"
          color="#242424"
          width="24"
          height="24"
          rotate={3}
        />
        <p>{items.number}</p>
      </div>
      <div className="w-[60%] flex justify-end">
        <img src={trash} alt="trash" />
      </div>
    </div>
  ));
}

export default BarcodeProductItem;

export function ProductUpdateItem({ productItems }) {
  return productItems.map((items, index) => (
    <div className="flex items-center rounded-xl border py-3 px-4 justify-between w-full mb-4">
      <div className="flex items-center w-full gap-5 max-sm:flex-wrap max-sm:gap-1">
        <img src={hoodie} alt="product" className="rounded-xl w-14 h-14" />
        <p className="text-xs font-semibold">{items.productName}</p>
      </div>
      <div className="flex items-center w-full justify-start text-sm font-normal text-[#121212]">
        <p>{items.assignTo}</p>
      </div>
    </div>
  ));
}

export function BarcodeLabelsItem({ productItems }) {
  const [count, setCount] = useState(0);
  return productItems.map((items, index) => (
    <div className="flex items-center rounded-xl border py-3 px-4 justify-between w-full mb-4 gap-2">
      <div className="flex items-center w-full gap-5 max-sm:flex-wrap max-sm:gap-1">
        <img src={hoodie} alt="product" className="rounded-xl w-14 h-14" />
        <div>
          <p className="text-xs font-semibold leading-5">{items.productName}</p>
          <p className="text-xs text-[#757575] font-medium leading-5">
            {strings.PRICE}: $400
          </p>
          <p className="text-xs text-[#757575] font-medium leading-5">
            {strings.TOTAL_QUANTITY}: 1
          </p>
        </div>
      </div>
      <div className="flex items-center w-[45%] justify-around text-sm font-normal text-[#121212]  max-sm:w-full">
        <img src={trash} alt="trash" />
        <div className="rounded-md border-2 border-[#c2c2c2] flex items-center">
          {count == 0 ? (
            <Icon icon="uil:minus" color="#c2c2c2" width="34" height="24" />
          ) : (
            <Icon
              icon="uil:minus"
              width="34"
              height="24"
              onClick={() => {
                setCount(count - 1);
              }}
            />
          )}
          <p className="p-2 border-x-2">{count}</p>
          <Icon
            icon="ic:round-plus"
            width="34"
            height="24"
            onClick={() => {
              setCount(count + 1);
            }}
          />
        </div>
        <img src={printer} alt="trash" />
      </div>
    </div>
  ));
}
