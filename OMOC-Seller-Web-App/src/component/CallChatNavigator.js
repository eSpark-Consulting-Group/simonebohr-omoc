import React, { useState } from "react";
import { strings } from "../utils/strings";
import message_icon from "../assets/icon/message_icon.svg";
import phone_icon from "../assets/icon/phone_icon.svg";
import CallComponent from "./CallComponent";

function CallChatNavigator() {
  const [showCallBox, setShowCallBox] = useState(false);
  return (
    <div className="flex bg-[#fff] -mr-8 shadow-xl rounded-[40px] w-48 h-12 items-center justify-between relative">
      <div className="flex items-center gap-2 mx-5">
        <img className="h-5 w-5" src={message_icon} />
        <p>{strings.CHAT}</p>
      </div>
      <div
        className="flex items-center gap-2 mx-5 cursor-pointer relative"
        onClick={() => {
          setShowCallBox(!showCallBox);
        }}
      >
        <img className="h-5 w-5" src={phone_icon} />
        <p>{strings.CHAT}</p>
        {showCallBox && <CallComponent />}
      </div>
    </div>
  );
}

export default CallChatNavigator;
