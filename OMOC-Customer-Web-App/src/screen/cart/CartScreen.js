import { React, useEffect, useState } from "react";
import Header from "../../component/commonComponent/Header";
import { Col, Container, Row } from "react-bootstrap";
import { strings } from "../../utils/strings";
import omocLogo from "../../assets/icon/omoc_black_logo.svg";
import { Icon } from "@iconify/react";
import CartProductComponent from "../../component/commonComponent/CartProductComponent";
import PriceItemCard from "../../component/commonComponent/PriceItemCard";
import MainFooter from "../../component/appComponent/MainFooter";
import { useNavigate } from "react-router-dom";
import SubTotalComponent from "../../component/commonComponent/SubTotalComponent";
import { useDispatch, useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import { toast } from "react-toastify";
import { cartProductList } from "../../Store/Slices/ProductSlice";
import Loader from "../../utils/Loader";

const CartScreen = () => {
  const { productList } = useSelector((state) => state.productList);
  const { token } = useSelector((state) => state.userData.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(null);
  const [saveBut, setSaveBut] = useState(false);
  const [cartList, setCartList] = useState("");
  const [shopCartList, setShopCartList] = useState("");
  const [productQuantity, setProductQuantity] = useState();
  const [productIds, setProductIds] = useState([]);
  const [productId, setProductId] = useState();
  const [deleteMultipleProduct, setdeleteMultipleProduct] = useState({
    productIds: [],
  });
  const [editBtn, setEditBtn] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //  console.log("PRODUCTID",productIds)
  function setProductIdsList(shopCartList) {
    const list =
      shopCartList &&
      shopCartList?.map((items) => {
        return items?.data?.map((product) => ({
          id: product?._id,
          quantity: product?.quantity,
        }));
      });
    if (list?.length) {
      setProductIds(list?.flat());
    }
  }
  // ==============Fetching cart list API==================
  useEffect(() => {
    cartListHandle();
  }, []);
  async function cartListHandle() {
    setIsLoading(true);
    await ProductSublyApi.fetchCartList(token).then((response) => {
      setIsLoading(false);
      if (response.statusCode == 200) {
        setShopCartList(response.data.cartProducts);
        setCartList(response.data.cartList);
        if (response.data.cartList?.length) {
          setProductIdsList(response.data.cartProducts);
        }
      } else {
        toast.error(response.data.error);
      }
    });
  }

  /* ------DELETE PRODUCT API -----*/
  async function deleteProducts() {
    setIsLoading(true);
    await ProductSublyApi.deleteProduct(token, deleteMultipleProduct).then(
      (response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          toast.success(response.message);
          cartListHandle();
        } else {
          toast.error(response.data.message);
        }
        console.log(response);
      }
    );
  }

  /* ------UPDATE CART QUANTITY API -----*/

  async function productQuntityHandler() {
    setIsLoading(true);
    await ProductSublyApi.quantityIncandDec(token, { productIds }).then(
      (response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
          toast.success(response.message);
        } else {
          toast.error(response.data.message);
        }
        console.log(response);
      }
    );
  }

  function getQuantity(id) {
    const quantity = productIds?.find((data) => data?.id === id)?.quantity;
    return quantity && quantity > 0 ? quantity : 0;
  }
  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <div className=" px-20 max-md:px-6 bg-[#F8F9FD]">
        <p className="text-[32px] font-bold">{strings.MY_CART}</p>
        <Container fluid>
          <Row>
            <Col lg="9">
              {shopCartList && shopCartList.length > 0
                ? shopCartList.map(({ shopId, ...items }, shopIndex) => (
                    <div
                      className="bg-white rounded-xl p-3 my-4"
                      key={shopIndex}
                    >
                      <div className="flex items-center justify-between border-b-[1px] pb-3">
                        <div className="flex items-center gap-2">
                          <img width={40} height={40} src={omocLogo} />
                          <p className="text-lg font-medium">
                            {items.shopName}
                          </p>
                          <Icon
                            width={24}
                            height={24}
                            icon="bitcoin-icons:verify-filled"
                            color="#3d9ffb"
                          />
                        </div>
                        {showEdit === shopIndex && items.shopId === editBtn ? (
                          <div className="flex gap-4">
                            <p
                              onClick={() => {
                                {
                                  setShowEdit(shopIndex);
                                  setSaveBut(true);
                                  productQuntityHandler();
                                }
                              }}
                              className="text-lg text-[#0094FF] cursor-pointer"
                            >
                              {strings.SAVE}
                            </p>
                            <button
                              onClick={deleteProducts}
                              className="text-lg text-[#FF0000] cursor-pointer"
                            >
                              {strings.DELETE}
                            </button>
                          </div>
                        ) : (
                          <p
                            onClick={() => {
                              setShowEdit(shopIndex);
                              setEditBtn(items.shopId);
                            }}
                            className="text-lg text-[#0094FF] cursor-pointer"
                          >
                            {strings.EDIT}
                          </p>
                        )}
                      </div>
                      {items.data
                        ? items.data.map((items, index) => {
                            return (
                              <CartProductComponent
                                items={items}
                                showButtons={shopId === editBtn}
                                showEdit={showEdit === shopIndex}
                                setdeleteMultipleProduct={
                                  setdeleteMultipleProduct
                                }
                                deleteMultipleProduct={deleteMultipleProduct}
                                productQuantity={getQuantity(items?._id)}
                                setProductQuantity={setProductQuantity}
                                productIds={productIds}
                                setProductIds={setProductIds}
                                setProductId={setProductId}
                              />
                            );
                          })
                        : ""}
                    </div>
                  ))
                : ""}
              {shopCartList.length == 0 && (
                <p className="text-center text-sm font-medium text-gray-500 py-3 w-full">
                  {strings.NO_RECORD_FOUND}
                </p>
              )}
            </Col>
            <Col lg="3">
              <SubTotalComponent
                btnText={strings.PROCEED_TO_CHECKOUT}
                btnClick={() => {
                  navigate("/Address", { state: productIds });
                  dispatch(cartProductList(cartList));
                }}
              />
            </Col>
          </Row>
        </Container>
        <div className="flex flex-wrap items-center justify-between">
          <p className="text-[32px] font-medium">
            {strings.SUGGESTION_FOR_YOU}
          </p>
          <p className="text-sm text-[#0094FF] font-medium">
            {strings.SEE_ALL}
          </p>
        </div>
        <Container className="pb-5" fluid>
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
      </div>
      <MainFooter />
    </div>
  );
};

export default CartScreen;
