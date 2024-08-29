import React, { useState } from "react";
import profile from "../../assets/images/profile_pic.png";
import { Icon } from "@iconify/react";
import { strings } from "../../utils/strings";
import addProfileIcon from "../../assets/icon/profile-add.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Info = () => {
  return (
    <div className="bg-white rounded-xl p-3">
      <p className="text-sm font-medium">{strings.SHARE_PROFILE}</p>
      <p className="text-sm font-medium text-[#C80000] mt-2">
        {strings.REPORT_USER}
      </p>
    </div>
  );
};
const AccountHeader = ({ openUpload, otherProfile, myProfile }) => {
  const { user } = useSelector((state) => state.userData.userDetails);

  const navigate = useNavigate();
  const [shareProfile, setShareProfile] = useState(false);
  const [follow, setFollow] = useState("Follow");
  const handleButton = () => {
    if (follow === "Follow") {
      setFollow("Following");
    } else {
      setFollow("Follow");
    }
  };

  return (
    <div className="bg-black flex flex-wrap items-center justify-between px-20 py-4">
      <div className="flex items-center gap-3">
        <img
          className="rounded-full"
          height={140}
          width={140}
          src={user?.profileImg}
        />
        <div>
          <div className="flex items-center ">
            <p className="text-white"> {user?.userName || user?.name}</p>
            <Icon icon="bitcoin-icons:verify-filled" color="#3d9ffb" />
          </div>
          <div className="flex">
            <p className="text-[#AEAEAE] text-sm border-r-[1px] pr-1">
              123 Following
            </p>
            <p className="text-[#AEAEAE] text-sm pl-1">123 Follower</p>
          </div>
          {otherProfile && (
            <button
              className={`${
                follow === "Follow"
                  ? "bg-[#0094FF] text-white"
                  : "bg-[#F5F5F5] text-[#9E9E9E]"
              } rounded-3xl px-3 py-2 mt-3`}
              onClick={handleButton}
            >
              <p className="text-[10px] ">{follow}</p>
            </button>
          )}
        </div>
      </div>
      <div>
        <div className="flex gap-3 mb-5 relative">
          {myProfile && (
            <div
              className="w-12 h-12 rounded-full bg-[#404040] flex justify-center items-center cursor-pointer"
              onClick={() => {
                openUpload();
              }}
            >
              <Icon
                color="white"
                width={24}
                height={24}
                icon="mingcute:add-line"
              />
            </div>
          )}
          {otherProfile && (
            <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center cursor-pointer">
              <img src={addProfileIcon} />
            </div>
          )}
          {otherProfile && (
            <div
              className="w-12 h-12 rounded-full bg-[#404040] flex justify-center items-center cursor-pointer"
              onClick={() => {
                setShareProfile(!shareProfile);
              }}
            >
              <Icon
                color="white"
                width={24}
                height={24}
                icon="ph:dots-three-vertical-bold"
              />
            </div>
          )}
          {myProfile && (
            <div
              className="w-12 h-12 rounded-full bg-[#404040] flex justify-center items-center cursor-pointer"
              onClick={() => {
                navigate("/Setting");
              }}
            >
              <Icon color="white" width={24} height={24} icon="uil:setting" />
            </div>
          )}
          {shareProfile && (
            <div className="absolute top-16 ">
              <Info />
            </div>
          )}
        </div>
        <p className="text-white text-xs">
          {strings.OMOC_VERIFIED_TALENT_PARTNER}
        </p>
      </div>
    </div>
  );
};

export default AccountHeader;
