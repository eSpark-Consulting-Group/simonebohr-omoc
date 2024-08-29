import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import Modal from "react-modal";
import { auto } from "@popperjs/core";
import { useSelector } from "react-redux";
import ProductSublyApi from "../../helper/ProductApi";
import { strings, placeholder } from "../../utils/strings";

const arr = [
  { photo: `${strings.PHOTO} 1`, index: 0 },
  { photo: `${strings.PHOTO} 2`, index: 1 },
  { photo: `${strings.PHOTO} 3`, index: 2 },
  { photo: `${strings.PHOTO} 4`, index: 3 },
  { photo: `${strings.PHOTO} 5`, index: 4 },
];

function CreatePost({
  isOpen,
  modalClose,
  OrderSetting,
  setOpenTagProductModal,
  setOpenPublishModal,
  setImageFile,
  imageFile,
  setPostContent,
  postContent,
}) {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [captionLength, setCaptionLength] = useState(0);

  const onFileHandle = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const requestData = new FormData();
      requestData.append("product", file);
      await ProductSublyApi.productImage(requestData, token).then(
        (response) => {
          if (response.statusCode === 200) {
            setImageFile((prevImages) => [...prevImages, response.data]);
          }
        }
      );
    }
  };

  async function removeImage(id, index) {
    await ProductSublyApi.deleteImage(id, token).then((response) => {
      if (response.statusCode === 200) {
        setImageFile((prevImages) => {
          const images = [...prevImages];
          images.splice(index, 1);
          return images;
        });
      }
    });
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={modalClose}
      style={{
        content: {
          left: auto,
          right: "17%",
          width: "66%",
        },
      }}
      shouldCloseOnOverlayClick={false}
    >
      <div className="rounded-xl bg-white w-full my-8 py-16 px-20 max-sm:px-10 max-sm:py-10 max-md:px-16 max-md:py-12">
        <div className="flex justify-between items-center max-sm:flex-wrap max-sm:gap-1">
          <div>
            <h3 className="text-3xl font-bold mb-1.5">{strings.POST}</h3>
            <p className="text-sm font-normal text-[#7A7A7A]">
              {strings.MANGE_YOUR_SHOP_ORDER}
            </p>
          </div>
          <div className="flex gap-4 items-center w-2/5 max-sm:w-full max-sm:mt-4 max-md:w-1/2">
            <button className="rounded-3xl py-3 px-3 w-full border-2 border-[#0094FF] text-[#0094FF] text-base font-semibold">
              {strings.SAVE_AS_DRAFT}
            </button>
            <button
              onClick={() => {
                setOpenPublishModal(true);
                modalClose();
              }}
              className="rounded-3xl py-3 px-3 w-full bg-[#0094FF] text-base font-semibold text-white"
            >
              {strings.CONTINUE}
            </button>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-semibold">{strings.PHOTO}</h3>
          <p className="text-sm text-[#404040] font-normal">
            {strings.YOU_CAN_TAG_YOUR_PRODUCT}
          </p>

          <div className="my-6 flex flex-wrap gap-4 items-center justify-between  max-sm:justify-center">
            {arr.map((item, index) => (
              <ImageUpload
                key={index}
                id={"upload1"}
                setOpenTagProductModal={setOpenTagProductModal}
                item={item}
                index={index}
                onFileHandle={onFileHandle}
                imageFile={imageFile}
                removeImage={removeImage}
              />
            ))}
          </div>

          <textarea
            name="Outlined"
            onChange={(e) => {
              setCaptionLength(e.target.textLength);
              setPostContent(e.target.value);
            }}
            placeholder={placeholder.CAPTION}
            value={postContent}
            className={`${
              captionLength > 100 ? "border-red-500" : ""
            } resize-none h-40 border-2 border-[#E0E0E0] w-full rounded-xl p-4`}
          />
          <p className="text-end text-sm font-medium pr-1">
            {captionLength}/100
          </p>
        </div>
        <div className="flex justify-between items-center mt-8  max-sm:flex-wrap max-sm:gap-4">
          <div>
            <h3 className="text-2xl font-semibold mb-1">
              {strings.CUSTOM_ORDER_SETTING}
            </h3>
            <p className="text-sm text-[#404040] font-normal">
              {strings.YOU_CAN_TAG_YOUR_PRODUCT}
            </p>
          </div>
          <button
            onClick={() => {
              OrderSetting();
              modalClose();
            }}
            className="rounded-3xl py-3 px-10 border-2 border-[#0094FF] text-[#0094FF] text-base font-semibold"
          >
            {strings.ORDER_SETTING}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CreatePost;
