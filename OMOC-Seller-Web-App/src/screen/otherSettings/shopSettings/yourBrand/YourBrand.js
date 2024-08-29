import React, { useState } from "react";
import Header from "../../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../../component/SIdeMenuBar";
import { strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import logo from "../../../../assets/icon/Frame 20.svg";
import instagram from "../../../../assets/icon/socialMedia/Instagram.svg";
import facebook from "../../../../assets/icon/socialMedia/Facebook.svg";
import twitter from "../../../../assets/icon/socialMedia/Twitter.svg";
import printer from "../../../../assets/icon/socialMedia/Pinterest.svg";
import tiktok from "../../../../assets/icon/socialMedia/Tik Tok.svg";
import snap from "../../../../assets/icon/socialMedia/Snapchat.svg";
import EditProfile from "./EditProfile";

function YourBrand() {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const response = {
    data: [
      { image: instagram, isUpdate: true },
      { image: facebook, isUpdate: true },
      { image: twitter, isUpdate: true },
      { image: tiktok, isUpdate: true },
      { image: printer, isUpdate: false },
      { image: snap, isUpdate: true },
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
              <div className="w-full">
                <div className="mt-5 mb-3">
                  <h3 className="text-[32px] font-bold">
                    {strings.YOUR_BRAND}
                  </h3>
                  <p className="text-[#7A7A7A] text-sm font-normal">
                    {strings.MANAGE_YOUR_SHOP_HERE}
                  </p>
                </div>
                <div className="mt-8 mb-6 flex items-center gap-6">
                  <img src={logo} className="h-20 w-20 rounded-full" />
                  <div>
                    <p className="text-base font-medium">OMOC OFFICIAL</p>
                    <p className="text-[#7A7A7A] text-sm font-normal flex items-center gap-2">
                      <Icon
                        icon="ooui:edit"
                        color="#7a7a7a"
                        width="16"
                        height="16"
                        cursor={"pointer"}
                        onClick={() => setOpenEditProfile(true)}
                      />
                      {strings.EDIT_YOUR_BRAND_NAME}
                    </p>
                  </div>
                </div>
                <div className="mt-5 mb-8">
                  <h3 className="text-[32px] font-bold">
                    {strings.SOCIAL_MEDIA}
                  </h3>
                  <p className="text-[#7A7A7A] text-sm font-normal">
                    {strings.MANAGE_YOUR_BRAND_SOCIAL_MEDIA}
                  </p>
                </div>
                <Grid container spacing={3} className="my-5">
                  {response.data.map((items, index) => (
                    <Grid item xs={12} sm={6} md={6} key={index}>
                      <div className="bg-white rounded-xl border border-[#E8E8E8] py-3.5 px-4 flex justify-between items-center">
                        <div className="flex items-center gap-3 w-full">
                          <img src={items.image} />
                          {items.isUpdate ? (
                            <p>OMOC OFFICIAL</p>
                          ) : (
                            <input
                              type="text"
                              placeholder="add your pinterest account"
                              className="w-full"
                            />
                          )}
                        </div>
                        {items.isUpdate ? (
                          <div className="flex items-center gap-3">
                            <Icon
                              icon="teenyicons:tick-circle-outline"
                              color="#22c55e"
                              width="22"
                              height="22"
                            />
                            <Icon
                              icon="ooui:edit"
                              color="#7a7a7a"
                              width="16"
                              height="16"
                            />
                          </div>
                        ) : (
                          <Icon
                            icon="fluent:add-20-filled"
                            width="22"
                            height="22"
                          />
                        )}
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
        <EditProfile
          openEditProfile={openEditProfile}
          setOpenEditProfile={setOpenEditProfile}
        />
      </div>
    </>
  );
}

export default YourBrand;
