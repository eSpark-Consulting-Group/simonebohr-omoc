import React from "react";
import taguser from "../../assets/icons/leftsidebar/tag-user.svg";
import shop from "../../assets/icons/leftsidebar/shop.svg";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Social() {
  return (
    <div className="w-[342px] bg-white  flex flex-col p-4  gap-3  ">
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] rounded-lg border-[5px] border-[#EDEDED] ctr">
             
            <Icon icon="skill-icons:instagram" width="46px" height="46px" />  
            </div>
            <h2 className="font-medium text-[10px]  ">Instagram</h2>
          </div>
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] rounded-lg border-[5px] border-[#EDEDED] ctr">
              <Icon icon="logos:twitter" width="46" height="46" />
            </div>
            <h2 className="font-medium text-[10px] ">Twitter</h2>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] ctr rounded-lg border-[5px] border-[#EDEDED]  ">
              <Icon
                icon="fa:facebook"
                width="46px"
                height="46px"
                style={{ color: "#337FFF" }}
              />
            </div>
            <h2 className="font-medium text-[10px]  ">Instagram</h2>
          </div>
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] rounded-lg border-[5px] border-[#EDEDED] ctr ">
              <img src={shop} alt="" />
            </div>
            <h2 className="font-medium text-[10px] ">Import from Store Post</h2>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-[143px] h-[144px] text-center  flex flex-col justify-between">
            <div className="w-[143px] h-[120px] rounded-lg border-[5px] border-[#EDEDED]  ctr">
              <img src={taguser} alt="" />
            </div>
            <h2 className="font-medium text-[10px]  ">Import Tagged Product</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
