import React, { useEffect, useState } from "react";
import Header from "../../component/commonComponent/Header";
import { placeholder, strings } from "../../utils/strings";
import WishListCard from "../../component/commonComponent/WishListCard";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import PriceItemCard from "../../component/commonComponent/PriceItemCard";
import banner2 from "../../assets/images/banner.png";
import MainFooter from "../../component/appComponent/MainFooter";
import Modal from "react-bootstrap/Modal";
import { Icon } from "@iconify/react";
import ProductSublyApi from "../../helper/ProductApi";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";

export const AddWishListModal = ({
  show,
  handleClose,
  setName,
  name,
  clickEvent,
}) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header className="!justify-center border-0 py-1 px-4">
          <Modal.Title>
            <p className="text-4xl my-3">{strings.ADD_WISHLIST}</p>
          </Modal.Title>
          <div className="absolute right-5">
            <Icon
              width={20}
              height={20}
              icon="radix-icons:cross-2"
              onClick={handleClose}
              cursor="pointer"
            />
          </div>
        </Modal.Header>
        <Modal.Body className="py-1 px-4 overflow-auto ">
          <div className="mb-3">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="bg-[#F5F5F5] pl-8 rounded-[14px] w-full h-[56px] py-2"
              placeholder="Wishlist Name"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-center">
          <button
            onClick={() => {
              clickEvent();
            }}
            className="bg-[#0094FF] w-full rounded-[24px] py-[14px]"
          >
            <p className="text-white font-medium">{strings.SAVE}</p>
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const data = [
  { productName: "All Product", quantity: "12", path: "/All-Product" },
  { productName: "Bag", quantity: "2", path: "" },
  { productName: "T-Shirt", quantity: "6", path: "/T-Shirt" },
];
const WishlistScreen = () => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const products = useSelector((state) => state.productList.productList);
  const [showModal, setShowModal] = useState(false);
  const [wishCategory, setWishCategory] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ============fetching wish list API=============
  useEffect(() => {
    async function fetchWishItem() {
      setIsLoading(true);
      await ProductSublyApi.fetchWishCategory(token).then((response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          setWishCategory(response.data);
        }
      });
    }
    fetchWishItem();
  }, [showModal]);

  // ================API FOR CREATING WISH LIST CATEGORY==============
  async function addWishCategoryHandle() {
    setIsLoading(true);
    const requestData = { name: name };
    await ProductSublyApi.addWishCategory(requestData, token).then(
      (response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          toast.success(response.message);
          setShowModal(false);
          setName("");
        } else {
          toast.error(response.data.message);
        }
      }
    );
  }

  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <div className="mx-20 max-md:mx-6">
        <div>
          <Header />
        </div>
      </div>
      <div>
        <div className="bg-[#F8F9FD] px-20 max-md:px-6 py-2">
          <p className="text-5xl my-4 font-semibold text-center">
            {strings.WISHLIST}
          </p>
          <div>
            <Container fluid>
              <Row>
                {wishCategory?.length > 0
                  ? wishCategory.map((val, index) => {
                      return (
                        <Col xl="4" xxl="3" md="6" key={index}>
                          <WishListCard
                            path={"/All-Product"}
                            productName={val.name}
                            count={val.count}
                            id={val.id}
                            image={val.thumbnail}
                          />
                        </Col>
                      );
                    })
                  : ""}
                {/* {wishCategory?.length == 0 && (
                  <p className="text-center text-2xl my-4 font-medium text-gray-500 py-3">
                    {strings.NO_RECORD_FOUND}
                  </p>
                )} */}
                <Col xl="4" xxl="3">
                  <div
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className=" border-dashed border-[1px] border-[#0094FF] rounded-xl flex items-center justify-center h-[310px] my-3 w-full py-5"
                  >
                    <div>
                      <p className="text-[#0094FF]">New Collection</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            {showModal && (
              <AddWishListModal
                handleClose={() => {
                  setShowModal(false);
                }}
                show={showModal}
                setName={setName}
                name={name}
                clickEvent={addWishCategoryHandle}
              />
            )}
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
        <MainFooter />
      </div>
    </div>
  );
};

export default WishlistScreen;
