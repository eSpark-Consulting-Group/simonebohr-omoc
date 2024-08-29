import React, { useEffect, useState } from "react";
import { strings } from "../../utils/strings";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";

const SubTotalComponent = ({
  btnClick,
  btnText,
  isAddress,
  selectAddress,
  isStrip,
}) => {
  const { token } = useSelector((state) => state.userData.userDetails);

  const [cartList, setCartList] = useState([]);
  const [shopCartList, setShopCartList] = useState([]);
  const [product, setProduct] = useState({
    name: "React",
    price: 10,
    productBy: "Facebook",
  });

  const makePayment = async (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch("http://localhost:4000/v1/payment/checkout-product", {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log({ status });
      })
      .catch((err) => console.log(err));
  };

  // ==============Fetching cart list API==================
  useEffect(() => {
    async function cartListHandle() {
      await ProductSublyApi.fetchCartList(token).then((response) => {
        if (response.statusCode == 200) {
          setShopCartList(response.data);
          setCartList(response.data.cartList);
        } else {
          toast.error(response.data.error);
        }
      });
    }
    cartListHandle();
  }, []);

  return (
    <div className="bg-white rounded-xl p-3 my-4 isDisabled">
      <p className="text-[32px] font-medium">{strings.SUBTOTAL}</p>
      <div className="flex items-center justify-between mt-4">
        <p className="text-[#9E9E9E]">
          {strings.PRICE} <span>({cartList.length + " "}items)</span>
        </p>
        <p className="font-medium">${shopCartList.originalPrice}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-[#9E9E9E]">{strings.DISCOUNT}</p>
        <p className="font-medium">{shopCartList.discountPrice}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-[#9E9E9E]">{strings.TAX_DELIVERY}</p>
        <p className="font-medium">$100</p>
      </div>
      <div className="flex items-center justify-between mt-4 border-t-[1px] pt-4">
        <p className="font-bold">{strings.TOTAL}</p>
        <p className="font-bold">${shopCartList.totalPrice}</p>
      </div>
      {/* <StripeCheckout
        stripeKey={process.env.REACT_APP_PUBLISH_KEY}
        token={makePayment}
        // name="My React" //optional
        amount={product.price * 100}
      > */}
      {/* <button
        className="bg-[#0094FF] w-full mt-5 rounded-3xl	h-[51px] text-white "
        onClick={btnClick}
        disabled={isAddress && !selectAddress ? true : false}
      >
        <p className="font-medium">{btnText}</p>
      </button> */}
      {/* </StripeCheckout> */}
      <>
        {isStrip ? (
          <StripeCheckout
            stripeKey={process.env.REACT_APP_PUBLISH_KEY}
            token={makePayment}
            // name="My React" //optional
            amount={product.price * 100}
          >
            <button
              className="bg-[#0094FF] w-full mt-5 rounded-3xl	h-[51px] text-white "
              // onClick={btnClick}
              disabled={isAddress && !selectAddress ? true : false}
            >
              <p className="font-medium">{btnText}</p>
            </button>
          </StripeCheckout>
        ) : (
          // alert("strip")
          <button
            className="bg-[#0094FF] w-full mt-5 rounded-3xl	h-[51px] text-white "
            onClick={btnClick}
            disabled={isAddress && !selectAddress ? true : false}
          >
            <p className="font-medium">{btnText}</p>
          </button>
          // alert("button")
        )}
      </>
    </div>
  );
};

export default SubTotalComponent;
