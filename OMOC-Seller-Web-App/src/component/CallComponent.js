import React from "react";
import doubleArrow_icon from "../assets/icon/doubleArrow_icon.svg";
import end_call_icon from "../assets/icon/end_call_icon.svg";
import phone_icon from "../assets/icon/phone_icon.svg";
import profile_pic from "../assets/image/profil_pic.png";
import message_icon from "../assets/icon/message_icon.svg";
import { strings } from "../utils/strings";
const CallComponent = () => {
  return (
    <div className="w-[337px] h-[350px] bg-[#fff] rounded-xl shadow-md absolute bottom-11 right-0">
      <div
        style={{ borderBottomWidth: 1 }}
        className="h-[65px] flex justify-between items-center px-5"
      >
        <p className="font-semibold text-base">{strings.INCOMING_CALL}</p>
        <img className="w-[20px] h-[20px]" src={doubleArrow_icon} />
      </div>
      <div className="justify-center flex">
        <div className="mt-5">
          <img className="h-[82px] w-[82px] mx-auto" src={profile_pic} />
          <p className="text-center font-semibold text-base">James Harden</p>
          <p className="text-center text-[#9E9E9E] font-medium text-sm	">
            @jamesco
          </p>
        </div>
      </div>
      <div className="flex justify-evenly mt-10 ">
        <div className="w-16 h-16 bg-[#F5F5F5] rounded-[32px] flex justify-center items-center ">
          <img src={end_call_icon} />
        </div>
        <div className="w-16 h-16 bg-[#22C55E] rounded-[32px] flex justify-center items-center">
          <img className="" src={phone_icon} />
        </div>
        <div className="w-16 h-16 bg-[#F5F5F5] rounded-[32px] flex justify-center items-center">
          <img src={message_icon} />
        </div>
      </div>
    </div>
  );
};

export default CallComponent;
