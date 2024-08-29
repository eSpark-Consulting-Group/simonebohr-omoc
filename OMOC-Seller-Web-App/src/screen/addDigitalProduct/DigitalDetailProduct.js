import React from "react";
import { placeholder, strings } from "../../utils/strings";
import addGallery from "../../assets/icon/gallery-add.svg";

function DigitalDetailProduct() {
  const arr = [
    { photo: "Main Photo" },
    { photo: `${strings.PHOTO} 1` },
    { photo: `${strings.PHOTO} 2` },
    { photo: `${strings.PHOTO} 3` },
    { photo: `${strings.PHOTO} 4` },
  ];
  return (
    <>
      <div className="w-full">
        <div className="mb-10 mt-2">
          <p className="text-2xl font-semibold">{strings.PRODUCT_PHOTO}</p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.ADD_YOUR_PRODUCT_PHOTO}
          </p>
          <div className="mb-10 mt-14 flex flex-wrap gap-4 items-center justify-between  max-sm:justify-center">
            {arr.map((item) => (
              <UploadImage item={item} />
            ))}
          </div>
        </div>
        <div className="mb-10 w-3/5 max-sm:w-full max-md:w-3/4">
          <p className="text-2xl font-semibold">{strings.PRODUCT}</p>
          <p className="text-sm text-[#404040] font-medium">
            {strings.SET_YOUR_PRODUCT_DETAILS}
          </p>
          <select className="w-full rounded-xl border-[#E0E0E0] border py-4 px-4 mt-8 mb-6">
            <option>Merk</option>
          </select>
          <div className="flex items-center gap-4 mb-6 max-sm:flex-wrap">
            <select className="w-full rounded-xl border-[#E0E0E0] border py-4 px-4 ">
              <option>Size</option>
            </select>
            <select className="w-full rounded-xl border-[#E0E0E0] border py-4 px-4 ">
              <option>Merk</option>
            </select>
          </div>
          <textarea
            className=" resize-none h-44 w-full p-4 border rounded-xl mb-1"
            placeholder={placeholder.EXAMPLE_SHOE_BRANDNAME_TYPE}
          />
          <p className="flex justify-between items-center text-sm font-medium mb-7">
            <span>{strings.TOOLTIPS}</span>
            <span>0/70</span>
          </p>
        </div>
        <div className="mb-10 flex justify-between items-center gap-5 flex-wrap">
          <div className="w-3/5 max-sm:w-full">
            <p className="text-2xl font-semibold">
              {strings.ADD_SPECIAL_INFOS}
            </p>
            <p className="text-sm text-[#404040] font-medium">
              {strings.ADD_ADDITIONAL_DETAILS}
            </p>
          </div>
          <button
            className="border-2 border-[#0094FF] text-[#0094FF] text-base font-semibold rounded-3xl py-2.5 px-4"
          >
            {strings.ADD_SPECIAL_INFO}
          </button>
        </div>
        <div className="mb-2 w-3/5 max-sm:w-full">
          <p className="text-2xl font-semibold">{strings.PRICE}</p>
          <p className="flex items-center gap-2 text-[#616161] text-base my-4 font-semibold w-full p-4 rounded-xl border">
            USD
            <input
              className="border-l-2 text-base font-normal pl-2 w-full"
              type="text"
              placeholder={placeholder.INPUT_PRICE}
            />
          </p>
          <p className="text-2xl font-semibold py-8">
            {strings.MAXIMUM_NUMBER_OF_PRODUCTS}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <input type="radio" name="numberProduct" className="w-6 h-6" />
            <p className="text-base font-medium w-[90%]">
              {strings.THERE_IS_NO_MAXIMUM_NUMBER}
            </p>
          </div>
          <div className="flex items-center gap-3 my-8">
            <input type="radio" name="numberProduct" className="w-6 h-6" />
            <p className="text-base font-medium w-[90%]">
              {strings.LIMIT_THE_MAXIMUM_NUMBER_OF}
            </p>
          </div>
          <p className="text-[#757575] text-sm font-medium">
            {strings.SETUP_MAXIMUM_AMOUNTS_OF_PRODUCTS}
          </p>
          <select className="w-full rounded-xl border-[#E0E0E0] border py-4 px-4 my-2">
            <option>10</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default DigitalDetailProduct;

function UploadImage({ item }) {
  return (
    <>
      <label
        htmlFor="upload5"
        className={`w-40 h-40 rounded-2xl border-[#C2C2C2] border-dashed border-2 flex justify-center items-center`}
      >
        <input type="file" className="hidden" id="upload5" />
        <span>
          <img
            src={addGallery}
            className="rounded-3xl bg-[#FBFBFB] w-12 h-12 p-3 m-auto"
          />
          <p className="mt-1 text-base font-medium text-[#616161]">
            {item.photo}
          </p>
        </span>
      </label>
    </>
  );
}
