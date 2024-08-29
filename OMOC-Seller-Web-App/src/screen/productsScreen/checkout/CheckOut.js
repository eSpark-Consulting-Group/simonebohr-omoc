import React from "react";
import { Container, Grid, Switch } from "@mui/material";
import { Icon } from "@iconify/react";
import Header from "../../../component/Header";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { placeholder, strings } from "../../../utils/strings";
const CheckOut = () => {
  return (
    <>
      <div className={`!bg-[#f2f2f2] h-full`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <Grid container spacing={2}>
            <Grid item md={3} xs={12} className="w-full">
              <SideMenuBar />
            </Grid>
            <Grid item md={9} xs={12}>
              <h1 className="text-[32px] font-bold my-5">{strings.CHECKOUT}</h1>
              <div className="flex items-center  justify-between w-7/12	">
                <p className="text-xl	">{strings.ACTIVATE_TERMS_CONDITION}</p>
                <Switch />
              </div>
              <p className="text-sm text-[#575757] my-5">
                {strings.ALLOW_USERS_VIEW_TERMS_CONDITION}
              </p>
              <p className="text-sm text-[#757575] font-medium	">
                {strings.CONFIGURE_CONDITION_CHECKED_BY_BUYER}
              </p>
              <input
                className="bg-white px-3 py-4 w-full rounded-xl my-3"
                placeholder={placeholder.WRITE_TERMS_CONDITION}
              />
              <p className="text-sm text-[#9E9E9E] font-medium">
                {strings.THIS_IS_PRE_OWNED_ITEM}
              </p>
              <div className="flex items-center gap-2 my-5">
                <Icon
                  width="25"
                  height="25"
                  icon="material-symbols-light:add"
                  color="#0094FF"
                />
                <p className="text-[#0094FF] font-medium">
                  {strings.ADD_NEW_TERMS_CONDITION}
                </p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default CheckOut;
