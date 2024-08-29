import React from "react";
import Header from "../../component/Header";
import { Button, Container, Grid } from "@mui/material";
import SideMenuBar from "../../component/SIdeMenuBar";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import { ProductUpdateItem } from "./BarcodeProductItme";

function ProductBarcodeUpdate() {
  const { state } = useLocation();
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
      },
      {
        productName: "Hoodie Havana V1 -White",
        assignTo: "Barcode: 123456",
      },
      {
        productName: "Hoodie Havana V1 -White",
        assignTo: "Barcode: 123456",
        number: "1840812048",
      },
      {
        productName: "Hoodie Havana V1 -White",
        assignTo: "Barcode: 123456",
      },
      {
        productName: "Hoodie Havana V1 -White",
        assignTo: "Barcode: 123456",
      },
    ],
  };
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
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl font-bold mb-1">
                        {state.isSKUs
                          ? strings.SKUS_UPDATE
                          : strings.BARCODE_UPDATE}
                      </h2>
                      <span>
                        <Icon icon="carbon:warning" width="24" height="24" />
                      </span>
                    </div>
                    <button className="border-[#0094FF] border-2 rounded-3xl text-[#0094FF] font-base font-semibold py-3 px-8">
                      {strings.PRINT_REPORT}
                    </button>
                  </div>
                  <div className="rounded-xl bg-white p-6 my-8">
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-2xl font-bold">
                        {strings.UPDATED_PRODUCTS}
                      </p>
                      <p className="text-base font-semibold text-[#0094FF]">
                        {strings.CLEAR_ALL}
                      </p>
                    </div>
                    <ProductUpdateItem
                      productItems={
                        state.isSKUs ? productItems.SKUs : productItems.Barcode
                      }
                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default ProductBarcodeUpdate;
