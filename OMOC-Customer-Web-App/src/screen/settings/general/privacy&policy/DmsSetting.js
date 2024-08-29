import React, { useState } from "react";
import Header from "../../../../component/commonComponent/Header";
import { strings } from "../../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
const DmsSetting = () => {
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
                      icon="ep:arrow-up"
                      rotate={3}
                      onClick={() => {
                        navigate(-1);
                      }}
                    />
                    <p className="text-2xl font-medium">
                      {strings.DMS_SETTINGS}
                    </p>
                  </div>
                  <div className="border-b-[1px] py-3 cursor-pointer">
                    <div className="flex items-center justify-between  ">
                      <div>
                        <div className="flex items-center justify-between w-full">
                          <p className="text-lg">{strings.AUTO_REPLY_CHAT}</p>
                          <div class="form-check form-switch ">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                            />
                          </div>
                        </div>
                        <p className="text-sm text-[#9E9E9E] leading-6	mt-2">
                          {strings.LOREM_TEXT}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg">{strings.TEMPLATE_CHAT}</p>
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

export default DmsSetting;
