import React from "react";
import Header from "../../component/commonComponent/Header";
import { strings } from "../../utils/strings";
import { NavLink } from "react-router-dom";
import SearchCard from "../../component/commonComponent/SearchCard";
import { Col, Container, Row } from "react-bootstrap";
import FollowingCard from "../../component/appComponent/FollowingCard";
import MainFooter from "../../component/appComponent/MainFooter";
import PriceItemCard from "../../component/commonComponent/PriceItemCard";
import FavoriteHeader from "../../component/commonComponent/FavoriteHeader";

const cardData = [1, 2, 3, 4];
const SearchScreen = () => {
  return (
    <div>
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <div className="bg-[#F8F9FD] px-20 max-md:px-6 py-2">
        <p className="text-5xl	font-bold text-center mt-5">{strings.TSHIRT}</p>
        <p className="text-[#9E9E9E] text-center mt-3">{strings.LOREM_TEXT}</p>
        <FavoriteHeader />
        <div className="flex items-center justify-between">
          <p className="text-[32px] font-bold">{strings.VIDEOS}</p>
          <button>
            <p className="text-[#0094FF] text-sm">{strings.SEE_ALL}</p>
          </button>
        </div>
        <Container fluid>
          <Row>
            {cardData.map(() => {
              return (
                <Col md="4" xl="3">
                  <div className="my-3 ">
                    <SearchCard />
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
        <div className="flex items-center justify-between">
          <p className="text-[32px] font-bold">{strings.POST}</p>
          <button>
            <p className="text-[#0094FF] text-sm">{strings.SEE_ALL}</p>
          </button>
        </div>
        <Container fluid>
          <Row>
            {cardData.map(() => {
              return (
                <Col md="4" xl="3">
                  <div className="my-3 ">
                    <SearchCard />
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
        <div className="flex items-center justify-between">
          <p className="text-[32px] font-bold">{strings.USERS}</p>
          <button>
            <p className="text-[#0094FF] text-sm">{strings.SEE_ALL}</p>
          </button>
        </div>
        <Container fluid>
          <Row>
            {cardData.map(() => {
              return (
                <Col md="3" xl="2">
                  <div className="my-3 ">
                    <FollowingCard />
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
        <div className="flex items-center justify-between">
          <p className="text-[32px] font-bold">{strings.PRODUCT}</p>
          <button>
            <p className="text-[#0094FF] text-sm">{strings.SEE_ALL}</p>
          </button>
        </div>
        <Container fluid>
          <Row>
            {cardData.map(() => {
              return (
                <Col md="4" xl="3">
                  <div className="my-3 ">{/* <PriceItemCard /> */}</div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <MainFooter />
    </div>
  );
};

export default SearchScreen;
