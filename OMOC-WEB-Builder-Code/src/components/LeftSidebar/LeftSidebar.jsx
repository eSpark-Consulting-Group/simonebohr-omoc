import React, { useState } from "react";
import grid from "../../assets/icons/leftsidebar/grid-9.svg";
import rowh from "../../assets/icons/leftsidebar/row-horizontal.svg";
import rowv from "../../assets/icons/leftsidebar/row-vertical.svg";
import arrowd from "../../assets/icons/leftsidebar/Arrowdown.svg";
import doc from "../../assets/icons/leftsidebar/document-text.svg";
import home from "../../assets/icons/leftsidebar/home-2.svg";
import drive2 from "../../assets/icons/leftsidebar/external-drive (2).svg";
import add from "../../assets/icons/leftsidebar/add.svg";
import Modal from "../../commonComponents/Modal";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function LeftSidebar({ showmodal }) {
  const [changeTab, setchangeTab] = useState("Layers");
  const [expandCollapse, setexpandCollapse] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [selectPage, setselectPage] = useState("Page");
  const [showTemplate, setshowTemplate] = useState(false);

  const changeTabHandler = (string) => {
    if (changeTab === "") {
      setchangeTab(string);
    } else if (changeTab === string) {
      setchangeTab("");
    } else {
      setchangeTab(string);
    }
  };
  const expandCollapseHandler = (string) => {
    if (expandCollapse === "") {
      setexpandCollapse(string);
    } else if (expandCollapse === string) {
      setexpandCollapse("");
    } else {
      setexpandCollapse(string);
    }
  };
  return (
    <>
      <div className="p-4 w-[247px] min-h-[calc(100vh_-_167px)] bg-white ">
        <div className="w-full h-[45px] flex">
          <div
            onClick={() => changeTabHandler("Layers")}
            className={`w-1/2 border-b-[3px] text-[14px] ${
              changeTab === "Layers"
                ? "border-blue font-semibold  text-blue"
                : "border-bgcolor"
            } ctr`}
          >
            <span>Layers</span>
          </div>
          <div
            onClick={() => changeTabHandler("Page")}
            className={`w-1/2 border-b-[3px] text-[14px] ${
              changeTab === "Page"
                ? "border-blue font-semibold text-blue"
                : "border-bgcolor"
            } ctr`}
          >
            <span>Page</span>
          </div>
        </div>

        {changeTab === "Layers" ? (
          <div>
            <div
              onClick={() => expandCollapseHandler("desktop")}
              className="w-full flex justify-between mt-4 items-center"
            >
              <div className="w-[143px] h-9  gap-3 flex items-center">
                <div>
                  <img src={grid} alt="" />
                </div>
                <div className="text-xs text-textcolor">Desktop</div>
              </div>
              <div>
                <img src={arrowd} alt="" />
              </div>
            </div>

            <div
              className={`w-full my-[2px] overflow-hidden ${
                expandCollapse === "desktop" ? "h-auto " : "h-0"
              }`}
            >
              <div className="flex gap-3 ms-6  h-8  items-center">
                <div>
                  <img src={grid} alt="" />
                </div>
                <div>
                  <span className="text-[12px] text-textcolor">Header</span>
                </div>
              </div>
              <div className="flex gap-3 ms-6 h-8  items-center">
                <img src={grid} alt="" />
                <div>
                  <span className="text-[12px] text-textcolor">Section 1</span>
                </div>
              </div>
              <div className="flex gap-3 ms-6 h-8  items-center">
                <img src={rowv} alt="" />
                <div>
                  <span className="text-[12px] text-textcolor">Section 2 </span>
                </div>
              </div>
              <div className="flex gap-3 ms-6 h-8  items-center">
                <img src={rowh} alt="" />
                <div>
                  <span className="text-[12px] text-textcolor">Footer</span>
                </div>
              </div>
            </div>
          </div>
        ) : changeTab === "Page" ? (
          <div>
            <div className="w-full flex  mt-4 items-center  bg-bgcolor rounded h-9  gap-3 p-[10px]">
              <div>
                <img src={home} alt="" />
              </div>
              <div className="text-xs text-textcolor">Homepage</div>
            </div>

            <div
              onClick={() => expandCollapseHandler("desktop")}
              className="w-full flex justify-between mt-2 items-center bg-bgcolor rounded h-10 p-[10px]"
            >
              <div className="w-[143px] h-9  gap-3 flex items-center">
                <div>
                  <img src={doc} alt="" />
                </div>
                <div className="text-xs text-textcolor">Blog</div>
              </div>
              <div>
                <img src={arrowd} alt="" />
              </div>
            </div>

            <div
              className={`w-full my-[2px] overflow-hidden ${
                expandCollapse === "desktop" ? "h-auto " : "h-0"
              }`}
            >
              <div className="flex gap-3 ms-8  h-10  items-center">
                <div>
                  <img src={drive2} alt="" />
                </div>
                <div>
                  <span className="text-[12px] text-textcolor">Blog</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setshowModal(true)}
              className="w-full rounded border border-blue flex justify-center items-center p-[10px] text-blue gap-2 my-[2px]"
            >
              <div>
                <img className="text-blue" src={add} alt="" />
              </div>
              <div>
                <span className="text-[12px] font-semibold">New Page</span>
              </div>
            </button>
          </div>
        ) : null}
      </div>

      <Modal setshowModal={setshowModal} showModal={showModal}>
        <div className="bg-white p-6 flex flex-col gap-4 h-[209px] rounded-[24px]">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-2xl">Select Type of Page</h1>

            <Icon
              onClick={() => {
                setshowModal(false);
              }}
              icon="icon-park-outline:close"
              width="24px"
              height="24px"
              style={{ color: "#101010" }}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div
              onClick={() => {
                setselectPage("Page");
                setshowTemplate(true);
              }}
              className="flex-1 rounded-xl border py-6 px-4 h-[111px] w-[185px]  hover:bg-[#E8F5FF] hover:border-blue cursor-pointer"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[16px] font-semibold">Page</span>
                <p className="text-[14px] text-textcolor">
                  start with blank page.
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setselectPage("Modal");
                setshowTemplate(true);
              }}
              className="flex-1 rounded-xl border py-6 px-4 h-[111px] w-[185px] hover:bg-[#E8F5FF] hover:border-blue cursor-pointer"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[16px] font-semibold">Modal</span>
                <p className="text-[14px] text-textcolor">make a popup.</p>
              </div>
            </div>
            <div
              onClick={() => {
                setselectPage("Search");
                setshowTemplate(true);
              }}
              className="flex-1 rounded-xl border py-6 px-4 h-[111px] w-[185px] hover:bg-[#E8F5FF] hover:border-blue cursor-pointer"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[16px] font-semibold">Search page</span>
                <p className="text-[14px] text-textcolor">
                  for search product or etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal setshowModal={setshowTemplate} showModal={showTemplate}>
        <div className="bg-white py-6    rounded-[24px] ">
          <div className="overflow-y-auto flex gap-4 flex-col max-h-[700px] px-6">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-2xl">
              Select Template or blank page
            </h1>

            <Icon
              onClick={() => {
                setshowTemplate(false);
              }}
              icon="icon-park-outline:close"
              width="24px"
              height="24px"
              style={{ color: "#101010" }}
              className="cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-3  gap-3">
            
            <div className="w-[310px] h-[364px] border-8 border-[#EDEDED] rounded-lg ctr font-semibold text-[18px]">
              Blank Page
            </div>
            <div className="w-[310px] h-[364px] border-8 border-[#EDEDED] rounded-lg ctr font-semibold text-[18px]">
              Blank Page
            </div>
            <div className="w-[310px] h-[364px] border-8 border-[#EDEDED] rounded-lg ctr font-semibold text-[18px]">
              Blank Page
            </div>
            <div className="w-[310px] h-[364px] border-8 border-[#EDEDED] rounded-lg ctr font-semibold text-[18px]">
              Blank Page
            </div>
          </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
