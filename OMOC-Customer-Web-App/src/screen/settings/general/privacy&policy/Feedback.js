import React, { useState } from "react";
import Header from "../../../../component/commonComponent/Header";
import { strings } from "../../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import FeedbackModal from "../../../../component/appComponent/FeedbackModal";
const Feedback = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

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
                    <p className="text-2xl font-medium">{strings.FEEDBACK}</p>
                  </div>
                  <div
                    className="flex items-center justify-between mt-3 border-b-[1px] py-3 cursor-pointer"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <p className="text-lg">
                      {strings.TELL_US_ABOUT_YOUR_FEEDBACK}
                    </p>
                    <Icon icon="ep:arrow-up" rotate={1} />
                  </div>
                </div>
                {openModal && (
                  // <FeedBackModal
                  //   isOpen={openModal}
                  //   closeModal={() => {
                  //     setOpenModal(false);
                  //   }}
                  // />
                  <FeedbackModal
                    isOpen={openModal}
                    closeModal={() => {
                      setOpenModal(false);
                    }}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default Feedback;
