import React from "react";
import Header from "../../component/Header";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import SideMenuBar from "../../component/SIdeMenuBar";
import { Container, Grid } from "@mui/material";
import PostAndStoryHeader from "./PostAndStoryHeader";
import product1 from "../../assets/image/productImg/product 1.png";
import product2 from "../../assets/image/productImg/product 2.png";
import product3 from "../../assets/image/productImg/product 3.png";
import calender from "../../assets/icon/calendar.svg";

function PostAndStoriesSchedule() {
  const product = [
    { product: product1 },
    { product: product2 },
    { product: product3 },
  ];

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
                  <PostAndStoryHeader isSchedule={true} />
                  <div className="my-7">
                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      {product.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <div className="mb-7">
                            <div className="h-60 overflow-hidden">
                              <img
                                src={item.product}
                                className="rounded-t-xl bg-[#F7F6F4] w-full h-full"
                                alt="product"
                              />
                            </div>
                            <div className="bg-white flex justify-between items-center py-3 px-3 rounded-b-xl">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <img src={calender} />
                                </div>
                                <div className="flex items-center gap-2">
                                  <p className="text-base font-normal">
                                    20 Feb 2023,{" "}
                                    <span className="font-semibold">12.30</span>{" "}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <Icon
                                  icon="tabler:dots-vertical"
                                  width="24"
                                  height="24"
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                      ))}
                    </Grid>
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

export default PostAndStoriesSchedule;
