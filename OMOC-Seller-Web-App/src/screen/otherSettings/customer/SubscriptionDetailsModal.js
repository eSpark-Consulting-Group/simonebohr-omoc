import { Icon } from "@iconify/react";
import React from "react";
import Modal from "react-modal";
import { strings } from "../../../utils/strings";

const customStyles = {
  content: {
    left: "auto",
    right: "27%",
    width: "46%",
  },
};

const detailData = [
  {
    type: "Subscription ID",
    value: "0001",
  },
  {
    type: "Product Name",
    value: "Black Hoodie RazorSI",
  },
  {
    type: "Frequency",
    value: "Monthly",
  },
  {
    type: "Product Type",
    value: "Physical",
  },
  {
    type: "Product Price",
    value: "$250",
  },
  {
    type: "Next Billing Date",
    value: "30/05/2023",
  },
  {
    type: "Subscription Status",
    value: "Active",
  },
  {
    type: "Delivery Address",
    value: "St, riverside, united kingdom",
  },
];
const shippingDetails = [
  {
    type: "Shipping Method",
    value: "Express",
  },
  {
    type: "Shipping Number",
    value: "091230",
  },
  {
    type: "Shipping Cost",
    value: "$5",
  },
];

const SubscriptionDetailsModal = ({ closeModal, isOpen }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Change Solution Modal"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{strings.SUBSCRIPTION_DETAILS}</h1>
          <Icon
            className=" cursor-pointer"
            onClick={closeModal}
            width="30"
            icon="ion:close-outline"
          />
        </div>
        <div className="border-b-2">
          {detailData.map((val, index) => {
            return (
              <div className="flex my-5 ">
                <div className=" w-1/2">
                  <p className="text-xl	text-[#616161]">{val.type}</p>
                </div>
                <div className="">
                  <p
                    className=" text-xl font-semibold text-[#242424]"
                    style={{ float: "right" }}
                  >
                    {val.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="my-5 border-b-2">
          <h1 className="text-2xl font-bold">{strings.SHIPPING_DETAILS}</h1>
          {shippingDetails.map((val, index) => {
            return (
              <div className="flex my-5 ">
                <div className=" w-1/2">
                  <p className="text-xl	text-[#616161]">{val.type}</p>
                </div>
                <div className="">
                  <p
                    className=" text-xl font-semibold text-[#242424]"
                    style={{ float: "right" }}
                  >
                    {val.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{strings.SUBSCRIPTION_OFFER}</h1>
          <div className="flex my-5 items-center">
            <div className=" w-full">
              <p className="text-xl	text-[#616161]"> Current Offer</p>
            </div>
            <div className="">
              <p
                className=" text-xl font-semibold text-[#242424]"
                style={{ float: "right" }}
              >
                Subscribe 3 months in a row and get a 5% discount on your next
                month
                {/* {val.value} */}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SubscriptionDetailsModal;
