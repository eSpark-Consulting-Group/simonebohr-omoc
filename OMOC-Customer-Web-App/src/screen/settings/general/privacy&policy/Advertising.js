import React, { useState } from "react";
import Header from "../../../../component/commonComponent/Header";
import { placeholder, strings } from "../../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import omoLogo from "../../../../assets/icon/omoc_black_logo.svg";

const data = [1, 2, 3];
const Advertising = () => {
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
                        {strings.COOKIES_SETTING}
                      </p>
                    </div>
                    <div className="border-b-[1px] py-3 px-2">
                      <div className="flex items-center justify-between  mt-3">
                        <p className="text-lg">
                          {strings.RESCEIVE_ALL_SHOP_ADVERTISEMENTS}
                        </p>
                        <div class="form-check form-switch ">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="border-b-[1px] py-3 px-2">
                      <div className="flex items-center justify-between  mt-2">
                        <p className="text-lg">
                          {strings.RESCEIVE_ALL_SHOP_ADVERTISEMENTS}
                        </p>
                        <div class="form-check form-switch ">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                          />
                        </div>
                      </div>
                      {data.map(() => {
                        return (
                          <div className="flex justify-between items-center my-3">
                            <div className="flex items-center gap-2 ">
                              <img src={omoLogo} />
                              <p>{strings.OMOC_OFFICIAL}</p>
                              <Icon
                                icon="bitcoin-icons:verify-filled"
                                color="#3d9ffb"
                              />
                            </div>
                            <Icon
                              width={20}
                              height={20}
                              icon="radix-icons:cross-2"
                            />
                          </div>
                        );
                      })}
                      <div className="flex">
                        <input
                          className="w-full p-2"
                          placeholder={placeholder.WRITE_THE_SHOP_NAME}
                        />
                        <Icon
                          width={20}
                          height={20}
                          icon="radix-icons:cross-2"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 border-b-[1px] items-center py-3">
                      <Icon
                        cursor="pointer"
                        width={16}
                        height={16}
                        icon="mingcute:add-line"
                        color="#0094FF"
                      />
                      <p className="text-[#0094FF] font-medium cursor-pointer">
                        {strings.ADD_SHOP}
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

export default Advertising;
