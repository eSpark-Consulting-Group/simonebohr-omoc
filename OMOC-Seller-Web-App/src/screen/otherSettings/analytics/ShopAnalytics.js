import React, { useState } from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import CanvasJSReact from "@canvasjs/react-charts";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const options = {
  theme: "light1",
  animationEnabled: true,
  exportEnabled: false,
  title: {
    text: "Shop Statisics",
  },
  //   axisY: {
  //     title: "Number of iPhones ( in Million )",
  //   },
  data: [
    {
      type: "area",
      xValueFormatString: "HH",
      yValueFormatString: "#,##0.## Million",
      dataPoints: [
        {x:1,y:0},
        {x:2,y:20},
        {x:4,y:15},
        {x:6,y:90   },
      ],
    },
  ],
};
const cardData = [
  {
    type: "New Orders",
    value: "20",
  },
  {
    type: "Revenue",
    value: "$ 100,000",
  },
  {
    type: "Visitors",
    value: "$ 100,000",
  },
];

const Manage = () => {
  return (
    <div
      className="rounded-2xl flex justify-end items-end absolute top-12 right-0 bg-white shadow-lg p-2"
    >
      <div className="bg-white  rounded-2xl z-10">
        <div className=" w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer">
          <p className="text-sm">{strings.LIVE_VIEW}</p>
        </div>
        <div className="w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer">
          <p className="text-sm">{strings.DAILY}</p>
        </div>
        <div className="w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer">
          <p className="text-sm">{strings.MONTHLY}</p>
        </div>
        <div className="w-40 h-9 flex items-center rounded-lg p-2.5 mx-auto my-3 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer">
          <p className="text-sm">{strings.YEAR}</p>
        </div>
      </div>
    </div>
  );
}; 

const ShopAnalytics = () => {
  const[showView ,setShowView] = useState(false)
  
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
            <div className="flex justify-between items-center mt-5 ">
              <div>
                <h2 className="font-bold text-[32px]">
                  {strings.SHOP_ANALYTICS}
                </h2>
                <p className="text-[#7A7A7A] text-sm">
                  {strings.MANAGE_SHOP_ORDER}
                </p>
              </div>
              <button
                className="flex justify-center items-center bg-white px-6 py-3 rounded-2xl	 gap-3 relative"
                onClick={() => {
                  setShowView(!showView);
                }}
              >
                <p className="text-">{strings.VIEW_BY}</p>
                <Icon icon="ep:arrow-up-bold" rotate={2} />
              {showView &&  <Manage />}
              </button>
            </div>

            <div className="flex gap-5 max-sm:flex-wrap my-5 max-sm:gap-4">
              {cardData.map((val, index) => {
                return (
                  <div className="bg-white rounded-xl py-3 px-5 w-1/3 max-sm:w-full ">
                    <div className="flex my-5">
                      <p>{val.type}</p>
                      <Icon
                        width="44"
                        height="24"
                        icon="fluent:info-32-regular"
                        rotate={2}
                      />
                    </div>
                    <p className="text-4xl font-bold">{val.value}</p>
                    <div className="flex items-center my-5 justify-end text-[#0094FF] gap-2">
                      <p className="text-sm font-medium	">
                        {strings.SEE_DETAILS}
                      </p>
                      <Icon icon="ep:arrow-up-bold" rotate={1} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mb-5">
              <CanvasJSChart options={options} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ShopAnalytics;
