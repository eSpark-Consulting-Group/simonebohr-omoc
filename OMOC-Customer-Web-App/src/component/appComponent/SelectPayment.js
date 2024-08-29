import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SubTotalComponent from "../commonComponent/SubTotalComponent";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import PayPal from "../../assets/icon/PayPal.svg";
import mastercard from "../../assets/icon/mastercard.svg";
import Header from "../commonComponent/Header";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";
import PaymentApi from "../../helper/PaymentApi";

const data = [1, 2, 3];
const SelectPayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userData.userDetails);
  const { finalCartList } = useSelector((state) => state.productList);
  const [isLoading, setIsLoading] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [selectPayment, setSelectPayment] = useState();

  useEffect(() => {
    PaymentApi.getAllPayment(token)
      .then(({ data }) => {
        setCardList(data?.cards);
      })
      .catch((err) => {
        toast.error(err?.message || "");
      });
  }, []);

  // ==============Place order APi============
  async function orderHandle() {
    setIsLoading(true);
    const requestData = {
      products: finalCartList.map((items) => ({
        productId: items.productId._id,
        quantity: items.quantity,
      })),
      addressId: state,
      paymentType: "cod",
      paymentId: selectPayment,
    };
    await ProductSublyApi.placeOrder(requestData, token).then((response) => {
      setIsLoading(false);
      if (response.statusCode == 200) {
        toast.success(response.message);
        navigate("/Home");
      } else {
        toast.error(response.data.message);
      }
    });
  }

  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <div className=" px-20 max-md:px-6 bg-[#F8F9FD]">
        <Container fluid>
          <Row>
            <Col lg="9">
              <div className="bg-white rounded-xl p-3 my-4">
                <div className="flex items-center justify-between">
                  <p className="text-xl	font-bold">
                    {strings.SELECT_YOUR_PAYMENT}
                  </p>
                  <button
                    className="bg-[#0094FF] p-2 rounded-[32px] h-9 flex items-center justify-center"
                    // onClick={() => {
                    //   setNewAddress(true);
                    //   ShowAddress(false);
                    // }}
                  >
                    <Icon
                      color="white"
                      width={12}
                      height={12}
                      icon="mingcute:add-line"
                    />
                    <p className="text-xs text-white">
                      {strings.ADD_PAYMENT_METHOD}
                    </p>
                  </button>
                </div>
                {cardList?.map((data) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectPayment(data.paymentId);
                      }}
                      className={`${
                        selectPayment == data.paymentId
                          ? " border-[#0094FF]"
                          : "border-[#F2F2F2]"
                      } flex gap-3 mt-3 p-3 border-[1px]  rounded-xl relative cursor-pointer hover:border-[#0094FF]`}
                    >
                      <div className="w-9 h-9 bg-[#F1F1F1] rounded-md flex items-center justify-center">
                        <img src={mastercard} />
                      </div>
                      <div className="leading-7	">
                        <div className="flex gap-2">
                          <p className="font-bold">Credit Card</p>
                          {data?.isDefault && (
                            <div className="bg-[#E8F5FF] rounded-3xl px-2 flex items-center">
                              <p className="text-[10px] font-medium text-[#0094FF]">
                                Primary Payment
                              </p>
                            </div>
                          )}
                        </div>
                        <p className="text-[#9E9E9E] font-medium">
                          {data?.holderName || "Abdul Momon"}
                        </p>
                        <p className="text-[#9E9E9E] font-medium">
                          *** *** **** {data?.last4Digit ?? "3090"}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {/* {data.map(() => {
                  return (
                    <div className="flex gap-3 border-[1px] border-[#F2F2F2] p-3 my-3 rounded-xl">
                      <div className="w-9 h-9 bg-[#F1F1F1] rounded-md flex items-center justify-center">
                        <img src={mastercard} />
                      </div>
                      <div className="leading-7	">
                        <div className="flex gap-2">
                          <p className="font-bold">Credit Card</p>
                          <div className="bg-[#E8F5FF] rounded-3xl px-2 flex items-center">
                            <p className="text-[10px] font-medium text-[#0094FF]">
                              Primary Payment
                            </p>
                          </div>
                        </div>
                        <p className="text-[#9E9E9E] font-medium">
                          Abdul Momon
                        </p>
                        <p className="text-[#9E9E9E] font-medium">
                          9241 2431 *** ***
                        </p>
                      </div>
                    </div>
                  );
                })} */}
              </div>
            </Col>
            <Col md="3">
              <SubTotalComponent
                btnText={"Checkout"}
                btnClick={() => {
                  orderHandle();
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SelectPayment;
