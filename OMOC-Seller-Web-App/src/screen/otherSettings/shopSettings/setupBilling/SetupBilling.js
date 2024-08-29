import React, { useState } from "react";
import Header from "../../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import calender from "../../../../assets/icon/calendar.svg";
import PaymentMethodModal from "./PaymentMethodModal";
import AddCardModal from "../../marketing/AddCardModal";

function SetupBilling() {
  const approveStyle = "text-[#FACC15] bg-[#FACC151A]";
  const pendingStyle = "text-[#0094FF] bg-[#0094ff1a]";

  const arr = [
    { id: 1, status: "Hold" },
    { id: 2, status: "Success" },
  ];

  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [addCard, setAddCard] = useState(false);
  return (
    <>
      <div className={`bg-[#F2F2F2] h-full`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <Grid container spacing={2}>
            <Grid item md={3} xs={12} className="w-full">
              <SideMenuBar />
            </Grid>
            <Grid item md={9} xs={12}>
              <div className="w-full">
                <div className="bg-[#F2F2F2] h-full">
                  <div className="flex items-center justify-between max-sm:flex-wrap mt-5 mb-3">
                    <div>
                      <h3 className="text-3xl font-bold mb-1">
                        {strings.SETUP_BILLING}
                      </h3>
                      <p className="text-[#7A7A7A] text-sm font-normal">
                        {strings.MANAGE_YOUR_SHOP_HERE}
                      </p>
                    </div>
                    <div
                      onClick={() => setOpenPaymentMethod(true)}
                      className="newInvoice-btn cursor-pointer !gap-1 max-sm:mt-4"
                    >
                      <Icon
                        icon="bi:plus"
                        color="white"
                        width="32"
                        height="32"
                      />
                      <p className="text-base font-normal">
                        {strings.ADD_PAYMENT_METHOD}
                      </p>
                    </div>
                  </div>
                  <div className="w-2/5 max-md:w-full my-8">
                    <p className="text-[#A8A8A8] text-xs font-normal mb-1">
                      PAYPAL
                    </p>
                    <label
                      htmlFor="payInput"
                      className="bg-white p-2.5 rounded-xl flex justify-between items-center"
                    >
                      <input
                        type="text"
                        className="w-full"
                        id="payInput"
                        value={"Hello@omoc.com"}
                      />
                      <Icon
                        icon="teenyicons:tick-circle-outline"
                        color="#22c55e"
                        width="22"
                        height="22"
                      />
                    </label>
                  </div>
                  <div>
                    <div className="flex items-center justify-between max-md:flex-wrap mt-10 mb-8 gap-4">
                      <div>
                        <h3 className="text-3xl font-bold mb-1">
                          {strings.BILLING_CURRENCY}
                        </h3>
                        <p className="text-[#7A7A7A] text-sm font-normal">
                          {strings.MANAGE_YOUR_SHOP_HERE}
                        </p>
                      </div>
                      <div className="flex items-center gap-5 flex-wrap justify-end">
                        <div className="flex items-center gap-2 bg-white rounded-xl p-2.5">
                          <img src={calender} />
                          <p>20 Febuary 2023 - 20 March 2023</p>
                          <Icon
                            icon="iconamoon:arrow-up-2-light"
                            width="24"
                            height="24"
                            rotate={2}
                          />
                        </div>
                        <div className="text-[#0094FF] border-[#0094FF] border rounded-3xl text-base font-normal py-2.5 px-4 flex items-center gap-2">
                          <Icon
                            icon="solar:file-download-linear"
                            color="#0094ff"
                            width="22"
                            height="22"
                          />
                          <p>{strings.DOWNLOAD_INVOICES}</p>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-auto">
                      <div className="w-max">
                        <table className="invoiceTableClass w-full overflow-auto">
                          <div className="rounded-xl bg-white mb-4 !w-max">
                            <tr className="flex justify-around items-center !text-[#2E2E2E] !text-sm !w-max">
                              <th className="!w-[190px] !pl-4 !text-start">
                                {strings.INVOICE_NUMBER}
                              </th>
                              <th className="!w-[160px]">{strings.DATE}</th>
                              <th className="!w-[95px]">
                                {strings.TOTAL_INVOICE}
                              </th>
                              <th className="!w-[150px]">{strings.STATUS}</th>
                              <th className="!w-[200px] searchFieldClass !mr-5">
                                <label
                                  htmlFor="search"
                                  className="flex py-3 px-5 justify-between items-center w-full"
                                >
                                  <input
                                    className="!w-full py-1 !font-normal"
                                    type="text"
                                    id="search"
                                    placeholder={placeholder.SEARCH_INVOICE}
                                  />
                                  <Icon
                                    icon="uil:search"
                                    width="24"
                                    height="24"
                                  />
                                </label>
                              </th>
                            </tr>
                          </div>
                          {arr.map((item, index) => (
                            <div
                              className="rounded-xl bg-white mb-3 !w-min"
                              key={index}
                            >
                              <tr className="flex justify-around items-center !w-max">
                                <td className=" !text-start !pl-4 !w-[190px]">
                                  <p className="text-[#2E2E2E] text-sm font-normal truncate ">
                                    INV/90481028123133
                                  </p>
                                </td>
                                <td className="!w-[160px] text-[#757575] text-sm font-medium">
                                  23/02/23
                                </td>
                                <td className="!w-[95px]">
                                  <div className="flex justify-center items-center gap-1">
                                    <p className="text-sm font-medium">$999</p>
                                  </div>
                                </td>
                                <td className="!w-[150px]">
                                  <span
                                    className={`${
                                      item.id == 1
                                        ? approveStyle
                                        : item.id == 2
                                        ? pendingStyle
                                        : ""
                                    } rounded-3xl text-xs font-medium py-2 px-3`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td className="!w-[200px] relative flex justify-end  !mr-5 !pb-3">
                                  <span className="flex justify-center text-xs text-[#0094FF] text-normal items-center gap-2 !py-2.5 bg-[#F5F5F5] px-2 cursor-pointer rounded-2xl">
                                    <Icon
                                      icon="solar:file-download-linear"
                                      color="#0094ff"
                                      width="16"
                                      height="16"
                                    />{" "}
                                    {strings.DOWNLOAD}
                                  </span>
                                </td>
                              </tr>
                            </div>
                          ))}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <PaymentMethodModal
          openPaymentMethod={openPaymentMethod}
          setOpenPaymentMethod={setOpenPaymentMethod}
          setAddCard={setAddCard}
        />
        <AddCardModal addCard={addCard} setAddCard={setAddCard} />
      </div>
    </>
  );
}

export default SetupBilling;
