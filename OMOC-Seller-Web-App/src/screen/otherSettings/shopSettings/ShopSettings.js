import React, { useState } from "react";
import Header from "../../../component/Header";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
} from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { strings } from "../../../utils/strings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

function ShopSettings() {
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
                  <h3 className="text-[32px] font-bold">
                    {strings.SHOP_SETTINGS}
                  </h3>
                  <p className="text-[#7A7A7A] text-sm font-normal">
                    {strings.MANAGE_YOUR_SHOP_HERE}
                  </p>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.GENERAL_INFORMATION}
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate(
                                "/Other-settings/Shop-settings/General-information"
                              )
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.SHIPPING}
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate(
                                "/Other-settings/Shop-settings/Shop-shipping-rate"
                              )
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.LEGAL}
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate(
                                "/Other-settings/Shop-settings/Legal-policies"
                              )
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.MARKETS}
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate("/Other-settings/Shop-settings/FAQ")
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.NEWSLETTERS}
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate("/Other-settings/Shop-settings/FAQ")
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.BRAND}
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate(
                                "/Other-settings/Shop-settings/Your-brand"
                              )
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.TAXES_AND_CUSTOMS}
                        </AccordionSummary>
                        <AccordionDetails>
                          {" "}
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate("/Other-settings/Shop-settings/FAQ")
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.AGE_RESTRICTION}
                        </AccordionSummary>
                        <AccordionDetails>
                          {" "}
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate(
                                "/Other-settings/Shop-settings/Age-restriction"
                              )
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.USER_AND_PERMISSION}
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate(
                                "/Other-settings/Shop-settings/User-permission"
                              )
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.BILLING}
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate(
                                "/Other-settings/Shop-settings/Setup-billing"
                              )
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.SOCIAL}
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate(
                                "/Other-settings/Shop-settings/Social/Request"
                              )
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.FILES}
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate(
                                "/Other-settings/Shop-settings/Manage-files"
                              )
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div className="bg-white w-full my-4 rounded-xl">
                      <Accordion className="!shadow-none !rounded-xl">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          className="text-lg font-medium"
                        >
                          {strings.SHOP_STATUS}
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-[#756E6E] text-xs font-normal">
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor Lorem ipsum dolor sit
                            Lorem ipsum dolor sit amet consectetur. Hendrerit et
                            sit neque nulla laoreet auctor. Lorem ipsum dolor
                            sit amet consectetur. Hendrerit et sit neque nulla
                            laoreet auctor Lorem ipsum dolor sit Lorem ipsum
                            dolor sit amet consectetur. Hendrerit et sit neque
                            nulla laoreet auctor.
                          </p>
                          <button
                            onClick={() =>
                              navigate(
                                "/Other-settings/Shop-settings/Shop-status"
                              )
                            }
                            className="text-sm font-normal text-white bg-[#0094FF] py-3 px-4 rounded-3xl mt-4"
                          >
                            {strings.SETUP_YOUR_BRAND}
                          </button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default ShopSettings;
