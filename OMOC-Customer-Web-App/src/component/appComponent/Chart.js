import React, { useEffect, useState } from "react";
import { strings } from "../../utils/strings";
import chartImg from "../../assets/images/trackSuit.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
const data = [1, 2, 3, 4, 5];

const Chart = ({ cartLength }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userData.userDetails);
  const [cartList, setCartList] = useState("");
  // const [cartLength,setCartLength] = useState(0)

  // ==============Fetching cart list API==================
  useEffect(() => {
    async function cartListHandle() {
      await ProductSublyApi.fetchCartList(token).then((response) => {
        if (response.statusCode == 200) {
          setCartList(response.data.cartList);
          cartLength(response.data.cartList.length);
        }
      });
    }
    cartListHandle();
  }, []);
  return (
    <div className="absolute w-96 bg-white mt-20 z-10 rounded-lg h-96 overflow-x-hidden overflow-scroll">
      <div className="p-3">
        <div className="flex items-center justify-between ">
          <p className="text-xl font-medium ">{strings.CHART}</p>
          <p
            className="text-[#0094FF] text-sm cursor-pointer"
            onClick={() => {
              navigate("/Cart");
            }}
          >
            {strings.SEE_ALL}
          </p>
        </div>
        {cartList && cartList.length > 0
          ? cartList.map((item, index) => {
              return (
                <div
                  className="flex items-center justify-between border-b-[1px] py-3"
                  key={index}
                >
                  <div className="flex items-center gap-2">
                    <img
                      className="h-14 w-14 rounded-lg	"
                      src={item.productId?.images[0].url}
                    />
                    <div>
                      <p className="font-medium">{item.productId?.name}</p>
                      <div className="bg-[#F5F5F5] px-1 py-1 text-center rounded-3xl	mt-2  ">
                        <p className="text-sm">Cream, Large</p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4">${item.productId?.price} </p>
                </div>
              );
            })
          : ""}
        {cartList.length == 0 && (
          <p className="text-center text-sm font-medium text-gray-500 py-3">
            {strings.NO_RECORD_FOUND}
          </p>
        )}
      </div>
    </div>
  );
};

export default Chart;
