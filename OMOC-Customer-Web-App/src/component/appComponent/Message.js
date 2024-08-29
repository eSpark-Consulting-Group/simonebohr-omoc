import React from "react";
import { strings } from "../../utils/strings";
import profile from "../../assets/images/profile_pic.png";

const data = [
  {
    image: profile,
    headding: "Yeete West",
    subHeadding: "Borem ipsum dolor sit amet, consectetur adipiscing elit.",
    numberOfMessage: 1,
  },
  {
    image: profile,
    headding: "SELLER GROUP",
    subHeadding: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    numberOfMessage: 1,
  },
  {
    image: profile,
    headding: "Carl Jhonson",
    subHeadding: "Borem ipsum dolor sit amet, consectetur adipiscing elit.",
    numberOfMessage: 1,
  },
  {
    image: profile,
    headding: "Kendl Jenner",
    subHeadding: "Borem ipsum dolor sit amet, consectetur adipiscing elit.",
    numberOfMessage: 1,
  },
  {
    image: profile,
    headding: "Sweet Memories",
    subHeadding: "Borem ipsum dolor sit amet, consectetur adipiscing elit.",
    numberOfMessage: 1,
  },
];
const Message = () => {
  return (
    <div className="absolute w-96 bg-white mt-20 z-10 rounded-lg h-96 overflow-x-hidden overflow-scroll">
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-xl font-medium ">{strings.DIRECT_MESSAGE}</p>
          <p className="text-sm text-[#0094FF] cursor-pointer">
            {strings.SEE_ALL}
          </p>
        </div>
        {data.map((val, index) => {
          return (
            <div className="flex items-center justify-between mt-3 border-b-[1px] pb-3">
              <div className="flex items-center gap-3">
                <img className="w-[32px] h-[32px]" src={val.image} />
                <div>
                  <p>{val.headding}</p>
                  <p className="text-sm text-[#9E9E9E]">{val.subHeadding}</p>
                </div>
              </div>
              <div className="w-6 h-5 bg-[#0094FF] flex justify-center items-center rounded-full">
                <p className="text-white text-[10px]">{val.numberOfMessage}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Message;
