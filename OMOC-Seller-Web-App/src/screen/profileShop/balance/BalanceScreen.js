import React from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import SideMenuBar from "../../../component/SIdeMenuBar";
import { strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";

const cardData = [
  {
    brandName: strings.HOODIE_HAVANA,
    invoic: strings.INVOIC,
    date: "12 jan 2023",
    price: "$ 999,000",
    amount: "999",
    status: "Pending",
  },
  {
    brandName: strings.HOODIE_HAVANA,
    invoic: strings.INVOIC,
    date: "12 jan 2023",
    price: "$ 999,000",
    amount: "999",
    status: "Success",
  },
];

const BalanceCard = () => {
  return (
    <Container className="flex my-5">
      <Grid className="flex gap-5 max-md:flex-wrap max-md:justify-center">
        <Grid item xs={12} sm={6} md={4}>
          <div className="bg-white px-5 py-5 rounded-lg">
            <div className="flex items-center gap-3">
              <p className="text-base text-[#757575]">{strings.PENDING}</p>
              <Icon icon="fluent:info-24-regular" color="#969696" rotate={2} />
            </div>
            <p className="text-4xl text-[#242424] mt-3 font-bold	">$ 100,000</p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="bg-white px-5 py-5 rounded-lg">
            <div className="flex items-center gap-3">
              <p className="text-base text-[#757575]">{strings.REFUND}</p>
              <Icon icon="fluent:info-24-regular" color="#969696" rotate={2} />
            </div>
            <p className="text-4xl text-[#242424] mt-3 font-bold	">$ 100,000</p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="bg-white px-5 py-5 rounded-lg">
            <div className="flex items-center gap-3">
              <p className="text-base text-[#757575]">
                {strings.READY_TO_PAYOUT}
              </p>
              <Icon icon="fluent:info-24-regular" color="#969696" rotate={2} />
            </div>
            <p className="text-4xl text-[#242424] mt-3 font-bold	">$ 100,000</p>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

const BalanceScreen = () => {
  return (
    <div className={`bg-[#F2F2F2] h-full`}>
      <div className=" w-full bg-[#fff] fixed top-0 z-20">
        <Header />
      </div>
      <Container className="pt-28">
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <SideMenuBar />
          </Grid>
          <Grid item md={9} xs={12}>
            <div className="flex justify-between items-center max-sm:flex-wrap">
              <div>
                <h1 className="text-3xl font-bold mb-1 mt-5">
                  {strings.BALANCE}
                </h1>
                <p className="text-[#7A7A7A]">
                  {strings.MANGE_YOUR_SHOP_ORDER}
                </p>
              </div>
              <button className="bg-[#0094FF] px-8 py-4 rounded-[30px] w-[153px] h-[53px] max-sm:mt-4">
                <p className="text-white">{strings.PAYOUT_NOW}</p>
              </button>
            </div>
            <div className="border-b-4 ">
              <BalanceCard />
            </div>
            <div className="flex w-full gap-3 max-sm:flex-wrap mt-5">
              <div className="w-2/3 bg-white flex justify-around items-center h-14 rounded-lg max-sm:w-full">
                <p>All Transaction</p>
                <p className="text-[#C2C2C2] text-sm font-semibold">
                  Shop Transaction
                </p>
                <p className="text-[#C2C2C2] text-sm font-semibold">Refund</p>
              </div>
              <div className="w-1/3 h-14 bg-white rounded-lg max-sm:w-1/2">
                <input className="w-full py-3 px-4 rounded-lg" type="date" />
              </div>
            </div>
            <div className="overflow-auto">
              <div className="w-max">
                <div className="flex justify-between px-5 bg-white py-5 my-5 rounded-lg w-[860px]">
                  <p>{strings.NAME_OF_PRODUCT}</p>
                  <p>{strings.PRICE}</p>
                  <p>{strings.AMOUNT}</p>
                  <p className="mr-10">{strings.STATUS}</p>
                </div>
                {cardData.map((val, index) => {
                  return (
                    <div>
                      <div className="flex justify-between bg-white p-3 items-center rounded-lg mt-5">
                        <div className="">
                          <p className="text-xs font-semibold">
                            {val.brandName}
                          </p>
                          <p className="text-xs font-medium	text-[#7A7A7A] my-1">
                            {val.invoic}
                          </p>
                          <p className="text-xs text-[#7A7A7A]">{val.date}</p>
                        </div>
                        <p className="text-xs font-medium text-[#7A7A7A] my-1">
                          {val.price}
                        </p>
                        <p className="text-xs font-medium text-[#7A7A7A] my-1">
                          {val.amount}
                        </p>
                        <div className="flex">
                          {/* <div className="mr-7 h-7 w-16	bg-[#FACC151A] rounded-3xl	flex justify-center items-center">
                    <p className="text-xs font-medium text-[#FACC15] my-1">
                      Pending
                    </p>
                    </div> */}
                          <div
                            className={`mr-7 h-7 w-16	${
                              val.status === "Pending"
                                ? "bg-[#FACC151A] text-[#FACC15]"
                                : "bg-[#0094FF1A] text-[#0094FF]"
                            } rounded-3xl	flex justify-center items-center`}
                          >
                            <p className="text-xs font-medium  my-1">
                              {val.status}
                            </p>
                          </div>
                          <Icon
                            className="mt-1 "
                            icon="ph:dots-three-bold"
                            color="black"
                            rotate={1}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BalanceScreen;
