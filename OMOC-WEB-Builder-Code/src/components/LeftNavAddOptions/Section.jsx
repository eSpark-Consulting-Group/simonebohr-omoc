
import React from "react";
import pinkbg from "../../assets/images/pinkbg.jpeg";

export default function Section() {
  return (
    <div className="w-[342px] bg-white  flex flex-col p-4  gap-3  ">
      <div className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg flex flex-col items-center  justify-evenly">
        <h1 className="text-lg font-semibold w-[168px] text-center leading-5">
          The site will looks like this
        </h1>
        <p className="w-[203px] h-[32px] text-[10px] font-medium  overflow-hidden line-clamp-2   text-[#C2C2C2] text-center">
          Lorem ipsum dolor sit amet consectetur. Sed libero nibh tincidunt
          dolor in in tempus iaculis sed. Tellus leo gravida magnis.
        </p>
        <div className="flex items-center text-[10px] font-medium">
          <button className="rounded w-[76px] h-[23px] bg-[#242424] text-white">
            Button
          </button>
          <button className="rounded w-[76px] h-[23px] bg-[#EDEDED] ms-2">
            Button
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${pinkbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
        className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg flex flex-col items-center  justify-evenly   "
      >
        <h1 className="text-lg font-semibold w-[168px] text-center leading-5">
          The site will looks like this
        </h1>
        <p className="w-[203px] h-[32px] text-[10px] font-medium  overflow-hidden line-clamp-2   text-[#C2C2C2] text-center">
          Lorem ipsum dolor sit amet consectetur. Sed libero nibh tincidunt
          dolor in in tempus iaculis sed. Tellus leo gravida magnis.
        </p>
        <div className="flex items-center text-[10px] font-medium">
          <button className="rounded w-[76px] h-[23px] bg-[#242424] text-white">
            Button
          </button>
          <button className="rounded w-[76px] h-[23px] bg-[#EDEDED] ms-2">
            Button
          </button>
        </div>
      </div>
      <div className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg flex  items-center  justify-evenly">
        <div className="w-1/2 flex flex-col   ms-4 justify-evenly">
          <h1 className="text-base font-semibold leading-5 w-[115px] ">
            The site will looks like this
          </h1>
          <p className=" h-[32px] text-[10px] font-medium  overflow-hidden line-clamp-2  w-[115px] text-[#C2C2C2] my-2">
            Lorem ipsum dolor sit amet consectetur. Sed libero nibh tincidunt
            dolor in in tempus iaculis sed. Tellus leo gravida magnis.
          </p>
          <div className="flex items-center text-[10px] font-medium">
            <button className="rounded-sm w-[46px] h-[14px] bg-[#242424] text-white">
              Button
            </button>
            <button className="rounded-sm w-[46px] h-[14px] bg-[#EDEDED] ms-1">
              Button
            </button>
          </div>
        </div>
        <img src={pinkbg} className="w-1/2 border h-full rounded-e-lg "></img>
      </div>
      <div className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg flex  items-center  justify-evenly">
        <img src={pinkbg} className="w-1/2 border h-full rounded-s-lg "></img>
        <div className="w-1/2 flex flex-col   ms-4 justify-evenly">
          <h1 className="text-base font-semibold leading-5 w-[115px] ">
            The site will looks like this
          </h1>
          <p className="w-[115px] h-[32px] text-[10px] font-medium  overflow-hidden line-clamp-2   text-[#C2C2C2] my-2">
            Lorem ipsum dolor sit amet consectetur. Sed libero nibh tincidunt
            dolor in in tempus iaculis sed. Tellus leo gravida magnis.
          </p>
          <div className="flex items-center text-[10px] font-medium">
            <button className="rounded-sm w-[46px] h-[14px] bg-[#242424] text-white">
              Button
            </button>
            <button className="rounded-sm w-[46px] h-[14px] bg-[#EDEDED] ms-1">
              Button
            </button>
          </div>
        </div>
      </div>
      <div className="w-full  border-8 border-[#F5F5F5] rounded-lg flex flex-col items-center  justify-evenly p-3">
        <div className="flex h-[132px] mb-3 justify-between">
          <img src={pinkbg} className="w-1/2 border h-full rounded-lg "></img>
          <div className="w-1/2 flex flex-col   ms-4 justify-evenly">
            <h1 className="text-base font-semibold leading-5 w-[115px] ">
              The site will looks like this
            </h1>
            <p className="w-[115px] h-[32px] text-[10px] font-medium  overflow-hidden line-clamp-2   text-[#C2C2C2] my-2">
              ededLorem ipsum dolor sit amet consectetur. Sed libero nibh
              tincidunt dolor in in tempus iaculis sed. Tellus leo gravida
              magnis.
            </p>
            <div className="flex items-center text-[10px] font-medium">
              <button className="rounded-sm w-[46px] h-[14px] bg-[#242424] text-white">
                Button
              </button>
              <button className="rounded-sm w-[46px] h-[14px] bg-[#EDEDED] ms-1">
                Button
              </button>
            </div>
          </div>
        </div>
        <div className="flex h-[132px] justify-between">
          <div className="w-1/2 flex flex-col   ms-4 justify-evenly">
            <h1 className="text-base font-semibold leading-5 w-[115px] ">
              The site will looks like this
            </h1>
            <p className="w-[115px] h-[32px] text-[10px] font-medium  overflow-hidden line-clamp-2   text-[#C2C2C2] my-2">
              ededLorem ipsum dolor sit amet consectetur. Sed libero nibh
              tincidunt dolor in in tempus iaculis sed. Tellus leo gravida
              magnis.
            </p>
            <div className="flex items-center text-[10px] font-medium">
              <button className="rounded-sm w-[46px] h-[14px] bg-[#242424] text-white">
                Button
              </button>
              <button className="rounded-sm w-[46px] h-[14px] bg-[#EDEDED] ms-1">
                Button
              </button>
            </div>
          </div>
          <img src={pinkbg} className="w-1/2 border h-full rounded-lg "></img>
        </div>
      </div>
      <div className="w-full  border-8 border-[#F5F5F5] rounded-lg flex flex-col items-center  justify-evenly p-2">
        <h1 className="font-semibold text-base text-black mt-3 mb-2 ">Best choices</h1>
        <div className="flex justify-between items-center  w-full">
          <div>
            <img
              className="w-[90px] h-[95px] rounded-[4px]"
              src={pinkbg}
              alt=""
            />
            <p className="text-[6px] mt-1 text-[#404040]">product 1</p>
          </div>
          <div>
            <img
              className="w-[90px] h-[95px] rounded-[4px]"
              src={pinkbg}
              alt=""
            />
            <p className="text-[6px] mt-1 text-[#404040]">product 1</p>
          </div>
          <div>
            <img
              className="w-[90px] h-[95px] rounded-[4px]"
              src={pinkbg}
              alt=""
            />
            <p className="text-[6px] mt-1 text-[#404040]">product 1</p>
          </div>
          
        </div>
        <div className="flex justify-between items-center  w-full mt-1">
          <div>
            <img
              className="w-[90px] h-[95px] rounded-[4px]"
              src={pinkbg}
              alt=""
            />
            <p className="text-[6px] mt-1 text-[#404040]">product 1</p>
          </div>
          <div>
            <img
              className="w-[90px] h-[95px] rounded-[4px]"
              src={pinkbg}
              alt=""
            />
            <p className="text-[6px] mt-1 text-[#404040]">product 1</p>
          </div>
          <div>
            <img
              className="w-[90px] h-[95px] rounded-[4px]"
              src={pinkbg}
              alt=""
            />
            <p className="text-[6px] mt-1 text-[#404040]">product 1</p>
          </div>
          
        </div>
      </div>
      <div className="w-full  border-8 border-[#F5F5F5] rounded-lg flex flex-col items-center  justify-evenly p-2">
        <h1 className="font-semibold text-base text-black mt-3 mb-2 ">Best choices</h1>
        <div className="flex justify-between items-center  w-full">
          <div>
            <img
              className="w-[90px] h-[95px] rounded-[4px]"
              src={pinkbg}
              alt=""
            />
            <p className="text-[6px] mt-1 text-[#404040]">product 1</p>
          </div>
          <div>
            <img
              className="w-[90px] h-[95px] rounded-[4px]"
              src={pinkbg}
              alt=""
            />
            <p className="text-[6px] mt-1 text-[#404040]">product 1</p>
          </div>
          <div>
            <img
              className="w-[90px] h-[95px] rounded-[4px]"
              src={pinkbg}
              alt=""
            />
            <p className="text-[6px] mt-1 text-[#404040]">product 1</p>
          </div>
          
        </div>
      
      </div>
    </div>
  );
}
