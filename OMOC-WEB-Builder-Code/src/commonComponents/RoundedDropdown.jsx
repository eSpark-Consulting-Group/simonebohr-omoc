import { Icon } from "@iconify/react";
import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";   

export default function RoundedDropdown( {
    options = ["Option 1", "Option 2", "Option 3"],
    title = "Dropdown",
    selectstyle,
    selectText,
    optionMainConatiner,
    optionStyle,
  }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);
    const [optIndex, setoptIndex] = useState();
    
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
  
  return (
    <div className="" ref={dropdownRef}>
      <div
        className={twMerge(
          ` border border-[#E8E8E8] px-3 xl:py-4 min-w-[170px] h-[53px] rounded-full flex  items-center justify-between  text-[#7A7A7A] bg-white  gap-[10px] `,
          selectstyle
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={twMerge(`text-[16px]`, selectText)}>
          {selectedOption ? selectedOption : title}
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
      
        <div
          className={twMerge(
            `  w-[186px] rounded-[16px] flex flex-col gap-[10px]  absolute mt-4 -mx-4 z-50 bg-white ${isOpen?" p-[12px] shadow-lg":""} `,
            optionMainConatiner
          )}
        >{isOpen && (<>
          {options?.map((option, index) => (
            <div
              key={index.toString()}
              className={twMerge(` p-[10px] w-[162px]  h-[36px] flex items-center text-[14px] ${optIndex === index? "text-blue bg-[#E8F5FF] rounded-[8px]" : ""}`,
                optionStyle
              )}
              onClick={() => {handleOptionClick(option);setoptIndex(index)}}
            >
              {option}
            </div>
          ))}</>)}
        </div>
      
    </div>
//     <SimpleDropdown
//     title="Created (newest)"
//     selectstyle={"rounded-full py-3 px-4 h-[53px]"}
//     selectText={"text-base text-[#7A7A7A]"}
//     optionMainConatiner={'rounded-[16px] p-[12px]' }
//   />
  )
}
