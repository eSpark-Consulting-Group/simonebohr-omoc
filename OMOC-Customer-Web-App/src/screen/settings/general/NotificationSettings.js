import React, { useEffect, useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import SettingSublyApi from "../../../helper/SettingsApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../utils/Loader";
const NotificationSettings = () => {
  const { token } = useSelector((state) => state.userData.userDetails);

  const navigate = useNavigate();
  const [showShop, setShowShop] = useState(false);
  const [omocNotification, setOmocNotification] = useState(false);
  const [messageNotification, setMessageNotification] = useState(false);
  const [newPostNotification, setNewPostNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function UserNotification(eventValue, index) {
    setIsLoading(true);
    const res = {
      omocNotification: index == 0 ? eventValue : omocNotification,
      messageNotification: index == 1 ? eventValue : messageNotification,
      newPostNotification: index == 2 ? eventValue : newPostNotification,
    };
    await SettingSublyApi.postUserNotification(token, res).then((response) => {
      setIsLoading(false);
      if (response.statusCode == 200) {
        toast.success(response.message);
      }
    });
  }
  useEffect(() => {
    async function fetchNotification() {
      setIsLoading(true);
      await SettingSublyApi.getUserNotification(token).then((response) => {
        setIsLoading(false);
        const newData = response.data;
        setOmocNotification(newData.omocNotification);
        setMessageNotification(newData.messageNotification);
        setNewPostNotification(newData.newPostNotification);
      });
    }
    fetchNotification();
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
                    {strings.NOTIFICATION_SETTINGS}
                  </p>
                  <div className="flex items-center justify-between border-b-[1px] py-3 px-2 ">
                    <p className="text-lg">Notification from Omoc</p>
                    <div class="form-check form-switch ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={omocNotification}
                        onChange={(e) => {
                          setOmocNotification(e.target.checked);
                          console.log(e.target.checked);
                          UserNotification(e.target.checked, 0);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b-[1px] py-3 px-2 ">
                    <p className="text-lg">Message Notification</p>
                    <div class="form-check form-switch ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={messageNotification}
                        onChange={(e) => {
                          setMessageNotification(e.target.checked);
                          console.log(e.target.checked);
                          UserNotification(e.target.checked, 1);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b-[1px] py-3 px-2 ">
                    <p className="text-lg">New post Notification</p>
                    <div class="form-check form-switch ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={newPostNotification}
                        onChange={(e) => {
                          setNewPostNotification(e.target.checked);
                          console.log(e.target.checked);
                          UserNotification(e.target.checked, 2);
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-between border-b-[1px] py-3 px-2 cursor-pointer"
                    onClick={() => {
                      navigate(
                        "/Setting/Notification-Setting/Custom-Notification"
                      );
                    }}
                  >
                    <p className="text-lg">
                      {strings.CUSTOM_NOTIFICATION_SHOP}
                    </p>
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                  <div
                    className="flex items-center justify-between border-b-[1px] py-3 px-2 cursor-pointer"
                    onClick={() => {
                      navigate(
                        "/Setting/Notification-Setting/Product-Notification"
                      );
                    }}
                  >
                    <p className="text-lg">{strings.PRODUCT_NOTIFICATION}</p>
                    <Icon icon="ep:arrow-up" rotate={1} />
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

export default NotificationSettings;
