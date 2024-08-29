import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import BlueBorderButton from "../commonComponents/BlueBorderButton";
import setting from "../assets/icons/subheader/setting-2.svg";
import setting2 from "../assets/icons/subheader/setting-2 copy.svg";
import message from "../assets/icons/subheader/message-2.svg";
import message2 from "../assets/icons/subheader/message-2 copy.svg";
import search from "../assets/icons/subheader/search-normal.svg";
import search2 from "../assets/icons/subheader/search-normal copy.svg";
import drive from "../assets/icons/subheader/external-drive.svg";
import drive2 from "../assets/icons/subheader/external-drive copy.svg";
import add from "../assets/icons/subheader/add.svg";
import add22 from "../assets/icons/subheader/add copy.svg";
import element from "../assets/icons/subheader/element-2.svg";
import element2 from "../assets/icons/subheader/element-2 copy.svg";
import global from "../assets/icons/subheader/global.svg";
import mobile from "../assets/icons/subheader/mobile.svg";
import monitor from "../assets/icons/subheader/monitor.svg";
import undo from "../assets/icons/subheader/undo.svg";
import redo from "../assets/icons/subheader/redo.svg";
import add2 from "../assets/icons/subheader/add2.svg";
import box from "../assets/icons/subheader/box.svg";
import rowh from "../assets/icons/subheader/rowhori.svg";
import grid from "../assets/icons/subheader/grid.svg";
import rowv from "../assets/icons/subheader/row-ver.svg";
import { useSelector, useDispatch } from "react-redux";
import { handleNav } from "../store/reducers/SubheaderReducer";
import { useNavigate } from "react-router-dom";

