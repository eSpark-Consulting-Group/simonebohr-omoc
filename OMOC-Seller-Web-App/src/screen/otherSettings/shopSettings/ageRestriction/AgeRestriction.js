import React from "react";
import Header from "../../../../component/Header";
import { Container, Grid, Switch } from "@mui/material";
import SideMenuBar from "../../../../component/SIdeMenuBar";
import { strings } from "../../../../utils/strings";

function AgeRestriction() {
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
                <div className="mt-5 mb-3">
                  <h3 className="text-[32px] font-bold">
                    {strings.AGE_RESTRICTION}
                  </h3>
                  <p className="text-[#7A7A7A] text-sm font-normal">
                    {strings.MANAGE_YOUR_SHOP_HERE}
                  </p>
                </div>
                <div className="w-3/5 max-md:w-full my-6">
                  <div className="flex items-center gap-4 justify-between">
                    <p className="text-xl font-medium">
                      {strings.AGE_RESTRICTION_FOR_SHOP}
                    </p>
                    <Switch />
                  </div>
                  <p className="text-[#575757] text-sm font-normal">
                    {strings.YOU_CAN_CUSTOM_YOUR_MESSAGE_FR_YOUR_SHOP}
                  </p>
                  <div className="flex items-center gap-4 justify-between mt-6">
                    <p className="text-xl font-medium">
                      {strings.AGE_RESTRICTION_FOR_PRODUCT}
                    </p>
                    <Switch />
                  </div>
                  <p className="text-[#575757] text-sm font-normal">
                    {strings.YOU_CAN_CUSTOM_YOUR_MESSAGE_FR_YOUR_SHOP}
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default AgeRestriction;
