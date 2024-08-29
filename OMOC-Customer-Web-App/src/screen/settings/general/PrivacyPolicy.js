import React, { useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const data = [
  { title: "Request Verification", path: "" },
  { title: "Contact Sync", path: "" },
  { title: "DMs Settings", path: "/Setting/Privacy-Policy/DmsSetting" },
  { title: "Branded Content", path: "/Setting/Privacy-Policy/BrandedContent" },
  { title: "Your Activity", path: "/Setting/Privacy-Policy/Your-Activity" },
  { title: "Devices", path: "/Setting/Privacy-Policy/Devices" },
  { title: "Feedback", path: "/Setting/Privacy-Policy/Feedback" },
  { title: "About Your Data", path: "/Setting/Privacy-Policy/About-Your-Data" },
  { title: "Advertising", path: "/Setting/Privacy-Policy/Advertising" },
];
const PrivacyPolicy = () => {
  const navigate = useNavigate();

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
                  <p className="text-2xl font-medium">
                    {strings.PRIVACY_AND_POLICY}
                  </p>
                  <div className="mt-3 ">
                    <div className="border-b-[1px] py-3 px-2 cursor-pointer flex items-center justify-between  ">
                      <p className="text-lg">{strings.PRIVATE_ACCOUNT}</p>
                      <div class="form-check form-switch ">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                        />
                      </div>
                    </div>
                    {data.map((val) => {
                      return (
                        <div
                          className="border-b-[1px] py-3 px-2 cursor-pointer flex items-center justify-between  "
                          onClick={() => {
                            navigate(val.path);
                          }}
                        >
                          <p className="text-lg">{val.title}</p>
                          <Icon icon="ep:arrow-up" rotate={1} />
                        </div>
                      );
                    })}
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

export default PrivacyPolicy;
