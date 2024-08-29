import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Navigation from "../LeftNavAddOptions/Navigation";
import Section from "../LeftNavAddOptions/Section";
import Pages from "../LeftNavAddOptions/Pages";
import Menus from "../LeftNavAddOptions/Menus";
import AddOn from "../LeftNavAddOptions/AddOn";
import Media from "../LeftNavAddOptions/Media";
import Icons from "../LeftNavAddOptions/Icons";
import Interactive from "../LeftNavAddOptions/Interactive";
import Forms from "../LeftNavAddOptions/Forms";
import Social from "../LeftNavAddOptions/Social";
import ContentList from "../LeftNavAddOptions/ContentList";

export default function LeftSideAddNavbar() {
  const [changeMenu, setchangeMenu] = useState("");
  const basic = ["Navigation", "Section", "Pages", "Menus"];
  const elements = [
    "Add on",
    "Media",
    "Form",
    "Icons",
    "Interactive",
    "Social",
  ];

  const handleMenuOptions = (item) => {
    if (changeMenu === item) {
      setchangeMenu("");
    } else {
      setchangeMenu(item);
    }
  };
  return (
    <div className="relative inline-block">
      <div className="p-4 w-[247px] h-screen bg-white flex flex-col gap-6">
        <div className="flex items-center w-full h-[36px] border rounded-[4px] p-[10px] gap-2">
          <div className="flex items-center">
            <Icon
              icon="ep:search"
              width="13px"
              height="13px"
              style={{ color: "#757575" }}
            />
            <input
              type="text"
              className="outline-none ps-[10px] placeholder:text-[12px] placeholder:text-textcolor"
              placeholder="Search"
            />
          </div>
        </div>

        <div className=" flex flex-col gap-2">
          <span className="text"> Basic</span>
          {basic.map((item, index) => (
            <div
              key={index.toString()}
              onClick={() => handleMenuOptions(`${item}`)}
              className="flex justify-between items-center w-full h-[36px] border rounded-[4px] p-[10px] gap-2"
            >
              <div>
                <span className="font-medium text-xs text-textcolor">
                  {item}
                </span>
              </div>
              <Icon
                icon="iconamoon:arrow-right-2"
                width="16px"
                height="16px"
                style={{ color: "#757575" }}
              />
            </div>
          ))}
        </div>
        <div className=" flex flex-col gap-2">
          <span className="text"> Elements</span>
         
          {elements.map((item, index) => (
            <div
              key={index.toString()}
              onClick={() => handleMenuOptions(`${item}`)}
              className="flex justify-between items-center w-full h-[36px] border rounded-[4px] p-[10px] gap-2"
            >
              <div>
                <span className="font-medium text-xs text-textcolor">
                  {item}
                </span>
              </div>
              <Icon
                icon="iconamoon:arrow-right-2"
                width="16px"
                height="16px"
                style={{ color: "#757575" }}
              />
            </div>
          ))}
        </div>
        <div onClick={() => handleMenuOptions(`CMS`)} className=" flex flex-col gap-2">
          <span className="text"> CMS</span>
          <div className="flex justify-between items-center w-full h-[36px] border rounded-[4px] p-[10px] gap-2">
            <div>
              <span className="font-medium text-xs text-textcolor">
                Content List
              </span>
            </div>
            <Icon
              icon="iconamoon:arrow-right-2"
              width="16px"
              height="16px"
              style={{ color: "#757575" }}
            />
          </div>
        </div>
      </div>

      {changeMenu === "Navigation" ? (
        <div className=" absolute top-0 left-[249px] h-[calc(100vh-120px)] overflow-y-scroll">
          <Navigation />
        </div>
      ) : changeMenu === "Section" ? (
        <div className=" absolute top-0 left-[249px] h-[calc(100vh-120px)] overflow-y-scroll">
          <Section />
        </div>
      ) : changeMenu === "Pages" ? (
        <div className=" absolute top-0 left-[249px] h-[calc(100vh-120px)] overflow-y-scroll">
          <Pages />
        </div>
      ) : changeMenu === "Menus" ? (
        <div className=" absolute top-0 left-[249px] h-[calc(100vh-120px)] overflow-y-scroll">
          <Menus />
        </div>
      ) : changeMenu === "Add on" ? (
        <div className=" absolute top-0 left-[249px] h-[calc(100vh-120px)] overflow-y-scroll">
          <AddOn />
        </div>
      ) : changeMenu === "Media" ? (
        <div className=" absolute top-0 left-[249px] h-[calc(100vh-120px)] overflow-y-scroll">
          <Media />
        </div>
      ) : changeMenu === "Icons" ? (
        <div className=" absolute top-0 left-[249px] h-[calc(100vh-120px)] overflow-y-scroll">
          <Icons />
        </div>
      ) : changeMenu === "Interactive" ? (
        <div className=" absolute top-0 left-[249px] h-[calc(100vh-120px)] overflow-y-scroll">
          <Interactive />
        </div>
      ) : changeMenu === "Form" ? (
        <div className=" absolute top-0 left-[249px] h-[calc(100vh-120px)] overflow-y-scroll">
          <Forms />
        </div>
      ) : changeMenu === "Social" ? (
        <div className=" absolute top-0 left-[249px] h-[calc(100vh-120px)] overflow-y-scroll">
          <Social />
        </div>
      ) : changeMenu === "CMS" ? (
        <div className=" absolute top-0 left-[249px] h-[calc(100vh-120px)] overflow-y-scroll">
          <ContentList />
        </div>
      ) : null}
    </div>
  );
}
