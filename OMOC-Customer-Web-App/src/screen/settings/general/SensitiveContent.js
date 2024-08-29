import React, { useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { placeholder, strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
const SensitiveContent = () => {
  const navigate = useNavigate();

  return (
    <div>
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
                        {strings.SENSITIVE_CONTENT}
                      </p>
                    </div>
                    <p className="text-sm text-[#9E9E9E] my-4 px-2">
                      {strings.LOREM_TEXT}
                    </p>
                    <div className="px-2">
                      <p className="font-semibold">
                        {strings.CHOOSE_HOW_MUCH_SENSITIVE_CONTENT_SEE}
                      </p>
                      <div className="my-4 flex items-center justify-between">
                        <div>
                          <p className="text-lg">{strings.STANDARD}</p>
                          <p className="text-[#9E9E9E] text-sm">
                            Lorem ipsum dolor sit amet consectetur.`
                          </p>
                        </div>
                        <input className="w-5 h-5" type="radio" />
                      </div>
                      <div className="my-4 flex items-center justify-between">
                        <div>
                          <p className="text-lg">{strings.LESS}</p>
                          <p className="text-[#9E9E9E] text-sm">
                            Lorem ipsum dolor sit amet consectetur.`
                          </p>
                        </div>
                        <input className="w-5 h-5" type="radio" />
                      </div>
                      <p className="text-sm text-[#9E9E9E]">
                        {strings.THIS_AFFECTS_SEARCH_RESULT}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <MainFooter />
      </div>
    </div>
  );
};

export default SensitiveContent;
