import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import Dropdown from "../Dropdown";
import SimpleDropdown from "../SimpleDropdown";

const Effects = () => {

    const cursorOption = [
        "Auto",
        "Pointer",
        "Progress",
        "Context-menu",
        "Copy",
        "Default",
        "Help",
        "Move",
        "Resize",
      ];
    
      const [customCode, setcustomCode] = useState(false);
      const [boxShadow, setboxShadow] = useState(false);
      const [boxShadowType, setboxShadowType] = useState(true);
  return <div>
     <Dropdown dropdownName="Effects " className={"mt-6 border-t"}>
          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">
                Blending{" "}
              </span>
            </div>
            <SimpleDropdown
              title="Normal"
              selectstyle={"bg-[#F5F5F5] border-none text-textcolor"}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">
                Opacity
              </span>
            </div>
          </div>
          <div className="w-full flex items-center justify-between gap-4">
            <div class="">
              <input
                id="customRange"
                type="range"
                min="0"
                max="100"
                // value="0"
                className=" h-[2px] bg-[#E8F5FF] rounded-lg appearance-none cursor-pointer w-[190px] accent-blue"
              />
            </div>
            <div className="w-[42px] h-[35px] text-xs text-[#242424] rounded-lg p-[10px] bg-[#EDEDED] ">
              24
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">
                Transform{" "}
              </span>
            </div>
            <SimpleDropdown
              title="Normal"
              selectstyle={
                "bg-[#F5F5F5] border-none text-textcolor xl:w-[168px]"
              }
            />
          </div>{" "}
          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">Cursor</span>
            </div>
            <SimpleDropdown
              title="None"
              selectstyle={
                "bg-[#F5F5F5] border-none text-textcolor xl:w-[168px]"
              }
              options={cursorOption}
              optionMainConatiner={"w-[168px]"}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">
                Box Shadow
              </span>
            </div>

            {!boxShadow ? (
              <div
                onClick={() => setboxShadow(true)}
                className="size-[38px] flex items-center p-[10px] rounded-lg bg-[#F5F5F5] gap-[10px] cursor-pointer"
              >
                <div className="text-textcolor text-xs  ">
                  <Icon
                    className=""
                    icon="ph:plus-bold"
                    width="18px"
                    height="18px"
                    style={{ color: "#757575" }}
                  />
                </div>{" "}
              </div>
            ) : (
              <div
                onClick={() => setboxShadow(false)}
                className="size-[38px] flex items-center p-[10px] rounded-lg bg-[#F5F5F5] gap-[10px] cursor-pointer"
              >
                <div className="text-textcolor text-xs ">
                  <Icon
                    icon="ph:minus-bold"
                    width="18px"
                    height="18px"
                    style={{ color: "#757575" }}
                  />{" "}
                </div>{" "}
              </div>
            )}
          </div>
          {boxShadow && (
            <div className=" space-y-[10px]">
              <div className="w-full flex items-center justify-between">
                <div>
                  <span className="text-textcolor text-xs font-medium">
                    Type
                  </span>
                </div>
                <div className="w-[158px] h-[30px] rounded-lg bg-bgcolor p-1 flex items-center">
                  <div
                    onClick={() => setboxShadowType(true)}
                    className={`flex-1 text-xs  rounded ctr p-1 text-textcolor cursor-pointer ${
                      boxShadowType && "bg-blue text-white"
                    }`}
                  >
                    Inside
                  </div>
                  <div
                    onClick={() => setboxShadowType(false)}
                    className={`flex-1 text-xs rounded ctr  p-1 text-textcolor cursor-pointer ${
                      !boxShadowType && "bg-blue  text-white"
                    }`}
                  >
                    Outside
                  </div>
                </div>
              </div>
              <div className="w-full ">
                <div className="flex items-center justify-between">
                  <span className=" text-xs font-medium  p-1 rounded bg-[#0094FF] bg-opacity-20  text-blue ">
                    Offs. Y
                  </span>
                  <div className="w-[61px] h-[35px] bg-bgcolor rounded-lg text-xs ctr">
                    20
                  </div>
                  <span className="text-xs font-medium  p-1 rounded bg-[#0094FF] bg-opacity-20  text-blue">
                    Offs. X
                  </span>
                  <div className="w-[61px] h-[35px] bg-bgcolor rounded-lg text-xs ctr">
                    20
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-between">
                <div>
                  <span className="text-textcolor text-xs font-medium">
                    Spread
                  </span>
                </div>
                <div className="flex w-[190px] h-[35px] bg-bgcolor rounded-lg p-[10px]  items-center justify-between">
                  <div>
                    <input
                      className="bg-inherit text-textcolor outline-none  w-[146px] text-xs"
                      type="text"
                      defaultValue={0}
                    />
                  </div>
                  <div className="text-textcolor text-xs">PX</div>
                </div>
              </div>

              <div className="w-full flex items-center justify-between">
                <div>
                  <span className="text-textcolor text-xs font-medium">
                    Blur
                  </span>
                </div>
                <div className="flex w-[190px] h-[35px] bg-bgcolor rounded-lg p-[10px]  items-center justify-between">
                  <div>
                    <input
                      className="bg-inherit text-textcolor outline-none  w-[146px] text-xs"
                      type="text"
                      defaultValue={0}
                    />
                  </div>
                  <div className="text-textcolor text-xs">PX</div>
                </div>
              </div>
              <div className="w-full flex items-center justify-between">
                <div>
                  <span className="text-textcolor text-xs font-medium">
                    Color
                  </span>
                </div>
                <div className="flex w-[190px] h-[35px] bg-bgcolor rounded-lg p-[10px]  items-center ">
                  <div className="size-[18px] bg-black"></div>
                  <input className="text-textcolor ms-2 text-xs bg-inherit outline-none" type="text" defaultValue={'#121212'} />
                </div>
              </div>
            </div>
          )}
          <div className="w-full flex items-center justify-between">
            <div>
              <span className="text-textcolor text-xs font-medium">
                Custom Code
              </span>
            </div>
            {!customCode ? (
              <div
                onClick={() => setcustomCode(true)}
                className="size-[38px] flex items-center p-[10px] rounded-lg bg-[#F5F5F5] gap-[10px] cursor-pointer"
              >
                <div className="text-textcolor text-xs  ">
                  <Icon
                    className=""
                    icon="ph:plus-bold"
                    width="18px"
                    height="18px"
                    style={{ color: "#757575" }}
                  />
                </div>{" "}
              </div>
            ) : (
              <div
                onClick={() => setcustomCode(false)}
                className="size-[38px] flex items-center p-[10px] rounded-lg bg-[#F5F5F5] gap-[10px] cursor-pointer"
              >
                <div className="text-textcolor text-xs ">
                  <Icon
                    icon="ph:minus-bold"
                    width="18px"
                    height="18px"
                    style={{ color: "#757575" }}
                  />{" "}
                </div>{" "}
              </div>
            )}
          </div>{" "}
          {customCode &&
          <div className="space-y-[10px]">
            <div className="w-full flex items-center justify-between">
              <div>
                <span className="text-textcolor text-xs font-medium">
                  File
                </span>
              </div>
              <SimpleDropdown
                title="None"
                selectstyle={
                  "bg-[#F5F5F5] border-none text-textcolor xl:w-[168px]"
                }
                // options={cursorOption}
                optionMainConatiner={"w-[168px]"}
              />
            </div>

            <button className="w-full rounded-lg text-[#9039FF] border border-[#9039FF] p-[10px] text-xs">Edit Code</button>
          </div> }
        </Dropdown>
  </div>;
};
export default Effects;