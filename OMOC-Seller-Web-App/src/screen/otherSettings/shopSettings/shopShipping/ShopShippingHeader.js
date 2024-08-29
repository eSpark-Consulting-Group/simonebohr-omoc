import React, { useState } from "react";
import { placeholder, strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import AddShippiingRegion from "./AddShippingRegion";

function ShopShippingHeader() {
  const [addShipping, setAddShipping] = useState(false);
  return (
    <div className="bg-[#F2F2F2] h-full">
      <div className="flex items-center justify-between max-sm:flex-wrap mt-5 mb-3">
        <div>
          <h3 className="text-3xl font-bold mb-1">{strings.SHOP_SHIPPING}</h3>
          <p className="text-[#7A7A7A] text-sm font-normal">
            {strings.MANAGE_YOUR_SHOP_HERE}
          </p>
        </div>
        <div
          onClick={() => setAddShipping(true)}
          className="newInvoice-btn cursor-pointer !gap-1 max-sm:mt-4"
        >
          <Icon icon="bi:plus" color="white" width="32" height="32" />
          <p className="text-base font-normal">{strings.ADD_SHIPPING_REGION}</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 mb-4 mt-8 flex-wrap">
        <div className="invoiceHeader-class flex items-center gap-8 rounded-xl bg-white text-[#C2C2C2] text-sm font-semibold p-3.5 max-sm:w-full max-sm:justify-between">
          <NavLink
            to="/Other-settings/Shop-settings/Shop-shipping-rate"
            className="px-4"
          >
            {strings.SHIPPING_RATES}
          </NavLink>
          <NavLink
            to="/Other-settings/Shop-settings/Request-free-shipping"
            className="px-4"
          >
            {strings.REQUEST_FREE_SHIPPING}
          </NavLink>
        </div>
        <div className="w-[40%] max-sm:w-full">
          <label
            htmlFor="search"
            className="flex py-2 px-5 justify-between items-center w-full bg-white rounded-3xl"
          >
            <input
              className="!w-full py-1 !font-normal"
              type="text"
              id="search"
              placeholder={placeholder.SEARCH_REGION}
            />
            <Icon icon="uil:search" width="22" height="22" />
          </label>
        </div>
      </div>
      <AddShippiingRegion
        addShipping={addShipping}
        setAddShipping={setAddShipping}
      />
    </div>
  );
}

export default ShopShippingHeader;
