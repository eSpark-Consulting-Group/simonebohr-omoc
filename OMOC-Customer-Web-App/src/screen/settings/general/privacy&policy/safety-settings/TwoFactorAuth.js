import React, { useState } from "react";
import Header from "../../../../../component/commonComponent/Header";
import { strings } from "../../../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import RemoveLoginInfoModal from "../../../../../component/appComponent/RemoveLoginInfoModal";
import TwoFactorModal from "../../../../../component/appComponent/TwoFactorModal";
const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState(false);
  return (
    <div>
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
                  <div className="flex gap-2 items-center ">
                    <Icon
                      icon="ep:arrow-up"
                      rotate={3}
                      onClick={() => {
                        navigate(-1);
                      }}
                    />
                    <p className="text-2xl font-medium">
                      {strings.TWO_FACTOE_AUTHENTICATION}
                    </p>
                  </div>
                  <div className="flex justify-between items-center my-3 ml-2">
                    <p className="text-lg">
                      {strings.TWO_FACTOE_AUTHENTICATION}
                    </p>
                    <div class="form-check form-switch ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                    </div>
                  </div>
                  <p
                    className="text-sm text-[#9E9E9E] ml-2"
                    onClick={() => {
                      setLoginInfo(true);
                    }}
                  >
                    {strings.LOREM_TEXT}
                  </p>
                </div>
                {loginInfo && (
                  <TwoFactorModal
                    openModal={loginInfo}
                    closedModal={() => {
                      setLoginInfo(false);
                    }}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default TwoFactorAuth;
