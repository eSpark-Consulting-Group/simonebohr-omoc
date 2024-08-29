import React, { useState } from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import { placeholder, strings } from "../../../utils/strings";
import addGallery from "../../../assets/icon/gallery-add.svg";
import ImageUpload from "./ImageUpload";
import CustomOrderSettiing from "./CustomOrderSetting";
import PublishNowModal from "./PublishNowModal";
import ProfileShopSublyApi from "../../../helper/ProfileShopApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProductSublyApi from "../../../helper/ProductApi";
import { useSelector } from "react-redux";

const arr = [
  { photo: `${strings.PHOTO} 1`, index: 0 },
  { photo: `${strings.PHOTO} 2`, index: 1 },
  { photo: `${strings.PHOTO} 3`, index: 2 },
  { photo: `${strings.PHOTO} 4`, index: 3 },
  { photo: `${strings.PHOTO} 5`, index: 4 },
];
function CreatePost() {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [orderSetting, setOrderSetting] = useState(false);
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const [captionLength, setCaptionLength] = useState(0);
  const [imageFile, setImageFile] = useState([]);
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate();

  // ============API for creating seller post============
  const createPostHandler = async () => {
    const requestData = {
      files: imageFile,
      tags: ["65d60f4a36cd981d289d5ea5"],
      hideLikeViewCount: true,
      isCommentingOff: true,
      isSensitiveContent: true,
      caption: postContent,
    };
    await ProfileShopSublyApi.createPostHandle(requestData, token).then(
      (response) => {
        if (response.statusCode == 200) {
          toast.success(response.message);
          setPostContent("");
          navigate("/Profile/Post-story/Post");
        } else {
          toast.error(response.data.message);
        }
      }
    );
  };

  // ===========Handler for uploading post================
  const onFileHandle = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const images = [...imageFile];
      const requestData = new FormData();
      requestData.append("product", file);
      await ProductSublyApi.productImage(requestData, token).then(
        (response) => {
          if (response.statusCode == 200) {
            images.push(response.data);
            setImageFile(images);
          }
        }
      );
    }
  };

  // ===============Handler for delete post===============
  async function removeImage(id, index) {
    await ProductSublyApi.deleteImage(id, token).then((response) => {
      if (response.statusCode == 200) {
        const images = [...imageFile];
        images.splice(index, 1);
        setImageFile(images);
      }
    });
  }

  return (
    <>
      <div className={`bg-[#F2F2F2] h-full pb-1`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
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
                  onClick={() => setOpenPublishModal(!openPublishModal)}
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
                value={postContent}
                onChange={(e) => {
                  setCaptionLength(e.target.textLength);
                  setPostContent(e.target.value);
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
                  setOrderSetting(!orderSetting);
                }}
                className="rounded-3xl py-3 px-10 border-2 border-[#0094FF] text-[#0094FF] text-base font-semibold"
              >
                {strings.ORDER_SETTING}
              </button>
            </div>
          </div>
        </Container>
        <CustomOrderSettiing
          orderSetting={orderSetting}
          setOrderSetting={setOrderSetting}
        />
        <PublishNowModal
          openPublishModal={openPublishModal}
          setOpenPublishModal={setOpenPublishModal}
          clickBtn={createPostHandler}
        />
      </div>
    </>
  );
}

export default CreatePost;
