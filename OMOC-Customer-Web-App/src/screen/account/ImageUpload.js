import React, { useState } from "react";
import addGallery from "../../assets/icon/gallery-add.svg";
import { Icon } from "@iconify/react";

function ImageUpload({ onFileHandle, item, index, imageFile, removeImage }) {
  return (
    <>
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
        <div className={`w-44 h-44 rounded-xl overflow-hidden relative`}>
          <img
            src={imageFile[index].url}
            className="bg-[#F7F6F4] w-full h-full object-cover"
          />
          <Icon
            icon="ic:round-close"
            color="#101010"
            width="25"
            height="25"
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => removeImage(imageFile[index].publicId, index)}
          />
        </div>
      )}
    </>
  );
}

export default ImageUpload;
