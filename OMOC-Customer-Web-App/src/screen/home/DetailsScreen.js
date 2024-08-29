import { React, useEffect, useState } from "react";
import Header from "../../component/commonComponent/Header";
import { Col, Container, Row } from "react-bootstrap";
import bgImg from "../../assets/images/trackSuit.png";
import "../../assets/commonStyling/commonStyling.css";
import badge from "../../assets/icon/badge_icon.svg";
import activeBookmark from "../../assets/icon/active-bookmark.svg";
import groupBookmark from "../../assets/icon/bookMark.svg";
import bookmark from "../../assets/icon/badge.svg";
import { Icon } from "@iconify/react";
import { strings } from "../../utils/strings";
import banner from "../../assets/images/detais-banner.png";
import likeProfile from "../../assets/images/like_profile.png";
import likeProfile1 from "../../assets/images/like_profile1.png";
import PriceItemCard from "../../component/commonComponent/PriceItemCard";
import banner2 from "../../assets/images/banner.png";
import MainFooter from "../../component/appComponent/MainFooter";
import CustomProductModal from "../../component/appComponent/CustomProductModal";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import ProductAddToWishList from "../../component/appComponent/ProductAddToWishList";
import Loader from "../../utils/Loader";

const sizeData = [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }];
const DetailsScreen = () => {
  const { productList } = useSelector((state) => state.productList);
  const { token } = useSelector((state) => state.userData.userDetails);
  const { id } = useParams();
  const navigate = useNavigate();
  const [openCustom, setOpenCustom] = useState(false);
  const [size, setSize] = useState(null);
  const [count, setCount] = useState(1);
  const [showBadge, setShowBadge] = useState(false);
  const [productDetail, setProductDetail] = useState("");
  const [imagesArray, setimagesArray] = useState([]);
  const [imageIndex, setimageIndex] = useState(0);
  const [isBookmark, setIsBookmark] = useState(false);
  const [addToWishlist, setAddToWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpenCustom(false);
  };
  const handleSize = (sizeNumber) => {
    setSize(sizeNumber);
  };

  const addCount = () => {
    setCount(count + 1);
  };
  const subCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // ================Product details API================
  useEffect(() => {
    async function productDetailHandle() {
      setIsLoading(true);
      await ProductSublyApi.fetchProductDetail(id, token).then((response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          setProductDetail(response.data);
          setimagesArray(response.data.images.map((item) => item.url));
        }
      });
    }
    productDetailHandle();
  }, [id]);

  // ===============Add to cart API================
  async function addToCartHandle() {
    setIsLoading(true);
    const requestData = { productId: id, quantity: count };
    await ProductSublyApi.addToCart(requestData, token).then((response) => {
      setIsLoading(false);
      if (response.statusCode == 200) {
        toast.success(response.message);
        navigate("/Cart");
      } else {
        toast.error(response.data.message);
      }
      console.log(response);
    });
  }

  const imageArray = productDetail.images?.map((image) => {
    return image.url;
  });

  // ==============Add to wish list API================
  async function addToWishList(wishId) {
    setIsLoading(true);
    const requestData = {
      wishListId: wishId,
      productIds: [id],
    };
    await ProductSublyApi.addWishList(requestData, token).then((response) => {
      setIsLoading(false);
      if (response.statusCode == 200) {
        toast.success(response.message);
        setAddToWishlist(false);
      } else {
        toast.error(response.data.message);
      }
      console.log(response);
    });
  }

  return (
    <div className="bg-[#F8F9FD]">
      {isLoading ? <Loader /> : ""}
      <div className="px-20 max-md:px-6 bg-white">
        <Header />
      </div>
      <div className="mx-20 max-md:mx-6 ">
        <Container className="pt-10" fluid>
          <Row>
            <Col md="9">
              <div className="relative">
                <div className="bg-img h-[544px] ">
                  <img
                    src={imagesArray[imageIndex]}
                    className="w-full h-full rounded-[20px] border-4 border-white object-cover bg-[#F5F5F5]"
                  />
                  <div className="h-[54px] w-18 px-3 bg-white rounded-[120px] absolute mt-10 right-8 top-0 flex  gap-0.5 items-center">
                    <img
                      className="mx-auto cursor-pointer"
                      src={isBookmark ? activeBookmark : badge}
                    />
                    <Icon
                      icon="mingcute:down-line"
                      width="25"
                      height="25"
                      style={{ color: "#757575", cursor: "pointer" }}
                      onClick={() => {
                        setShowBadge(!showBadge);
                      }}
                    />
                  </div>
                  {showBadge && (
                    <div className="bg-white absolute py-2 px-2 rounded-xl right-8 top-24">
                      <div
                        className="flex gap-2 my-2 mx-2 cursor-pointer"
                        onClick={() => {
                          // setIsBookmark(!isBookmark);
                          setAddToWishlist(true);
                        }}
                      >
                        <img className=" cursor-pointer" src={bookmark} />
                        <p>{strings.ADD_TO_MY_WISHLIST}</p>
                      </div>
                      <div className="flex gap-2 my-2 mx-2">
                        <img className=" cursor-pointer" src={groupBookmark} />
                        <p>{strings.CREATE_GROUP_WISHLIST}</p>
                      </div>
                      <div className="flex gap-2 my-2 mx-2">
                        <Icon
                          width="24"
                          height="24"
                          icon="ph:bell-light"
                          color="#9039FF"
                        />
                        <p>{strings.NOTIFY_ME_ABOUT_THIS_PRODUCT}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 ml-5 bottom-5 absolute">
                    {imageArray?.map((item, index) => (
                      <img
                        key={index}
                        onClick={() => setimageIndex(index)}
                        className="w-24 h-24 border-2 border-white bg-[#F5F5F5] rounded-[20px]"
                        src={item}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white">
                <div className="m-4 flex items-center justify-between border-b-[1px] pb-3">
                  <div className="pt-3 ">
                    <div className="flex items-center gap-1">
                      <Icon
                        width={20}
                        height={20}
                        icon="bitcoin-icons:verify-filled"
                        color="#3d9ffb"
                      />
                      <p className="text-sm font-medium">
                        {strings.OMOC_OFFICIAL}
                      </p>
                    </div>
                    <p className="text-2xl font-medium my-2">
                      {productDetail?.name}
                    </p>
                    <div className="flex ">
                      <img src={likeProfile} />
                      <img className="-ml-2" src={likeProfile1} />
                      <p className="ml-2">
                        Bought by Nessie23, James1 and 27 others
                      </p>
                    </div>
                  </div>
                  <div className="h-9	w-[87px] bg-[#C80000] flex justify-center items-center text-lg rounded-xl text-white text-medium">
                    ${productDetail?.price}.<span className="text-sm">00</span>
                  </div>
                </div>
                <div className="m-4">
                  <p className="text-2xl font-medium">{strings.DESCRIPTION}</p>
                  <div className="flex items-center mt-4">
                    <p className="mr-5 text-[#242424] text-sm w-20">
                      {strings.CONDITION}
                    </p>
                    <p>:</p>
                    <p className="ml-3 text-sm font-medium">New</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <p className="mr-5 text-[#242424] text-sm w-20">
                      {strings.WEIGHT}
                    </p>
                    <p>:</p>
                    <p className="ml-3 text-sm font-medium">
                      {productDetail.weight} grams
                    </p>
                  </div>
                  <div className="flex items-center mt-4">
                    <p className="mr-5 text-[#242424] text-sm w-20">
                      {strings.CATEGORIES}
                    </p>
                    <p>:</p>
                    <p className="ml-3 text-sm font-medium text-[#0094FF]">
                      {productDetail?.category}
                    </p>
                  </div>
                  <div className="flex items-center mt-4">
                    <p className="mr-5 text-[#242424] text-sm w-20">
                      {strings.CATALOG}
                    </p>
                    <p>:</p>
                    <p className="ml-3 text-sm font-medium text-[#0094FF]">
                      Hoodie
                    </p>
                  </div>
                  <p className="leading-7	mt-4 text-[#9E9E9E]">
                    {strings.LOREM_TEXT}
                  </p>
                  <p className="leading-7	mt-4 text-[#9E9E9E]">
                    {strings.LOREM_TEXT}
                  </p>
                </div>
              </div>
            </Col>
            <Col md="3">
              <div className="bg-white p-3 rounded-xl">
                <p className="text-[32px] font-bold">{strings.BUY_NOTES}</p>
                <p className="mt-3">{strings.SIZE}</p>
                <div className="flex gap-2 mt-3">
                  {sizeData.map((sizeNumber, val) => {
                    return (
                      <div
                        onClick={() => handleSize(sizeNumber.size)}
                        key={sizeNumber}
                        className={`w-14 h-8 border-[1px] ${
                          size === sizeNumber.size
                            ? "border-[#AADBFF] text-[#0094FF]"
                            : "border-[#E0E0E0] text-[#E0E0E0]"
                        }  rounded-md	flex items-center justify-center cursor-pointer`}
                      >
                        <p className=" text-center">{sizeNumber.size}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4">
                  <p>{strings.COLOR}</p>
                  <div className="flex  gap-3 mt-3">
                    <div className="w-6 h-6 bg-[#EFEFE7] rounded-full border-[1px] border-black"></div>
                    <div className="w-6 h-6 bg-[#242424] rounded-full border-2 border-[#EEEEEE]"></div>
                    <div className="w-6 h-6 bg-[#FFFFFF] rounded-full border-2 border-[#EEEEEE]"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex bg-[#F8F8F8] rounded-3xl	w-28  items-center justify-evenly p-1 ">
                    <button
                      className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
                      onClick={subCount}
                    >
                      <Icon
                        className="cursor-pointer"
                        width={9}
                        height={9}
                        icon="ic:round-minus"
                      />
                    </button>
                    <div>
                      <p className="text-sm">{count}</p>
                    </div>

                    <button
                      className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
                      onClick={addCount}
                    >
                      <Icon
                        className="cursor-pointer"
                        width={9}
                        height={9}
                        icon="mingcute:add-line"
                      />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">{strings.TOTAL_STOCK}</p>
                    <p className="font-medium text-[#9039FF]">29</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pb-3 border-b-[1px]">
                  <div className="h-10 w-10 rounded-full border-[1px] border-[#F5F5F5] flex items-center justify-center">
                    <Icon color="#0094FF" icon="clarity:pencil-line" />
                  </div>
                  <p className="text-[#0094FF] text-sm fomt-medium">
                    {strings.ADD_NOTE}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">${productDetail?.price}</p>
                </div>
                <button
                  className="bg-[#0094FF] rounded-3xl	w-full p-3 mt-5"
                  onClick={() => {
                    setOpenCustom(true);
                  }}
                >
                  <p className="text-white font-medium">{strings.BUY_NOW}</p>
                </button>
                <div className="border-t-[1px] mt-5 flex justify-between">
                  <div className="border-r-[1px] w-full flex justify-center items-center mt-3 gap-2">
                    <Icon
                      color="#242424"
                      icon="system-uicons:message-writing"
                    />
                    <p className="text-sm font">{strings.CHAT}</p>
                  </div>
                  <div
                    className="w-full flex justify-center items-center mt-2 gap-2"
                    onClick={() => {
                      setAddToWishlist(true);
                    }}
                  >
                    <Icon icon="solar:bag-5-linear" />
                    {/* <p className="text-sm font">{strings.CHART}</p> */}
                    <p className="text-sm font">Add To Wishlist</p>
                  </div>
                </div>
              </div>
              <img className="w-full mt-5" src={banner} />
            </Col>
          </Row>
        </Container>
        <div className="flex flex-wrap justify-between items-center mt-5">
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
            {productList
              ? productList.map((items, index) => {
                  return (
                    <Col xl="3" lg="4" md="6" key={index}>
                      <PriceItemCard items={items} />
                    </Col>
                  );
                })
              : ""}
          </Row>
        </Container>
        <div className="flex flex-wrap justify-between items-center mt-5">
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
            {productList
              ? productList.map((items, index) => {
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
        <MainFooter />
      </div>
      {openCustom && (
        <CustomProductModal
          openModal={openCustom}
          closeModal={handleClose}
          addToCartHandle={addToCartHandle}
        />
      )}
      {addToWishlist && (
        <ProductAddToWishList
          show={addToWishlist}
          clickBtn={addToWishList}
          productDetail={productDetail}
          handleClose={() => {
            setAddToWishlist(false);
          }}
        />
      )}
    </div>
  );
};

export default DetailsScreen;
