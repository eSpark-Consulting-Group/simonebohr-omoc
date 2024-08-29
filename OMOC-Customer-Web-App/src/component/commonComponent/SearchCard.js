import React from "react";
import trackSuit from "../../assets/images/trackSuit.png";
import omocLogo from "../../assets/icon/omoc_black_logo.svg";
import { strings } from "../../utils/strings";
import { Icon } from "@iconify/react";

const SearchCard = () => {
  return (
    <div>
      <img className="w-full rounded-xl" src={trackSuit} />
      <div className="flex gap-2 items-center my-3">
        <img w-fu src={omocLogo} />
        <p>{strings.OMOC_OFFICIAL}</p>{" "}
        <Icon icon="bitcoin-icons:verify-filled" color="#3d9ffb" />
      </div>
      <p className="text-[#9E9E9E] text-sm">{strings.LOREM_TEXT}</p>
    </div>
  );
};

export default SearchCard;
