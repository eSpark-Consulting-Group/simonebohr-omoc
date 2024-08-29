import React from "react";
import omoc_logo from "../../assets/icon/omoc_logo.svg";
import { strings } from "../../utils/strings";
const WelcomeHeader = (props) => {
  return (
    <div className="flex justify-between">
      <img src={omoc_logo} />
      <div className="gap-3 flex">
        <button
          className="border-2 border-[#0094FF] px-8 py-2 rounded-3xl	"
          onClick={props.onClickFirstBtn}
        >
          <p className="text-[#0094FF] font-medium">{props.firstBtn}</p>
        </button>
        <button
          className="bg-[#0094FF] px-8 py-2 rounded-3xl	"
          onClick={props.onClickSecBtn}
        >
          <p className="text-white font-medium">{props.secondBtn}</p>
        </button>
      </div>
    </div>
  );
};

export default WelcomeHeader;
