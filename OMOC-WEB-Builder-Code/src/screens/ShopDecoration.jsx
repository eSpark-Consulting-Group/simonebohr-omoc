import React from "react";
import Header from "../components/Header";
import { Icon } from "@iconify/react";
import magicpen from "../assets/icons/magicpen.svg";
import { useNavigate } from "react-router-dom";
import BlueBorderButton from "../commonComponents/BlueBorderButton"
import SellerUk from "../assets/images/SellerUK.png";
import copy from "../assets/icons/copy.svg";
import play from "../assets/icons/play.svg";
import edit from "../assets/icons/edit.svg";
import RoundedDropdown from "../commonComponents/RoundedDropdown";
import importt from "../assets/icons/otherPages/import.svg";

function ShopDecoration() {
  const navigate = useNavigate();
  return (
    <div>
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
        <div className="xl:p-8 p-3 flex-1">
          <div className=" ">
            <p className="xl:text-[32px] text-[25px] font-bold m-0">Your Shop</p>
            <span className="text-[14px] text-[#7A7A7A]">
              Attract your clients with beautiful shop decorations
            </span>
          </div>
          <div className="flex items-center flex-wrap my-8 rounded-2xl">
            <div className="xl:w-[530px] w-full xl:h-[253px] py-8 px-6 bg-white rounded-2xl flex flex-col items-center ">
              <div className="flex justify-between items-center">
                <h4 className="xl:text-2xl text-xl m-0">Start With a Simple Layout</h4>
                <Icon
                  className="mx-2"
                  icon="heroicons:exclamation-circle"
                  width="24px"
                  height="24px"
                />
              </div>
              <h6 className="text-base text-[#616161] xl:w-[397px] text-center mt-3 mb-8">
                Use simple playout with the basic tools provided. perfect for
                beginners!
              </h6>
              <div className="w-full" onClick={() => navigate("/WebView")}>
                <BlueBorderButton
                  text="Create New Site"
                  className="w-full h-[53px]"
                />
              </div>
            </div>
            <div className="xl:w-[530px] w-full xl:h-[253px] py-8 px-6 bg-white rounded-2xl flex flex-col items-center my-4 xl:my-0 xl:mx-4">
              <div className="flex justify-between items-center">
                <h4 className="xl:text-2xl text-xl m-0 text-center">Choose The Template You Like</h4>
                <Icon
                  className="mx-2"
                  icon="heroicons:exclamation-circle"
                  width="24px"
                  height="24px"
                />
              </div>
              <h6 className="text-base text-[#616161] xl:w-[397px] text-center mt-3 mb-8">
                Use simple playout with the basic tools provided. perfect for
                beginners!
              </h6>

              <div className="w-full" onClick={() => navigate("/Home")}>
                <BlueBorderButton
                  text="Choose Template"
                  className="w-full h-[53px]"
                />
              </div>
            </div>
          </div>
          <div className="xl:w-[1084px] bg-white rounded-2xl p-6">
            <div className="flex flex-wrap justify-between items-center">
              <div className="xl:w-[401px] xl:h-[48px] w-full flex items-center border rounded-xl xl:px-4 py-3 ">
                <Icon icon="iconoir:search" width="24px" height="24px" />
                <input
                  className="xl:w-[304px] xl:h-[20px] outline-none ps-4 text-[16px]"
                  type="text"
                  placeholder="Search everything about the seller dashboard..."
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
            
              
                <RoundedDropdown title="Created (newest)" selectstyle="w-full mt-3 xl:mt-0" />
                <RoundedDropdown selectstyle={'w-full'} title="Filters" />
                <div>
                  <div className="py-3 px-4 h-[53px] rounded-full border flex justify-evenly items-center gap-[10px]">
                    <div className="text-textcolor"> Import</div>
                   
                    <img src={importt} alt="sdcs" />
              
                  </div>
                </div>
              </div>
            </div>     
            <div className="my-4  w-full">
              <div className="relative overflow-x-auto">
                <table className="w-full table-auto  text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-3 rounded-s-lg">
                        Site
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 rounded-e-lg">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <th scope="row" className="px-6 py-4 ">
                        <div className=" flex items-center">
                          <img className="xl:w-[150px] xl:h-[100px]" src={SellerUk} alt="" />
                          <div className="mx-4">
                            <p className="text-[20px] font-medium">
                              Omoc Seller UK
                            </p>
                            <div className="flex w-[132px] h-[24px]  justify-between items-center ">
                              {" "}
                              <img src={edit} alt="" />
                              <img src={copy} alt="" />
                              <img src={play} alt="" />
                            </div>
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <button
                          disabled
                          className="text-[#0094FF] bg-[#0094ff54] py-2 px-3 rounded-full"
                        >
                          Published
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <Icon
                          icon="ci:more-horizontal"
                          width="24px"
                          height="24px"
                        />{" "}
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <th scope="row" className="px-6 py-4 ">
                        Microsoft Surface Pro
                      </th>
                      <td className="px-6 py-4">
                        <button
                          disabled
                          className="text-[#FACC15] bg-[#FACC151F] py-2 px-3 rounded-full"
                        >
                          Draft
                        </button>
                      </td>
                      <td className="px-6 py-4">$1999</td>
                    </tr>
                    <tr className="bg-white ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  "
                      >
                        Magic Mouse 2
                      </th>
                      <td className="px-6 py-4">1</td>
                      <td className="px-6 py-4">$99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default ShopDecoration;
