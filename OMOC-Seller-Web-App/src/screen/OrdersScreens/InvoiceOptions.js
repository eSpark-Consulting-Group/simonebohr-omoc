import React from "react";
import "./OrdersScreen.css";

function InvoiceOptions({ setNewInvoiceModal }) {
  return (
    <section className="invoice-option-box">
      <div className="p-3">
        <p
          className="hover:!text-[#0094FF] hover:bg-[#E8F5FF] rounded-xl"
          onClick={() => setNewInvoiceModal(true)}
        >
          New Invoice
        </p>
        <p className="hover:!text-[#0094FF] hover:bg-[#E8F5FF] rounded-xl">
          Upload own Invoice
        </p>
        <p className="hover:!text-[#0094FF] hover:bg-[#E8F5FF] rounded-xl">
          New Credit Note
        </p>
      </div>
    </section>
  );
}

export default InvoiceOptions;
