import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Modal from "../commonComponents/Modal";
import mobile from "../assets/images/phone.svg";
import macbook from "../assets/images/macbook.svg";
import Carousel from "../commonComponents/Carousel";
import BlueBorderButton from "../commonComponents/BlueBorderButton";

export default function HomeCarousel() {
  const [showModal, setshowModal] = useState(false);
  const imageArray = [
    "https://cdn.pixabay.com/photo/2023/04/11/13/27/bird-7917250_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/03/29/16/13/labrador-retriever-7885881_640.jpg",
    "https://cdn.pixabay.com/photo/2024/03/05/10/38/boat-8614314_640.jpg",
    "https://cdn.pixabay.com/photo/2024/01/10/16/11/solar-8499901_640.jpg",
    "https://cdn.pixabay.com/photo/2023/10/30/05/19/sunflowers-8351807_640.jpg",
    "https://cdn.pixabay.com/photo/2023/09/21/06/27/turnip-8266093_640.jpg",
  ];

  const [showButton, setshowButton] = useState(false);

  const [imageIndex, setImageIndex] = useState(0);

  const nextHandler = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
  };

  const previousHandler = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1
    );
  };

  const handleClose = () => {
    setshowModal(false);
  };
  return (
    <div>
      {" "}
      <div className="  flex justify-center items-center xl:gap-12  sm:gap-8 gap-5  ">
        <div className=" flex-1 flex justify-center items-center  relative ">
          <img
            src={imageArray[imageIndex]}
            className="object-cover object-right xl:h-[475px] sm:h-[260px] h-[130px] xl:rounded-e-3xl md:rounded-e-xl rounded-e-lg  "
            alt=""
          />
          <div
            onClick={() => previousHandler()}
            className="xl:size-[72px] bg-white rounded-full flex justify-center items-center absolute cursor-pointer"
          >
            <Icon
              icon="tabler:chevron-left"
              className="lg:text-[48px] md:text-[40px] text-3xl"
              style={{ color: "#0094FF" }}
            />
          </div>
        </div>

        <div
          onMouseEnter={() => setshowButton(true)}
          onMouseLeave={() => setshowButton(false)}
          className="flex justify-center items-center  relative "
        >
          <img
            className="xl:rounded-3xl md:rounded-xl rounded-lg h-[160px] w-[270px] sm:h-[300px] sm:w-[550px] xl:h-[515px] xl:w-[947px] object-cover object-center "
            src={imageArray[(imageIndex + 1) % imageArray.length]}
            alt=""
          />
          {showButton && (
            <div className="absolute flex flex-col gap-4 hover w-full h-full justify-center items-center rounded-3xl">
              <button className="py-3 px-6 hover:bg-[#0094FF] hover:border-none border rounded-full text-white  w-[138px] h-[44px] text-sm">
                Use Template
              </button>

              <button
                onClick={() => setshowModal(true)}
                className="py-3 px-6 border hover:bg-[#0094FF] hover:border-none rounded-full text-white  w-[138px] h-[44px] text-sm  "
              >
                Preview
              </button>
            </div>
          )}
        </div>

        <div className=" flex-1 flex justify-center items-center  relative ">
          <img
            src={imageArray[(imageIndex + 2) % imageArray.length]}
            className="object-cover object-left xl:h-[475px] sm:h-[260px] h-[130px] xl:rounded-s-3xl md:rounded-s-xl rounded-s-lg"
            alt=""
          />
          <div
            onClick={nextHandler}
            className="xl:size-[72px] bg-white rounded-full flex justify-center items-center absolute cursor-pointer"
          >
            <Icon
              icon="tabler:chevron-right"
              className="lg:text-[48px] md:text-[40px] text-3xl"
              style={{ color: "#0094FF" }}
            />
          </div>
        </div>
      </div>
      <Modal setshowModal={handleClose} showModal={showModal}>
        <Carousel>
          <div className="flex  items-center">
            <div className="xl:w-[926px] xl:h-[564px]  xl:rounded-3xl rounded-md flex flex-wrap mx-auto bg-white">
              <div className="hidden xl:flex justify-center items-center xl:w-[486px]  h-full bg-[#F2F2F2] rounded-l-3xl ">
                <img src={macbook} alt="" />
              </div>
              <div className="xl:w-[440px] h-full xl:p-8 p-3  ">
                <h6 className="text-xl font-semibold">Large Slide Banners</h6>
                <p className="list-disc text-[#616161] text-base mt-2 leading-7">
                  Large Slide BannersFor banners with a slider display and
                  various ratios to choose from. Min. 2 banners and max. 5
                  banners.
                </p>
                <div className="my-7">
                  <h6 className="text-xl font-semibold">Widget List</h6>
                  <ul className="list-disc text-[#616161] text-base ms-7 mt-3">
                    <li className="leading-7">1 Column Banners</li>
                    <li className="leading-7">Videos</li>
                    <li className="leading-7">New product</li>
                    <li className="leading-7">Best Selling Products</li>
                    <li className="leading-7">Bundling</li>
                    <li className="leading-7"> Discount Package</li>
                    <li className="leading-7">Storefront navigation</li>
                    <li className="leading-7">Large Slider Banners</li>
                  </ul>
                </div>
                
                <BlueBorderButton text="Use" className={'w-full xl:py-[15.5px]'}/>
              </div>
            </div>
          </div>
          <div className="flex  items-center">
            <div className="xl:w-[926px] xl:h-[564px]  xl:rounded-3xl rounded-md flex flex-wrap mx-auto bg-white">
              <div className="hidden xl:flex justify-center items-center xl:w-[486px]  h-full bg-[#F2F2F2] rounded-l-3xl ">
                <img src={mobile} alt="" />
              </div>
              <div className="xl:w-[440px] h-full xl:p-8 p-3  ">
                <h6 className="text-xl font-semibold">Large Slide Banners</h6>
                <p className="list-disc text-[#616161] text-base mt-2 leading-7">
                  Large Slide BannersFor banners with a slider display and
                  various ratios to choose from. Min. 2 banners and max. 5
                  banners.
                </p>
                <div className="my-7">
                  <h6 className="text-xl font-semibold">Widget List</h6>
                  <ul className="list-disc text-[#616161] text-base ms-7 mt-3">
                    <li className="leading-7">1 Column Banners</li>
                    <li className="leading-7">Videos</li>
                    <li className="leading-7">New product</li>
                    <li className="leading-7">Best Selling Products</li>
                    <li className="leading-7">Bundling</li>
                    <li className="leading-7"> Discount Package</li>
                    <li className="leading-7">Storefront navigation</li>
                    <li className="leading-7">Large Slider Banners</li>
                  </ul>
                </div>
                
                <BlueBorderButton text="Use" className={'w-full xl:py-[15.5px]'}/>
              </div>
            </div>
          </div>
          {/* <div className="flex  items-center ">
            <div className="w-[926px] h-[564px]  rounded-3xl flex mx-auto bg-white">
              <div className="flex justify-center items-center w-[486px]  h-full bg-[#F2F2F2] rounded-l-3xl ">
                <img src={macbook} alt="" />
              </div>
              <div className="w-[440px] h-full p-8">
                <h6 className="text-xl font-semibold">Large Slide Banners</h6>
                <p className="list-disc text-[#616161] text-base mt-2 leading-7">
                  Large Slide BannersFor banners with a slider display and
                  various ratios to choose from. Min. 2 banners and max. 5
                  banners.
                </p>
                <div className="my-7">
                  <h6 className="text-xl font-semibold">Widget List</h6>
                  <ul className="list-disc text-[#616161] text-base ms-7 mt-3">
                    <li className="leading-7">1 Column Banners</li>
                    <li className="leading-7">Videos</li>
                    <li className="leading-7">New product</li>
                    <li className="leading-7">Best Selling Products</li>
                    <li className="leading-7">Bundling</li>
                    <li className="leading-7"> Discount Package</li>
                    <li className="leading-7">Storefront navigation</li>
                    <li className="leading-7">Large Slider Banners</li>
                  </ul>
                </div>
                <button className="w-full bg-[#0094FF] rounded-full px-8 py-[15.5px]">
                  Use
                </button>
              </div>
            </div>
          </div> */}
        </Carousel>
      </Modal>
    </div>
  );
}
