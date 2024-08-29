import React from "react";
import { Icon } from "@iconify/react";
import { placeholder, strings } from "../utils/strings";
import "../assets/CommonStyling/CommonStyling.css";

function OrderInvoiceSubHeader({
  placeholderText,
  btnText,
  dropdownText,
  delivered,
  onClickLeftBtn,
}) {
  return (
    <section className="rounded-xl bg-white my-4 !mb-3 p-4 flex justify-between items-center max-sm:flex-wrap max-sm:justify-center">
      <div className="invoiceSubHeadClass flex items-center gap-5 mr-4 cursor-pointer max-sm:mt-4">
        {!delivered && (
          <p className="py-2.5 px-5" onClick={onClickLeftBtn}>
            {btnText}
          </p>
        )}
        <span className="py-3 px-5 flex justify-center items-center gap-3">
          {dropdownText}
          <Icon icon="iconamoon:arrow-down-2-light" width="22" height="22" />
        </span>
      </div>
      <div className="searchFieldClass max-sm:mt-4">
        <label
          htmlFor="search"
          className="flex py-2 px-5 justify-between items-center w-full"
        >
          <input
            className="w-full py-1"
            type="text"
            id="search"
            placeholder={placeholderText}
          />
          <Icon icon="uil:search" width="24" height="24" />
        </label>
      </div>
    </section>
  );
}

export default OrderInvoiceSubHeader;
