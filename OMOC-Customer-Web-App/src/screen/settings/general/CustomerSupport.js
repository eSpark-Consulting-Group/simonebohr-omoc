import React, { useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
const CustomerSupport = () => {
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
                    {strings.CUSTOMER_SUPORT}
                  </p>
                  <p className="text-[#9E9E9E] text-sm my-3 leading-6	">
                    {strings.LOREM_TEXT}
                  </p>
                  <div
                    className="flex items-center justify-between border-b-[1px] py-3 px-2 cursor-pointer"
                    onClick={() => {
                      navigate("/Setting/Customer-Support/FAQ");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#F5F5F5]">
                        <Icon
                          width={30}
                          height={30}
                          color="#0094FF"
                          icon="arcticons:verizon-messages"
                        />
                      </div>
                      <p className="text-lg">
                        {strings.FREQUENTLY_ASKED_QUESTION}
                      </p>
                    </div>
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                  <div
                    className="flex items-center justify-between border-b-[1px] py-3 px-2 cursor-pointer"
                    onClick={() => {
                      navigate("/Setting/Language-Country/Country");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#F5F5F5]">
                        <Icon
                          width={30}
                          height={30}
                          color="#0094FF"
                          icon="arcticons:verizon-messages"
                        />
                      </div>
                      <p className="text-lg">{strings.CONTACT_LIVE_CHAT}</p>
                    </div>
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

export default CustomerSupport;
