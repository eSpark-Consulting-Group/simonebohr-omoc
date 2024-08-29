import React, { useEffect, useState } from "react";
import DashboardCards from "../component/DashboardCards";
import search_icon from "../assets/icon/search_icon.svg";
import shirt_pic from "../assets/image/shirt_pic.png";
import play_icon from "../assets/icon/play_icon.svg";
import pen_icon from "../assets/icon/pen_icon.svg";
import threeDot_icon from "../assets/icon/threeDot_icon.svg";
import message_icon from "../assets/icon/message_icon.svg";
import phone_icon from "../assets/icon/phone_icon.svg";
import CallComponent from "../component/CallComponent";
import { placeholder, strings } from "../utils/strings";
import CallChatNavigator from "../component/CallChatNavigator";
import DashboardSublyApi from "../helper/DashboardApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../Store/Slices/DashboardSlice";
import { Icon } from "@iconify/react";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userData.userDetails);
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { dashboardData } = useSelector((state) => state.dashboard.dashboard);
  const { shopInfo } = useSelector((state) => state.dashboard);
  const cardData = [
    { text: "New Orders", number: dashboardData ? dashboardData.newOrders : 0 },
    { text: "New Chat", number: dashboardData ? dashboardData.newChat : 0 },
    {
      text: "Shipped",
      number: dashboardData ? dashboardData.shippedProducts : 0,
    },
    { text: "Delivered", number: dashboardData ? dashboardData.delivered : 0 },
    {
      text: "Product Discussions ",
      number: dashboardData ? dashboardData.productDiscussions : 0,
    },
    {
      text: "Customer Reviews",
      number: dashboardData ? dashboardData.customerReviews : 0,
    },
  ];

  const [showCall, setShowCall] = useState(false);
  const handleShowCall = () => {
    if (showCall === false) {
      setShowCall(true);
    }
    if (showCall === true) {
      setShowCall(false);
    }
  };

  // ==============Fetch Dashboard data API=================
  useEffect(() => {
    handleDashboard();
  }, [shopInfo]);
  async function handleDashboard() {
    await dispatch(fetchDashboard({ shopId: _id, token: token }));
  }
  return (
    <div>
      <div className="">
        <div className="mt-5 flex gap-5 flex-wrap justify-center">
          {cardData.map((val) => {
            return <DashboardCards data={val} />;
          })}
        </div>
        <div className="w-full  bg-[#fff] rounded-xl my-5 py-4 ">
          <div className="mx-5 pt-5 lg:flex">
            <div className="flex items-center w-full relative">
              <input
                className=" lg:w-11/12 w-full border-2 rounded-[30px]  px-4 h-12"
                placeholder={placeholder.SEARCH_SELLER_DASHBOARD}
              />
              <img
                className="w-[19px] right-14"
                src={search_icon}
                style={{ position: "absolute" }}
              />
            </div>
            <div className="flex w-full justify-between">
              <div className="flex items-center lg:w-full relative  w-1/2 mt-2 lg:mt-0">
                <input
                  className=" w-full border-2 rounded-[30px]  px-4 h-12 "
                  placeholder={placeholder.CREATED_NEWEST}
                />
                <Icon
                  icon="mingcute:down-line"
                  width="20"
                  height="20"
                  style={{ color: "black" }}
                  className="absolute right-6"
                />
              </div>
              <button className="lg:w-7/12 mt-2 lg:mt-0 w-1/2 px-4 h-12 bg-[#0094FF] rounded-[30px] ml-5">
                <p className="text-[#fff]"> {strings.NEW_THEAM}</p>
              </button>
            </div>
          </div>
          <div className="flex bg-[#F5F5F5] justify-between h-[52px] items-center mx-5 my-10 rounded-lg">
            <div>
              <p className="ml-5">{strings.YOUR_SHOP_PAGE}</p>
            </div>
            <div className="flex justify-between gap-32 mr-10 max-sm:gap-16">
              <p>{strings.STATUS}</p>
              <p>{strings.ACTION}</p>
            </div>
          </div>
          <div className="flex  justify-between  ml-6 my-4 ">
            <div className="flex justify-center items-center max-sm:flex-wrap">
              <div className="w-[150px] h-[100px] bg-[#EDEDED] rounded-xl flex justify-center items-center mr-5 ">
                <img className="" src={shirt_pic} />
              </div>
              <div className="max-sm:mt4">
                <p>Hatypo Shop Page</p>
                <div className="flex gap-5 mt-2">
                  <img src={pen_icon} />
                  <img src={play_icon} />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-32 mr-10 max-sm:gap-16">
              <div className="w-[87px] h-[36px] bg-[#22C55E1A] rounded-[31px] flex justify-center items-center">
                <p className="text-[#22C55E] text-center p-2">Published</p>
              </div>
              <img src={threeDot_icon} />
            </div>
          </div>
        </div>
        {showCall && <CallComponent />}
      </div>
      <div className="bottom-10 right-14 fixed">
        <CallChatNavigator />
      </div>
    </div>
  );
};

export default DashboardScreen;
