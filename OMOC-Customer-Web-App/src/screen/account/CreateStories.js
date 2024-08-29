import React, { useState } from "react";
// import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import { placeholder, strings } from "../../utils/strings";
import addGallery from "../../assets/icon/gallery-add.svg";
import ImageUpload from "./ImageUpload";
import PublishNowModal from "./PublishNowModal";
import EditClipModal from "./EditClipModal";
import Modal from "react-modal";

function CreateStories({
  isOpen,
  onClose,
  setOpenEditClip,
  setStoryClipBtn,
  setOpenPublishModal,
}) {
  const [captionLength, setCaptionLength] = useState(0);

  return (
    <>
      <Modal
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            borderRadius: "15px",
          },
        }}
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        <div className="rounded-xl bg-white w-full my-8 py-16 px-20 max-sm:px-10 max-sm:py-10 max-md:px-16 max-md:py-12">
          <div className="flex justify-between items-center max-sm:flex-wrap max-sm:gap-1">
            <div>
              <h3 className="text-3xl font-bold mb-1.5">{strings.STORIES}</h3>
              <p className="text-sm font-normal text-[#7A7A7A]">
                {strings.MANGE_YOUR_SHOP_ORDER}
              </p>
            </div>
            <div className="flex gap-4 items-center w-2/5 max-md:w-1/2 max-sm:w-full max-sm:mt-4">
              <button className="rounded-3xl py-3 px-3 w-full border-2 border-[#0094FF] text-[#0094FF] text-base font-semibold">
                {strings.SAVE_AS_DRAFT}
              </button>
              <button
                onClick={() => {
                  setOpenPublishModal(true);
                  onClose();
                }}
                className="rounded-3xl py-3 px-3 w-full bg-[#0094FF] text-base font-semibold text-white"
              >
                {strings.CONTINUE}
              </button>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold">
              {strings.UPLOAD_PHOTO_AND_VIDEO}
            </h3>
            <p className="text-sm text-[#404040] font-normal">
              {strings.YOU_CAN_TAG_YOUR_PRODUCT}
            </p>
            <div className="my-6 flex flex-wrap gap-4 items-center justify-between">
              <ImageUpload
                onClose={onClose}
                setOpenEditClip={() => {
                  setOpenEditClip();
                }}
                id={"story1"}
                setStoryClipBtn={setStoryClipBtn}
              />
            </div>
            <textarea
              name="Outlined"
              onChange={(e) => {
                setCaptionLength(e.target.textLength);
              }}
              placeholder={placeholder.CAPTION}
              className={`${
                captionLength > 100 ? "border-red-500" : ""
              } resize-none h-40 border-2 border-[#E0E0E0] w-full rounded-xl p-4`}
            />
            <p className="text-end text-sm font-medium pr-1">
              {captionLength}/100
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateStories;
