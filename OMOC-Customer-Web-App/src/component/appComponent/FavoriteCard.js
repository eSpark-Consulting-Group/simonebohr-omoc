import { Icon } from "@iconify/react";
import React from "react";

const FavoriteCard = ({ isSelected, text, data, onSelect }) => {
  return (
    <div>
      <div
        onClick={() => {
          onSelect(data);
        }}
        className={`${
          isSelected ? "bg-[#0094FF] text-white" : "bg-[#F5F5F5] text-[#9E9E9E]"
        } border-[1px]  h-36 rounded-lg flex justify-center items-center gap-2`}
      >
        <Icon icon="noto:smiling-face-with-sunglasses" />
        <p>{data.title}</p>
      </div>
    </div>
  );
};

export default FavoriteCard;
