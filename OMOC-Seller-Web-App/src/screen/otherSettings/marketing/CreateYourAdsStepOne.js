import React, { useEffect, useState } from "react";
import Header from "../../../component/Header";
import { Container } from "@mui/material";
import { placeholder, strings } from "../../../utils/strings";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";
import productImages from "../../../assets/image/productImg/product 4.png";

function CreateYourAdsStepOne() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [imageFile, setImageFile] = useState(
    state ? state?.files && state?.files[0] : ""
  );
  const [productImage, setProductImage] = useState(
    state ? state?.files && state?.files[0] : ""
  );
  const [addName, setAddName] = useState(state?.name || "");
  const [postType, setPostType] = useState(state?.postType || "");

  console.log("state", state);

  const onFileHandle = async (e) => {
    let fileReader,
      isCancel = false;
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // if (file.size <= 49009500) {
      setImageFile(file);
      if (e.target.files && e.target.files.length > 0) {
        fileReader = new FileReader();
        fileReader.onload = async (e) => {
          const { result } = e.target;
          if (result && !isCancel) {
            await setProductImage([result]);
          }
        };
        fileReader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <div className={`bg-[#F2F2F2] h-full pb-1`}>
        <div className=" w-full bg-[#fff] fixed top-0 z-20">
          <Header />
        </div>
        <Container className="pt-28">
          <div>
            <h3 className="text-3xl font-bold mb-10 mt-6">
              {strings.CREATE_YOUR_ADS_NOW_1}
            </h3>
            <div className="rounded-xl bg-white w-full h-full mb-4 py-16 px-20 max-sm:py-8 max-sm:px-8">
              <div className="w-4/6 max-sm:w-full">
                <div>
                  <p className="text-2xl font-semibold">{strings.ADS_NAME}</p>
                  <p className="text-sm text-[#404040] font-medium">
                    {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
                  </p>
                  <input
                    type="text"
                    value={addName}
                    onChange={(e) => {
                      setAddName(e.target.value);
                    }}
                    className="w-full p-4 border rounded-xl my-8"
                    placeholder={placeholder.EXAMPLE_STORE_PROMOTION}
                  />
                </div>
                <div>
                  <p className="text-2xl font-semibold">
                    {strings.SELECT_POST_TYPE}
                  </p>
                  <p className="text-sm text-[#404040] font-medium">
                    {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
                  </p>
                  <div className="flex items-center gap-3 mt-7">
                    <input
                      type="radio"
                      className="w-6 h-6"
                      checked={postType && postType == "post" ? true : false}
                      name="post"
                      value="post"
                      onChange={(e) => {
                        setPostType(e.target.value);
                      }}
                    />
                    <p className="text-base font-medium">{strings.POST_FEED}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-4 mb-4">
                    <input
                      type="radio"
                      className="w-6 h-6"
                      checked={postType && postType == "story" ? true : false}
                      name="post"
                      value="story"
                      onChange={(e) => {
                        setPostType(e.target.value);
                      }}
                    />
                    <p className="text-base font-medium">
                      {strings.POST_STORY}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-4 mb-7">
                    <input
                      type="radio"
                      className="w-6 h-6"
                      checked={
                        postType && postType == "home_feed" ? true : false
                      }
                      name="post"
                      value="home_feed"
                      onChange={(e) => {
                        setPostType(e.target.value);
                      }}
                    />
                    <p className="text-base font-medium">
                      {strings.HOMEFEED_POINTED_OUT}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      {strings.UPDATE_YOUR_ADS_IMAGE}
                    </p>
                    <p className="text-sm text-[#404040] font-medium">
                      {strings.OPPS_YOUR_SHOP_SCORE_IS_LOW}
                    </p>
                  </div>
                  {/* {/ ------------------upload image---------------------- /} */}
                  <div
                    className={`${
                      productImage
                        ? "mt-8 items-center gap-6 hidden"
                        : "mt-8 flex items-center gap-6 "
                    }`}
                  >
                    <label
                      htmlFor="upload-product"
                      className="border-dotted border-2 rounded-xl border-[#9E9E9E] flex justify-center items-center w-16 h-16"
                    >
                      <input
                        type="file"
                        id="upload-product"
                        className="hidden"
                        onChange={(e) => {
                          onFileHandle(e);
                        }}
                      />
                      <Icon
                        icon="uil:plus"
                        color="#616161"
                        width="24"
                        height="24"
                      />
                    </label>
                    <p className="text-xs font-normal text-[#C80000] w-52">
                      Upload your ad image here. We recommend an image size of
                      1200 x 628 pixels for the best results."
                    </p>
                  </div>
                  {/* {/ ------------------------------------------- /} */}
                  <div
                    className={`${
                      productImage
                        ? "flex justify-start items-center mt-8"
                        : "justify-start items-center mt-8 hidden"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#F5F5F5]">
                      <div className="flex items-center gap-3">
                        <img
                          src={productImage}
                          alt="product"
                          className="rounded-xl bg-white p-0 w-16 h-16"
                        />
                        <p className="text-xs font-normal w-44 flex justify-between items-center mr-4">
                          {imageFile?.name}
                        </p>
                      </div>
                      <Icon
                        icon="mingcute:close-line"
                        width="20"
                        height="20"
                        style={{ color: "#404040", cursor: "pointer" }}
                        onClick={() => {
                          setImageFile("");
                          setProductImage("");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="">
                <div className="rounded-xl border flex justify-between max-md:flex-wrap">
                  <div className="py-4 px-5 !pb-0 w-full">
                    <div className="flex">
                      <div className="w-1/2 border-b-2  pb-4 text-[#0094FF] border-[#0094FF]">
                        <p className="text-center text-lg	font-semibold">
                          {strings.NOT_YET_ADVERTISED}
                        </p>
                      </div>
                      <div className="w-1/2 border-b-2  pb-4">
                        <p className="text-center text-lg	font-semibold">
                          {strings.ALREADY_ADVERTISED}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-5">
                      <label
                        htmlFor="search"
                        className="flex py-2 px-5 justify-between items-center w-full rounded-3xl border"
                      >
                        <input
                          className="w-full py-1"
                          type="text"
                          id="search"
                          placeholder={placeholder.SEARCH_PRODUCT}
                        />
                        <Icon icon="uil:search" width="24" height="24" />
                      </label>
                      <select className="py-3 px-4 rounded-3xl border">
                        <option>{"Sort (newest)"}</option>
                      </select>
                    </div>
                    <div className="h-52 overflow-auto mt-2 pr-1">
                      {[1, 2, 3, 4, 5].map(() => (
                        <div className="flex justify-between items-center my-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={productImages}
                              alt="product"
                              className="rounded-xl bg-[#F5F5F5] w-16 h-16"
                            />
                            <div>
                              <p className="text-base font-semibold">
                                Hoodie Havana V1
                              </p>
                              <p className="text-[#7A7A7A] text-sm font-normal">
                                1239u1023
                              </p>
                            </div>
                          </div>
                          <button className="rounded-3xl py-3 px-8 border border-[#0094FF] text-[#0094FF] text-sm font-medium">
                            {strings.CHOOSE}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="py-4 px-5 w-4/5 max-md:w-full bg-[#F5F5F5]">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold">
                        {strings.PRODUCT_SELECTED}
                      </p>
                      <p className="text-[#C80000] text-lg font-medium">
                        {strings.DELETE_ALL}
                      </p>
                    </div>

                    <div
                      className={`${"flex justify-between items-center mt-8 rounded-xl bg-white py-3 px-3"}`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={productImages}
                          alt="product"
                          className="rounded-xl bg-[#F5F5F5] w-16 h-16"
                        />
                        <div>
                          <p className="text-base font-semibold">
                            Hoodie Havana V1
                          </p>
                          <p className="text-[#7A7A7A] text-sm font-normal">
                            1239u1023
                          </p>
                        </div>
                      </div>
                      <Icon icon="ep:close" width="25" height="25" />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="flex gap-4 justify-end items-center mb-10">
              <button className="rounded-3xl py-3 px-8 border-2 border-[#0094FF] text-[#0094FF] text-base font-semibold">
                {strings.CANCEL}
              </button>
              <button
                disabled={addName && postType ? false : true}
                onClick={() =>
                  navigate("/Other-settings/Marketing/Create-your-ads-step-2", {
                    state: {
                      name: addName,
                      postType: postType,
                      files: imageFile ? [imageFile] : [],
                      type: state.type,
                    },
                  })
                }
                className="rounded-3xl py-3 px-8 bg-[#0094FF] text-base font-semibold text-white disabled:bg-[#0094ff9c]"
              >
                {strings.CONTINUE}
              </button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default CreateYourAdsStepOne;
