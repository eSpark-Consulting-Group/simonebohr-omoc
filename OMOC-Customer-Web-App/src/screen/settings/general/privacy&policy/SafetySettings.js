import React, { useState } from "react";
import Header from "../../../../component/commonComponent/Header";
import { strings } from "../../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
const data = [
  {
    id: 1,
    title: "Password",
    path: "/Setting/Privacy-Policy/About-Your-Data/Safety-Settings/Password",
  },
  {
    id: 2,
    title: "Login Activity",
    path: "/Setting/Privacy-Policy/About-Your-Data/Safety-Settings/Login-Activity",
  },
  {
    id: 3,
    title: "Saved Login Information",
    path: "/Setting/Privacy-Policy/About-Your-Data/Safety-Settings/Saved-Login-Information",
  },
  {
    id: 4,
    title: "Two-factor authentication",
    path: "/Setting/Privacy-Policy/About-Your-Data/Safety-Settings/Two-factor-authentication",
  },
  { id: 4, title: "Delete your data", path: "" },
];
const SafetySettings = () => {
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
                  <div className="flex gap-2 items-center ">
                    <Icon
                      cursor="pointer"
                      icon="ep:arrow-up"
                      rotate={3}
                      onClick={() => {
                        navigate(-1);
                      }}
                    />
                    <p className="text-2xl font-medium">
                      {strings.SAFETY_SETTINGS}
                    </p>
                  </div>
                  <p className="text-sm text-[#9E9E9E] leading-6	">
                    {strings.LOREM_TEXT}
                  </p>
                  {data.map((val, index) => {
                    return (
                      <div className="border-b-[1px] py-3 px-2 cursor-pointer">
                        <div
                          className="flex items-center justify-between  "
                          onClick={() => {
                            navigate(val.path);
                          }}
                        >
                          <p className="text-lg">{val.title}</p>
                          <Icon icon="ep:arrow-up" rotate={2} />
                        </div>
                      </div>
                    );
                  })}
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

export default SafetySettings;
