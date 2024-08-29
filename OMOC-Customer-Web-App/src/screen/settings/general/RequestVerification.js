import React, { useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { placeholder, strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import exportIcon from "../../../assets/icon/export_icon.svg";

const RequestVerification = () => {
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
                      {strings.REQUEST_VERIFICATION}
                    </p>
                  </div>
                  <div className="w-4/6	mx-auto">
                    <img className="mx-auto" src={exportIcon} />
                    <p className="text-2xl	font-semibold text-center my-5">
                      {strings.SELECT_IMAGE_YOU_UPLOAD}
                    </p>
                    <p className="text-lg font-medium text-[#9E9E9E] leading-7	text-center my-5">
                      {strings.DRAG_AND_DROP_IMAGE}
                    </p>
                    <p className="text-lg font-medium text-[#9E9E9E] leading-7	text-center my-5">
                      {strings.LOREM_TEXT}
                    </p>
                    <div className="flex justify-center">
                      <button className="bg-[#0094FF] py-3 w-1/2 rounded-[24px]">
                        <p className="text-white font-medium">
                          {strings.SELECT_FILE}
                        </p>
                      </button>
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

export default RequestVerification;
