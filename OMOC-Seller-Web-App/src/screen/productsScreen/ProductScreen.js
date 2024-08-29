import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import ProductInventory from "./ProductInventory";
import Header from "../../component/Header";
import SideMenuBar from "../../component/SIdeMenuBar";
import CallChatNavigator from "../../component/CallChatNavigator";
import Loader from "../../utils/Loader";

const ProductScreen = () => {
  const [isLoader, setIsLoader] = useState(false);

  return (
    <>
      {isLoader ? <Loader /> : ""}
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
              <ProductInventory setIsLoader={setIsLoader} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default ProductScreen;
