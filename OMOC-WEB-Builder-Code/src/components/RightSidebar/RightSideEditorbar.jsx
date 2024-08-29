import React from "react";
import Dropdown from "../../commonComponents/Dropdown";
import { Icon } from "@iconify/react";
import SimpleDropdown from "../../commonComponents/SimpleDropdown";
import Effects from "../../commonComponents/sidebarComponents/Effects";

export default function RightSideEditorbar() {
  const optionCategories = ["change", "Remove Categories"];
  return (
    <>
      <div className="w-[280px] min-h-[calc(100vh_-_167px)] p-4  bg-white">
        <Dropdown dropdownName="Embed Post" className={"mt-6 border-t"}>
          <div className="w-full flex  items-center justify-between ">
            <div>
              <span className="text-textcolor text-xs font-medium">Add</span>
            </div>
            <div className="w-[190px] h-[36px] flex items-center justify-between border rounded-lg p-[10px]">
              <span className="text-xs text-textcolor">Post</span>
              <Icon icon="fluent:add-16-filled" width="12px" height="12px"   />
            </div>
          </div>
          <div className="w-full h-[80px] flex items-center gap-2 flex-wrap">
            <button className="w-[99px]  h-[36px] flex items-center justify-center bg-[#9039FF] rounded-lg p-[8px] gap-[8px]">
              <span>
                <img
                  className="size-[20px] rounded"
                  src="https://image.made-in-china.com/2f0j00TJQiEjcWZkbn/Popular-Summer-Baby-Clothes-Short-Sleeves-Shirt-Pants-Pajamas-Set-Solid-Colar-Modal-Children-Clothing-Loose-Sweet-Kids-Pajamas.webp"
                  alt=""
                />
              </span>
              <span className="text-white text-xs">Post 1</span>
              <Icon
                icon="bitcoin-icons:cross-filled"
                width="12px"
                height="12px"
                style={{ color: "white" }}
              />
            </button>
            <button className="w-[99px]  h-[36px] flex items-center justify-center bg-[#9039FF] rounded-lg p-[10px] gap-[8px]">
              <span>
                <img
                  className="size-[20px] rounded"
                  src="https://image.made-in-china.com/2f0j00TJQiEjcWZkbn/Popular-Summer-Baby-Clothes-Short-Sleeves-Shirt-Pants-Pajamas-Set-Solid-Colar-Modal-Children-Clothing-Loose-Sweet-Kids-Pajamas.webp"
                  alt=""
                />
              </span>
              <span className="text-white text-xs">Post 1</span>
              <Icon
                icon="bitcoin-icons:cross-filled"
                width="12px"
                height="12px"
                style={{ color: "white" }}
              />
            </button>
            <button className="w-[99px]  h-[36px] flex items-center justify-center bg-[#9039FF] rounded-lg p-[10px] gap-[8px]">
              <span>
                <img
                  className="size-[20px] rounded"
                  src="https://image.made-in-china.com/2f0j00TJQiEjcWZkbn/Popular-Summer-Baby-Clothes-Short-Sleeves-Shirt-Pants-Pajamas-Set-Solid-Colar-Modal-Children-Clothing-Loose-Sweet-Kids-Pajamas.webp"
                  alt=""
                />
              </span>
              <span className="text-white text-xs">Post 1</span>
              <Icon
                icon="bitcoin-icons:cross-filled"
                width="12px"
                height="12px"
                style={{ color: "white" }}
              />
            </button>
          </div>

          <div className="w-full h-[86px] flex flex-col items-center gap-2 justify-between">
            <div className="flex items-center justify-between  w-full">
              <div>
                <span className="font-medium text-xs text-textcolor">
                  Caption
                </span>
              </div>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-[33.5px] h-[18px] bg-[#d1d1d1] rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[1px] after:start-[1px]  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[15.5px] after:w-[15.5px] after:transition-all dark:border-gray-600 peer-checked:bg-blue"></div>
              </label>
            </div>
            <div className="flex items-center justify-between  w-full">
              <div>
                <span className="font-medium text-xs text-textcolor">
                Image
                </span>
              </div>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-[33.5px] h-[18px] bg-[#d1d1d1] rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[1px] after:start-[1px]  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[15.5px] after:w-[15.5px] after:transition-all dark:border-gray-600 peer-checked:bg-blue"></div>
              </label>
            </div>
            <div className="flex items-center justify-between  w-full">
              <div>
                <span className="font-medium text-xs text-textcolor">
                Product Tag
                </span>
              </div>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-[33.5px] h-[18px] bg-[#d1d1d1] rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[1px] after:start-[1px]  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[15.5px] after:w-[15.5px] after:transition-all dark:border-gray-600 peer-checked:bg-blue"></div>
              </label>
            </div>
          </div>
        </Dropdown>
        <Dropdown dropdownName="Categories" className={"mt-6 border-t"}>
          <div className="w-full flex items-center justify-between ">
            <div>
              <span className="text-textcolor text-xs font-medium">Select</span>
            </div>
            <SimpleDropdown options={optionCategories} />
          </div>

          <button className="w-full  h-[36px] flex items-center justify-center bg-[#9039FF] rounded-lg p-[10px] gap-[10px]">
            <span>
              <Icon
                icon="lucide:tag"
                width="16px"
                height="16px"
                style={{ color: "white" }}
              />
            </span>
            <span className="text-white text-xs">Product 1</span>
          </button>
        </Dropdown>
        <Dropdown dropdownName="Position" className={"mt-6 border-t"}>
          <div className="w-full flex items-center justify-between  ">
            <div>
              <span className="text-textcolor text-xs font-medium">Font</span>
            </div>
            <SimpleDropdown />
          </div>
        </Dropdown>
        <Dropdown dropdownName="Layout" className={"mt-6 border-t"}>
          <div className="w-full h-[36px] flex items-center text-xs border-none">
            <div className="w-[92px] text-start">
              <span className="text-textcolor text-xs font-medium">
                Display
              </span>
            </div>
            <div className="flex items-center gap-3 p-[4px] justify-evenly   rounded-lg bg-bgcolor">
              <div className="rounded-lg p-1  border  bg-blue ctr">
                <Icon
                  icon="solar:slider-horizontal-outline"
                  width="20px"
                  height="20px"
                  style={{ color: "white" }}
                />
              </div>
              <div className="rounded-lg p-1  border ctr">
                <Icon
                  icon="solar:slider-vertical-linear"
                  width="20px"
                  height="20px"
                  style={{ color: "#757575" }}
                />
              </div>{" "}
              <div className="rounded-lg p-1  border ctr">
                <Icon
                  icon="mage:layout-grid"
                  width="20px"
                  height="20px"
                  style={{ color: "#757575" }}
                />{" "}
              </div>
              <div className="rounded-lg p-1  border ctr">
                <Icon
                  icon="ant-design:eye-invisible-outlined"
                  width="20px"
                  height="20px"
                  style={{ color: "#757575" }}
                />
              </div>
            </div>
          </div>
        </Dropdown>
        <Dropdown dropdownName="Typhography" className={"mt-6 border-t"}>
          <div className="w-full flex items-center justify-between  ">
            <div>
              <span className="text-textcolor text-xs font-medium">Font</span>
            </div>
            <SimpleDropdown />
          </div>

          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">Weight</span>
            </div>
            <SimpleDropdown title="600" />
          </div>

          <div className="flex items-center justify-between gap-[11px]">
            <div className="flex items-center gap-6  w-[126px] justify-between">
              <div>
                <span className="text-textcolor text-xs font-medium">Size</span>
              </div>
              <div className="w-[69px] h-[35px] rounded-lg ctr text-xs text-textcolor bg-[#F5F5F5]">
                {" "}
                600 PX
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-textcolor text-xs font-medium">
                  Height
                </span>
              </div>
              <div className="w-[69px] h-[35px] rounded-lg ctr text-xs text-textcolor bg-[#F5F5F5]">
                {" "}
                60 PX
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">Color</span>
            </div>
            <div className="w-[190px] h-[38px] flex items-center p-[10px] rounded-lg bg-[#F5F5F5]">
              <div className="size-[18px] bg-black"> </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">Align</span>
            </div>
            <div className="w-[157px] h-[38px] flex items-center">
              <div className="w-[40px] h-[38px] ctr border  border-s">
                <Icon
                  icon="uis:align-left"
                  width="20px"
                  height="20px"
                  style={{ color: "#4B5563" }}
                />{" "}
              </div>
              <div className="w-[40px] h-[38px] ctr border  ">
                <Icon
                  icon="uis:align-center"
                  width="20px"
                  height="20px"
                  style={{ color: "#4B5563" }}
                />{" "}
              </div>
              <div className="w-[40px] h-[38px] ctr border">
                <Icon
                  icon="uis:align-right"
                  width="20px"
                  height="20px"
                  style={{ color: "#4B5563" }}
                />
              </div>
              <div className="w-[40px] h-[38px] ctr border">
                <Icon
                  icon="uis:align-justify"
                  width="20px"
                  height="20px"
                  style={{ color: "#4B5563" }}
                />
              </div>
            </div>
          </div>
        </Dropdown>
        <Dropdown dropdownName="Size" className={"mt-6 border-t"}>
          <div className="flex items-center justify-between gap-[11px]">
            <div className="flex items-center gap-6  w-[126px] justify-between">
              <div>
                <span className="text-textcolor text-xs font-medium">
                  Width
                </span>
              </div>
              <div className="w-[69px] h-[35px] rounded-lg ctr text-xs text-textcolor bg-[#F5F5F5]">
                {" "}
                600 PX
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-textcolor text-xs font-medium">
                  Height
                </span>
              </div>
              <div className="w-[69px] h-[35px] rounded-lg ctr text-xs text-textcolor bg-[#F5F5F5]">
                {" "}
                60 PX
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-[11px]">
            <div className="flex items-center gap-6  w-[126px] justify-between">
              <div>
                <span className="text-textcolor text-xs font-medium">
                  Min W
                </span>
              </div>
              <div className="w-[69px] h-[35px] rounded-lg ctr text-xs text-textcolor bg-[#F5F5F5]">
                {" "}
                600 PX
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-textcolor text-xs font-medium">
                  Max H
                </span>
              </div>
              <div className="w-[69px] h-[35px] rounded-lg ctr text-xs text-textcolor bg-[#F5F5F5]">
                {" "}
                60 PX
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-[11px]">
            <div className="flex items-center gap-6  w-[126px] justify-between">
              <div>
                <span className="text-textcolor text-xs font-medium">
                  Min W
                </span>
              </div>
              <div className="w-[69px] h-[35px] rounded-lg ctr text-xs text-textcolor bg-[#F5F5F5]">
                {" "}
                600 PX
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="text-textcolor text-xs font-medium">
                  Max H
                </span>
              </div>
              <div className="w-[69px] h-[35px] rounded-lg ctr text-xs text-textcolor bg-[#F5F5F5]">
                {" "}
                60 PX
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">
                Overflow
              </span>
            </div>
            <div className="w-[167px] h-[36px] rounded-lg gap-3 flex items-center p-1 bg-[#F5F5F5]">
              <div className="size-7 ctr ">
                <Icon
                  icon="mage:eye"
                  width="20px"
                  height="20px"
                  style={{ color: "#757575" }}
                />
              </div>
              <div className="size-7 ctr ">
                <Icon
                  icon="mage:eye-off"
                  width="20px"
                  height="20px"
                  style={{ color: "#757575" }}
                />
              </div>
              <div className="size-7 ctr ">
                <Icon
                  icon="mage:eye-off"
                  width="20px"
                  height="20px"
                  style={{ color: "#757575" }}
                />
              </div>
              <div className="size-7 ctr text-textcolor text-sm">Auto</div>
            </div>
          </div>
        </Dropdown>
        <Dropdown dropdownName="Background" className={"mt-6 border-t"}>
          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">Color</span>
            </div>
            <div className="w-[190px] h-[38px] flex items-center p-[10px] rounded-lg bg-[#F5F5F5] gap-[10px]">
              <div className="size-[18px] bg-black"> </div>
              <div className="text-textcolor text-xs">Transparent</div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">Image</span>
            </div>
            <div className="w-[190px] h-[38px] flex items-center p-[10px] rounded-lg bg-[#F5F5F5] gap-[10px]">
              <div className="text-textcolor text-xs">Change image</div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">Repeat</span>
            </div>
            <div className="w-[190px] h-[38px] flex items-center p-[10px] rounded-lg bg-[#F5F5F5] gap-[10px]">
              <div className="text-textcolor text-xs">None</div>
            </div>
          </div>

          <div className="w-full flex flex-col  gap-3 ">
            <div className=" flex justify-start">
              <span className="text-textcolor text-xs font-medium">
                Position
              </span>
            </div>
            <div className="flex items-center justify-between gap-[12px]">
              <div className="flex items-center gap-[10px]  w-[126px]  justify-end    ">
                <div className="">
                  <span className="text-textcolor text-xs font-medium">
                    Left
                  </span>
                </div>
                <div className="w-[69px] h-[35px] rounded-lg ctr text-xs text-textcolor bg-[#F5F5F5]">
                  {" "}
                  600 PX
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <span className="text-textcolor text-xs font-medium">
                    Top
                  </span>
                </div>
                <div className="w-[69px] h-[35px] rounded-lg ctr text-xs text-textcolor bg-[#F5F5F5]">
                  {" "}
                  60 PX
                </div>
              </div>
            </div>
          </div>
        </Dropdown>
        <Dropdown dropdownName="Borders" className={"mt-6 border-t"}>
          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">Radius</span>
            </div>
            <div className="flex items-center justify-between w-[78px] gap-3">
              <div className="size-[33px] border ctr rounded-lg bg-[#EDEDED]">
                <Icon
                  icon="fluent:maximize-48-filled"
                  width="20px"
                  height="20px"
                  style={{ color: "#757575" }}
                />
              </div>
              <div className="size-[33px] border ctr rounded-lg bg-[#EDEDED]">
                <Icon
                  icon="mynaui:maximize"
                  width="20px"
                  height="20px"
                  style={{ color: "#757575" }}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between gap-4">
            <div>
              <input type="range" className="w-[190px]" />
            </div>
            <div className="w-[42px] h-[35px] text-xs text-[#242424] rounded-lg p-[10px] bg-[#EDEDED] caret-transparent">
              24
            </div>
          </div>
        </Dropdown>
        <Effects/>
      </div>
    </>
  );
}
