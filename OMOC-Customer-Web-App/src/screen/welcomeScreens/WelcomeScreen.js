import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/icon/omoc_logo.svg";
import Footer from "../../component/authComponent/Footer";
import "../../assets/commonStyling/commonStyling.css";
import { strings } from "../../utils/strings";
import bgImg from "../../assets/images/Frame 1000005441 (3).png";
import { useNavigate } from "react-router-dom";

const data = [
  {
    heading: "Discovery Shop",
    subHeading:
      "Find various physical and digital products from around the world",
  },
  {
    heading: "Share Your Newest Purchases",
    subHeading:
      "Share your fresh purchases,story, and livestream to your friends and others!",
  },
  {
    heading: "Shop With Your Friend",
    subHeading:
      "Shop together like shopping in mall and bring that feeling into the Online World",
  },
  {
    heading: "Build connections with your favorite shops",
    subHeading:
      "Create huge community and connection around your friends and shops",
  },
];

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState(0);
  const handleWelcome = () => {
    if (welcome < 3) {
      setWelcome(welcome + 1);
    } else {
      navigate("/Select-favorite");
    }
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="6" className="pt-5 ps-5">
            <img src={logo} />
            <div className="welcomeNote   flex justify-center items-center">
              <div>
                <p className="text-5xl font-semibold leading-[67px] my-2">
                  {data[welcome].heading}
                </p>
                <p className="text-[#616161] font-medium">
                  {data[welcome].subHeading}
                </p>
                <button
                  className="bg-[#0094FF] w-full p-2 p-8 rounded-3xl	mt-20"
                  onClick={handleWelcome}
                >
                  <p className="text-white">{strings.NEXT}</p>
                </button>
              </div>
            </div>
            <div>
              <Footer />
            </div>
          </Col>
          <Col md="6" className="md:block hidden">
            <img className="w-full h-screen" src={bgImg} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WelcomeScreen;
