import React from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { strings } from "../../../utils/strings";
import { useNavigate } from "react-router-dom";

const MarketingScreen = () => {
  const navigate = useNavigate();
  return (
    <div className={`!bg-[#f2f2f2] h-full`}>
      <div className=" w-full bg-[#fff] fixed top-0 z-20">
        <Header />
      </div>
      <Container className="pt-28">
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <SideMenuBar />
          </Grid>
          <Grid item md={9} xs={12}>
            <div className="mt-5">
              <h2 className="font-bold text-[32px]">{strings.MARKETING}</h2>
              <p className="text-[#7A7A7A] text-sm">
                {strings.MANAGE_YOUR_FAQ_ANSWER_USERS_QUESTUIONS}
              </p>
            </div>
            <div className="flex gap-5 max-sm:flex-wrap my-5">
              <div className="w-1/2 bg-white rounded-2xl p-5 max-sm:w-full">
                <h2 className="text-center text-2xl	font-bold">
                  {strings.TOP_ADS}
                </h2>
                <p className="text-[#616161] text-center px-16 my-5 leading-7">
                  {strings.YOU_CAN_SETUP_COUNTRY_SEE_YOUR_PRODUCT}
                </p>
                <button
                  className="bg-[#0094FF] rounded-[30px] py-4 px-8 w-[95%] mx-3 "
                  onClick={() => {
                    navigate("/Other-settings/Marketing/TopAds");
                  }}
                >
                  <p className="text-white">{strings.CREATE_YOUR_AD_NOW}</p>
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MarketingScreen;
