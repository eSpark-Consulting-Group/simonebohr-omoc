import React, { useState } from "react";
import logo from "../assets/logo.png";
import reload from "../assets/icons/cmsheader/refresh-left-square.svg";
import tickCircle from "../assets/icons/cmsheader/tick-circle.svg";
import edit from "../assets/icons/cmsheader/edit-2.svg";
import download from "../assets/icons/cmsheader/document-download.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

export default function CmsHeader() {
  const [showMenu, setshowMenu] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="xl:h-[96px] bg-white xl:p-0 p-4" >
      <div className="flex justify-between items-center md:py-[23px] py-3 container mx-auto">
        {/* logo */}
        <div className=" flex items-center gap-3">
          <Icon
            className="cursor-pointer"
            onClick={() => navigate(-1)}
            icon="tabler:chevron-left"
            width="24"
            height="24"
            style={{ color: "black" }}
          />
          <div className="font-medium text-2xl">CMS</div>
        </div>

        <div className="flex w-auto items-center xl:w-[918px] gap-5 ">
          {/* input */}
          <div className=" flex items-center  rounded-xl gap-2">
            <div className=" border rounded-lg p-2 flex items-center gap-2">
              <img src={reload} alt="" />
              <span className="font-medium text-xs hidden sm:block ">New Item</span>
            </div>
            <div className=" border rounded-lg p-2 flex items-center gap-2 ">
              <img src={tickCircle} alt="" />
              <span className="font-medium text-xs hidden sm:block ">Select</span>
            </div>
            <div className=" border rounded-lg p-2 flex items-center gap-2 justify-between">
              <img src={edit} alt="" />
              <span className="font-medium text-xs hidden sm:block ">Edit field</span>
            </div>
            <div className=" border rounded-lg p-2 flex items-center gap-2 justify-between">
              <img src={download} alt="" />
              <span className="font-medium text-xs hidden sm:block ">Import</span>
            </div>
          </div>

          <div className="w-[497px] h-[50px] lg:flex justify-between items-center  hidden">
            <div className="flex justify-center items-center gap-3">
              <Icon
                icon="clarity:notification-line"
                width="24px"
                height="24px"
              />
              <Icon icon="mage:message-dots" width="24px" height="24px" />
            </div>
            <div className="w-[497px] h-[50px]  flex justify-evenly items-center  ">
              <div className="flex items-center justify-around">
                <img width={32} height={32} src={logo} alt="" />
                <span className="ms-[8px]">Omoc Official</span>
              </div>
              <div className="flex items-center ">
                <img width={32} height={32} src={logo} alt="" />
                <span className="ms-[8px]">James H </span>
              </div>
            </div>
            <div className="flex items-center">
              <span>Help</span>
              <Icon
                icon="solar:alt-arrow-down-linear"
                width="20px"
                height="20px"
              />
            </div>
          </div>

          <div className="flex items-center lg:hidden">
            {showMenu ? (
              <Icon
                onClick={() => setshowMenu(false)}
                icon="line-md:menu-to-close-transition"
                width="32"
                height="32"
              />
            ) : (
              <Icon
                onClick={() => setshowMenu(true)}
                icon="heroicons-outline:menu-alt-3"
                width="32"
                height="32"
              />
            )}
          </div>
        </div>
      </div>

      <div
        className={`pb-3 lg:py-0 overflow-hidden  ${
          showMenu ? "block" : "hidden"
        } transition duration-400 ease-in-out`}
      >
        <div className="flex flex-col justify-center items-start gap-4 lg:hidden px-4">
          <div className="lg:w-[497px] h-[50px] w-full flex  items-center  gap-2">
            <div className="flex items-center justify-around ">
              <img width={32} height={32} src={logo} alt="" />
              <span className="ms-[8px]">Omoc Official</span>
            </div>
            <div className="flex items-center ms-6">
              <img width={32} height={32} src={logo} alt="" />
              <span className="ms-[8px]">James H </span>
            </div>
          </div>
          <div className="flex items-center justify-start gap-5">
            <Icon icon="clarity:notification-line" width="24px" height="24px" />
            <Icon icon="mage:message-dots" width="24px" height="24px" />
            <div className="flex items-center">
              <span>Help</span>
              <Icon
                icon="solar:alt-arrow-down-linear"
                width="20px"
                height="20px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
