import React from "react";

const storeData = [
  {
    storeName: "Add Product ID",
    isSelected: true,
  },
  {
    storeName: "Edit Product",
    isSelected: false,
  },
  {
    storeName: "Delete Product",
    isSelected: false,
  },
];
const InventoryInfo = ({ closeInfo, setOpenProduct, functionAction }) => {
  return (
    <div className="w-48 p-3 rounded-2xl bg-white absolute right-0 shadow-lg z-10 top-16">
      {storeData.map((val, index) => {
        return (
          <div
            className={`h-9 w-40 rounded-lg hover:bg-[#E8F5FF] hover:text-[#0094FF] flex items-center mt-1 cursor-pointer`}
            key={index}
            onClick={() => {
              // closeInfo(false);
              // setOpenProduct(true);
              if (index == 2) {
                functionAction();
              }
            }}
          >
            <p className="text-sm font-semibold hover:text-[#0094FF] ml-2">
              {val.storeName}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default InventoryInfo;
