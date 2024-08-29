import React, { useEffect, useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import SettingSublyApi from "../../../helper/SettingsApi";
import { toast } from "react-toastify";
import Loader from "../../../utils/Loader";

const data = [
  { title: "Notification for New Product" },
  { title: "Notification for Events" },
  { title: "Notification for Sale/promo" },
];

const NewsletterScreen = () => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [showShop, setShowShop] = useState(false);
  const [newsLatterEmail, setNewsLatterEmail] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState(false);
  const [notificationEvents, setNotificationEvents] = useState(false);
  const [notificationSale, setNotificationSale] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function postNewsLatter(eventValue, index) {
    setIsLoading(true);
    const newsData = {
      omocNewsLetterByEmail: index == 0 ? eventValue : newsLatterEmail,
      newProductNotification: index == 1 ? eventValue : notificationProduct,
      eventsNotification: index == 2 ? eventValue : notificationEvents,
      saleNotification: index == 3 ? eventValue : notificationSale,
    };
    await SettingSublyApi.newsLatter(token, newsData).then((res) => {
      setIsLoading(false);
      if (res.statusCode == 200) {
        toast.success(res.message);
      }
    });
  }

  useEffect(() => {
    async function fetchNewsLatter() {
      setIsLoading(true);
      await SettingSublyApi.getNewsLatter(token).then((response) => {
        setIsLoading(false);
        setNewsLatterEmail(response.data.omocNewsLetterByEmail);
        setNotificationProduct(response.data.newProductNotification);
        setNotificationEvents(response.data.eventsNotification);
        setNotificationSale(response.data.saleNotification);
      });
    }
    fetchNewsLatter();
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
                  <p className="text-2xl font-medium">
                    {strings.YOUR_NEWSLETTER}
                  </p>
                  <div className="flex items-center justify-between border-b-[1px] py-3 px-2 mt-3">
                    <p className="text-lg">{strings.NEWSLETTER_FROM_OMOC}</p>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={newsLatterEmail}
                        onChange={(e) => {
                          setNewsLatterEmail(e.target.checked);
                          console.log(e.target.checked);
                          postNewsLatter(e.target.checked, 0);
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-between border-b-[1px] py-3 px-2 "
                    onClick={() => {
                      setShowShop(!showShop);
                    }}
                  >
                    <p className="text-lg">{strings.SHOP_NOTIFICATION}</p>
                    <Icon icon="ep:arrow-up" rotate={showShop ? 4 : 2} />
                  </div>
                  {showShop && (
                    <>
                      <div className="flex items-center justify-between border-b-[1px] py-3 px-2 ">
                        <p className="text-lg">Notification for New Product</p>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={notificationProduct}
                            onChange={(e) => {
                              setNotificationProduct(e.target.checked);
                              console.log(e.target.checked);
                              postNewsLatter(e.target.checked, 1);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-b-[1px] py-3 px-2 ">
                        <p className="text-lg">Notification for Events</p>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={notificationEvents}
                            onChange={(e) => {
                              setNotificationEvents(e.target.checked);
                              console.log(e.target.checked);
                              postNewsLatter(e.target.checked, 2);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-b-[1px] py-3 px-2 ">
                        <p className="text-lg">Notification for Sale/promo</p>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={notificationSale}
                            onChange={(e) => {
                              setNotificationSale(e.target.checked);
                              console.log(e.target.checked);
                              postNewsLatter(e.target.checked, 3);
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
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

export default NewsletterScreen;
