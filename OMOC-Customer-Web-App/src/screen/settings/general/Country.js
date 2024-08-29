import React, { useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { placeholder, strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
const Country = () => {
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
                    <p className="text-2xl font-medium">{strings.COUNTRY}</p>
                  </div>
                  <div className="flex relative mt-4">
                    <div className="absolute left-2 top-3">
                      <Icon className="" icon="carbon:search" />
                    </div>
                    <input
                      className="bg-[#F5F5F5] pl-8 rounded-[14px] w-full py-2"
                      placeholder={placeholder.SEARCH}
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

export default Country;
