import React, { useState } from "react";
import Header from "../../../../component/commonComponent/Header";
import { strings } from "../../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const data = [
  { id: 1, title: "ZARA", status: "ALLOWED" },
  { id: 2, title: "GUCCI", status: "PENDING" },
];

const BrandedContent = () => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [show, setShow] = useState(null);
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
                    <div className="flex gap-2 items-center ">
                      <Icon
                        icon="ep:arrow-up"
                        rotate={3}
                        onClick={() => {
                          navigate(-1);
                        }}
                      />
                      <p className="text-2xl font-medium">
                        {strings.BRANDED_CONTENT}
                      </p>
                    </div>
                    {data.map((val, index) => {
                      return (
                        <div className="border-b-[1px] py-3 cursor-pointer">
                          <div className="flex items-center justify-between  ">
                            <div>
                              <p className="text-lg">{val.title}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <p className="text-sm text-[#9E9E9E]">
                                  {strings.STATUS}
                                </p>
                                <p
                                  className={`text-sm ${
                                    val.status === "ALLOWED"
                                      ? "text-[#22C55E]"
                                      : "text-[#FACC15]"
                                  } font-medium`}
                                >
                                  {val.status}
                                </p>
                              </div>
                            </div>
                            <div className="relative">
                              <Icon
                                width={24}
                                height={24}
                                icon="ph:dots-three-vertical-bold"
                                onClick={() => {
                                  setShowInfo(!showInfo);
                                  setShow(val.id);
                                }}
                              />
                              {showInfo && show === val.id && (
                                <div className="bg-white p-4 rounded-xl shadow-lg mt-3 absolute right-4 top-4 w-40">
                                  <p className="font-medium text-xs">
                                    {strings.RESEND_REQUEST}
                                  </p>
                                  <p className="font-medium text-xs my-3">
                                    {strings.CHAT_THE_BRAND}
                                  </p>
                                  <p className="font-medium text-xs text-[#C80000]">
                                    {strings.DELETE_PERMISSION}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
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
    </div>
  );
};

export default BrandedContent;
