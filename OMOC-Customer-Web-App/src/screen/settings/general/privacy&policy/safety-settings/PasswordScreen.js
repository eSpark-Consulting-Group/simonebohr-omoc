import React, { useState } from "react";
import Header from "../../../../../component/commonComponent/Header";
import { placeholder, strings } from "../../../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const PasswordScreen = () => {
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
                    <p className="text-2xl font-medium">{strings.PASSWORD}</p>
                  </div>
                  <p className="text-sm text-[#9E9E9E] leading-6">
                    {strings.LOREM_TEXT}
                  </p>
                  <div className="my-4">
                    <input
                      className="border-[1px] p-3 w-full rounded-[14px] mt-2"
                      placeholder={placeholder.CURRENT_PASSWORD}
                    />
                    <input
                      className="border-[1px] p-3 w-full rounded-[14px] mt-2"
                      placeholder={placeholder.NEW_PASSWORD}
                    />
                    <input
                      className="border-[1px] p-3 w-full rounded-[14px] mt-2"
                      placeholder={placeholder.CONFIRM_NEW_PASSWORD}
                    />
                  </div>
                  <button className="h-[51px] px-4 rounded-[24px] bg-[#EDEDED]">
                    <p className="text-[#C2C2C2] font-medium">{strings.SAVE}</p>
                  </button>
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

export default PasswordScreen;
