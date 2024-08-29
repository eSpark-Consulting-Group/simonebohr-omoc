import { Icon } from "@iconify/react";
import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

// option = array, title = string, selectstyle = string,optionStyle=string
export default function SimpleDropdown({
  options = ["option 1", "option 2", "option 3"],
  title = "Enter Code",
  selectstyle,
  selectText,
  optionMainConatiner,
  optionStyle,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
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

  return (
    <div className="" ref={dropdownRef}>
      <div
        className={twMerge(
          ` border p-[10px] w-[190px] h-[36px] rounded-[8px] flex  items-center justify-between `,
          selectstyle  
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={twMerge(`text-[12px]`, selectText)}>
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
            `  w-[190px] me-16 rounded-[8px] absolute z-50 bg-white ${isOpen?"border":""} `,
            optionMainConatiner
          )}
        >{isOpen && (<>
          {options?.map((option, index) => (
            <div
              key={index.toString()}
              className={twMerge(
                ` p-[10px] w-[190px] h-[36px] flex items-center text-[12px]`,
                optionStyle
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}</>)}
        </div>
      
    </div>
  );
}
