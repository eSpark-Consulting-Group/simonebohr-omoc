import React, { useEffect, useState } from "react";
import Header from "../commonComponent/Header";
import { Col, Container, Row } from "react-bootstrap";
import SettingsSideBar from "../commonComponent/SettingsSideBar";
import { strings } from "../../utils/strings";
import MainFooter from "./MainFooter";
import Rating from "react-rating";
import emptyStar from "../../assets/icon/empty_star.svg";
import Star from "../../assets/icon/star_Icon.svg";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import Loader from "../../utils/Loader";

const HistoryRating = () => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [ratingData, setRatingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchratings() {
      setIsLoading(true);
      await ProductSublyApi.fetchRating(token).then((response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          setRatingData(response.data);
        }
      });
    }
    fetchratings();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      {isLoading ? <Loader /> : ""}
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
                    <p className="text-2xl font-medium mb-3">
                      {strings.HISTORY}
                    </p>
                    {ratingData && ratingData.length > 0
                      ? ratingData.map((product) => {
                          return (
                            <>
                              <div className="border-b-[1px] flex justify-between items-end py-3">
                                <div>
                                  <p className="text-xl font-medium">
                                    {product.productName}
                                  </p>
                                  <p className="text-[#9E9E9E] text-xs my-2">
                                    Variant :
                                    <span className="text-[#9E9E9E] text-xs">
                                      Men
                                    </span>
                                  </p>
                                  <div className="flex gap-2 flex-wrap my-3">
                                    {product.review.files.length > 0 ? (
                                      <div className="flex gap-2 flex-wrap my-3">
                                        {product.review.files.map(
                                          (file, fileIndex) => (
                                            <div
                                              key={fileIndex}
                                              className="w-20 h-20 rounded-lg bg-[#F9F9F9] flex items-center justify-center"
                                            >
                                              <img
                                                key={fileIndex}
                                                className="w-14 h-14"
                                                src={file}
                                                alt={`Product Image ${fileIndex}`}
                                              />
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ) : (
                                      <p>No images available</p>
                                    )}
                                  </div>
                                  <p className="text-xs">
                                    {product.review.comment}
                                  </p>
                                </div>
                                <div>
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
                                    initialRating={product.review.rating}
                                    readonly={true}
                                  />
                                  <p className="text-xs text-[#9E9E9E] text-end">
                                    {formatDate(product.review.updatedAt)}
                                  </p>
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

export default HistoryRating;
