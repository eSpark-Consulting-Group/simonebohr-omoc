import React from "react";
import Header from "../../component/commonComponent/Header";
import { placeholder, strings } from "../../utils/strings";
import { NavLink } from "react-router-dom";
import SearchCard from "../../component/commonComponent/SearchCard";
import { Col, Container, Row } from "react-bootstrap";
import FollowingCard from "../../component/appComponent/FollowingCard";
import MainFooter from "../../component/appComponent/MainFooter";
import FavoriteHeader from "../../component/commonComponent/FavoriteHeader";
import PriceItemCard from "../../component/commonComponent/PriceItemCard";
import { useSelector } from "react-redux";
const cardData = [1, 2, 3, 4];

const ProductScreen = () => {
  const products = useSelector((state) => state.productList.productList);

  return (
    <div>
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <div className="bg-[#F8F9FD] px-20 max-md:px-6 py-2">
        <p className="text-5xl	font-bold text-center mt-5">{strings.TSHIRT}</p>
        <p className="text-[#9E9E9E] text-center mt-3">{strings.LOREM_TEXT}</p>

        <FavoriteHeader />
        <div className="bg-white p-3 rounded-xl flex flex-wrap justify-between gap-3">
          <div className="border-[1px] rounded-3xl flex py-3 w-64">
            <p className="text-[#A5A5A5] pr-2 mx-2 border-r-[1px]">$</p>
            <input placeholder={placeholder.MINIMUM_PRICE} />
          </div>
          <div className="border-[1px] rounded-3xl flex py-3 w-64">
            <p className="text-[#A5A5A5] pr-2 mx-2 border-r-[1px]">$</p>
            <input placeholder={placeholder.MINIMUM_PRICE} />
          </div>
          <div className="border-[1px] rounded-3xl flex py-3 w-64">
            <select className="w-full mx-3">
              <option className="text-[#A5A5A5]">Sort by</option>
            </select>
          </div>
          <div className="border-[1px] rounded-3xl flex py-3 w-64">
            <select className="w-full mx-3">
              <option className="text-[#A5A5A5]">Ratings</option>
            </select>
          </div>
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
      <MainFooter />
    </div>
  );
};

export default ProductScreen;
