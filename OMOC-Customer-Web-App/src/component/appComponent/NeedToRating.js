import React, { useEffect, useState } from "react";
import Header from "../commonComponent/Header";
import { strings } from "../../utils/strings";
import SettingsSideBar from "../commonComponent/SettingsSideBar";
import { Col, Container, Row } from "react-bootstrap";
import MainFooter from "./MainFooter";
import emptyStar from "../../assets/icon/empty_star.svg";
import Star from "../../assets/icon/star_Icon.svg";
import Rating from "react-rating";
import RatingModal from "./RatingModal";
import ProductSublyApi from "../../helper/ProductApi";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";

const NeedToRating = () => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [ratingModal, setRatingModal] = useState(false);
  const [ratingData, setRatingData] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchratings() {
      setIsLoading(true);
      await ProductSublyApi.fetchRatingOrder(token).then((response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          setRatingData(response.data);
        }
      });
    }
    fetchratings();
  }, []);
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
                <div className="bg-white rounded-xl p-3">
                  <p className="text-2xl font-medium ">
                    {strings.YOUR_RATINGS}
                  </p>
                  {ratingData && ratingData.length > 0
                    ? ratingData.map((product) => {
                        return (
                          <>
                            <div className="py-3 border-b-[1px] flex items-end justify-between">
                              <div className="flex gap-3">
                                <img
                                  className="w-28 h-28 rounded-2xl"
                                  src={product.images[0].url}
                                />
                                <div>
                                  <p className="text-xl font-medium">
                                    {product.productName}
                                  </p>
                                  <p>
                                    <Rating
                                      emptySymbol={
                                        <img
                                          src={emptyStar}
                                          className="icon w-6	h-6 my-2"
                                        />
                                      }
                                      fullSymbol={
                                        <img
                                          src={Star}
                                          className="icon w-6 h-6 my-2"
                                        />
                                      }
                                      readonly={true}
                                    />
                                  </p>
                                  <p className="text-xs text-[#9E9E9E]">
                                    {product.orderedOn}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <button
                                  className="bg-[#0094FF] rounded-[24px] px-3 py-2"
                                  onClick={() => {
                                    setRatingModal(true);
                                    setOrderId(product.orderId);
                                  }}
                                >
                                  <p className="text-[10px] text-white">
                                    {" "}
                                    {strings.RATING}
                                  </p>
                                </button>
                              </div>
                            </div>
                          </>
                        );
                      })
                    : ""}
                  {ratingData.length == 0 && (
                    <p className="text-center text-sm font-medium text-gray-500 py-3">
                      {strings.NO_RECORD_FOUND}
                    </p>
                  )}
                </div>
                {ratingModal && (
                  <RatingModal
                    openModal={ratingModal}
                    closeModal={() => {
                      setRatingModal(false);
                    }}
                    orderId={orderId}
                    setIsLoading={setIsLoading}
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

export default NeedToRating;
