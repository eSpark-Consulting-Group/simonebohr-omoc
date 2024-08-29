import { Icon } from "@iconify/react";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate} from "react-router-dom";

export default function Header() {
  const [showMenu, setshowMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="xl:h-[96px] bg-white ">
        <div className="flex justify-between md:py-[23px] p-3 container mx-auto">
          {/* logo */}
          <div className=" flex items-center gap-3">
            <Icon onClick={()=>navigate(-1)} className="cursor-pointer" icon="tabler:chevron-left" width="24px" height="24px" />

            <div className="cursor-pointer">Omoc Seller</div>
          </div>

          <div className="flex w-auto items-center lg:w-[918px] gap-5 ">
            {/* input */}
            <div className="lg:w-[401px] w-[150px] lg:h-[48px] h-[40px] flex items-center border rounded-xl px-2 lg:px-4 lg:py-3 ">
              <Icon icon="iconoir:search" width="24px" height="24px" />
              <input
                className="lg:w-[304px] w-[100px] h-[20px] outline-none lg:ps-4"
                type="text"
                placeholder="Search everything about the seller dashboard..."
              />
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
          className={`pb-3 lg:py-0 overflow-hidden bg-white border ${
            showMenu ? "block" : "hidden"
          } transition duration-400 ease-in-out`}
        >
          <div className="flex flex-col justify-center items-start gap-4 lg:hidden px-4">
            <div className="lg:w-[497px] h-[50px] w-full flex  items-center  gap-2">
              <div className="flex items-center justify-around ">
                <img  width={32} height={32} src={logo} alt="" />
                <span className="ms-[8px]">Omoc Official</span>
              </div>
              <div className="flex items-center ms-6">
                <img width={32} height={32} src={logo} alt="" />
                <span className="ms-[8px]">James H </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-5">
              <Icon
                icon="clarity:notification-line"
                width="24px"
                height="24px"
              />
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
    </>
  );
}
