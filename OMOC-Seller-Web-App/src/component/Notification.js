import React from "react";
import shopping_icon from "../assets/icon/shopping_icon.svg";
import { strings } from "../utils/strings";

const notificationData = [
  {
    image: shopping_icon,
    heading: "New Order!!",
    time: "5:10",
    dec: "hooray new order on shoes with amount $12 placed by kuniadi",
  },
  {
    image: shopping_icon,
    heading: "New Order!!",
    time: "5:10",
    dec: "hooray new order on shoes with amount $12 placed by kuniadi",
  },
  {
    image: shopping_icon,
    heading: "New Order!!",
    time: "5:10",
    dec: "hooray new order on shoes with amount $12 placed by kuniadi",
  },
  {
    image: shopping_icon,
    heading: "New Order!!",
    time: "5:10",
    dec: "hooray new order on shoes with amount $12 placed by kuniadi",
  },
  {
    image: shopping_icon,
    heading: "New Order!!",
    time: "5:10",
    dec: "hooray new order on shoes with amount $12 placed by kuniadi",
  },
  {
    image: shopping_icon,
    heading: "New Order!!",
    time: "5:10",
    dec: "hooray new order on shoes with amount $12 placed by kuniadi",
  },
  {
    image: shopping_icon,
    heading: "New Order!!",
    time: "5:10",
    dec: "hooray new order on shoes with amount $12 placed by kuniadi",
  },
  {
    image: shopping_icon,
    heading: "New Order!!",
    time: "5:10",
    dec: "hooray new order on shoes with amount $12 placed by kuniadi",
  },
];
const Notification = () => {
  return (
    <div className="absolute top-8 right-16">
      <div className="justify-center flex">
        <div
          className="w-[350px] h-[409px] rounded-xl	shadow-xl  bg-[#fff] z-10"
          style={{ position: "absolute" }}
        >
          <div
            className="h-16 flex justify-between items-center px-4"
            style={{ borderBottomWidth: 1 }}
          >
            <p>{strings.NOTIFICATION}</p>
            <p>{strings.NEW_ORDER}</p>
          </div>
          <div
            className="h-[71%]"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overflowX: "hidden",
            }}
          >
            {notificationData.map((val,index) => {
              return (
                <div
                  className="w-[337px] h-[80px] bg-[#fff] flex gap-2 items-center" key={index}
                  style={{ overflow: "hidden" }}
                >
                  <div className="w-14 mx-2	h-11 rounded bg-[#F5F5F5] rounded-[22px] flex justify-center items-center">
                    <img src={shopping_icon} />
                  </div>
                  <div className="w-full mx-2">
                    <div className="flex justify-between">
                      <p>{val.heading}</p> <p className="float-right">{val.time}</p>
                    </div>
                    <div className="text-xs text-[#757575]">
                      {val.dec}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{ borderTopWidth: 1, position: "absolute", bottom: 2 }}
            className=" h-14 flex justify-between w-full"
          >
            <button
              className="w-full"
              style={{ borderRightWidth: 1, marginTop: 10, marginBottom: 10 }}
            >
              <p className="text-center text-[#9039FF]">{strings.MARK_ALL_AS_READ}</p>
            </button>
            <button className="w-full">
              <p className="text-center text-[#0094FF]">{strings.VIEW_MORE}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
