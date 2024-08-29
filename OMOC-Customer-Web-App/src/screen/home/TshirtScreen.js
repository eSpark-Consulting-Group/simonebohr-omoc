import React from "react";
import Header from "../../component/commonComponent/Header";
import { Icon } from "@iconify/react";
import { strings } from "../../utils/strings";
import omocLogo from "../../assets/icon/omoc_black_logo.svg";
import { Container, Row, Col } from "react-bootstrap";
import PriceItemCard from "../../component/commonComponent/PriceItemCard";
import MainFooter from "../../component/appComponent/MainFooter";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const data = [1, 2, 3, 4];
const TshirtScreen = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.productList.productList);

  return (
    <div>
      <div className="mx-20 max-md:mx-6">
        <Header />
        <div
          className="h-14 w-14 rounded-full bg-[#F8F9FD] flex items-center justify-center cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <Icon width={20} icon="ep:arrow-up" rotate={3} />
        </div>
        <p className="text-center text-5xl font-semibold ">{strings.TSHIRT}</p>
        <div className="border-b-[1px] pb-4">
          <div className="flex justify-between items-center mt-5">
            <div className="flex gap-2">
              <img src={omocLogo} />
              <div>
                <div className="flex items-center">
                  <p className="text-2xl	">{strings.OMOC_OFFICIAL}</p>
                  <Icon icon="bitcoin-icons:verify-filled" color="#3d9ffb" />
                </div>
                <div className="flex">
                  <p className="text-[#AEAEAE] text-sm border-r-[1px] pr-1">
                    123 Following
                  </p>
                  <p className="text-[#AEAEAE] text-sm pl-1">123 Follower</p>
                </div>
              </div>
            </div>
            <p className="text-[#0094FF] text-sm">{strings.SEE_ALL}</p>
          </div>
          <Container fluid>
            <Row>
              {products && products.length > 0
                ? products.map((items, index) => {
                    return (
                      <Col xl="3" lg="4" md="6" key={index}>
                        <PriceItemCard items={items} />
                      </Col>
                    );
                  })
                : ""}
            </Row>
          </Container>
        </div>
        <div className="border-b-[1px] pb-4">
          <div className="flex justify-between items-center mt-5">
            <div className="flex gap-2">
              <img src={omocLogo} />
              <div>
                <div className="flex items-center">
                  <p className="text-2xl	">{strings.OMOC_OFFICIAL}</p>
                  <Icon icon="bitcoin-icons:verify-filled" color="#3d9ffb" />
                </div>
                <div className="flex">
                  <p className="text-[#AEAEAE] text-sm border-r-[1px] pr-1">
                    123 Following
                  </p>
                  <p className="text-[#AEAEAE] text-sm pl-1">123 Follower</p>
                </div>
              </div>
            </div>
            <p className="text-[#0094FF] text-sm">{strings.SEE_ALL}</p>
          </div>
          <Container fluid>
            <Row>
              {products && products.length > 0
                ? products.map((items, index) => {
                    return (
                      <Col xl="3" lg="4" md="6" key={index}>
                        <PriceItemCard items={items} />
                      </Col>
                    );
                  })
                : ""}
            </Row>
          </Container>
        </div>
        <div className="border-b-[1px] pb-4">
          <div className="flex justify-between items-center mt-5">
            <div className="flex gap-2">
              <img src={omocLogo} />
              <div>
                <div className="flex items-center">
                  <p className="text-2xl	">{strings.OMOC_OFFICIAL}</p>
                  <Icon icon="bitcoin-icons:verify-filled" color="#3d9ffb" />
                </div>
                <div className="flex">
                  <p className="text-[#AEAEAE] text-sm border-r-[1px] pr-1">
                    123 Following
                  </p>
                  <p className="text-[#AEAEAE] text-sm pl-1">123 Follower</p>
                </div>
              </div>
            </div>
            <p className="text-[#0094FF] text-sm">{strings.SEE_ALL}</p>
          </div>
          <Container fluid>
            <Row>
              {data.map(() => {
                return (
                  <Col md="3">
                    <PriceItemCard discount={true} />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default TshirtScreen;
