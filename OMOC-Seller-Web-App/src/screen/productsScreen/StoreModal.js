import React from "react";

const storeData = [
  {
    storeName: " Chicago Store",
    isSelected: true,
  },
  {
    storeName: "London Store",
    isSelected: false,
  },
];

const StoreModal = ({ showStoreName }) => {
  const handleShowStore = (storeName) => {
    showStoreName(storeName);
  };
  return (
    <div className="h-28 w-48 p-3 rounded-2xl bg-white absolute shadow-lg top-16 left-20">
      {storeData.map((val, index) => {
        return (
          <div
            className={`h-9 w-40 rounded-lg hover:bg-[#E8F5FF] hover:text-[#0094FF] flex items-center mt-1 cursor-pointer`}
            key={index}
            onClick={() => {
              handleShowStore(val.storeName);
            }}
          >
            <p className="text-sm font-semibold ml-2">
              {val.storeName}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StoreModal;
