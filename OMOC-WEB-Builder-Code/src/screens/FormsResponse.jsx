import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Header from "../components/Header";
import Pagination from "../commonComponents/Pagination";
import a from "../assets/icons/shop/a.svg";
import link from "../assets/icons/shop/link.svg";
import triangle from "../assets/icons/shop/triangle.svg";
import gallary from "../assets/icons/shop/gallery.svg";
import { useNavigate } from "react-router-dom";
import magicpen from "../assets/icons/magicpen.svg";
import RoundedDropdown from "../commonComponents/RoundedDropdown";
import SimpleDropdown from "../commonComponents/SimpleDropdown";
import Modal from "../commonComponents/Modal";
import BlueBorderButton from "../commonComponents/BlueBorderButton";

export default function FormsResponse() {
  const [showModal, setshowModal] = useState(false);
  const [form, setform] = useState("Inbox");
  const navigate = useNavigate();

  const InboxResponse = ["Inbox", "Response"];
  return (
    <div>
      <div>
        <Header />
        <div className="flex ">
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
          <div className="w-full xl:p-8 p-3 xl:pe-[60px]">
            <div className="flex justify-between xl:items-center items-end">
              <div>
                <h1 className="text-[32px] font-bold">Forms Response</h1>
                <p className="text-[14px] text-[#7A7A7A]">
                  Attract your clients with beautiful shop decorations
                </p>
              </div>
              <SimpleDropdown
                options={InboxResponse}
                optionMainConatiner={""}
                selectText="text-[16px] text-[#121212]"
                title="Inbox"
                selectstyle="bg-white w-[150px] h-[53px] rounded-[16px] py-[12px] px-[24px] border-none "
              />
            </div>
            {form === "Inbox" ? (
              <>
                <div className="w-full bg-white rounded-2xl xl:p-6 my-6 xl:me-[60px] xl:max-h-[711px] min-h-auto p-2 ">
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
                      <RoundedDropdown title="OMOC Seller v1" />
                      <RoundedDropdown title="Visibility" />

                      <div>
                        <div className="w-[106px] h-[53px] rounded-full border flex justify-evenly items-center py-3 px-4 gap-10">
                          <div className=" text-[#7A7A7A] "> Export</div>
                        </div> 
                      </div>
                    </div>
                  </div>
                  <div className="my-4 ">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left ">
                        <thead className="text-[14px] text-gray-700  bg-[#F8FAFB] h-[56px]   ">
                          <tr className="   ">
                            <th scope="col" className="px-4 py-3 rounded-s-lg">
                              <input type="checkbox" className="size-6" />
                            </th>
                            <th scope="col" className=" ">
                              ID
                            </th>
                            <th scope="col" className=" ">
                              Form
                            </th>
                            <th scope="col" className="">
                              Source
                            </th>
                            <th scope="col" className=" ">
                              Date
                            </th>
                            <th scope="col" className="rounded-e-lg ">
                              Data Input
                            </th>
                          </tr>
                        </thead>
                        <tbody className="">
                          <tr
                            onClick={() => setshowModal(true)}
                            className="bg-white  border-b"
                          >
                            <th className="px-4 ">
                              <input type="checkbox" className="size-6" />
                            </th>
                            <td scope="row" className="py-6 text-sm  ">
                              #IN112
                            </td>
                            <td scope="row" className=" text-sm ">
                              Jacob
                            </td>
                            <td scope="row" className=" text-sm ">
                              OMOC Seller v1/Homepage
                            </td>
                            <td className="text-[#9E9E9E] text-sm">28/04/24</td>
                            <td className="py-6 ">
                              <div className="flex items-center gap-[14px]">
                                <div className="flex flex-col gap-4 text-sm text-[#9E9E9E]">
                                  <div>
                                    <span>Name</span>
                                  </div>
                                  <div>
                                    <span>Email</span>
                                  </div>
                                  <div>
                                    <span>Please Rate our product?</span>
                                  </div>
                                  <div>
                                    <span>How could we Improve? </span>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-4 text-sm">
                                  <div>
                                    <span>Jacob Adams</span>
                                  </div>
                                  <div>
                                    <span>sample@mail.com</span>
                                  </div>
                                  <div>
                                    <span>3 - GOOD</span>
                                  </div>
                                  <div>
                                    <span>
                                      Lorem ipsum dolor sit amet consectetur.
                                      Sed sit ut{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-white  border-b">
                            <th className="px-4 ">
                              <input type="checkbox" className="size-6" />
                            </th>
                            <td scope="row" className="py-6 text-sm ">
                              #IN112
                            </td>
                            <td scope="row" className=" text-sm ">
                              Jacob
                            </td>
                            <td scope="row" className=" text-sm ">
                              OMOC Seller v1/Homepage
                            </td>
                            <td className="text-[#9E9E9E] text-sm">28/04/24</td>
                            <td className="py-6 ">
                              <div className="flex items-center gap-[14px]">
                                <div className="flex flex-col gap-4 text-sm text-[#9E9E9E]">
                                  <div>
                                    <span>Name</span>
                                  </div>
                                  <div>
                                    <span>Email</span>
                                  </div>
                                  <div>
                                    <span>Please Rate our product?</span>
                                  </div>
                                  <div>
                                    <span>How could we Improve? </span>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-4 text-sm">
                                  <div>
                                    <span>Jacob Adams</span>
                                  </div>
                                  <div>
                                    <span>sample@mail.com</span>
                                  </div>
                                  <div>
                                    <span>3 - GOOD</span>
                                  </div>
                                  <div>
                                    <span>
                                      Lorem ipsum dolor sit amet consectetur.
                                      Sed sit ut{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-wrap justify-between w-full">
                  <div className="flex items-center justify-between gap-4 xl:w-auto w-full">
                    <RoundedDropdown title="Bulk Action" />
                    <BlueBorderButton text="Apply" />
                  </div>
                  <div className="xl:w-auto w-full my-4">
                  <Pagination />
                  </div>
                </div>
              </>
            ) : form === "Response" ? (
              <>
                <div className="w-full bg-white rounded-2xl p-6 my-6 me-[60px] max-h-[711px] min-h-auto ">
                  <div className="flex justify-between items-center">
                    <div className="w-[401px] h-[48px] flex items-center border rounded-xl px-4 py-3 ">
                      <Icon icon="iconoir:search" width="24px" height="24px" />
                      <input
                        className="w-[304px] h-[20px] outline-none ps-4 text-[16px]"
                        type="text"
                        placeholder="Search everything about the seller dashboard..."
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <RoundedDropdown title="Site Source" />
                      </div>
                      <div>
                        <RoundedDropdown title="All Dates" />
                      </div>
                    </div>
                  </div>
                  <div className="my-4 ">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left ">
                        <thead className="text-[14px] text-gray-700  bg-[#F8FAFB] h-[56px]   ">
                          <tr className="   ">
                            <th scope="col" className="px-4 py-3 rounded-s-lg">
                              <input type="checkbox" className="size-6" />
                            </th>
                            <th scope="col" className=" ">
                              Inbox ID
                            </th>
                            <th scope="col" className=" ">
                              Response
                            </th>
                            <th scope="col" className="">
                              Description
                            </th>
                            <th scope="col" className=" ">
                              Date
                            </th>
                            <th scope="col" className="rounded-e-lg ">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="">
                          <tr className="bg-white  border-b">
                            <th className="px-4 ">
                              <input type="checkbox" className="size-6" />
                            </th>
                            <td scope="row" className="py-6 text-sm  ">
                              #IN112
                            </td>
                            <td scope="row" className=" text-sm ">
                              Jacob
                            </td>
                            <td scope="row" className=" text-sm ">
                              OMOC Seller v1/Homepage
                            </td>
                            <td className="text-[#9E9E9E] text-sm">28/04/24</td>
                            <td className="py-6 ">
                              <button className="border rounded-full px-4 py-3 border-blue  ">
                                Sended
                              </button>
                              {/* <button className="border rounded-full px-4 py-3" >Draft</button> */}
                            </td>
                          </tr>
                          <tr className="bg-white  border-b">
                            <th className="px-4 ">
                              <input type="checkbox" className="size-6" />
                            </th>
                            <td scope="row" className="py-6 text-sm  ">
                              #IN112
                            </td>
                            <td scope="row" className=" text-sm ">
                              Jacob
                            </td>
                            <td scope="row" className=" text-sm ">
                              OMOC Seller v1/Homepage
                            </td>
                            <td className="text-[#9E9E9E] text-sm">28/04/24</td>
                            <td className="py-6 ">
                              <button className="border rounded-full px-4 py-3 border-blue  ">
                                Sended
                              </button>
                              {/* <button className="border rounded-full px-4 py-3" >Draft</button> */}
                            </td>
                          </tr>
                          <tr className="bg-white  border-b">
                            <th className="px-4 ">
                              <input type="checkbox" className="size-6" />
                            </th>
                            <td scope="row" className="py-6 text-sm  ">
                              #IN112
                            </td>
                            <td scope="row" className=" text-sm ">
                              Jacob
                            </td>
                            <td scope="row" className=" text-sm ">
                              OMOC Seller v1/Homepage
                            </td>
                            <td className="text-[#9E9E9E] text-sm">28/04/24</td>
                            <td className="py-6 ">
                              <button className="border rounded-full px-4 py-3 border-blue  ">
                                Sended
                              </button>
                              {/* <button className="border rounded-full px-4 py-3" >Draft</button> */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className=" flex items-center flex-wrap justify-between">
                  <div className="flex items-center justify-between gap-4">
                    <RoundedDropdown title="Bulk Action" />
                    <BlueBorderButton text="Apply" />
                  </div>
                  <div>
                  <Pagination />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* modal start from here  */}
      <Modal
        setshowModal={setshowModal}
        showModal={showModal}
        modalstyle={""}
        overlayStyle={""}
      >
        <div className="xl:w-[886px] xl:h-[770px] h-[500px] w-[calc(100%-24px)]    p-6  rounded-3xl gap-6 bg-white flex flex-col overflow-y-scroll  m-3  ">
          <h1 className="text-2xl font-bold">Response Detail </h1>

          <div className="flex flex-col gap-6 ">
            <div className="flex   ">
              <div className="xl:w-[30%] w-[40%] ">
                <span className="font-medium text-base  text-[#616161]">
                  Name
                </span>
              </div>
              <div className="md:w-[70%] w-[60%]">
                <span className="font-medium text-base ">Jacob</span>
              </div>
            </div>
            <div className="flex">
              <div className="xl:w-[30%] w-[40%] ">
                <span className="font-medium text-base text-[#616161]">
                  Source
                </span>
              </div>
              <div className="xl:w-[70%] w-[60%]  ">
                <span className="font-medium text-base ">
                  OMOC Seller v1/Homepage/form
                </span>
              </div>
            </div>
            <div className="flex  ">
              <div className="xl:w-[30%] w-[40%] ">
                <span className="font-medium text-base  text-[#616161]">
                  Date
                </span>
              </div>
              <div className="md:w-[70%] w-[60%] ">
                <span className="font-medium text-base ">30/05/2023</span>
              </div>
            </div>
            <div className="flex  ">
              <div className="xl:w-[30%] w-[40%] ">
                <span className="font-medium text-base  text-[#616161]">
                  Email
                </span>
              </div>
              <div className="md:w-[70%] w-[60%] ">
                <span className="font-medium text-base ">sample@mail.com</span>
              </div>
            </div>
            <div className="flex  ">
              <div className="xl:w-[30%] w-[40%] ">
                <span className="font-medium text-base  text-[#616161]">
                  Please Rate our product?
                </span>
              </div>
              <div className="md:w-[70%] w-[60%] ">
                <span className="font-medium text-base ">3 - GOOD</span>
              </div>
            </div>
            <div className="flex  w-full ">
              <div className="xl:w-[30%] w-[40%] ">
                <span className="font-medium text-base  text-[#616161]">
                  How could we Improve?
                </span>
              </div>
              <div className="md:w-[70%] w-[60%]">
                <span className="font-medium text-base ">
                  Lorem ipsum dolor sit amet consectetur. Sed sit ut amet auctor
                  id leo platea ultricies montes. Libero enim tincidunt id duis.
                  Risus ut nunc urna neque facilisis lacus. Aliquam semper ante
                  lorem urna mauris consectetur dolor.
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold">Write Response </h1>

          <div className="gap-[10px] flex flex-col">
            <h4 className="text-sm text-[#9E9E9E]">TITLE</h4>
            <input
              className="py-3 px-4 rounded-xl bg-[#E8E8E8] outline-none"
              type="text"
              placeholder="Write your newsletter title..."
            />
          </div>
          <div className="gap-[10px] flex flex-col">
            <h4 className="text-sm text-[#9E9E9E]">DESCRIPTION</h4>

            <textarea
              className="w-full h-[197px] py-3 px-4 rounded-xl bg-[#E8E8E8] outline-none"
              name=""
              id=""
              cols="30"
              rows="10 "
              placeholder="Write a personalized message.. "
            ></textarea>
          </div>

          <div className="w-full xl:h-[56px] flex  flex-wrap items-center justify-between rounded-lg xl:rounded-full border py-3 px-4 gap-5">
            <div className="flex flex-wrap items-center gap-5">
              <div>
                <Icon icon="flowbite:undo-outline" width="20px" height="20px" />
              </div>
              <div>
                <Icon icon="flowbite:redo-outline" width="20px" height="20px" />
              </div>

              <div>Times New Roman</div>
              <div>Text</div>
              <div>
                <Icon icon="mynaui:type-bold" width="20px" height="20px" />
              </div>
              <div>
                <Icon
                  icon="flowbite:letter-italic-outline"
                  width="20px"
                  height="20px"
                />
              </div>
              <div>
                <Icon icon="tabler:underline" width="20px" height="20px" />
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

          <div className="text-end">
            <button className="bg-[#0094FF] rounded-full text-white    py-3 px-6">
              Send Response
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
