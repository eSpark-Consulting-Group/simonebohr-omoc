import React, { useState } from "react";
import product from "../../../assets/image/productImg/product 1.png";
import { strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import EditClipModal from "./EditClipModal";
import addGallery from "../../../assets/icon/gallery-add.svg";

function StoryUpload({
  item,
  onFileHandle,
  index,
  imageFile,
  removeImage,
  openEditClip,
  setOpenEditClip,
  setStoryClipBtn,
}) {
  return (
    <div>
      {!imageFile[index] ? (
        <label
          htmlFor="upload5"
          className={`w-44 h-44 rounded-xl border-dashed border-2 flex justify-center items-center`}
        >
          <input
            type="file"
            className="hidden"
            id="upload5"
            onChange={(e) => {
              onFileHandle(e);
            }}
          />
          <span>
            <img
              src={addGallery}
              className="rounded-3xl bg-[#FBFBFB] w-12 h-12 p-3"
            />
            <p className="mt-1 text-base font-medium text-[#616161]">
              {item.photo}
            </p>
          </span>
        </label>
      ) : (
        <div className={` w-44 h-44 rounded-xl overflow-hidden relative`}>
          <img
            src={imageFile[index].url}
            className="bg-[#F7F6F4] w-full h-full"
          />

          <div className="rounded-xl absolute w-full h-full top-0 items-center flex justify-center bg-[#00000059]">
            <Icon
              icon="ic:round-close"
              color="#fff"
              width="25"
              height="25"
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => {
                removeImage(imageFile[index].publicId, index);
              }}
            />
            <div className="text-center">
              <button
                onClick={() => {
                  setOpenEditClip(!openEditClip);
                  setStoryClipBtn(1);
                }}
                className="bg-[#0094FF] rounded-xl text-white text-sm font-normal py-2 px-6 mb-1"
              >
                {strings.EDIT_CLIP}
              </button>
              <button
                onClick={() => {
                  setOpenEditClip(!openEditClip);
                  setStoryClipBtn(2);
                }}
                className="bg-transparent border border-white rounded-xl text-white text-sm font-normal py-2 px-3 mt-1 "
              >
                {strings.TAG_PRODUCT}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryUpload;
