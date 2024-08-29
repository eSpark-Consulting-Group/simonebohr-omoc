import React, { useState } from "react";
import Header from "../../component/commonComponent/Header";
import { strings } from "../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../component/appComponent/MainFooter";
import PersonalInformation from "./account/PersonalInformation";
import Loader from "../../utils/Loader";

const SettingScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      {isLoading ? <Loader /> : ""}
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
                <PersonalInformation setIsLoading={setIsLoading} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default SettingScreen;
