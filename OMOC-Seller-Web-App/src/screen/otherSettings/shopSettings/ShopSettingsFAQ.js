import React from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function ShopSettingsFAQ() {
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
              <div className="w-full">
                <div className="mt-5 mb-3">
                  <h3 className="text-[32px] font-bold">{strings.FAQ}</h3>
                  <p className="text-[#7A7A7A] text-sm font-normal">
                    {strings.MANAGE_YOUR_FAQ_ANSWER_USERS_QUESTUIONS}
                  </p>
                </div>
                <div className="flex items-center gap-5 my-8 max-sm:flex-wrap">
                  <div
                    onClick={() =>
                      navigate("/Other-settings/Shop-settings/General-FAQ")
                    }
                    className="rounded-lg bg-white py-7 px-6 w-full cursor-pointer"
                  >
                    <div className="flex justify-between items-center gap-4 mb-2">
                      <p className="text-lg font-semibold">
                        {strings.GENERAL_FAQ}
                      </p>
                      <Icon
                        icon="iconamoon:arrow-left-2"
                        width="25"
                        height="25"
                        rotate={2}
                      />
                    </div>
                    <p className="text-[#616161] font-normal text-base">
                      {strings.MANAGE_YOUR_FAQ_ANSWER_USERS_QUESTUIONS}
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      navigate("/Other-settings/Shop-settings/Product-FAQ")
                    }
                    className="rounded-lg bg-white py-7 px-6 w-full cursor-pointer"
                  >
                    <div className="flex justify-between items-center gap-4 mb-2">
                      <p className="text-lg font-semibold">
                        {strings.PRODUCT_FAQ}
                      </p>
                      <Icon
                        icon="iconamoon:arrow-left-2"
                        width="25"
                        height="25"
                        rotate={2}
                      />
                    </div>
                    <p className="text-[#616161] font-normal text-base">
                      {strings.MANAGE_YOUR_FAQ_ANSWER_USERS_QUESTUIONS}
                    </p>
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

export default ShopSettingsFAQ;
