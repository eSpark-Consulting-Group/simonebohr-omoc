import { Icon } from "@iconify/react";
import React from "react";
import tag from "../../assets/icons/rightsidebar/tag.svg";

export default function RightSidebarSelectCategories() {
  return (
    <div className="bg-white w-[280px] p-4 flex flex-col gap-6">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-base font-medium">Select Categories</h1>
          <Icon icon="bitcoin-icons:cross-outline" width="20px" height="20px" />
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center w-[216px] h-[36px] border rounded-[4px] p-[10px] gap-2">
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
          <div>
            <Icon icon="solar:sort-linear" width="24px" height="24px" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button className="w-full flex items-center justify-between p-[10px] rounded-lg border border-[#9039FF]">
          <span className="text-xs text-[#9039FF]">Create Categories</span>
          <Icon
            icon="bitcoin-icons:export-outline"
            width="16px"
            height="16px"
            style={{ color: "#9039FF" }}
          />
        </button>
        <label className="w-full flex items-center justify-between p-[10px] rounded-lg border ">
          <div className="flex items-center">
            <img src={tag} alt="" />
            <span className="text-xs ms-2 text-[#242424]"> Categories 1</span>
          </div>
          <label
            className="flex items-center justify-center  relative"
            htmlFor=""
          >
            <input
              type="checkbox"
              className="appearance-none rounded-full  w-4 h-4   checked:bg-[#9039FF]"
            />

            <Icon
              className="fill-current  w-3 h-3 text-white pointer-events-none checked:hidden absolute"
              icon="ic:sharp-check"
              width="16px"
              height="16px"
            />
          </label>
        </label>
        <label className="w-full flex items-center justify-between p-[10px] rounded-lg border ">
          <div className="flex items-center">
            <img src={tag} alt="" />
            <span className="text-xs ms-2 text-[#242424]"> Categories 2</span>
          </div>
          <label
            className="flex items-center justify-center  relative"
            htmlFor=""
          >
            <input
              type="checkbox"
              className="appearance-none rounded-full  w-4 h-4   checked:bg-[#9039FF]"
            />

            <Icon
              className="fill-current  w-3 h-3 text-white pointer-events-none checked:hidden absolute"
              icon="ic:sharp-check"
              width="16px"
              height="16px"
            />
          </label>
        </label>
        <label className="w-full flex items-center justify-between p-[10px] rounded-lg border ">
          <div className="flex items-center">
            <img src={tag} alt="" />
            <span className="text-xs ms-2 text-[#242424]"> Categories 3</span>
          </div>
          <label
            className="flex items-center justify-center  relative"
            htmlFor=""
          >
            <input
              type="checkbox"
              className="appearance-none rounded-full  w-4 h-4   checked:bg-[#9039FF]"
            />

            <Icon
              className="fill-current  w-3 h-3 text-white pointer-events-none checked:hidden absolute"
              icon="ic:sharp-check"
              width="16px"
              height="16px"
            />
          </label>
        </label>
        <label className="w-full flex items-center justify-between p-[10px] rounded-lg border ">
          <div className="flex items-center">
            <img src={tag} alt="" />
            <span className="text-xs ms-2 text-[#242424]"> Categories 4</span>
          </div>
          <label
            className="flex items-center justify-center  relative"
            htmlFor=""
          >
            <input
              type="checkbox"
              className="appearance-none rounded-full  w-4 h-4   checked:bg-[#9039FF]"
            />

            <Icon
              className="fill-current  w-3 h-3 text-white pointer-events-none checked:hidden absolute"
              icon="ic:sharp-check"
              width="16px"
              height="16px"
            />
          </label>
        </label>
        <label className="w-full flex items-center justify-between p-[10px] rounded-lg border ">
          <div className="flex items-center">
            <img src={tag} alt="" />
            <span className="text-xs ms-2 text-[#242424]"> Categories 5</span>
          </div>
          <label
            className="flex items-center justify-center  relative"
            htmlFor=""
          >
            <input
              type="checkbox"
              className="appearance-none rounded-full  w-4 h-4   checked:bg-[#9039FF]"
            />

            <Icon
              className="fill-current  w-3 h-3 text-white pointer-events-none checked:hidden absolute"
              icon="ic:sharp-check"
              width="16px"
              height="16px"
            />
          </label>
        </label>
      </div>
      <button className="rounded-lg bg-[#9039FF] h-[35px] px-[10px] text-xs text-white">
        Select
      </button>
    </div>
  );
}
