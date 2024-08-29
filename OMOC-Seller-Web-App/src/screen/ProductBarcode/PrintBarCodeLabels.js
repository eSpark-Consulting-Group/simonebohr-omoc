import React, { useState } from "react";
import Header from "../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../component/SIdeMenuBar";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import bag from "../../assets/icon/bag-happy.svg";
import AddProductFAQModal from "./AddProductFAQModal";
import { BarcodeLabelsItem } from "./BarcodeProductItme";

function PrintBarcodeLabels() {
  const productItems = {
    products: [
      {
        productName: "Hoodie Havana V1 -White",
        assignTo: "SKU: 123456",
        number: "1840812048",
      },
      {
        productName: "Hoodie Havana V1 -White",
        assignTo: "SKU: 123456",
        number: "1840812048",
      },
      {
        productName: "Hoodie Havana V1 -White",
        assignTo: "SKU: 123456",
        number: "1840812048",
      },
    ],
  };
  const [openProductFAQModal, setOpenProductFAQModal] = useState(false);

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
              <div className="w-full pt-5">
                <div className="bg-[#F2F2F2] h-full">
                  <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-bold mb-1">
                      {strings.PRINT_BARCODE_LABELS}
                    </h2>
                    <span>
                      <Icon icon="carbon:warning" width="24" height="24" />
                    </span>
                  </div>
                  <div className="rounded-xl bg-white p-4 my-8">
                    <h4 className="text-2xl font-bold">
                      {strings.SAVE_TEMPLATE_OPTIONAL}
                    </h4>
                    <div className="flex items-center gap-4 py-4">
                      <input
                        type="text"
                        className="w-full border rounded-2xl py-4 px-5"
                        placeholder={placeholder.TEMPLATE_NAME}
                      />
                      <button className="rounded-3xl w-52 text-[#0094FF] font-base font-semibold py-3 px-7 border border-[#0094FF]">
                        {strings.SAVE_TEMPLATE}
                      </button>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-4 my-8">
                    <h4 className="text-2xl font-bold mb-4">
                      {strings.LABEL_LAYOUT}
                    </h4>
                    <div>
                      <p className="text-xl font-normal text-[#2A2A2A] mb-2">
                        {strings.ABOVE_BARCODE}
                      </p>
                      <select className="rounded-xl border-[#EDEDED] border-2 px-4 py-4 w-full mb-6">
                        <option>Product Name</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-xl font-normal text-[#2A2A2A] mb-2">
                        {strings.GENERATE_THE_BARCODE_SYSMBOL}
                      </p>
                      <select className="rounded-xl border-[#EDEDED] border-2 px-4 py-4 w-full mb-6">
                        <option>Product SKU</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-xl font-normal text-[#2A2A2A] mb-2">
                        {strings.BELOW_BARCODE}
                      </p>
                      <select className="rounded-xl border-[#EDEDED] border-2 px-4 py-4 w-full mb-6">
                        <option>Product Price</option>
                      </select>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-4 mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-2xl font-bold">
                        {strings.BARCODE_LABELS}
                      </p>
                      <div className="flex items-center gap-6">
                        <p className="text-base font-semibold text-[#0094FF]">
                          {strings.CLEAR_ALL}
                        </p>
                        <p className="text-base font-semibold text-[#0094FF]">
                          {strings.PRINT_ALL}
                        </p>
                      </div>
                    </div>
                    {/* {assignValue ? (
                      <BarcodeProductItem
                        productItems={
                          assignValue == 1
                            ? productItems.SKUs
                            : productItems.Barcode
                        }
                      />
                    ) : ( */}
                    <div className="text-center my-8 hidden">
                      <img
                        src={bag}
                        alt="bag"
                        className="w-24 h-24 m-auto mb-6"
                      />
                      <p className="text-2xl font-semibold mb-6 w-1/2 m-auto max-lg:w-8/12">
                        {strings.SELECT_YOUR_PRODUCTS}
                      </p>
                      <button
                        onClick={() => {
                          setOpenProductFAQModal(!openProductFAQModal);
                        }}
                        className="bg-[#0094FF] rounded-3xl text-white font-base font-semibold py-3 px-4"
                      >
                        {strings.SELELCT_PRODUCT_BTN}
                      </button>
                    </div>
                    <BarcodeLabelsItem productItems={productItems.products} />
                    {/* )} */}
                  </div>
                  <div className="flex justify-end items-center gap-4 my-6">
                    {" "}
                    <button
                      onClick={() => {
                        setOpenProductFAQModal(!openProductFAQModal);
                      }}
                      className="border-[#0094FF] border-2 rounded-3xl text-[#0094FF] font-base font-semibold py-3 px-4"
                    >
                      {strings.ADD_PRODUCT}
                    </button>{" "}
                    <button className=" bg-[#0094FF] rounded-3xl text-white font-base font-semibold py-3 px-4">
                      {strings.PRINT_ALL_LABELS}
                    </button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <AddProductFAQModal
          openProductFAQModal={openProductFAQModal}
          setOpenProductFAQModal={setOpenProductFAQModal}
        />
      </div>
    </>
  );
}

export default PrintBarcodeLabels;
