import React from "react";
import Header from "../components/Header";
import { Icon } from "@iconify/react";
import Pagination from "../commonComponents/Pagination";
import { useNavigate } from "react-router-dom";
import magicpen from "../assets/icons/magicpen.svg";
import RoundedDropdown from "../commonComponents/RoundedDropdown";

export default function PagesShopDecor() {
  const navigate = useNavigate();

  const site =["All Site", "OMOC seller v1", "OMOC seller v1"];
  const Visibility =["All", "Visible", "Hidden"];
  return (
    <div>
      <Header />
      <div className="flex ">
      <div className="w-[257px] h-screen pt-[44px] pe-[40px] ps-[143px] gap-4 bg-white xl:block hidden">
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
        <div className="w-full   xl:p-8 p-4 xl:pe-[60px]">
          <div className="">
            <h1 className="text-[32px] font-bold">Pages</h1>
            <p className="text-[14px] text-[#7A7A7A]">
              Attract your clients with beautiful shop decorations
            </p>
          </div>

          <div className="w-full bg-white rounded-2xl p-6 my-6 me-[60px] max-h-[711px] min-h-0">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="xl:w-[401px] w-full h-[48px] flex items-center border rounded-xl px-4 py-3 ">
                <Icon icon="iconoir:search" width="24px" height="24px" />
                <input
                  className="xl:w-[304px] w-full h-[20px] outline-none ps-4 text-[16px]"
                  type="text"
                  placeholder="Search everything about the seller dashboard..."
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <RoundedDropdown options={site} title="Site"/>
                <RoundedDropdown options={Visibility} title="Visibility"/>
               
              </div>
            </div>
            <div className="my-4 ">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left ">
                  <thead className="text-[14px] text-gray-700  bg-[#F8FAFB] h-[56px]">
                    <tr className="text-center">
                      <th scope="col" className="px-6 py-3 rounded-s-lg">
                        Page
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                        Site
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 rounded-e-lg">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr className="bg-white  border-b ">
                      <th className=" py-6">
                        <h1 className="text-xl font-medium">Homepage</h1>
                        <p className="text-sm text-[#9E9E9E]">
                          Friday at 10.00 pm
                        </p>
                      </th>
                      <td scope="row" className=" text-xl font-medium">
                        OMOC Seller v1
                      </td>
                      <td className="">
                        <button
                          disabled
                          className="text-[#0094FF] bg-[#0094ff54] py-2 px-3 rounded-full"
                        >
                          Published
                        </button>
                      </td>
                      <td className=" ">
                        <Icon
                          className="mx-auto"
                          icon="ci:more-horizontal"
                          width="24px"
                          height="24px"
                        />{" "}
                      </td>
                    </tr>
                    <tr className="bg-white  border-b">
                      <th className=" py-6">
                        <h1 className="text-xl font-medium">Contact us</h1>
                        <p className="text-sm text-[#9E9E9E]">
                          Friday at 10.00 pm
                        </p>
                      </th>
                      <td scope="row" className=" text-xl font-medium">
                        OMOC Seller v1
                      </td>
                      <td className="">
                        <button
                          disabled
                          className="text-textcolor bg-[#F5F5F5] py-2 px-3 rounded-full"
                        >
                          Hidden
                        </button>
                      </td>
                      <td className=" ">
                        <Icon
                          className="mx-auto"
                          icon="ci:more-horizontal"
                          width="24px"
                          height="24px"
                        />{" "}
                      </td>
                    </tr>
                    <tr className="bg-white  border-b">
                      <th className=" py-6">
                        <h1 className="text-xl font-medium">Contact us</h1>
                        <p className="text-sm text-[#9E9E9E]">
                          Friday at 10.00 pm
                        </p>
                      </th>
                      <td scope="row" className=" text-xl font-medium">
                        OMOC Seller v1
                      </td>
                      <td className="">
                        <button
                          disabled
                          className="text-textcolor bg-[#F5F5F5] py-2 px-3 rounded-full"
                        >
                          Hidden
                        </button>
                      </td>
                      <td className=" ">
                        <Icon
                          className="mx-auto"
                          icon="ci:more-horizontal"
                          width="24px"
                          height="24px"
                        />{" "}
                      </td>
                    </tr>
                    <tr className="bg-white  border-b">
                      <th className=" py-6">
                        <h1 className="text-xl font-medium">Contact us</h1>
                        <p className="text-sm text-[#9E9E9E]">
                          Friday at 10.00 pm
                        </p>
                      </th>
                      <td scope="row" className=" text-xl font-medium">
                        OMOC Seller v1
                      </td>
                      <td className="">
                        <button
                          disabled
                          className="text-textcolor bg-[#F5F5F5] py-2 px-3 rounded-full"
                        >
                          Hidden
                        </button>
                      </td>
                      <td className=" ">
                        <Icon
                          className="mx-auto"
                          icon="ci:more-horizontal"
                          width="24px"
                          height="24px"
                        />{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className=" flex justify-end">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
