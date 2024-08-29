import React from "react";
import pinkbg from "../../assets/images/pinkbg.jpeg";
import logo1 from "../../assets/images/logo1.png";
import logo2 from "../../assets/images/logo1.png";
import logo3 from "../../assets/images/logo1.png";
import logo4 from "../../assets/images/logo1.png";

export default function Pages() {
  return (
    <div className="w-[342px]   bg-white  flex flex-col p-4  gap-3">
      <div className="w-full h-[364px] border-8 border-[#F5F5F5] rounded-lg flex flex-col justify-evenly items-center text-center ">
        <h1 className="font-semibold text-lg"> The landing Page</h1>
        <img
          src={pinkbg}
          className="w-[256px] h-[126px] border rounded-[4px]"
        ></img>
        <p className="font-medium text-[8px] text-[#C2C2C2] w-[195px]">
          Lorem ipsum dolor sit amet consectetur. Sed libero nibh tincidunt
          dolor in in tempus iaculis sed. Tellus leo gravida magnis.
        </p>
        <div>
          <button className="bg-[#242424] w-[46px] h-[14px] rounded-[2px] text-[6px] font-medium text-white">
            Button
          </button>
          <button className="bg-[#EDEDED] w-[46px] h-[14px] rounded-[2px] text-[6px] font-medium ms-2">
            Button
          </button>
        </div>
        <div className="flex items-center justify-evenly w-full">
          <img src={logo1} alt="" />
          <img src={logo2} alt="" />
          <img src={logo3} alt="" />
          <img src={logo4} alt="" />
        </div>
      </div>

      <div className="w-full h-[364px] border-8 border-[#F5F5F5] rounded-lg flex flex-col justify-evenly items-center p-5 ">
        {" "}
        <h1 className="font-semibold text-lg text-center mb-2">Portfolio</h1>
        <img
          src={pinkbg}
          className="w-[256px] h-[101px] border rounded-[4px]"
        ></img>
        <div className="flex items-center justify-between w-full">
          <p className="font-medium text-[8px] text-[#C2C2C2] w-[175px] line-clamp-2 mt-2">
            Lorem ipsum dolor sit amet consectetur. Sed libero nibh tincidunt
            dolor in in tempus iaculis sed.
          </p>
          <button className="bg-[#242424] w-[46px] h-[14px] rounded-[2px] text-[6px] font-medium text-white">
            Button
          </button>
        </div>
        <img
          src={pinkbg}
          className="w-[256px] h-[101px] border rounded-[4px] mt-3    "
        ></img>
        <div className="flex items-center justify-between  w-full  mt-2 ">
          <p className="font-medium text-[8px] text-[#C2C2C2] w-[175px] line-clamp-2">
            Lorem ipsum dolor sit amet consectetur. Sed libero nibh tincidunt
            dolor in in tempus iaculis sed.
          </p>
          <button className="bg-[#242424] w-[46px] h-[14px] rounded-[2px] text-[6px] font-medium text-white">
            Button
          </button>
        </div>
      </div>
    </div>
  );
}
