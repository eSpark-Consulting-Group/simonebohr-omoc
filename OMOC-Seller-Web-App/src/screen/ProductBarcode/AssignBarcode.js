import React, { useState } from "react";
import Header from "../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../component/SIdeMenuBar";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import bag from "../../assets/icon/bag-happy.svg";
import BarcodeProductItem from "./BarcodeProductItme";
import AddProductFAQModal from "./AddProductFAQModal";
import { useNavigate } from "react-router-dom";

function AssignBarcode() {
  const navigate = useNavigate();
  const [assignValue, setAssignValue] = useState("");
  const [openProductFAQModal, setOpenProductFAQModal] = useState(false);
  const productItems = {
    SKUs: [
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
    Barcode: [
      {
        productName: "Hoodie Havana V1 -White",
        assignTo: "Barcode: 123456",
        number: "1840812048",
      },
      {
        productName: "Hoodie Havana V1 -White",
        assignTo: "Barcode: 123456",
        number: "1840812048",
      },
      {
        productName: "Hoodie Havana V1 -White",
        assignTo: "Barcode: 123456",
        number: "1840812048",
      },
    ],
  };

  return (
    <div>
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
                      {strings.ASSIGN_BARCODE}
                    </h2>
                    <span>
                      <Icon icon="carbon:warning" width="24" height="24" />
                    </span>
                  </div>
                  <div className="flex items-center gap-5 my-6 max-sm:flex-wrap">
                    <div className="rounded-xl bg-white p-6 w-full">
                      <h3 className="text-2xl font-bold mb-6">
                        {strings.ASSIGN_TO_THE}
                      </h3>
                      <div className="flex items-center gap-4 mb-4">
                        <input
                          type="radio"
                          className="w-6 h-6"
                          name="assign"
                          value={1}
                          onChange={(e) => {
                            setAssignValue(e.target.value);
                          }}
                        />
                        <div>
                          <p className="text-xl font-semibold">
                            {strings.SKUS}
                          </p>
                          <span className="text-base font-normal text-[#616161]">
                            {strings.ASSIGN_THE_GENERATED_CODE_SKUS}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          className="w-6 h-6"
                          name="assign"
                          value={2}
                          onChange={(e) => {
                            setAssignValue(e.target.value);
                          }}
                        />
                        <div>
                          <p className="text-xl font-semibold">
                            {strings.BARCODE}
                          </p>
                          <span className="text-base font-normal text-[#616161]">
                            {strings.ASSIGN_THE_GENERATED_CODE_BARCODE}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl bg-white p-6 w-full">
                      <h3 className="text-2xl font-bold mb-6">
                        {strings.CREATE_SKUS_USING}
                      </h3>
                      <div className="flex items-center gap-4 mb-4">
                        <input type="radio" className="w-6 h-6" name="create" />
                        <div>
                          <p className="text-xl font-semibold">
                            {strings.A_UNIQUELY_GENERATED_NUMBER}
                          </p>
                          <span className="text-base font-normal text-[#616161]">
                            {strings.EASYSCAN_GENERATES_UNIQUE_NUMBER}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <input type="radio" className="w-6 h-6" name="create" />
                        <div>
                          <p className="text-xl font-semibold">
                            {strings.VARIAN_ID}
                          </p>
                          <span className="text-base font-normal text-[#616161]">
                            {strings.THE_PRODUCT_VARIANT_DIGIT}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-6">
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-2xl font-bold">
                        {strings.PRODUCT_TO_UPDATE}
                      </p>
                      <p className="text-base font-semibold text-[#0094FF]">
                        {strings.CLEAR_ALL}
                      </p>
                    </div>
                    {assignValue ? (
                      <BarcodeProductItem
                        productItems={
                          assignValue == 1
                            ? productItems.SKUs
                            : productItems.Barcode
                        }
                      />
                    ) : (
                      <div className="text-center my-8">
                        <img
                          src={bag}
                          alt="bag"
                          className="w-24 h-24 m-auto mb-6"
                        />
                        <p className="text-2xl font-semibold mb-6 w-1/2 m-auto max-lg:w-8/12">
                          {strings.SELECT_YOUR_PRODUCTS}
                        </p>
                        <button className="bg-[#0094FF] rounded-3xl text-white font-base font-semibold py-3 px-4">
                          {strings.SELELCT_PRODUCT_BTN}
                        </button>
                      </div>
                    )}
                  </div>
                  {assignValue && (
                    <div className="flex justify-end items-center gap-4 mt-6">
                      {" "}
                      <button
                        onClick={() => {
                          setOpenProductFAQModal(!openProductFAQModal);
                        }}
                        className=" border-[#0094FF] border-2 rounded-3xl text-[#0094FF] font-base font-semibold py-3 px-4"
                      >
                        {strings.ADD_PRODUCT}
                      </button>{" "}
                      <button
                        onClick={() => {
                          navigate(
                            `${
                              assignValue == 1
                                ? "/Product/Barcode/SKUs-update"
                                : "/Product/Barcode/Barcode-update"
                            }`,
                            {
                              state: {
                                isSKUs: assignValue == 1 ? true : false,
                              },
                            }
                          );
                        }}
                        className=" bg-[#0094FF] rounded-3xl text-white font-base font-semibold py-3 px-4"
                      >
                        {assignValue == 1
                          ? strings.ASSIGN_ALL_SKUS
                          : strings.ASSIGN_ALL_BARCODE}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <AddProductFAQModal
        openProductFAQModal={openProductFAQModal}
        setOpenProductFAQModal={setOpenProductFAQModal}
      />
    </div>
  );
}

export default AssignBarcode;
