import React, { useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import "../assets/CommonStyling/CommonStyling.css";
import { placeholder, strings } from "../utils/strings";
import { DatePicker } from "@mui/x-date-pickers";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { auto } from "@popperjs/core";

const customStyles = {
  content: {
    left: auto,
    right: "27%",
    width: "46%",
  },
};
function AddNewInvoiceModal({ setNewInvoiceModal, newInvoiceModal }) {
  const [radioValue, setRadioValue] = useState("");
  return (
    <section>
      <div>
        <Modal
          isOpen={newInvoiceModal}
          onRequestClose={() => {
            setNewInvoiceModal(false);
            setRadioValue("");
          }}
          style={customStyles}
          contentLabel="Invoice Title"
          shouldCloseOnOverlayClick={false}
        >
          <div className="modalCustomClass">
            <div className="flex items-center justify-between">
              <h2 className="text-[#2A2A2A] font-semibold text-xl">
                {strings.INVOICE_TITLE}
              </h2>
              <span
                onClick={() => {
                  setNewInvoiceModal(false);
                  setRadioValue("");
                }}
              >
                <Icon
                  icon="clarity:close-line"
                  width="30"
                  height="30"
                  className="cursor-pointer"
                />
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between my-4">
                <label className="rounded-xl border-[#EDEDED] border-2 px-4 py-4 w-full mr-4">
                  <input
                    type="text"
                    placeholder={placeholder.INVOIC_NAME_EG}
                    className="w-full"
                  />
                </label>
                <label className="flex items-center justify-center rounded-xl border-[#EDEDED] border-2 px-4 py-4 w-3/5">
                  <span className="text-[#2A2A2A] font-semibold text-xl border-r border-[#9E9E9E] pr-2 mr-2">
                    #
                  </span>
                  <input
                    type="text"
                    className="w-full"
                    placeholder={placeholder.INVOICE_NUMBER}
                  />
                </label>
              </div>
              {/* =============Bill section and form area=========== */}
              <div>
                <h2 className="text-[#2A2A2A] font-semibold text-xl">
                  {strings.BILL_TO}
                </h2>
                <div className="flex items-center justify-between my-4 gap-4">
                  <label className="rounded-xl border-[#EDEDED] border-2 px-4 py-4 w-full">
                    <select className="w-full">
                      <option>Client</option>
                    </select>
                  </label>
                  <label className="rounded-xl border-[#EDEDED] border-2 px-4 py-4 w-full">
                    <input
                      type="text"
                      placeholder={placeholder.ORDER_ID}
                      className="w-full"
                    />
                  </label>
                </div>
                <div className="flex items-center justify-between my-4 gap-4">
                  <label className="rounded-xl border-[#EDEDED] border-2 px-4 py-4 w-full ">
                    <select className="w-full">
                      <option>Post Site</option>
                    </select>
                  </label>
                  <label className="rounded-xl border-[#EDEDED] border-2 px-4 py-4 w-full ">
                    <input
                      type="text"
                      placeholder={placeholder.PO_NUMBER}
                      className="w-full"
                    />
                  </label>
                </div>
                <div className="flex items-center justify-between my-4 max-sm:flex-wrap gap-4">
                  <div className="w-full max-sm:mr-0">
                    {/* <DatePicker className="w-full" label="Invoice Date" /> */}
                    <input type="date" placeholder="Invoice Date" className="rounded-xl border-[#EDEDED] border-2 px-4 py-4 w-full"/>
                  </div>
                  <div className="w-full max-sm:mr-0 max-sm:mt-4">
                    {/* <DatePicker className="w-full" label="Payment Due" /> */}
                    <input type="date" placeholder="Payment Due" className="rounded-xl border-[#EDEDED] border-2 px-4 py-4 w-full"/>
                  </div>
                </div>
                {/* ============table section========== */}
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="bg-[#F5F5F5]">
                      <TableRow
                        sx={{
                          "td, th": { border: 0 },
                        }}
                      >
                        <TableCell align="right" width={"45%"}>
                          Item
                        </TableCell>
                        <TableCell align="right" width={"20%"}>
                          Quantity
                        </TableCell>
                        <TableCell align="right" width={"15%"}>
                          Rate
                        </TableCell>
                        <TableCell align="left" width={"10%"}>
                          Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          "td, th": { border: 0 },
                        }}
                      >
                        <TableCell align="left" scope="row">
                          <label className="rounded-xl border-[#EDEDED] border-2 py-4">
                            <input
                              type="text"
                              placeholder={"Product Name"}
                              className="w-full pl-2"
                            />
                          </label>
                        </TableCell>
                        <TableCell align="left">
                          <label className="rounded-xl border-[#EDEDED] border-2 py-4">
                            <input
                              type="text"
                              placeholder={"Qty"}
                              className="w-full pl-2"
                            />
                          </label>
                        </TableCell>
                        <TableCell align="left">
                          <label className="flex items-center justify-center rounded-xl border-[#EDEDED] border-2  pl-2 py-2.5">
                            <span className="text-[#2A2A2A] font-semibold text-xl border-r border-[#9E9E9E] pr-2 mr-2">
                              $
                            </span>
                            <input
                              type="text"
                              className="w-full"
                              placeholder={"R"}
                            />
                          </label>
                        </TableCell>
                        <TableCell
                          align="center"
                          className="!text-base !font-semibold"
                        >
                          $0.00
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="flex justify-start pb-4 pt-3">
                  <div className="newInvoice-btn cursor-pointer !px-4 !gap-1">
                    <Icon icon="bi:plus" color="white" width="32" height="32" />
                    <p>{strings.LINE_ITEM}</p>
                  </div>
                </div>
                {/* =========note and condition & payment summary section============ */}
                <div className="flex max-sm:flex-wrap">
                  <div className="w-full mr-3 max-sm:mr-0">
                    <h2 className="text-[#2A2A2A] font-semibold text-xl py-3">
                      {strings.NOTES_TERMS}
                    </h2>
                    <div className="py-2">
                      <textarea
                        name="Outlined"
                        placeholder="Notes"
                        className="resize-none h-36	border-2 border-[#E0E0E0] w-full rounded-xl p-4"
                      />
                      <p className="text-sm fond-medium text-[#9E9E9E]">
                        {strings.RELAVENT_INFO}
                      </p>
                    </div>
                    <div className="py-2">
                      <textarea
                        name="Outlined"
                        placeholder="Terms & conditions "
                        className="resize-none h-36	border-2 border-[#E0E0E0] w-full rounded-xl p-4"
                      />
                      <p className="text-sm fond-medium text-[#9E9E9E]">
                        {strings.LATE_FEES_CONDITION}
                      </p>
                    </div>
                  </div>
                  <div className="w-full ml-3 max-sm:ml-0">
                    <h2 className="text-[#2A2A2A] font-semibold text-xl py-3">
                      {strings.PAYMENT_SUMMARY}
                    </h2>
                    <div className="my-2 border-2 border-[#E0E0E0] rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <h3>{strings.SUB_TOTAL}</h3>
                        <p>$20.00</p>
                      </div>
                      <div className="flex gap-2 items-center py-2">
                        <div className="flex items-center">
                          <span>
                            <Icon
                              icon="system-uicons:plus"
                              color="#757575"
                              width="22"
                              height="22"
                            />
                          </span>
                          <p className="text-[#757575] text-xs font-medium">
                            {strings.TAX}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span>
                            <Icon
                              icon="system-uicons:plus"
                              color="#757575"
                              width="22"
                              height="22"
                            />
                          </span>
                          <p className="text-[#757575] text-xs font-medium">
                            {strings.DISCOUNT}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span>
                            <Icon
                              icon="system-uicons:plus"
                              color="#757575"
                              width="22"
                              height="22"
                            />
                          </span>
                          <p className="text-[#757575] text-xs font-medium">
                            {strings.SHIPPING}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pb-2">
                        <h3>{strings.TOTAL}</h3>
                        <p>$20.00</p>
                      </div>
                      <div className="flex justify-between items-center pb-2">
                        <h3>{strings.AMOUNT_PAID}</h3>
                        <label className="flex items-center justify-center rounded-xl border-[#EDEDED] border-2  pl-2 py-2.5 w-3/5">
                          <span className="text-[#2A2A2A] font-semibold text-xl border-r border-[#9E9E9E] pr-2 mr-2">
                            $
                          </span>
                          <input
                            type="text"
                            className="w-full"
                            placeholder={"R"}
                          />
                        </label>
                      </div>
                      <div className="flex justify-between items-center pb-2">
                        <h3>{strings.BALANCE_DUE}</h3>
                        <p>$20.00</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ===========To Delivery Method section============ */}
                <div>
                  <h2 className="text-[#2A2A2A] font-semibold text-xl py-4">
                    {strings.DELIVERY_METHOD}
                  </h2>
                  <div className="flex items-center gap-4 py-4 border-b-2 border-[#E0E0E0]">
                    <input
                      type="radio"
                      className="w-7 h-7"
                      name="radioName"
                      value={1}
                      onChange={(e) => {
                        setRadioValue(e.target.value);
                      }}
                    />
                    <div>
                      <h2 className="text-[#2A2A2A] font-semibold text-xl">
                        {strings.EMAIL_TO_COSTUMER}
                      </h2>
                      <p className="text-sm fond-medium text-[#9E9E9E]">
                        {strings.SEND_YOUR_INVOICE}
                      </p>
                    </div>
                  </div>
                  {radioValue == 1 && (
                    <div className="flex items-start gap-6 bg-[#F5F5F5] p-4 max-sm:flex-wrap">
                      <div className="w-full">
                        <h2 className="text-[#242424] font-medium text-xl pb-4">
                          {strings.COSTUMER_EMAIL}
                        </h2>
                        <input
                          type="email"
                          placeholder="xyz@gmail.com"
                          className="w-full bg-white p-4 rounded-xl mb-1"
                        />
                      </div>
                      <div className="w-full">
                        <h2 className="text-[#242424] font-medium text-xl pb-4">
                          {strings.INVOICE_DELIVERY_OPTION}
                        </h2>
                        <div className="flex items-center gap-3 py-2">
                          <input
                            type="radio"
                            className="w-7 h-7"
                            name="delivery-option"
                          />
                          <p className="text-sm font-normal text-[#616161] w-[90%]">
                            {strings.INVOICE_LINK_TO_PDF}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 py-2">
                          <input
                            type="radio"
                            className="w-7 h-7"
                            name="delivery-option"
                          />
                          <p className="text-sm font-normal text-[#616161] w-[90%]">
                            {strings.INVOICE_AS_LINK}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 py-4 border-b-2 border-[#E0E0E0]">
                    <input
                      type="radio"
                      className="w-7 h-7"
                      name="radioName"
                      value={2}
                      onChange={(e) => {
                        setRadioValue(e.target.value);
                      }}
                    />
                    <div>
                      <h2 className="text-[#2A2A2A] font-semibold text-xl">
                        {strings.DOWNLOAD_PDF}
                      </h2>
                      <p className="text-sm fond-medium text-[#9E9E9E]">
                        {strings.DOWNLOAD_INVOICE}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 mt-10">
              <button className="!text-[#0094FF] rounded-3xl border-2 border-[#0094FF] px-4 py-3">
                {strings.SAFE_AS_DRAFT}
              </button>
              <button className="newInvoice-btn !px-4 !py-3 !gap-1 text-white">
                {strings.PUBLISH_INVOICE}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
}

export default AddNewInvoiceModal;
