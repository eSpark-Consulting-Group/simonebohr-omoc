import React from "react";
import pinkbg from "../../assets/images/pinkbg.jpeg";
import gif from "../../assets/images/gif.png";
import youtube from "../../assets/images/youtube.png";
import vimeo from "../../assets/images/vimeo.png";
import image from "../../assets/images/image.png";
import play from "../../assets/images/play.png";

export default function Media() {
  return (
    <div className="w-[342px] bg-white  flex flex-col p-4  gap-3  ">
      <div className="flex flex-col gap-6">
        <h1 className="font-medium text-[14px]">Photos</h1>
        <div className="flex gap-6">
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] rounded-lg border-[5px] border-[#EDEDED] relative">
              <img
                className="object-cover w-[143px] h-[120px] rounded-sm"
                src={pinkbg}
                alt=""
              />{" "}
              <sapn className="absolute w-full h-full flex items-center justify-center top-0 left-0">
                {" "}
                <img src={image} alt="" />
              </sapn>{" "}
            </div>
            <h2 className="font-medium text-[10px]  ">Images</h2>
          </div>
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] rounded-lg border-[5px] border-[#EDEDED] ctr">
              <img src={gif} alt="" />
            </div>
            <h2 className="font-medium text-[10px] ">GIF</h2>
          </div>
        </div>
        <h1 className="font-medium text-[14px]">Video</h1>
        <div className="flex gap-6">
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] ctr rounded-lg border-[5px] border-[#EDEDED] bg-gradient-to-135 from-[#F82B2B] to-[#F29914] ">
              <img src={play} alt="" />
            </div>
            <h2 className="font-medium text-[10px]  ">Video</h2>
          </div>
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] rounded-lg border-[5px] border-[#EDEDED] ctr ">
              <img src={youtube} alt="" />
            </div>
            <h2 className="font-medium text-[10px] ">Video</h2>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] rounded-lg border-[5px] border-[#EDEDED] bg-gradient-to-r from-[#2BD3F8] to-[#14F2F2] ctr">
              <img src={vimeo} alt="" />
            </div>
            <h2 className="font-medium text-[10px]  ">Vimeo</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
