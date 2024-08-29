import React, { useState } from "react";
import Header from "../../../../component/commonComponent/Header";
import { strings } from "../../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const data = [
  { deviceName: "Desktop", place: "Sukabumi", date: "", active: "active" },
  {
    deviceName: "Macbook Pro 13",
    place: "Sukabumi",
    date: "24 jan 2022",
    active: null,
  },
];
const Devices = () => {
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
                    <p className="text-2xl font-medium">{strings.DEVICES}</p>
                  </div>
                  {data.map((val, index) => {
                    return (
                      <div className="flex items-center justify-between mt-3 border-b-[1px] pb-3">
                        <div>
                          <p className="text-lg">{val.deviceName}</p>
                          <div className="flex gap-2 ml-1">
                            <p className="text-sm">{val.active}</p>
                            <p className="text-sm text-[#9E9E9E]">{val.date}</p>
                            <p className="text-sm text-[#9E9E9E]">Sukabumi</p>
                          </div>
                        </div>
                        <Icon
                          width={24}
                          height={24}
                          icon="solar:logout-outline"
                          color="#C80000"
                        />
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

export default Devices;
