import React from "react";
import feather from "../../assets/icons/leftsidebar/feather.svg";
import staremo from "../../assets/images/🤩.png";

export default function Icons() {
  return (
    <div className="w-[342px] bg-white  flex flex-col p-4  gap-3  ">
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] rounded-lg border-[5px] border-[#EDEDED] ctr">
              <img className=" top-5" src={staremo} alt="" />
            </div>
            <h2 className="font-medium text-[10px]  ">Twemoji</h2>
          </div>
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] rounded-lg border-[5px] border-[#EDEDED] ctr">
              <img src={feather} alt="" />
            </div>
            <h2 className="font-medium text-[10px] ">Feather</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
