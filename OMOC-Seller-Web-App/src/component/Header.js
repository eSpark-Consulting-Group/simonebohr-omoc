import React, { useState } from "react";
import back_icon from "../assets/icon/back_icon.svg";
import search_icon from "../assets/icon/search_icon.svg";
import bell_icon from "../assets/icon/bell_icon.svg";
import message_icon from "../assets/icon/message_icon.svg";
import profile_pic from "../assets/image/profil_pic.png";
import Notification from "./Notification";
import SwitchShop from "./SwitchShop";
import { strings } from "../utils/strings";
import { logoImg } from "../utils/image";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDashboardDetails } from "../Store/Slices/DashboardSlice";
import { deleteUserDetail } from "../Store/Slices/AuthSlice";

const Header = ({ state, finalForm }) => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [switchShop, setSwitchShop] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const { shopInfo } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.userData.userDetails);
  const navigate = useNavigate();
  const handleShowNotification = () => {
    if (showNotification === false) {
      setShowNotification(true);
    }
    if (showNotification === true) {
      setShowNotification(false);
    }
  };
  const handleSwitch = () => {
    if (switchShop === false) {
      setSwitchShop(true);
    }
    if (switchShop === true) {
      setSwitchShop(false);
    }
  };
  const handleShopSelect = (shopName) => {
    setSelectedShop(shopName);
    setSwitchShop(false);
  };

  // ==============Function for clearing redux and logout==================
  function logoutHandle() {
    dispatch(deleteDashboardDetails());
    dispatch(deleteUserDetail());
    navigate("/");
  }

  return (
    <>
      <nav className="bg-white-800 text-black max-sm:pt-2">
        <div className="mx-auto max-w-7xl px-2 lg:px-6">
          <div className="relative flex h-24 items-center justify-between">
            <div className="absolute inset-y-0 right-5 flex items-center lg:hidden max-sm:items-start z-10">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                type="button"
                className={`${
                  openMenu
                    ? "relative inline-flex items-center justify-center rounded-md p-2 bg-[#0094FF] text-white "
                    : "relative inline-flex items-center justify-center rounded-md p-2 "
                }`}
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <Icon icon="tabler:menu-2" width="25" height="25" />
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center lg:items-center lg:justify-between">
              <div className="flex gap-x-16	w-full max-sm:gap-x-8 max-sm:flex-wrap">
                <div className="flex flex-shrink-0 items-center">
                  <div className="flex justify-center gap-4">
                    <Icon
                      icon="iconamoon:arrow-left-2"
                      color="black"
                      width="28"
                      height="28"
                      cursor={"pointer"}
                      onClick={() => {
                        state
                          ? finalForm
                            ? navigate(
                                "/Other-settings/Marketing/Create-your-ads-step-2",
                                { state }
                              )
                            : navigate(
                                "/Other-settings/Marketing/Create-your-ads-step-1",
                                { state: state }
                              )
                          : navigate(-1);
                      }}
                    />
                    <p className="text-xl font-medium">{strings.OMOC_SELLER}</p>
                  </div>
                </div>
                <div className="flex items-center w-full max-sm:mt-2 max-sm:justify-center relative">
                  <label className="lg:w-full border-2 rounded-xl h-12 w-4/6 relative">
                    <input
                      className=" lg:w-full px-4 pr-10 py-2.5 w-full rounded-xl"
                      placeholder="Search everything about the seller dashboard..."
                    />
                    <img
                      className="w-[19px] ml-2 top-3 right-3"
                      src={search_icon}
                      style={{ position: "absolute" }}
                    />
                  </label>
                </div>
              </div>
              <div className="hidden lg:ml-6 lg:block w-4/5">
                <div className="flex space-x-4 items-center justify-around">
                  <span className="relative flex items-center">
                    <img
                      className=" cursor-pointer ml-5"
                      onClick={handleShowNotification}
                      src={bell_icon}
                    />
                    {showNotification && <Notification />}
                  </span>
                  <img className="mx-5" src={message_icon} />

                  <div className="flex border-x-2 items-center gap-6">
                    <div
                      className="flex items-center cursor-pointer relative"
                      onClick={handleSwitch}
                    >
                      <img src={logoImg} className="ml-5 mr-2 " />
                      <p className="text-base font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                        {shopInfo ? shopInfo.name : "Omoc Official"}
                      </p>
                      {switchShop && (
                        <SwitchShop onSelectShop={handleShopSelect} />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <img
                        className="rounded-full w-8 h-8"
                        src={user?.profileImg || profile_pic}
                      />
                      <p className="mr-5 text-base font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                        {user?.name || "XYZ"}
                      </p>
                    </div>
                  </div>
                  <p className="mx-5 flex items-center gap-2 text-base font-semibold border-r-2 h-[34px] pr-3">
                    {strings.HELP}{" "}
                    <Icon
                      icon="mingcute:down-line"
                      color="#000"
                      width="22"
                      height="22"
                    />
                  </p>
                  <Icon
                    icon="iconamoon:exit"
                    width="22"
                    height="22"
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => logoutHandle()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {openMenu && (
          <div className="lg:hidden" id="mobile-menu">
            <div className="space-y-1 px-5 pb-3 pt-2">
              <div className="flex items-center gap-5 pb-2 justify-center">
                <div
                  className="flex items-center cursor-pointer gap-2 relative"
                  onClick={handleSwitch}
                >
                  <img src={logoImg} />
                  <p className="text-base font-semibold">
                    {shopInfo ? shopInfo.name : "Omoc Official"}
                  </p>
                  {switchShop && <SwitchShop onSelectShop={handleShopSelect} />}
                </div>
                <div className="flex items-center gap-5">
                  <span className="relative">
                    <img
                      className=" cursor-pointer"
                      onClick={handleShowNotification}
                      src={bell_icon}
                    />
                    {showNotification && <Notification />}
                  </span>
                  <img className="cursor-pointer" src={message_icon} />
                </div>
              </div>
              <div className="flex items-center gap-5 pb-2 justify-center">
                <div className="flex items-center gap-2">
                  <img
                    className="rounded-full w-8 h-8"
                    src={user?.profileImg || profile_pic}
                  />
                  <p className="mr-5 text-base font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                    {user?.name || "XYZ"}
                  </p>{" "}
                </div>
                <p className="flex items-center gap-2 text-base font-semibold border-r-2 h-[34px] pr-3">
                  {strings.HELP}{" "}
                  <Icon
                    icon="mingcute:down-line"
                    color="#000"
                    width="22"
                    height="22"
                  />
                </p>
                <Icon
                  icon="iconamoon:exit"
                  width="22"
                  height="22"
                  style={{ color: "black", cursor: "pointer" }}
                  onClick={() => logoutHandle()}
                />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
