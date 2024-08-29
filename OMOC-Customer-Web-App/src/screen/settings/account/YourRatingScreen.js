import React from "react";
import Header from "../../../component/commonComponent/Header";
import { strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const YourRatingScreen = () => {
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
                  <p className="text-2xl font-medium ">
                    {strings.YOUR_RATINGS}
                  </p>
                  <div
                    className="flex items-center justify-between border-b-2 py-3 cursor-pointer"
                    onClick={() => {
                      navigate("/Setting/Your-Ratings/Need-To-Ratings");
                    }}
                  >
                    <p className="text-lg">{strings.NEED_TO_RATING}</p>
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                  <div
                    className="flex items-center justify-between border-b-2 py-3 cursor-pointer"
                    onClick={() => {
                      navigate("/Setting/Your-Ratings/History");
                    }}
                  >
                    <p className="text-lg">{strings.HISTORY}</p>
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

export default YourRatingScreen;