export default function SubHeader() {
  const subHeadNav = useSelector((state) => state.subheader.subHeaderNav);
  const dispatch = useDispatch();
  const [showCollab, setshowCollab] = useState(false);

  const handleNavigation = (load) => {
    if (subHeadNav === load) {
      dispatch(handleNav(""));
    } else {
      dispatch(handleNav(load));
    }
  };

  // simple dropdown js
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // for drop down menu
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

    const navigate = useNavigate();

  const options = ["option 1", "option 2", "option 3"];
  return (
    <>
      <div className="flex flex-wrap-reverse   xl:h-[71px] items-center border-b bg-white">
        <div className="xl:w-[40%] mx-auto xl:h-[40px] p-2 xl:py-0">
          <div className="xl:w-[300px] w-full  h-full flex justify-evenly xl:gap-[10px] xl:ms-4 relative">
            <div
              onClick={() => {handleNavigation("setting")}}
              className="ctr border size-10 rounded-lg"
            >
              {subHeadNav === "setting" ? (
                <img src={setting2} alt="" />
              ) : (
                <img src={setting} alt="" />
              )}
            </div>
            <div
              onClick={() => {handleNavigation("drive");navigate("/CMS")}}
              className="ctr border size-10 rounded-lg"
            >
              {subHeadNav === "drive" ? (
                <img src={drive2} alt="" />
              ) : (
                <img src={drive} alt="" />
              )}
            </div>
            <div
              onClick={() => handleNavigation("element")}
              className="ctr border size-10 rounded-lg"
            >
              {subHeadNav === "element" ? (
                <img src={element2} alt="" />
              ) : (
                <img src={element} alt="" />
              )}
            </div>
            <div
              onClick={() => handleNavigation("add")}
              className="ctr border size-10 rounded-lg"
            >
              {subHeadNav === "add" ? (
                <img src={add22} alt="" />
              ) : (
                <img src={add} alt="" />
              )}
            </div>
            <div
              onClick={() => handleNavigation("search")}
              className="ctr border size-10 rounded-lg"
            >
              {subHeadNav === "search" ? (
                <img src={search2} alt="" />
              ) : (
                <img src={search} alt="" />
              )}
            </div>
            <div
              onClick={() => handleNavigation("message")}
              className="ctr border size-10 rounded-lg"
            >
              {subHeadNav === "message" ? (
                <img src={message2} alt="" />
              ) : (
                <img src={message} alt="" />
              )}
            </div>
            <div
              className={`absolute  h-auto ${
                subHeadNav === "element" ? "flex" : "hidden"
              }  flex-col top-12  left-12 bg-white p-[10px] rounded-[4px] gap-[10px] shadow-lg`}
            >
              <div className="flex items-center gap-3 ">
                <img className="" src={box} alt="" /> <span>Box</span>
              </div>
              <div className="flex items-center gap-3">
                <img className="" src={rowh} alt="" /> <span>Rows</span>
              </div>
              <div className="flex items-center gap-3">
                <img className="" src={rowv} alt="" /> <span>Coloumns</span>
              </div>
              <div className="flex items-center gap-3">
                <img className="" src={grid} alt="" /> <span>Grid</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto  xl:w-[20%]  ctr flex xl:flex">
          <div className="relative" ref={dropdownRef}>
            <div
              className={` border p-[10px] w-[150px] h-[36px] rounded-full flex  items-center justify-between`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="text-[12px] flex items-center">
                <span>
                  <img src={global} alt="" />
                </span>
                <span className="ms-2">
                  {selectedOption ? selectedOption : "Select"}
                </span>
              </div>
              <div>
                <Icon
                  icon="ep:arrow-down-bold"
                  width="16px"
                  height="16px"
                  style={{ color: "#757575" }}
                />
              </div>
            </div>
            {isOpen && (
              <div
                className={` border w-[150px] rounded-[8px] absolute bg-white `}
              >
                {options?.map((option, index) => (
                  <div
                    key={index.toString()}
                    className={` p-[10px] w-[150px] h-[36px] flex items-center text-[12px]`}
                    onClick={() => handleOptionClick(option)}
                  >
                    <span>
                      <img src={global} alt="" />
                    </span>{" "}
                    <span className="ms-2">{option}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between "></div>
          </div>
        </div>

        <div className="xl:w-[40%] w-full flex flex-wrap py-2 xl:py-0">
          <div className="xl:w-[362px]  h-[40]  flex items-center justify-evenly  gap-4">
            <div className="w-[136px] h-[40px] gap-2 flex ">
              <div className="ctr border size-10 rounded-lg">
                <img src={mobile} alt="" />
              </div>
              <div className="ctr border size-10 rounded-lg">
                <img src={monitor} alt="" />
              </div>
              <div className="ctr border size-10 rounded-lg">
                <img src={mobile} alt="" />
              </div>
            </div>

            <div className="w-[60px] flex h-6  gap-3 ">
              <div className="">
                <img src={undo} alt="" />
              </div>
              <div className="">
                <img src={redo} alt="" />
              </div>
            </div>

            <div
              onClick={() => setshowCollab(!showCollab)}
              className="xl:w-[70px] w-[65px] h-[30px]  relative"
            >
              <img
                src={
                  "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
                }
                className="size-[30px] rounded-full  absolute"
              ></img>
              <img
                src={
                  "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
                }
                className="size-[30px] rounded-full  absolute top-0 left-5 hidden xl:block"
              ></img>
              <div className="size-[30px] rounded-full  absolute xl:top-0 xl:right-0 top-0 right-6 bg-white ctr border">
                <img src={add2} alt="" />
              </div>
              <div
                style={{ top: 38, left: -90 }}
                className={`w-[354px] h-[296px] border absolute  bg-white rounded-[12px] p-4 ${
                  showCollab ? "block" : "hidden"
                } space-y-[10px]`}
              >
                <h3>Invite Collaborators</h3>
                <div className="flex">
                  <div className="w-[239px] h-[36px] border">Search</div>
                  <button className="w-[73px] h-[36px] border">Send</button>
                </div>
                <div className="flex justify-between items-center p-2 border rounded-full bg-bgcolor">
                  <div className="flex items-center ">
                    <img
                      className="size-[16px]"
                      src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
                      alt=""
                    />
                    <span>You</span>
                  </div>
                  <div className="">Owner</div>
                </div>
                <div className="flex justify-between items-center p-2 border rounded-full bg-bgcolor">
                  <div className="flex items-center ">
                    <img
                      className="size-[16px]"
                      src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
                      alt=""
                    />
                    <span>You</span>
                  </div>
                  <div className="">Owner</div>
                </div>
                <div className="flex justify-between items-center p-2 border rounded-full bg-bgcolor">
                  <div className="flex items-center ">
                    <img
                      className="size-[16px]"
                      src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
                      alt=""
                    />
                    <span>You</span>
                  </div>
                  <div className="">Owner</div>
                </div>

                <div className="flex">
                  <div className="w-[239px] h-[36px] border">Search</div>
                  <button className="w-[73px] h-[36px] border">Send</button>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:w-[184px] h-[36px] flex gap-3 items-center">
            <BlueBorderButton text="Preview" />
            <BlueBorderButton text="Publish" />
          </div>
        </div>
      </div>
    </>
  );
}
