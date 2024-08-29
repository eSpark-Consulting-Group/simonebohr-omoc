import React from "react";

const storeData = [
  {
    storeName: "Excel",
    isSelected: true,
  },
  {
    storeName: "XPS Document",
    isSelected: false,
  },
];
const UploadProductDropdown = () => {
  return (
    <div className="h-28 w-48 p-3 rounded-2xl bg-white absolute shadow-lg left-0 top-12">
      {storeData.map((val, index) => {
        const backgroundColor = val.isSelected ? "#000" : "#fff";
        return (
          <div
            className={`h-9 w-40 rounded-lg hover:bg-[#E8F5FF] hover:text-[#0094FF] flex items-center mt-1 cursor-pointer`}
            key={index}
          >
            <h6 className="text-sm font-semibold hover:text-[#0094FF] ml-2 !border-0">
              {val.storeName}
            </h6>
          </div>
        );
      })}
    </div>
  );
};

export default UploadProductDropdown;
