import React, { useState } from "react";
import Header from "../../../component/Header";
import { Container, Grid } from "@mui/material";
import { placeholder, strings } from "../../../utils/strings";
import PublishNowModal from "../CreatePost/PublishNowModal";
import EditClipModal from "./EditClipModal";
import StoryUpload from "./StoryUpload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileShopSublyApi from "../../../helper/ProfileShopApi";
import { toast } from "react-toastify";
import ProductSublyApi from "../../../helper/ProductApi";

const arr = [{ photo: `${strings.PHOTO}`, index: 0 }];

function CreateStories() {
  const { token } = useSelector((state) => state.userData.userDetails);
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const [captionLength, setCaptionLength] = useState(0);
  const [storyClipBtn, setStoryClipBtn] = useState("");
  const [openEditClip, setOpenEditClip] = useState(false);
  const [imageFile, setImageFile] = useState([]);
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate();

  // ============API for creating seller post============
  const createStoryHandler = async (status) => {
    const requestData = {
      storyData: [{ url: imageFile[0].url, caption: postContent }],
      isPublished: status,
    };
    await ProfileShopSublyApi.createStoryHandle(requestData, token).then(
      (response) => {
        if (response.statusCode == 200) {
          toast.success(response.message);
          setPostContent("");
          status
            ? navigate("/Profile/Post-story/Story")
            : navigate("/Profile/Post-story/Draft");
        } else {
          toast.error(response.data.message);
        }
      }
    );
  };

  console.log(imageFile);

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
                <h3 className="text-3xl font-bold mb-1.5">{strings.STORIES}</h3>
                <p className="text-sm font-normal text-[#7A7A7A]">
                  {strings.MANGE_YOUR_SHOP_ORDER}
                </p>
              </div>
              <div className="flex gap-4 items-center w-2/5 max-md:w-1/2 max-sm:w-full max-sm:mt-4">
                <button
                  onClick={() => {
                    createStoryHandler(false);
                  }}
                  disabled={imageFile ? false : true}
                  className="rounded-3xl py-3 px-3 w-full border-2 border-[#0094FF] text-[#0094FF] text-base font-semibold"
                >
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
              <h3 className="text-2xl font-semibold">
                {strings.UPLOAD_PHOTO_AND_VIDEO}
              </h3>
              <p className="text-sm text-[#404040] font-normal">
                {strings.YOU_CAN_TAG_YOUR_PRODUCT}
              </p>
              <div className="my-6 flex flex-wrap gap-4 items-center justify-between">
                {arr.map((item, index) => (
                  <StoryUpload
                    item={item}
                    index={index}
                    onFileHandle={onFileHandle}
                    imageFile={imageFile}
                    removeImage={removeImage}
                    setOpenEditClip={setOpenEditClip}
                    openEditClip={openEditClip}
                    setStoryClipBtn={setStoryClipBtn}
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
                className={`${
                  captionLength > 100 ? "border-red-500" : ""
                } resize-none h-40 border-2 border-[#E0E0E0] w-full rounded-xl p-4`}
              />
              <p className="text-end text-sm font-medium pr-1">
                {captionLength}/100
              </p>
            </div>
          </div>
        </Container>
      </div>
      <PublishNowModal
        openPublishModal={openPublishModal}
        setOpenPublishModal={setOpenPublishModal}
        setOpenEditClip={setOpenEditClip}
        setStoryClipBtn={setStoryClipBtn}
        clickBtn={createStoryHandler}
      />
      <EditClipModal
        openEditClip={openEditClip}
        setOpenEditClip={setOpenEditClip}
        storyClipBtn={storyClipBtn}
        imageFile={imageFile?.length > 0 && imageFile[0].url}
      />
    </>
  );
}

export default CreateStories;
