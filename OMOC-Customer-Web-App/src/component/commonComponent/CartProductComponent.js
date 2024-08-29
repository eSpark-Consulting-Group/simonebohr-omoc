import { React, useEffect, useState } from "react";
import hoodie from "../../assets/images/trackSuit.png";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import ProductSublyApi from "../../helper/ProductApi";
import { useSelector } from "react-redux";

const CartProductComponent = ({
  showEdit,
  items,
  setdeleteMultipleProduct,
  deleteMultipleProduct,
  productQuantity,
  setProductQuantity,
  setProductIds,
  productIds,
}) => {
  const { token } = useSelector((state) => state.userData.userDetails);
  function handleIncrementDecrement(productId, quantity) {
    const item = [...productIds];
    const itemFound = item?.find((data) => data?.id === productId);
    if (itemFound) {
      itemFound.quantity = quantity;
    } else {
      item.push({
        id: productId,
        quantity: quantity && quantity > 0 ? quantity : 0,
      });
    }
    setProductIds(item);
  }
  useEffect(() => {
    setProductQuantity(items?.quantity);
  }, []);

  return (
    <div className="flex justify-between mt-3">
      <div className="flex items-start gap-3">
        {showEdit && (
          <input
            className="bg-red-400 w-5 h-5 mt-1"
            type="checkbox"
            onChange={(e) =>
              e.target.checked
                ? setdeleteMultipleProduct({
                    productIds: [
                      ...deleteMultipleProduct.productIds,
                      items._id,
                    ],
                  })
                : null
            }
          />
        )}
        <div className="flex items-center gap-2">
          <img
            className="h-28 w-28 rounded-2xl bg-[#F5F5F5]"
            src={items.images[0].url}
          />
          <div className="">
            <p className="text-xl	font-medium">{items.name}</p>
            <div className="bg-[#F5F5F5] px-1 py-1 text-center rounded-3xl my-2 ">
              <p className="text-sm">Cream, Large</p>
            </div>
            <p className="text-2xl font-medium">${items.price}</p>
          </div>
        </div>
      </div>
      {showEdit && (
        <div className=" relative">
          <div className="h-10 w-10 rounded-full border-[1px] border-[#F5F5F5] flex items-center justify-center absolute right-0">
            <Icon color="#0094FF" icon="clarity:pencil-line" />
          </div>
          <div className="flex bg-[#F8F8F8] rounded-3xl	w-28  items-center justify-evenly p-1 absolute bottom-0 right-0">
            <div
              className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
              onClick={() => {
                const quantity = productQuantity - 1;
                const setQuantity = quantity && quantity > 0 ? quantity : 0;
                handleIncrementDecrement(items._id, setQuantity);
              }}
            >
              <Icon
                className="cursor-pointer"
                width={9}
                height={9}
                icon="ic:round-minus"
              />
            </div>
            <div>
              <p>{productQuantity || 0}</p>
            </div>

            <div
              className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
              onClick={() => {
                const quantity = productQuantity + 1;
                handleIncrementDecrement(items._id, quantity);
              }}
            >
              {items.id}
              <Icon
                className="cursor-pointer"
                width={9}
                height={9}
                icon="mingcute:add-line"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartProductComponent;
