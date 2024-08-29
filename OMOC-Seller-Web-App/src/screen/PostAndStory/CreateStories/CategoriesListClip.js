import React from "react";
import { Icon } from "@iconify/react";
import shoe from "../../../assets/image/shoe-img.png";
import people from "../../../assets/image/Ellipse 647.png";

function CategoriesListClip({ arr, setIsProductTag }) {
  return (
    <div className="my-4">
      <div className="flex items-center gap-1 ">
        <Icon
          icon="iconamoon:arrow-up-2-light"
          color="#242424"
          width="24"
          height="24"
          rotate={3}
          cursor={"pointer"}
          onClick={() => setIsProductTag(false)}
        />
        <p className="font-semibold text-sm">Categories A</p>
      </div>
      {arr.map(() => (
        <div className="flex my-4 items-center gap-4 pl-7">
          <input type="checkbox" className="w-5 h-5" />
          <img src={shoe} className="w-14 h-14 p-2 rounded-xl bg-[#F4F4F4]" />
          <div>
            <p className="text-sm font-semibold">Nike Air max 97 V1</p>
            <p className="text-xs font-medium text-[#757575]">123091u23</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoriesListClip;

export function TagPeopleList({ arr }) {
  return arr.map(() => (
    <div className="flex my-3 items-center gap-4 justify-between pr-2">
      <div className="flex items-center gap-2">
        <img src={people} className="w-14 h-14 p-1 rounded-full" />
        <div>
          <p className="text-sm font-semibold">Jordan Paul</p>
          <p className="text-xs font-medium text-[#757575]">paul24</p>
        </div>
      </div>
      <input type="checkbox" className="w-5 h-5" />
    </div>
  ));
}
