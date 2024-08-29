import React from "react";
import global from "../../assets/icons/subheader/globalblue.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import search2 from "../../assets/icons/subheader/search-normal copy 2.svg";
import image from "../../assets/images/imageblack.png";

export default function Interactive() {
  return (
    <div className="w-[342px] bg-white  flex flex-col p-4  gap-3  ">
      <div className="flex flex-col gap-6 items-center justify-between">
        <div className="w-[310px] h-[199px] flex flex-col items-center justify-between">
          <div className="w-full h-[175px] border-[5px] border-[#F5F5F5] rounded-lg flex flex-col items-center  justify-evenly">
            <div className="w-[98px] h-[50px]  rounded-lg flex items-center justify-between px-3 bg-[#ECECEC]">
              <img src={global} alt="" />
              <Icon
                icon="solar:alt-arrow-down-line-duotone"
                width="18.25"
                height="18.25"
                style={{ color: " #0094FF" }}
              />
            </div>
          </div>
          <h2 className="text-[10px] font-medium">Locale selector</h2>
        </div>
        <div className="w-[310px] h-[199px] flex flex-col items-center justify-between">
          <div className="w-full h-[175px] border-[5px] border-[#F5F5F5] rounded-lg flex flex-col items-center  justify-evenly">
            <div className="w-[98px] h-[50px]  rounded-lg flex items-center justify-between px-3 bg-[#ECECEC]">
              <img src={search2} alt="" />
            </div>
          </div>
          <h2 className="text-[10px] font-medium">Search</h2>
        </div>
        <div className="w-[310px] h-[199px] flex flex-col items-center justify-between">
          <div className="w-full h-[175px] border-[5px] border-[#F5F5F5] rounded-lg flex flex-col items-center  justify-evenly">
            <div className="w-[158px] h-[106px]  rounded-lg flex flex-col items-center justify-around px-3 bg-[#ECECEC] ">
              <div className="flex flex-col items-start gap-2 mt-3 ms-[-14  px]">
                <div className="w-[73px] h-[8px] bg-[#AADBFF] rounded-full"></div>
                <div className="w-[111px] h-[8px] bg-[#D9D9D9] rounded-full"></div>
                <div className="w-[111px] h-[8px] bg-[#D9D9D9] rounded-full"></div>
              </div>
              <div className="w-[142px] h-[24px] bg-[#0094FF] rounded-md"></div>
            </div>
          </div>
          <h2 className="text-[10px] font-medium">Cookie Banner</h2>
        </div>
        <div className="w-[310px] h-[199px] flex flex-col items-center justify-between">
          <div className="w-full h-[175px] border-[5px] border-[#F5F5F5] rounded-lg flex  items-center  justify-evenly">
            <div className="w-[92px] h-[106px]  rounded-lg ctr bg-gradient-to-r from-white to-[#ECECEC]">
              <img className="opacity-35" src={image} alt="" />
            </div>
            <div className="w-[92px] h-[106px]  rounded-lg ctr bg-[#ECECEC]">
              <img src={image} alt="" />
            </div>
            <div className="w-[92px] h-[106px]  rounded-lg ctr bg-gradient-to-r from-[#ECECEC] to-white ">
              <img src={image} alt="" />
            </div>
          </div>
          <h2 className="text-[10px] font-medium">Cookie Banner</h2>
        </div>
      </div>
    </div>
  );
}
