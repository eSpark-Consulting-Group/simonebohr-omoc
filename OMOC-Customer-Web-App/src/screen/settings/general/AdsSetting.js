import React, { useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { placeholder, strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const AdsSetting = () => {
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
                  <div className="flex items-center gap-3">
                    <Icon
                      icon="ep:arrow-up"
                      rotate={3}
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(-1);
                      }}
                    />
                    <p className="text-2xl font-medium">
                      {strings.ADS_SETTINGS}
                    </p>
                  </div>
                  <div className="border-b-[1px] py-3 px-2">
                    <div className="flex items-center justify-between  mt-3">
                      <p className="text-lg">{strings.PERSONALIZED_ADS}</p>
                      <div class="form-check form-switch ">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-[#9E9E9E] mt-2 leading-6	">
                      {strings.LOREM_TEXT}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3 px-2">
                    <p className="text-lg">{strings.SEE_YOUR_DATA}</p>
                    <Icon
                      icon="ep:arrow-up"
                      rotate={1}
                      className="cursor-pointer"
                    />
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

export default AdsSetting;
