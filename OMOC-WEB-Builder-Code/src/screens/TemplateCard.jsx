import Header from "../components/Header";
import mobile from "../assets/images/mobile.png";
import { useState } from "react";
import magicpen from "../assets/icons/magicpen.svg";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Carousel from "../commonComponents/Carousel";
import Modal from "../commonComponents/Modal";
import macbook from "../assets/images/macbook.svg";
import BlueBorderButton from "../commonComponents/BlueBorderButton";


export default function TemplateCard() {
  const [showModal, setshowModal] = useState(false);
  const navigate = useNavigate();
 

  const handleClose = () => {
    setshowModal(false);
  };
  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-[257px] h-screen pt-[44px] pe-[40px] ps-[143px] gap-4 bg-white hidden xl:block">
          <div>
            <Icon
              icon="solar:home-2-outline"
              width="20px"
              height="20px"
              style={{ color: "#969696" }}
            />
          </div>
          <div className="mt-4">
            <Icon
              icon="solar:cart-large-minimalistic-outline"
              width="20px"
              height="20px"
              style={{ color: "#969696" }}
            />
          </div>
          <div className="mt-4">
            <Icon
              icon="solar:shop-linear"
              width="20px"
              height="20px"
              style={{ color: "#969696" }}
            />
          </div>
          <div className="mt-4">
            <Icon
              icon="iconamoon:profile-light"
              width="20px"
              height="20px"
              style={{ color: "#969696" }}
            />
          </div>
          <div className="mt-4">
            <Icon
              icon="ep:setting"
              width="20px"
              height="20px"
              style={{ color: "#969696" }}
            />
          </div>
          <div className="mt-4">
            <img src={magicpen} alt="" />
          </div>
          <div className="text-xs text-textcolor cursor-pointer">
            <div onClick={() => navigate("/shopdecoration")}>Shop </div>
            <div onClick={() => navigate("/FormsResponse")}>Form Res</div>
            <div onClick={() => navigate("/TemplateCard")}>shop Them</div>
            <div onClick={() => navigate("/PagesShopDecor")}>Pages</div>

            <div>Blogs</div>
            <div>Navigation</div>
            <div>Site Prefernces</div>
          </div>
        </div>

        <div  className="flex-1">
          <div className=" grid xl:grid-cols-3 sm:grid-cols-2 gap-3  xl:mx-[42px] mx-4">
            <div
              onClick={()=>setshowModal(true)}
              className="w-full h-[404px] mt-8 border rounded-xl border-[#EDEDED] mx-auto "
            >
              <img
                style={{ width: "100%", height: "282px" }}
                className="img-fluid object-cover border rounded-t-xl"
                src="https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_640.jpg"
                alt=""
              />
              <div className="flex flex-col justify-between py-2   px-2 ">
                <h6 className="text-base font-semibold">Electronic Template</h6>
                <p className="w-[250px] h-[60px] font-normal text-sm text-[#7A7A7A]">
                  Lorem ipsum dolor sit amet consectetur. Eget suspendisse
                  faucibus vivamus enim a nunc sagittis.
                </p>
              </div>
            </div>
            <div
              // onClick={openModal}
              className="w-full h-[404px] mt-8 border rounded-xl border-[#EDEDED] mx-auto "
            >
              <img
                style={{ width: "100%", height: "282px" }}
                className="img-fluid object-cover border rounded-t-xl"
                src="https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_640.jpg"
                alt=""
              />
              <div className="flex flex-col justify-between py-2   px-2 ">
                <h6 className="text-base font-semibold">Electronic Template</h6>
                <p className="w-[250px] h-[60px] font-normal text-sm text-[#7A7A7A]">
                  Lorem ipsum dolor sit amet consectetur. Eget suspendisse
                  faucibus vivamus enim a nunc sagittis.
                </p>
              </div>
            </div>
            <div
              // onClick={openModal}
              className="w-full h-[404px] mt-8 border rounded-xl border-[#EDEDED] mx-auto "
            >
              <img
                style={{ width: "100%", height: "282px" }}
                className="img-fluid object-cover border rounded-t-xl"
                src="https://cdn.pixabay.com/photo/2024/02/22/09/04/warehouse-8589487_640.jpg"
                alt=""
              />
              <div className="flex flex-col justify-between py-2   px-2 ">
                <h6 className="text-base font-semibold">Electronic Template</h6>
                <p className="w-[250px] h-[60px] font-normal text-sm text-[#7A7A7A]">
                  Lorem ipsum dolor sit amet consectetur. Eget suspendisse
                  faucibus vivamus enim a nunc sagittis.
                </p>
              </div>
            </div>
           
           
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
        </Carousel>
      </Modal>
    </>
  );
}
