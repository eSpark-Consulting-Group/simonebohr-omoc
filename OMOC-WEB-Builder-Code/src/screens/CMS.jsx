import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import SimpleDropdown from "../commonComponents/SimpleDropdown";
import CmsHeader from "../components/CmsHeader";
import a from "../assets/icons/shop/a.svg";
import link from "../assets/icons/shop/link.svg";
import triangle from "../assets/icons/shop/triangle.svg";
import gallary from "../assets/icons/shop/gallery.svg";
import BlueBorderButton from "../commonComponents/BlueBorderButton";
import upload from "../assets/icons/cmsheader/document-upload.svg";

export default function CMS() {
  const [changeMenu, setchangeMenu] = useState("Collection 1");
  const [showBlogWritingBox, setshowBlogWritingBox] = useState(false);
  const collection = [
    "Collection 1",
    "Collection 2",
    "Collection 3",
    "Collection 4",
  ];
  return (
    <div>
      <CmsHeader />
      <div className="flex">
        <div className="w-[247px] bg-white p-4 xl:flex flex-col gap-6 h-screen hidden ">
          <div className="h-[36px] rounded flex items-center p-[10px] gap-[10px] border">
            <Icon
              icon="akar-icons:search"
              width="13px"
              height="13px"
              style={{ color: "#757575" }}
            />
            <span className="font-medium text-xs text-[#757575]">Search</span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-sm">Collection</h1>
            {collection.map((item, index) => (
              <div
                onClick={() => {
                  setchangeMenu(`${item}`);
                  setshowBlogWritingBox(!showBlogWritingBox);
                }}
                key={index.toString()}
                className={`flex items-center p-[10px] gap-[10px] justify-between border rounded ${
                  changeMenu === `${item}`
                    ? "bg-blue text-white"
                    : "text-[#757575]"
                }`}
              >
                <span className="font-medium text-xs ">{item}</span>
                <Icon
                  icon="ep:arrow-right-bold"
                  width="13px"
                  height="13px"
                  style={{ color: changeMenu === item ? "white" : " #757575" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="p-4   w-full flex flex-col gap-[11px] border bg-green-500">
            <div className="xl: w-full bg-white flex items-center p-[10px] gap-2 rounded">
              <Icon
                icon="akar-icons:search"
                width="16px"
                height="16px"
                style={{ color: "#757575" }}
              />
              <input
                type="text"
                placeholder="Search name"
                className="placeholder:text-[12px] placeholder:text-textcolor outline-none"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="md:table-auto w-[800px]  table-fixed ">
                <thead>
                  <tr>
                    <th className="">
                      <SimpleDropdown selectstyle="xl:w-[302px] w-[100px] bg-white " />
                    </th>
                    <th>
                      <SimpleDropdown selectstyle="xl:w-[302px] w-[100px] bg-white" />
                    </th>
                    <th>
                      <SimpleDropdown selectstyle="xl:w-[219px] w-[100px] bg-white" />

                    </th>
                    <th>
                      <SimpleDropdown selectstyle="xl:w-[219px] w-[100px] bg-white" />
                    </th>
                    <th className="size-[36px] bg-white ctr rounded">
                      <Icon
                        icon="bi:three-dots"
                        width="16px"
                        height="16px"
                        style={{ color: "#101010" }}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="space-x-4">
                    <td className="font-medium text-xs text-textcolor xl:w-[302px]  xl:p-[10px] my-4 h-[34px] ">
                      dscbs
                    </td>
                    <td className="font-medium text-xs text-textcolor xl:w-[302px]  xl:p-[10px] my-4  ">
                     <span className="line-clamp-1"> wgfuewi fu ebherv f wrfh wehfic wiefhicw</span> 
                    </td>

                    <td className="font-medium text-xs text-textcolor xl:w-[302px]  xl:p-[10px] my-4 h-[34px] line-clamp-1">
                      29/09/1996
                    </td>
                    <td className="font-medium text-xs text-textcolor xl:w-[302px]  xl:p-[10px] my-4 h-[34px] ">
                      <img
                        className="xl:w-[196px] h-[36px] rounded object-cover "
                        src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                        alt=""
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {showBlogWritingBox && (
            <div className="absolute bg-white xl:w-[897px] h-[928px] top-0 right-0 p-6">
              <h1 className="font-semibold text-lg">Blog Items</h1>
              <div className="flex flex-wrap mt-5">
                <div className="flex-1">
                  <div className="flex flex-col gap-2  text-xs">
                    <label htmlFor="" className="font-semibold">
                      Title
                    </label>
                    <input
                      className="h-[34px] border rounded p-[10px] placeholder:text-xs"
                      placeholder="name"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex-1 ms-3">
                  <div className="flex flex-col gap-2  text-xs">
                    <label htmlFor="" className="font-semibold">
                      Slug
                    </label>
                    <input
                      className="h-[34px] border rounded p-[10px] placeholder:text-xs"
                      placeholder="Search name"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-5">
                <div className="flex-1">
                  <div className="flex flex-col gap-2  text-xs">
                    <label htmlFor="" className="font-semibold">
                      Date
                    </label>
                    <input
                      className="h-[34px] border rounded p-[10px] placeholder:text-xs"
                      placeholder="name"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex-1 ms-3">
                  <div className="flex flex-col gap-2  text-xs">
                    <label htmlFor="" className="font-semibold">
                      Author
                    </label>
                    <input
                      className="h-[34px] border rounded p-[10px] placeholder:text-xs"
                      placeholder="James Hadden"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-5">
                <div className="flex-1">
                  <div className="flex flex-col gap-2  text-xs">
                    <label htmlFor="" className="font-semibold">
                      Image
                    </label>
                    <div className="h-[34px] border rounded p-[10px] flex justify-between items-center">
                      <input type="text" placeholder="Upload Image" />
                      <img src={upload} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex mt-5">
                <div className="flex-1">
                  <div className="flex flex-col gap-2  text-xs">
                    <label htmlFor="" className="font-semibold">
                      Content
                    </label>
                    <div className="w-full h-[56px] flex  items-center justify-between rounded border py-3 px-4">
                      <div className="flex items-center gap-5">
                        <div>Times New Roman</div>
                        <div>Text</div>
                        <div>
                          <Icon
                            icon="mynaui:type-bold"
                            width="20px"
                            height="20px"
                          />
                        </div>
                        <div>
                          <Icon
                            icon="flowbite:letter-italic-outline"
                            width="20px"
                            height="20px"
                          />
                        </div>
                        <div>
                          <Icon
                            icon="tabler:underline"
                            width="20px"
                            height="20px"
                          />
                        </div>
                        <div>
                          <Icon
                            icon="mingcute:align-left-line"
                            width="20px"
                            height="20px"
                          />
                        </div>
                        <div>
                          <Icon
                            icon="mingcute:align-right-line"
                            width="20px"
                            height="20px"
                          />
                        </div>
                        <div>
                          <Icon
                            icon="mingcute:align-center-line"
                            width="20"
                            height="20"
                          />
                        </div>
                        <div>
                          <Icon
                            icon="mingcute:align-justify-line"
                            width="20px"
                            height="20px"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="size-6 rounded-full ctr">
                          <img src={a} alt="" />
                        </div>
                        <div className="size-6 rounded-full ctr">
                          <img src={link} alt="" />
                        </div>
                        <div className="size-6 rounded-full ctr">
                          <img src={triangle} alt="" />
                        </div>
                        <div className="size-6 rounded-full ctr">
                          <img src={gallary} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" mt-2">
                <textarea
                  className="w-full h-[369px] border rounded"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-[33.5px] h-[18px] bg-[#d1d1d1] rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-[1px] after:start-[1px]  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[15.5px] after:w-[15.5px] after:transition-all dark:border-gray-600 peer-checked:bg-blue"></div>
                  </label>{" "}
                  <span className="font-semibold text-xs">Visibility</span>
                </div>
                <div className="flex items-center gap-3">
                  <BlueBorderButton text="Cancel" />
                  <BlueBorderButton text="Save" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
}
