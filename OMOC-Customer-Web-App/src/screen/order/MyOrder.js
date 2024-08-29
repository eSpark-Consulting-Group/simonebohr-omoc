import React, { useState } from "react";
import Header from "../../component/commonComponent/Header";
import { strings } from "../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../component/appComponent/MainFooter";
import Loader from "../../utils/Loader";
import ShowMyOrderComponent from "../../component/appComponent/ShowMyOrderComponent";

const data = [
  {
    shopName: "OmocOfficial",
    returnDate: "Apr 20 Return Received",
    productName: "Hoodie Havana V1",
    status: "Returned",
    price: "$1799 ",
  },
  {
    shopName: "OmocOfficial",
    returnDate: "Apr 20 Return Received",
    productName: "Hoodie Havana V1",
    status: "To Ship",
    price: "$1799 ",
  },
  {
    shopName: "OmocOfficial",
    returnDate: "Apr 20 Return Received",
    productName: "Hoodie Havana V1",
    status: "To Ship",
    price: "$1799 ",
  },
  {
    shopName: "OmocOfficial",
    returnDate: "Apr 20 Return Received",
    productName: "Hoodie Havana V1",
    status: "To Ship",
    price: "$1799 ",
  },
];

const MyOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All"); // Initialize active tab state

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <div className="mx-20 max-md:mx-6 ">
        <Header />
      </div>
      <div className="bg-[#F8F9FD] py-5">
        <div className="px-20 max-md:px-6 pt-3">
          <p className="text-[32px] font-bold">{strings.ORDER}</p>
          <div className="flex gap-3 mt-4">
            {/* Render tabs dynamically and apply active styles based on activeTab state */}
            {[
              "All",
              "Unpaid",
              "To Ship",
              "Shipped",
              "To Review",
              "Returns",
            ].map((tab) => (
              <p
                key={tab}
                className={`font-medium ${
                  activeTab === tab
                    ? "text-[#0094FF] border-b-2 border-[#0094FF]"
                    : "text-[#AEAEAE]"
                } px-3 cursor-pointer`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </p>
            ))}
          </div>
          <div className="mt-5">
            {data.map((item, index) => (
              <div key={index} className="my-4">
                <ShowMyOrderComponent item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default MyOrder;
