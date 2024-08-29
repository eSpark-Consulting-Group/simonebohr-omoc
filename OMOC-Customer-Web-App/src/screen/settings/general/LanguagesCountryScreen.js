import React, { useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const LanguagesCountryScreen = () => {
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
                    {strings.LANGUAGE_COUNTRY}
                  </p>
                  <div
                    className="flex items-center justify-between border-b-[1px] py-3 px-2 cursor-pointer"
                    onClick={() => {
                      navigate("/Setting/Language-Country/Language");
                    }}
                  >
                    <p className="text-lg">{strings.LANGUAGES}</p>
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                  <div
                    className="flex items-center justify-between border-b-[1px] py-3 px-2 cursor-pointer"
                    onClick={() => {
                      navigate("/Setting/Language-Country/Country");
                    }}
                  >
                    <p className="text-lg">{strings.COUNTRY}</p>
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

export default LanguagesCountryScreen;
