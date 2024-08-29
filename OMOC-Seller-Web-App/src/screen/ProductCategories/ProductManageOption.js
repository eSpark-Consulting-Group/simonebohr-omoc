import React from "react";
import { strings } from "../../utils/strings";
import { useNavigate } from "react-router-dom";

function ProductManageOption({ item, deleteFunction }) {
  const navigate = useNavigate();
  console.log(item);
  return (
    <div className="bg-white rounded-xl w-52 text-start p-3 absolute top-14 shadow-2xl invoice-option-box right-10 z-10">
      <p
        className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-xl"
        onClick={() => {
          navigate("/Product/Categories/edit-Categories", { state: { item } });
        }}
      >
        {strings.EDIT_CATEGORIES}
      </p>
      <p className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-xl">
        {strings.ADD_PICTURE}
      </p>
      <p
        className="py-3 px-4 hover:bg-[#E8F5FF] hover:text-[#0094FF] cursor-pointer rounded-xl"
        onClick={() => {
          deleteFunction();
        }}
      >
        {strings.DELETE_CATEGORIES}
      </p>
    </div>
  );
}

export default ProductManageOption;
