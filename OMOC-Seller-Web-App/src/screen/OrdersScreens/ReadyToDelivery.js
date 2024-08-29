import React, { useEffect, useState } from "react";
import OrderInvoiceHeader from "../../component/OrderInvoiceHeader";
import OrderInvoiceSubHeader from "../../component/OrderInvoiceSubHeader";
import ShopOrderItem from "../../component/ShopOrderItem";
import { placeholder, strings } from "../../utils/strings";
import setting from "../../assets/icon/setting-2.svg";
import "./OrdersScreen.css";
import calender from "../../assets/icon/calendar.svg";
import CallChatNavigator from "../../component/CallChatNavigator";
import Header from "../../component/Header";
import SideMenuBar from "../../component/SIdeMenuBar";
import { Container, Grid } from "@mui/material";
import ProductSublyApi from "../../helper/ProductApi";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";

function ReadyToDelivery() {
  const { _id } = useSelector((state) => state.dashboard.shopInfo);
  const { token } = useSelector((state) => state.userData.userDetails);
  const [newOrderList, setNewOrderList] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  // ===============Order API for new order==============
  useEffect(() => {
    async function fetchOrderList() {
      setIsLoader(true);
      await ProductSublyApi.fetchOrderList(_id, "dispatched", token).then(
        (response) => {
          setIsLoader(false);
          if (response.statusCode == 200) {
            setNewOrderList(response.data);
          }
        }
      );
    }
    fetchOrderList();
  }, []);
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
              <div className="w-full pt-5">
                <div className="bg-[#F2F2F2] h-full">
                  <div className="flex justify-between items-center max-sm:flex-wrap">
                    <div>
                      <h2 className="text-3xl font-bold mb-1">
                        {strings.SHOP_ORDERS}
                      </h2>
                      <p className="font-normal text-sm text-gray-500">
                        {strings.MANAGE_YOUR_ORDER}
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-2 max-sm:mt-4">
                      <div className="flex justify-center items-center gap-2 rounded-3xl border-2 py-2.5 px-4 settingBtn">
                        <img src={setting} alt="setting" />
                        <p>{strings.SETTING}</p>
                      </div>
                      <div className="rounded-xl bg-white flex justify-center items-center gap-2 py-3 px-4">
                        <img src={calender} alt="calender" />
                        <p>20 Febuary 2023 - 20 March 2023</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <OrderInvoiceHeader />
                  </div>
                  {newOrderList && newOrderList.length > 0 && (
                    <div>
                      <OrderInvoiceSubHeader
                        placeholderText={placeholder.SEARCH_ORDER}
                        btnText={strings.ADD_TO_THE_PACK}
                        dropdownText={"Sort (newest)"}
                        delivered={true}
                      />
                    </div>
                  )}
                  <div className="max-h-[620px] overflow-auto">
                    {newOrderList && newOrderList.length > 0
                      ? newOrderList.map((items, index) => (
                          <ShopOrderItem
                            btnText={strings.REQUEST_TO_PICKUP}
                            readyToDeliver={true}
                            items={items}
                            index={index}
                          />
                        ))
                      : ""}
                  </div>
                  {newOrderList.length == 0 && (
                    <p className="text-center text-sm font-medium text-gray-500 py-3">
                      {strings.NO_RECORD_FOUND}
                    </p>
                  )}
                </div>
              </div>{" "}
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="bottom-10 right-14 fixed">
        <CallChatNavigator />
      </div>
    </>
  );
}

export default ReadyToDelivery;
