import React, { useEffect, useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SettingSublyApi from "../../../helper/SettingsApi";
import { toast } from "react-toastify";
import Loader from "../../../utils/Loader";
const data = [
  { title: "Receive notifications when favorite products are available" },
  { title: "Receive notifications when products are back in stock" },
  { title: "Receive updates on sales and latest promotions" },
];

const ProductNotification = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userData.userDetails);
  const [favNotification, setFavNotification] = useState(false);
  const [stockNotification, setStockNotification] = useState(false);
  const [updateNotification, setUpdateNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function Postproduct(eventValue, index) {
    setIsLoading(true);
    const notification = {
      favProductsAvailable: index == 0 ? eventValue : favNotification,
      productInStock: index == 1 ? eventValue : stockNotification,
      productUpdates: index == 2 ? eventValue : updateNotification,
    };
    await SettingSublyApi.postUserNotification(token, notification)
      .then((response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          toast.success(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    async function getProduct() {
      setIsLoading(true);
      await SettingSublyApi.getUserNotification(token).then((response) => {
        setIsLoading(false);
        const res = response.data;
        setFavNotification(res.favProductsAvailable);
        setStockNotification(res.productInStock);
        setUpdateNotification(res.productUpdates);
      });
    }
    getProduct();
  }, []);

  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <div className="mx-20 max-md:mx-6 ">
        <Header />
      </div>
      <div className="bg-[#F8F9FD] py-5">
        <div className="px-20 max-md:px-6 pt-3">
          <p className="text-[32px] font-bold">{strings.SETTINGS}</p>
          <Container className="py-4" fluid>
            <Row>
              <Col md="3">
                <SettingsSideBar />
              </Col>
              <Col md="9">
                <div className="bg-white rounded-xl p-3">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon
                      icon="ep:arrow-up"
                      rotate={3}
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(-1);
                      }}
                    />
                    <p className="text-2xl font-medium ">
                      {strings.PRODUCT_NOTIFICATION}
                    </p>
                  </div>
                  {/* {data.map((val) => ( */}
                  <div className="flex items-center justify-between border-b-[1px] py-3 px-2 ">
                    <p className="text-lg">
                      {strings.PRODUCT_NOTIFICATION_FAVORITE}
                    </p>
                    <div class="form-check form-switch ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={favNotification}
                        onChange={(e) => {
                          setFavNotification(e.target.checked);
                          console.log(e.target.checked);
                          Postproduct(e.target.checked, 0);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b-[1px] py-3 px-2 ">
                    <p className="text-lg">
                      {strings.PRODUCT_NOTIFICATION_STOCK}
                    </p>
                    <div class="form-check form-switch ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={stockNotification}
                        onChange={(e) => {
                          setStockNotification(e.target.checked);
                          console.log(e.target.checked);
                          Postproduct(e.target.checked, 1);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b-[1px] py-3 px-2 ">
                    <p className="text-lg">
                      {strings.PRODUCT_NOTIFICATION_SALES}
                    </p>
                    <div class="form-check form-switch ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={updateNotification}
                        onChange={(e) => {
                          setUpdateNotification(e.target.checked);
                          console.log(e.target.checked);
                          Postproduct(e.target.checked, 2);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default ProductNotification;
