import React from "react";

export default function Menus() {
  return (
    <div className="w-[342px]   bg-white  flex flex-col p-4  gap-3">
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="w-[143px] h-[120px] border-8 border-[#F5F5F5] rounded-lg flex flex-col justify-evenly items-center  py-1">
            <div className="w-[100px] h-[6px] rounded-full bg-[#EDEDED]"></div>
            <div className="w-[100px] h-[6px] rounded-full bg-[#EDEDED]"></div>
            <div className="w-[100px] h-[6px] rounded-full bg-[#EDEDED]"></div>
            <div className="w-[100px] h-[6px] rounded-full bg-[#EDEDED]"></div>
          </div>
          <h1 className="font-medium text-[10px] mt-2">Menu Simple</h1>
        </div>
        <div className="text-center">
          <div className="w-[143px] h-[120px] border-8 border-[#F5F5F5] rounded-lg flex flex-col justify-evenly items-center  py-1">
            <div className="flex items-center justify-evenly w-[120px]">
              <div className="size-[22px] bg-[#D1D1D1] rounded-[4px]"></div>
              <div className="w-[68px] h-[6px] rounded-full bg-[#EDEDED]"></div>
            </div>
            <div className="flex items-center justify-evenly w-[120px]">
              <div className="size-[22px] bg-[#D1D1D1] rounded-full"></div>
              <div className="w-[68px] h-[6px] rounded-full bg-[#EDEDED]"></div>
            </div>
            <div className="flex items-center justify-evenly w-[120px] ms-1">
              <div className="size-[17px] bg-[#D1D1D1] rounded-[4px] rotate-45"></div>
              <div className="w-[68px] h-[6px] rounded-full bg-[#EDEDED]"></div>
            </div>
          </div>
          <h1 className="font-medium text-[10px] mt-2">Menu Icons</h1>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="w-[143px] h-[120px] border-8 border-[#F5F5F5] rounded-lg flex flex-col justify-evenly items-center  py-1">
            <div className="flex flex-col  justify-between h-[27px]">
              <div className="w-[100px] h-[6px] rounded-full bg-[#D1D1D1]"></div>

              <div className="w-[55px] h-[6px] rounded-full bg-[#EDEDED]"></div>
            </div>
            <div className="flex flex-col  justify-between h-[27px]">
              <div className="w-[100px] h-[6px] rounded-full bg-[#D1D1D1]"></div>

              <div className="w-[55px] h-[6px] rounded-full bg-[#EDEDED]"></div>
            </div>
          </div>
          <h1 className="font-medium text-[10px] mt-2">Menu Simple</h1>
        </div>
        <div className="text-center">
          <div className="w-[143px] h-[120px] border-8 border-[#F5F5F5] rounded-lg flex flex-col justify-evenly items-center  py-1">
            <div className="flex items-center justify-evenly w-[120px]">
              <div className="size-[22px] bg-[#D1D1D1] rounded-[4px]"></div>
              <div className="h-[17px] flex flex-col justify-between items-start">
                <div className="w-[68px] h-[6px] rounded-full bg-[#D1D1D1]"></div>
                <div className="w-[38px] h-[6px] rounded-full bg-[#EDEDED]"></div>
              </div>
            </div>
            <div className="flex items-center justify-evenly w-[120px]">
              <div className="size-[22px] bg-[#D1D1D1] rounded-full"></div>
              <div className="h-[17px] flex flex-col justify-between items-start">
                <div className="w-[68px] h-[6px] rounded-full bg-[#D1D1D1]"></div>
                <div className="w-[38px] h-[6px] rounded-full bg-[#EDEDED]"></div>
              </div>
            </div>
          </div>
          <h1 className="font-medium text-[10px] mt-2">Menu Icons</h1>
        </div>
      </div>
    </div>
  );
}
