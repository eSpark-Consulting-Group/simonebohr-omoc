import React, { useState } from "react";
import Modal from "react-modal";
import { Grid, Slider } from "@mui/material";
import clipImg from "../../assets/images/product 4.png";
import { Icon } from "@iconify/react";
import songImg from "../../assets/images/songImg.png";
import addGallery from "../../assets/icon/gallery-add.svg";
import check from "../../assets/icon/check.svg";
import productList from "../../assets/images/productList.jpg";
import trash from "../../assets/icon/trash.svg";
import CategoriesListClip, { TagPeopleList } from "./CategoriesListClip";
import shoe from "../../assets/images/shoe-img.png";
import people from "../../assets/images/Ellipse 647.png";
import { useDispatch, useSelector } from "react-redux";
import { placeholder, strings } from "../../utils/strings";
import "../../assets/commonStyling/commonStyling.css";

function EditClipModal({ openEditClip, setOpenEditClip, storyClipBtn }) {
  const [isProductTag, setIsProductTag] = useState(false);
  const [soundSetting, setSoundSetting] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        isOpen={openEditClip}
        onRequestClose={() => {
          setOpenEditClip();
          setIsProductTag(false);
        }}
        style={{
          content: {
            left: "auto",
            right: "20%",
            width: "60%",
            borderRadius: "15px",
          },
        }}
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <div className="flex justify-between items-center max-sm:flex-wrap max-sm:gap-4">
            <h3 className="text-2xl font-bold">
              {storyClipBtn == 1
                ? strings.EDIT_CLIP
                : storyClipBtn == 2
                ? strings.TAG_PEOPLE
                : strings.TAG_PRODUCT}
            </h3>
            <div className="flex items-center gap-4 ">
              <button
                onClick={() => {
                  setOpenEditClip();
                  setIsProductTag(false);
                }}
                className="rounded-3xl border-[#C2C2C2] text-[#757575] text-sm font-medium py-3 px-6 border"
              >
                {strings.CANCEL}
              </button>
              <button className="bg-[#0094FF] rounded-3xl text-white text-sm font-medium py-3 px-6">
                {strings.SAVE_EDIT}
              </button>
            </div>
          </div>
          <Grid container className="my-5">
            <Grid xs={12} sm={6} lg={8}>
              <div className="border px-4 pt-3">
                <label
                  htmlFor="search"
                  className="flex py-2 px-5 justify-between items-center rounded-3xl w-full border"
                >
                  <input
                    className="w-full py-1"
                    type="text"
                    id="search"
                    placeholder={
                      storyClipBtn == 1
                        ? placeholder.SEARCH_SONG
                        : storyClipBtn == 3
                        ? placeholder.SEARCH_OMOC_USER
                        : placeholder.SEARCH_PRODUCT
                    }
                  />
                  <Icon icon="uil:search" width="24" height="24" />
                </label>
                <div className="overflow-auto h-60">
                  {[1, 2, 3, 4, 5].map(() => (
                    <div
                      className={`${
                        storyClipBtn == 1
                          ? "flex gap-4 items-center my-4 "
                          : "hidden"
                      }`}
                    >
                      <img src={songImg} className="rounded-lg w-12 h-12" />
                      <div>
                        <p className="text-sm font-semibold">Chill Vibes</p>
                        <p className="text-xs font-normal">
                          <span>3.21</span> - <span>Tolla Kim</span>
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* ========================================= */}
                  {[1, 2, 3, 4, 5].map(() => (
                    <div
                      className={`${
                        storyClipBtn == 2 && !isProductTag
                          ? "flex gap-4 items-center my-4 px-1 editClip_category"
                          : "hidden"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={productList}
                          className="rounded-lg w-full h-1/2"
                        />
                        <div
                          onClick={() => setIsProductTag(true)}
                          className="absolute top-0 flex items-end text-white bg-[#00000059] w-full h-full rounded-xl"
                        >
                          <div className="mb-3 ml-3">
                            <p className="text-base font-medium">
                              Categories 1
                            </p>
                            <p className="text-xs text-[#E0E0E0] font-normal">
                              12 Product
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <img
                          src={productList}
                          className="rounded-lg w-full h-1/2"
                        />
                        <div
                          onClick={() => setIsProductTag(true)}
                          className="absolute top-0 flex items-end text-white bg-[#00000059] w-full h-full rounded-xl"
                        >
                          <div className="mb-3 ml-3">
                            <p className="text-base font-medium">
                              Categories 1
                            </p>
                            <p className="text-xs text-[#E0E0E0] font-normal">
                              12 Product
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* ========================================== */}
                  {isProductTag && (
                    <CategoriesListClip
                      arr={[1, 2, 3, 4, 5]}
                      setIsProductTag={setIsProductTag}
                    />
                  )}
                  {storyClipBtn == 3 && <TagPeopleList arr={[1, 2, 3, 4, 5]} />}
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <div className="px-6 h-full">
                <img
                  src={clipImg}
                  alt="clip"
                  className="rounded-xl object-cover h-full"
                />
              </div>
            </Grid>
          </Grid>
          <div className="flex items-center justify-between max-md:flex-wrap">
            {/* ====================Before add sound========================== */}
            <div
              className={`${
                storyClipBtn == 1 ? "flex items-center gap-4 w-full" : "hidden"
              }`}
            >
              <span className="rounded-full	bg-[#E0E0E0] w-10 h-10 flex justify-center items-center">
                <Icon
                  icon="iconoir:plus"
                  color="#242424"
                  width="22"
                  height="22"
                  cursor={"pointer"}
                  style={{ margin: "1px 0px 0px 1px" }}
                />
              </span>
              <span className="rounded-full	bg-[#E0E0E0] w-10 h-10 flex justify-center items-center">
                <img src={addGallery} className="p-2.5 cursor-pointer" />
              </span>
              <span className="rounded-full	bg-[#E0E0E0] w-10 h-10 flex justify-center items-center">
                <Icon
                  icon="solar:stopwatch-outline"
                  color="#242424"
                  width="22"
                  height="22"
                  cursor={"pointer"}
                />
              </span>
              <span className="rounded-full	bg-[#E0E0E0] w-10 h-10 flex justify-center items-center">
                <Icon
                  icon="iconoir:crop"
                  color="#242424"
                  width="22"
                  height="22"
                  cursor={"pointer"}
                />
              </span>
              <span className="rounded-full	bg-[#E0E0E0] w-10 h-10 flex justify-center items-center">
                <img src={check} className="p-2.5 cursor-pointer" />
              </span>
            </div>
            {/* ============================================================== */}
            <div
              className={`${
                storyClipBtn != 1 ? "flex items-center gap-4 w-full" : "hidden"
              }`}
            >
              <span className="rounded-full	bg-[#E0E0E0] w-10 h-10 flex justify-center items-center">
                <Icon
                  icon="solar:undo-left-round-bold"
                  color="#242424"
                  width="22"
                  height="22"
                  cursor={"pointer"}
                />
              </span>
              <span className="rounded-full	bg-[#E0E0E0] w-10 h-10 flex justify-center items-center">
                <Icon
                  icon="solar:undo-right-round-linear"
                  color="#242424"
                  width="22"
                  height="22"
                  cursor={"pointer"}
                />
              </span>
              <span className="rounded-full	bg-[#E0E0E0] w-10 h-10 flex justify-center items-center relative">
                <Icon
                  icon="iconoir:sound-high"
                  color="#242424"
                  width="22"
                  height="22"
                  cursor={"pointer"}
                  onClick={() => setSoundSetting(!soundSetting)}
                />
                {soundSetting && <SoundOption />}
              </span>
              <span className="rounded-full	bg-[#E0E0E0] w-10 h-10 flex justify-center items-center">
                <img src={trash} className="p-2.5 cursor-pointer" />
              </span>
            </div>
            <div className="w-full text-center max-md:mt-4">
              <p className="text-base font-medium">
                3.4<span className="text-[#AEAEAE]"> / 13.9</span>
              </p>
            </div>
            <div className="flex gap-3 items-center w-full justify-end max-md:mt-4">
              <Icon
                icon="bitcoin-icons:minus-filled"
                color="#242424"
                width="22"
                height="22"
                cursor={"pointer"}
              />
              <p className="bg-[#F5F5F5] py-2 px-4 text-sm font-medium rounded-xl">
                10%
              </p>
              <Icon
                icon="iconoir:plus"
                color="#242424"
                width="22"
                height="22"
                cursor={"pointer"}
              />
            </div>
          </div>
          <div className="p-5 my-4 border-t">
            <div className="bg-Image h-44 rounded-xl bg-contain"></div>
          </div>
          {/* ==================before tag product===================== */}
          <div
            className={`${
              storyClipBtn == 1 ? "px-5 my-4 border-b pb-5 " : "hidden"
            }`}
          >
            <button className="w-full rounded-xl bg-[#F5F5F5] py-4 text-base font-medium">
              {strings.ADD_SOUND}
            </button>
          </div>
          {/* ======================================================= */}
          <div
            className={`${
              storyClipBtn == 2 && isProductTag
                ? "px-5 my-4 border-b pb-5"
                : "hidden"
            }`}
          >
            <button className="w-full rounded-xl bg-[#F5F5F5] py-2 text-base font-medium flex items-center gap-2 px-6">
              <p className="w-2/6 text-start">{strings.PRODUCT_TAG}</p>
              <span className="flex items-center gap-3 w-full">
                <img src={shoe} className="w-14 h-14 p-2 rounded-xl bg-white" />
                <div className="text-start">
                  <p className="text-sm font-semibold">Nike Air max 97 V1</p>
                  <p className="text-xs font-medium text-[#757575]">
                    123091u23
                  </p>
                </div>
              </span>
            </button>
          </div>
          {/* ===================================== */}
          <div
            className={`${
              storyClipBtn == 3 ? "px-5 my-4 border-b pb-5" : "hidden"
            }`}
          >
            <button className="w-full rounded-xl bg-[#F5F5F5] py-2 text-base font-medium flex items-center gap-2 px-6">
              <p className="w-2/6 text-start">{strings.TAG_PEOPLE}</p>
              <span className="flex items-center gap-2 w-full">
                <img src={people} className="w-12 h-12 p-1 rounded-full" />
                <div className="text-start">
                  <p className="text-sm font-semibold">Nike Air max 97 V1</p>
                  <p className="text-xs font-medium text-[#757575]">
                    123091u23
                  </p>
                </div>
              </span>
            </button>
          </div>
          {/* =============================================== */}
        </div>
      </Modal>
    </>
  );
}

export default EditClipModal;

function SoundOption() {
  return (
    <div className="bg-white p-4 rounded-xl w-96 absolute shadow-2xl left-0 bottom-12 max-md:w-60 max-md:left-[-70px]">
      <div className="flex items-center justify-between py-2 max-md:py-0">
        <Icon
          icon="iconoir:sound-high"
          color="#242424"
          width="20"
          height="20"
        />
        <Slider
          defaultValue={60}
          aria-label="Volume"
          className="!w-9/12 max-md:!w-1/2"
        />
        <p className="text-xs font-medium w-10">{strings.MUTE}</p>
      </div>
      <div className="flex items-center justify-between py-2 max-md:py-0">
        <Icon icon="solar:soundwave-bold" width="20" height="20" />
        <Slider
          defaultValue={60}
          aria-label="Volume"
          className="!w-9/12 max-md:!w-1/2"
        />
        <p className="text-xs font-medium w-10">{strings.ON}</p>
      </div>
      <div className="flex items-center justify-between py-2 max-md:py-0">
        <span className="w-5 h-5 rounded-md bg-[#D9D9D9]"></span>
        <Slider
          defaultValue={60}
          aria-label="Volume"
          className="!w-9/12 max-md:!w-1/2"
        />
        <p className="text-xs font-medium w-10">{strings.EDIT}</p>
      </div>
    </div>
  );
}
