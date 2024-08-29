import React from "react";
import logo from "../../assets/icons/leftsidebar/OMOCwhole.svg";
import { Icon } from "@iconify/react";

export default function Navigation() {
  return (
    <div className="w-[342px]   bg-white  flex flex-col p-4  gap-3">
      <div className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg">
        <div className="h-[68px] w-full border-b border-[#F5F5F5] flex items-center">
          <div>
            <img className="mx-5" src={logo} alt="" />
          </div>

          <div className="text-xs text-textcolor flex items-center gap-2  ">
            <span>Features</span>
            <span>Gallery</span>
            <span>Blog </span>
          </div>
        </div>
      </div>

      <div className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg">
        <div className="h-[68px] w-full border-b border-[#F5F5F5] flex items-center">
          <div>
            <img className="mx-5" src={logo} alt="" />
          </div>

          <div className="text-xs text-textcolor flex items-center gap-2  ">
            <span>Features</span>
            <div className="flex items-center ">
              <span>Gallery</span>{" "}
              <Icon
                className="ms-1"
                icon="eva:arrow-up-fill"
                width="8px"
                height="8px"
                style={{ color: "#757575" }}
              />{" "}
            </div>
            <span>Blog </span>
          </div>
        </div>
        <div className="m-1 ">
          <div className=" ms-auto w-[121px] flex flex-col justify-evenly items-center h-[69px] border shadow-sm rounded-lg">
            <div className="flex items-center justify-evenly ">
              <div className="size-[14px] bg-[#D9D9D9]"></div>
              <div className="w-[75px] h-[6px] bg-[#F5F5F5] rounded-[2px] ms-2"></div>
            </div>
            <div className="flex items-center justify-evenly ">
              <div className="size-[14px] bg-[#D9D9D9] rotate-45 border"></div>
              <div className="w-[75px] h-[6px] bg-[#F5F5F5] rounded-[2px] ms-[9px] "></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg">
        <div className="h-[68px] w-full border-b border-[#F5F5F5] flex items-center">
          <div>
            <img className="mx-5" src={logo} alt="" />
          </div>
        </div>
        <div className="border-b border-[#F5F5F5] h-[55px] flex items-center overflow-hidden ms-5 gap-3 font-medium text-xs text-textcolor">
          <span>Discover</span>
          <span>Features</span>
          <span>Gallery</span>
          <span>Blog</span>
          <span>Templates</span>
        </div>
      </div>

      <div className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg">
        <div className="h-[68px] w-full border-b border-[#F5F5F5] flex items-center justify-between">
          <div>
            <img className="mx-5" src={logo} alt="" />
          </div>

          <div className=" items-center mx-5 ">
            <Icon icon="lucide:menu" width="24" height="24" />
          </div>
        </div>
        <div className="mt-4 mx-5 overflow-hidden ">
          <div className="gap-4 flex flex-col font-medium text-xs text-textcolor">
            <span>Discover</span>
            <span>Features</span>
          </div>
        </div>
      </div>
    </div>
  );
}
