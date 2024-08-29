import React, { useEffect, useState } from "react";
import Header from "../../component/commonComponent/Header";
import { Icon } from "@iconify/react";
import { strings } from "../../utils/strings";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import PriceItemCard from "../../component/commonComponent/PriceItemCard";
import AllProductCard from "../../component/commonComponent/AllProductCard";
import ShareWishlistModal from "../../component/appComponent/ShareWishlistModal";
import { useLocation, useNavigate } from "react-router-dom";
import ProductSublyApi from "../../helper/ProductApi";
import Loader from "../../utils/Loader";

const data = [1, 2, 3, 4, 5, 6, 7];
const AllProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.userData.userDetails);
  const [showInfo, setShowInfo] = useState(false);
  const [selected, setSelected] = useState(false);
  const [wishList, setWishList] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ==============API for fetching wish list==============
  useEffect(() => {
    async function wishListHandle() {
      setIsLoading(true);
      await ProductSublyApi.fetchWishList(token, location.state.id).then(
        (response) => {
          setIsLoading(false);
          if (response.statusCode == 200) {
            setWishList(response.data);
          }
        }
      );
    }
    wishListHandle();
  }, []);

  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <div className="px-20 max-md:px-6 ">
        <div className="flex justify-between my-4">
          <div
            className="rounded-full bg-[#F8F9FD] w-14 h-14 flex items-center justify-center cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <Icon icon="ep:arrow-up" rotate={3} />
          </div>
          <p className="text-5xl font-semibold">{location.state.name}</p>
          {!selected && (
            <div className="rounded-full bg-[#F8F9FD] w-14 h-14 flex items-center justify-center relative">
              <Icon
                cursor="pointer"
                icon="ph:dots-three-vertical-bold"
                onClick={() => {
                  setShowInfo(!showInfo);
                }}
              />
              {showInfo && (
                <div className="bg-white p-3 w-32 rounded-xl shadow-lg mt-4 absolute right-6 top-2 z-10">
                  <p className="font-medium text-xs mt-2 cursor-pointer">
                    {strings.SHARE_WISHLIST}
                  </p>
                  <p
                    className="font-medium text-xs mt-3 cursor-pointer"
                    onClick={() => {
                      setSelected(true);
                    }}
                  >
                    {strings.EDIT}
                  </p>
                </div>
              )}
            </div>
          )}
          {selected && (
            <div className="flex gap-2 items-center">
              <div className="rounded-full bg-[#F8F9FD] w-14 h-14 flex items-center justify-center">
                <Icon icon="uiw:delete" color="#C80000" />
              </div>
              <div
                className="rounded-full bg-[#F8F9FD] w-14 h-14 flex items-center justify-center"
                onClick={() => {
                  setShow(true);
                }}
              >
                <Icon icon="mynaui:send" />
              </div>
              <p>{strings.SELECT_ALL}</p>
            </div>
          )}
        </div>

        <Container fluid>
          <Row>
            {wishList && wishList?.length > 0
              ? wishList.map((items, index) => {
                  return (
                    <Col xl="3" lg="4" md="6" key={index}>
                      <AllProductCard
                        selected={selected}
                        itemValue={items}
                        clickEvent={() => {
                          navigate(`/Detail-Product/${items._id}`);
                        }}
                      />
                    </Col>
                  );
                })
              : ""}
            {wishList?.length == 0 && (
              <p className="text-center text-2xl my-2 font-medium text-gray-500 py-3">
                {strings.NO_RECORD_FOUND}
              </p>
            )}{" "}
          </Row>
        </Container>
        {show && (
          <ShareWishlistModal
            show={show}
            handleClose={() => {
              setShow(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AllProduct;
