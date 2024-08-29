import { React, useEffect, useState } from "react";
import Header from "../../component/commonComponent/Header";
import banner from "../../assets/images/banner_bg.png";
import bannerGoodDeals from "../../assets/images/banner-goodDeals.png";
import banner2 from "../../assets/images/banner.png";
import tshirt from "../../assets/images/t-shirt.png";
import { Icon } from "@iconify/react";
import "../../assets/commonStyling/commonStyling.css";
import { strings } from "../../utils/strings";
import DiscountCard from "../../component/commonComponent/DiscountCard";
import { Col, Container, Row } from "react-bootstrap";
import trackSuit from "../../assets/images/trackSuit.png";
import PriceItemCard from "../../component/commonComponent/PriceItemCard";
import MainFooter from "../../component/appComponent/MainFooter";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../../Store/Slices/ProductSlice";
import VisitingModal from "../../component/appComponent/VisitingModal";
import ReactSimplyCarousel from "react-simply-carousel";
import ProductSublyApi from "../../helper/ProductApi";
import Loader from "../../utils/Loader";
import UserProfileSublyApi from "../../helper/UserProfileApi";

const data = [
  { id: 1, product: "T-Shirt", image: tshirt },
  { id: 2, product: "Jeans", image: tshirt },
  { id: 3, product: "Hoodie", image: tshirt },
  { id: 4, product: "Shirt", image: tshirt },
  { id: 5, product: "Hat", image: tshirt },
  { id: 6, product: "Hat", image: tshirt },
  { id: 7, product: "Hat", image: tshirt },
  { id: 8, product: "Hat", image: tshirt },
  { id: 9, product: "Hat", image: tshirt },
  { id: 10, product: "Hat", image: tshirt },
  { id: 11, product: "Hat", image: tshirt },
  { id: 12, product: "Hat", image: tshirt },
  { id: 13, product: "Hat", image: tshirt },
  { id: 14, product: "Hat", image: tshirt },
];
const cardData = [1, 2, 3, 4];
const trackSuitImg = [1, 2, 3, 4, 5, 6];
const HomeScreen = () => {
  const [categoryDetails, setcategoryDetails] = useState([]);
  const [shopDetail, setshopDetail] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isShown = localStorage.getItem("isShow");
  const [showFeedback, setShowFeedback] = useState(false);
  const products = useSelector((state) => state.productList.productList);
  const { token } = useSelector((state) => state.userData.userDetails);
  const { isLoading } = useSelector((state) => state.productList);
  const [page, setPage] = useState("");
  const [pageSize, setPageSize] = useState(15);
  const [postData, setPostData] = useState();
  const [sortValue, setSortValue] = useState({
    status: true,
    text: "Sorty By",
  });
  const closeModal = () => {
    setShowFeedback(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      !isShown && setShowFeedback(true);
    }, 1000);
    setTimeout(() => {
      localStorage.setItem("isShow", true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function getPost() {
      // setIsLoading(true);
      await UserProfileSublyApi.fetchPostList(
        token,
        pageSize,
        page,
        sortValue.status
      ).then((response) => {
        setPostData(response.data.posts);
      });
    }
    getPost();
  }, []);

  // =================API for fetching product list=================
  useEffect(() => {
    async function productListHandle() {
      await dispatch(productList(token));
    }
    productListHandle();
  }, []);

  // ================Category details API================
  useEffect(() => {
    async function productCategoryDetailHandle() {
      await ProductSublyApi.categoryDetails(token).then((response) => {
        if (response.statusCode == 200) {
          setcategoryDetails(response.data.interests.otherCategories);
        }
      });
    }
    productCategoryDetailHandle();
  }, []);

  // ================SHOP PRODUCT DETAILS API================
  useEffect(() => {
    async function shopProductDetailHandle() {
      await ProductSublyApi.shopProductDetails(token).then((response) => {
        if (response.statusCode == 200) {
          setshopDetail(response.data);
        }
      });
    }
    shopProductDetailHandle();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <div className="mx-20 max-md:mx-6">
        <div>
          <Header />
        </div>
        <div>
          <img className="w-full" src={banner} />
        </div>

        {showFeedback && (
          <VisitingModal isOpen={showFeedback} closeModal={closeModal} />
        )}

        <div className="mt-12 w-full">
          <ReactSimplyCarousel
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            itemsToShow={1}
            itemsToScroll={1}
            forwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              style: {
                alignSelf: "center",
                background: "white",
                border: "none",
                borderRadius: "50%",
                color: "black",
                cursor: "pointer",
                fontSize: "20px",

                height: 56,
                lineHeight: 1,
                textAlign: "center",
                width: 56,
                marginLeft: "-50px",
                zIndex: 1000,
              },
              children: <span>{`>`}</span>,
            }}
            backwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              style: {
                alignSelf: "center",
                background: "white",
                border: "none",
                borderRadius: "50%",
                color: "black",
                cursor: "pointer",
                fontSize: "20px",
                height: 56,
                lineHeight: 1,
                textAlign: "center",
                width: 56,
                marginRight: "-50px",
                zIndex: 1000,
              },
              children: <span>{`<`}</span>,
            }}
            responsiveProps={[
              {
                itemsToShow: 13,
                itemsToScroll: 1,
                minWidth: 768,
              },
              { minWidth: 1440, maxWidth: 1900, itemsToShow: 12 },
              { minWidth: 1440, maxWidth: 1710, itemsToShow: 10 },
              { minWidth: 1000, maxWidth: 1452, itemsToShow: 8 },
              { minWidth: 920, maxWidth: 1196, itemsToShow: 6 },
              { minWidth: 768, maxWidth: 940, itemsToShow: 5 },
              { minWidth: 540, maxWidth: 812, itemsToShow: 4 },
              { minWidth: 420, maxWidth: 572, itemsToShow: 3 },
              { minWidth: 320, maxWidth: 445, itemsToShow: 2 },
            ]}
            speed={400}
            easing="linear"
          >
            {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}

            {categoryDetails?.map((val, index) => {
              console.log("CATEGORY PRODUCT", val);
              return (
                <div
                  key={index}
                  className=" w-32 h-40	cursor-pointer mx-2"
                  onClick={() => navigate(`/T-shirt`, { state: val.title })}
                >
                  <div className="bg-[#F6F6F6] rounded-full h-32 w-32 overflow-hidden">
                    <img
                      className="mx-auto p-3 object-cover h-full w-full rounded-full"
                      src={val.image}
                    />
                  </div>
                  <p className="text-2xl font-medium text-center">
                    {val.title}
                  </p>
                </div>
              );
            })}
          </ReactSimplyCarousel>
        </div>

        <div></div>
        <div>
          <div className="flex justify-between items-center mt-5">
            <p className="text-[32px] font-semibold">
              {strings.DISCOUNT_SPECIAL}
            </p>
            <p className="text-sm text-[#0094FF]">{strings.SEE_ALL}</p>
          </div>
          <div className=" my-2">
            <Container fluid>
              <Row>
                {postData?.map((item) => {
                  // console.log("HOME ITEM",item)
                  return (
                    <Col xl="3" lg="4" md="6">
                      <DiscountCard product={true} post={item} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </div>

          <div className="flex flex-wrap gap-5  ">
            {shopDetail.productDetails?.slice(0, 4).map((items, index) => {
              return (
                <img
                  key={index}
                  onClick={() => {
                    navigate("/Detail-Product");
                  }}
                  className="rounded-lg my-3 object-cover w-[288px] h-[268px]"
                  src={items?.images[0]?.url}
                />
              );
            })}
          </div>

          <div className="my-6">
            <img
              className="w-full h-[338px] object-cover rounded-xl"
              src={shopDetail.imageUrl}
            />
          </div>
          <div className="flex justify-between items-center mt-5">
            <div className="flex items-center gap-5">
              <p className="text-[32px] font-semibold">
                {strings.DISCOUNT_SPECIAL}
              </p>
              <div className="bg-[#9039FF1A] rounded-3xl py-2 px-4">
                <p className="text-center">
                  {strings.ENDS_IN}{" "}
                  <span className="text-xl font-medium">03 : 29 : 33</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-[#0094FF]">{strings.SEE_ALL}</p>
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
          <div className="flex justify-between items-center mt-5">
            <div className="flex items-center gap-5">
              <p className="text-[32px] font-semibold">
                {strings.BASED_ON_YOUR_SEARCH}
              </p>
              <div className="bg-[#9039FF1A] rounded-3xl py-2 px-4">
                <p className="text-center">
                  {strings.ENDS_IN}{" "}
                  <span className="text-xl font-medium">03 : 29 : 33</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-[#0094FF]">{strings.SEE_ALL}</p>
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
          <div className="my-4">
            <img className="w-full" src={banner2} />
          </div>
        </div>
      </div>
      <div>
        <MainFooter />
      </div>
    </>
  );
};

export default HomeScreen;
