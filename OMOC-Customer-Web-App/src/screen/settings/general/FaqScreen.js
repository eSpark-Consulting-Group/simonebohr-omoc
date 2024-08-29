import React, { useEffect, useState } from "react";
import Header from "../../../component/commonComponent/Header";
import { strings } from "../../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import MainFooter from "../../../component/appComponent/MainFooter";
import { Icon } from "@iconify/react";
import SettingSublyApi from "../../../helper/SettingsApi";
import { useSelector } from "react-redux";
const data = [
  { id: 1, title: "When will my order ship?" },
  { id: 2, title: "Do you offer free shipping?" },
  { id: 3, title: "When will my order ship?" },
  { id: 4, title: "When will my order ship?" },
  { id: 5, title: "When will my order ship?" },
  { id: 6, title: "When will my order ship?" },
  { id: 7, title: "When will my order ship?" },
  { id: 8, title: "When will my order ship?" },
];
const FaqScreen = () => {
  const { token } = useSelector((state) => state.userData.userDetails);

  const [showShop, setShowShop] = useState(false);
  const [show, setShow] = useState(null);

  useEffect(() => {
    async function fetchFaq() {
      await SettingSublyApi.getFaq(token).then((response) => {
        console.log("-------", response);
      });
    }
    fetchFaq();
  }, []);
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
                  <div className="flex justify-between otems-center">
                    <p className="text-2xl font-medium">
                      {strings.FREQUENTLY_ASKED_QUESTION}
                    </p>
                    <button className="bg-[#0094FF] px-3 py-2 rounded-[32px]">
                      <p className="text-white text-xs">{strings.LIVE_CHAT}</p>
                    </button>
                  </div>
                  {data.map((val, index) => {
                    const showId = index + 1;
                    return (
                      <div className="border-b-[1px] py-3 px-2 cursor-pointer">
                        <div
                          className="flex items-center justify-between  "
                          onClick={() => {
                            setShow(val.id);
                            setShowShop(!showShop);
                          }}
                        >
                          <p className="text-lg">{val.title}</p>
                          <Icon icon="ep:arrow-up" rotate={showShop ? 4 : 2} />
                        </div>
                        {showShop && show === val.id && (
                          <p className="text-sm text-[#9E9E9E] leading-6	">
                            {strings.LOREM_TEXT}
                          </p>
                        )}
                      </div>
                    );
                  })}
                  <p className="text-sm text-[#9E9E9E] my-3">
                    {strings.LOREM_TEXT}
                  </p>
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

export default FaqScreen;
