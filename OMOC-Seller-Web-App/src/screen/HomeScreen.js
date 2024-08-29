import React, { useState } from "react";
import Header from "../component/Header";
import DashboardScreen from "./DashboardScreen";
import UpgradeShopDashboard from "../component/UpgradeShopDashboard";
import OrdersScreen from "./OrdersScreens/OrdersScreen";
import NoteMessageModal from "../component/NoteMessageModal";
import SideMenuBar from "../component/SIdeMenuBar";
import { Container, Grid } from "@mui/material";
import Loader from "../utils/Loader";
import { useSelector } from "react-redux";

const cardData = [
  { text: "New Orders", number: 10 },
  { text: "New Chat", number: 5 },
  { text: "Shipped", number: 120 },
  { text: "Delivered", number: 110 },
  { text: "Product Discussions ", number: 23 },
  { text: "Customer Reviews", number: 80 },
];

const HomeScreen = () => {
  const { isLoading } = useSelector((state) => state.dashboard);

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <div className={` bg-[#F2F2F2] h-full`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <Grid container spacing={2}>
            <Grid item md={3} xs={12} className="w-full">
              <SideMenuBar isDashboard={true} />
            </Grid>
            <Grid item md={9} xs={12}>
              <div className="w-full pt-5">
                <DashboardScreen />
              </div>{" "}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default HomeScreen;
