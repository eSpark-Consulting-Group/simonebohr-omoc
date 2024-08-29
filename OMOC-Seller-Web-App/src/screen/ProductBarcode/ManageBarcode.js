import React from "react";
import Header from "../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../component/SIdeMenuBar";
import { strings } from "../../utils/strings";
import { useNavigate } from "react-router-dom";

function ManageBarcode() {
  const navigate = useNavigate();
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
                  <div>
                    <h2 className="text-3xl font-bold mb-1">
                      {strings.MANAGE_YOUR_BARCODE}
                    </h2>
                    <p className="font-normal text-sm text-[#7A7A7A]">
                      {strings.MANAGE_SHOP_ORDER}
                    </p>
                  </div>
                  <div className="text-center rounded-xl bg-white py-10 px-32 my-6 max-sm:py-10 max-sm:px-10">
                    <h3 className="text-2xl font-semibold text-[#2A2A2A] leading-10 mb-1">
                      {strings.BARCODE_AND_SKUS_INVENTORY}
                    </h3>
                    <p className="text-base font-normal leading-6">
                      {strings.TO_PRINT_BARCODE_LABELS}
                    </p>
                    <div className="flex justify-center items-center gap-6 mt-6">
                      <button
                        onClick={() => {
                          navigate("/Product/Barcode/Print-barcode-label");
                        }}
                        className="rounded-3xl text-[#0094FF] font-base font-semibold py-3 px-4 border border-[#0094FF]"
                      >
                        {strings.PRINT_BARCODE_LABELS}
                      </button>
                      <button
                        onClick={() => {
                          navigate("/Product/Barcode/Assign-barcode");
                        }}
                        className="rounded-3xl text-[#0094FF] font-base font-semibold py-3 px-4 border border-[#0094FF]"
                      >
                        {strings.ASSIGN_BARCODE}
                      </button>
                    </div>
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

export default ManageBarcode;
