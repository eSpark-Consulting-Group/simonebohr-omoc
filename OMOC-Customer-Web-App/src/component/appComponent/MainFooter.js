import React from "react";
import omocLogo from "../../assets/icon/omoc_logo.svg";
import { Col, Container, Row } from "react-bootstrap";
import playStore from "../../assets/images/GooglePlay.png";
import appStore from "../../assets/images/AppStore.png";
import { Icon } from "@iconify/react";

const footerData = [
  {
    text1: "Omoc",
    text2: "About",
    text3: "Career",
    text4: "Blog",
  },
  {
    text1: "Omoc Seller",
    text2: "Seller Education Centre",
    text3: "Become a Seller",
    text4: "Become a Influencer",
  },
  {
    text1: "Guide and Help",
    text2: "Terms and Condition",
    text3: "Privacy and Policy",
    text4: "FAQ’s",
  },
];

const MainFooter = () => {
  return (
    <div className="bg-[##FFFFFF] p-20">
      <img src={omocLogo} />
      <Container className="my-5" fluid>
        <Row>
          <Col lg="8">
            <div className="flex gap-20 flex-wrap">
              {footerData.map((val, index) => {
                return (
                  <div>
                    <p className="mt-3 text-lg font-medium text-[#242424]">
                      {val.text1}
                    </p>
                    <p className="mt-3 text-sm text-[#242424]">{val.text2}</p>
                    <p className="mt-3 text-sm text-[#242424]">{val.text3}</p>
                    <p className="mt-3 text-sm text-[#242424]">{val.text4}</p>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col lg="4">
            <div className="mt-5">
              <div className="flex gap-2">
                <img src={appStore} />
                <img src={playStore} />
              </div>
              <div className="flex gap-5 mt-20">
                <Icon icon="ri:facebook-fill" />
                <Icon icon="mdi:instagram" />
                <Icon icon="mdi:twitter" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainFooter;
