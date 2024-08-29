import React, { useState } from "react";
import Header from "../../component/commonComponent/Header";
import { strings } from "../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import MainFooter from "../../component/appComponent/MainFooter";
import Loader from "../../utils/Loader";
import omocLogo from "../../assets/icon/omoc_black_logo.svg";
import hoodie from "../../assets/images/hoodie.png";

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

const MyOrderDetails = () => {
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
          <Container fluid>
            <Row>
              <Col md="9">
                <div className="bg-white rounded-xl p-3">
                  <div className="bg-[#F5F5F5] p-3 flex justify-between rounded-xl items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        {/* <p>icon</p> */}
                        <p className="text-[#C80000] text-lg">
                          {strings.YOU_HAVEPROPOSED_A_PRODUCT_RETURN_REFUND}
                        </p>
                      </div>
                      <p className="text-sm text-[#757575]">
                        {strings.SELLER_MUST_RESPOND_BEFORE}
                        <span>05/09/2023</span>
                      </p>
                    </div>
                    <div>
                      <button className="bg-[#C80000] px-4 py-2 rounded-3xl">
                        <p className="text-white font-medium">
                          {strings.CANCEL_COMPLAINT}
                        </p>
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between border-b-[1px] pb-4 items-center">
                    <div>
                      <p className="text-lg font-medium">
                        {strings.SHIPPING_INFORMATION}
                      </p>
                      <p className="text-sm text-[#242424]">
                        DHL Express - Regular Package
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#9E9E9E]">
                        {strings.TRACK}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between border-b-[1px] pb-4 items-center">
                    <div>
                      <p className="text-lg font-medium">
                        {strings.SHIPPING_ADDRESS}
                      </p>
                      <p className="text-sm text-[#242424]">Jonny Deep</p>
                      <p className="text-sm text-[#242424]">
                        DHL Express - Regular Package
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#9E9E9E]">
                        {strings.COPY}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-5 border-b-[1px] pb-2">
                    <div className="flex gap-2 ">
                      <img className="w-6 h-6 rounded-full" src={omocLogo} />
                      <p>{strings.OMOC_OFFICIAL}</p>
                    </div>
                    <p>{strings.CHECK_STORE}</p>
                  </div>
                  <div className="my-3 flex gap-3 border-b-[1px] pb-3">
                    <img width={77} height={77} src={hoodie} />
                    <div>
                      <p>{strings.HOODIE_HAVANA}</p>
                      <div className="flex items-center gap-1">
                        <p className="bg-[#F5F5F5] px-2 rounded-3xl mt-2 text-center text-xs">
                          Cream, Large
                        </p>
                        <p className="text-xs mt-2">x1</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between my-3 items-center">
                      <p className="text-lg	text-[#616161] font-medium">
                        {strings.SUBTOTAL_PRODUCT}
                      </p>
                      <p className="text-sm">$1800</p>
                    </div>
                    <div className="flex justify-between my-3 items-center">
                      <p className="text-lg	text-[#616161] font-medium">
                        {strings.SUBTOTAL_SHIPPING}
                      </p>
                      <p className="text-sm">$1800</p>
                    </div>
                    <div className="flex justify-between my-3 items-center">
                      <p className="text-lg	text-[#616161] font-medium">
                        {strings.SUBTOTAL_SHIPPING_DISCOUNT}
                      </p>
                      <p className="text-sm">$1800</p>
                    </div>
                    <div className="flex justify-between my-3 items-center">
                      <p className="text-lg	text-[#616161] font-medium">
                        {strings.TAX}
                      </p>
                      <p className="text-sm">$1800</p>
                    </div>
                    <div className="flex justify-between my-3 items-center border-b-[1px] border-[#EDEDED] pb-2">
                      <p className="text-lg	text-[#242424] font-medium">
                        {strings.TOTAL_PRICE}
                      </p>
                      <p className="text-2xl text-[#0094FF] font-medium">
                        $1800
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-lg	">{strings.INVOICE}</p>
                      <p className="text-sm">{strings.CHECK_INVOICE}</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="bg-white rounded-xl p-3 ">
                  <p className="border-b-[1px] pb-2 text-xl	font-bold ">
                    {strings.ORDER_DETAILS}
                  </p>
                  <div className="flex justify-between my-3">
                    <p className="font-medium"> {strings.ORDER_NUMBER}</p>
                    <p>124125125125</p>
                  </div>
                  <div className="flex justify-between my-3">
                    <p className="font-medium"> {strings.ORDER_DATE}</p>
                    <p>02-07-2023 08:30</p>
                  </div>
                  <div className="flex justify-between my-3">
                    <p className="font-medium"> {strings.PAYMENT_METHOD}</p>
                    <p>Bank Indonesia</p>
                  </div>
                  <div className="flex justify-between my-3">
                    <p className="font-medium"> {strings.PAYMENT_TIME}</p>
                    <p>02-07-2023 09:20</p>
                  </div>
                  <div className="flex justify-between my-3">
                    <p className="font-medium"> {strings.PAYMENT_DATE}</p>
                    <p>02-07-2023 09:20</p>
                  </div>
                  <div className="flex justify-between my-3">
                    <p className="font-medium"> {strings.TRACKING_NUMBER}</p>
                    <p>JXTQRF12</p>
                  </div>
                </div>
                <button className="rounded-3xl w-full border-[1px] py-2 mt-4 border-[#C2C2C2]">
                  <p className="font-medium">{strings.REQUEST_REFUND}</p>
                </button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default MyOrderDetails;
