import React from "react";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import hoodie from "../../assets/images/hoodie.png";
const data = [
  {
    icon: "streamline:discount-percent-coupon",
    heading: "Promo and Discount",
    subHeading: "Special Promo! 50% Discount for All Products",
    number: 2,
  },
  {
    icon: "octicon:play-24",
    heading: "Live & Video",
    subHeading: "This eco-friendly backpack is for laptops",
    number: 1,
  },
  {
    icon: "fluent:people-20-regular",
    heading: "Friends",
    subHeading: "No notifications yet",
    number: 2,
  },
  {
    icon: "fluent:info-16-regular",
    heading: "Info Omoc",
    subHeading: "Please, complete your data to get attractive promos",
    number: 1,
  },
];
const Transaction = [
  {
    heading: "Order Shipped",
    subHeading: "Order in the process of delivery by courier.",
    date: "02-07-2023 08:30",
  },
  {
    heading: "Order Shipped",
    subHeading: "Order in the process of delivery by courier.",
    date: "02-07-2023 08:30",
  },
];

const Notification = () => {
  return (
    <div className="absolute w-96 bg-white mt-20 z-10 rounded-lg h-96 overflow-x-hidden overflow-scroll">
      <div className=" p-3 ">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-medium">{strings.NOTIFICATION}</p>
          <Icon width="24px" height="24px" icon="uil:setting" />
        </div>
        {data.map((val, index) => {
          return (
            <div className="flex items-center justify-between border-b-[1px] py-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#F5F5F5] h-10 w-10 rounded-full flex justify-center items-center">
                  <Icon icon={val.icon} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">{val.heading}</p>
                  <p className="text-xs">{val.subHeading}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {
                  <div className="bg-[#C80000] h-6 w-6 rounded-full flex items-center justify-center">
                    <p className="text-white text-xs font-medium">
                      {val.number}
                    </p>
                  </div>
                }
                <Icon icon="ep:arrow-up" rotate={1} />
              </div>
            </div>
          );
        })}
      </div>
      {Transaction.map((val, index) => {
        return (
          <div className="h-24 py-[12px] hover:bg-[#EDEDED] p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  width="40px"
                  height="40px"
                  className="rounded-full"
                  src={hoodie}
                />
                <div>
                  <p className="text-sm font-medium leading-4	">{val.heading}</p>
                  <p className="text-xs leading-5	my-2">{val.subHeading}</p>
                  <div className="flex items-center  gap-2">
                    <Icon color="#757575" icon="bi:clock" rotate={2} />
                    <p className="text-xs text-[#757575]">{val.date}</p>
                  </div>
                </div>
              </div>
              <Icon icon="ep:arrow-up" rotate={1} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
