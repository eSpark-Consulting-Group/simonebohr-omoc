import { Icon } from "@iconify/react/dist/iconify.js";
import Dropdown from "../Dropdown";
import SimpleDropdown from "../SimpleDropdown";
import { useEffect, useRef, useState } from "react";

const Size = () => {
  const [addSize, setaddSize] = useState(true);

  const optionHeightWidth = [
    "Max Height",
    "Max Width",
    "Min Height",
    "Min Width",
  ];
// const dropdownRef = useRef(null);
//   useEffect(() => {

//     const handleClickOutside = (event) => {
//       if (dropdownRef.current &&!dropdownRef.current.contains(event.target)) {
//         setaddSize(true);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

  return (
    <div>
      <Dropdown dropdownName="Effects " className={"mt-6 border-t"}>
        <div className="w-full flex items-start justify-between">
          <div>
            <span className="text-textcolor text-xs font-medium">Span</span>
          </div>
          <div className="space-y-[12px]">
            <SimpleDropdown
              title="1 Coloumn"
              selectstyle={"bg-[#F5F5F5] border-none text-textcolor w-[168px]"}
            />
            <SimpleDropdown
              title="1 Row"
              selectstyle={"bg-[#F5F5F5] border-none text-textcolor w-[168px]"}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div>
            <span className="text-textcolor text-xs font-medium">Width</span>
          </div>
          <div className="flex w-[170px] justify-between">
            <div className=" rounded-lg w-[69px] h-[35px] bg-bgcolor text-textcolor text-xs ctr">
              Auto
            </div>
            <SimpleDropdown
              title="Relative"
              selectstyle={"bg-[#F5F5F5] border-none text-textcolor w-[93px]"}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div>
            <span className="text-textcolor text-xs font-medium">Height</span>
          </div>
          <div className="flex w-[170px] justify-between">
            <div className=" rounded-lg w-[69px] h-[35px] bg-bgcolor text-textcolor text-xs ctr">
              Auto
            </div>
            <SimpleDropdown
              title="Relative"
              selectstyle={"bg-[#F5F5F5] border-none text-textcolor w-[93px]"}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div>
            <span className="text-textcolor text-xs font-medium">Height</span>
          </div>
          <div>
            {addSize ? (
              <div
                onClick={() => setaddSize(false)}
                className="size-9 bg-bgcolor ctr rounded-lg"
              >
                <Icon
                  icon="ph:plus-bold"
                  width="18px"
                  height="18px"
                  style={{ color: "#757575" }}
                />
              </div>
            ) : (
              <div
                onClick={() => setaddSize(!addSize)}
                className="size-9 bg-bgcolor ctr rounded-lg"
              >
                <Icon
                  icon="ph:minus-bold"
                  width="18px"
                  height="18px"
                  style={{ color: "#757575" }}
                />
              </div>
            )}

            <div 
            // ref={dropdownRef}
              className={`absolute w-[157px] ml-[-120px] border border-red-500 ${
                addSize ? "hidden" : "block"
              }`}
            >
              {optionHeightWidth.map((item, index) => (
                <div className="h-[30px] w-full border flex justify-start items-center p-2">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
export default Size;
