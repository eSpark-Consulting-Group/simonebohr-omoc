import React, { useState } from "react";
import Modal from "../../commonComponents/Modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import trash from "../../assets/icons/sidebar/trash.svg";
import SimpleDropdown from "../../commonComponents/SimpleDropdown";
import BlueBorderButton from "../../commonComponents/BlueBorderButton";
import Dropdown from "../../commonComponents/Dropdown";

export default function AddOn() {
  const [showModal, setshowModal] = useState(false);
  const [textEditor, settextEditor] = useState(false)
  const [addtext, setaddtext] = useState(false)

  const handleClose = () => {
    setshowModal(false);
  };

  return (
    <>
      
      <div className="w-[342px]   bg-white  flex flex-col p-4  gap-3">
        <div className="flex flex-col justify-between gap-4 text-center ">
          <div
            onClick={() => setshowModal(true)}
            className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg ctr"
          >
            <div className="w-[208px] h-[106px] border  border-[#0094FF] border-dashed">
              <div className="w-full h-full rounded-[13px] bg-[#E8F5FF] flex items-center p-3 justify-between">
                <div className="border w-[74px] h-[83px] bg-[#0094FF] opacity-[13%] rounded-[9px]"></div>
                <div className="me-3 mt-6 ">
                  <div className="w-[78px] h-[5px] bg-[#0094FF] opacity-[13%] rounded-full"></div>
                  <div className="w-[78px] h-[5px] bg-[#0094FF] opacity-[13%] my-1 rounded-full"></div>
                  <div className="w-[54px] h-[5px] bg-[#0094FF] opacity-[13%] rounded-full"></div>
                  <div className="w-full flex justify-end items-center mt-5">
                    <div className="w-[35px] h-[9px] bg-[#0094FF] opacity-[13%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="font-medium text-[10px]">Banner Creator</h1>
        </div>
        <div className="flex flex-col justify-between gap-4 text-center ">
          <div className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg ctr font-bold text-[64px]">
            Fit
          </div>
          <h1 className="font-medium text-[10px]">Fit text</h1>
        </div>
        <div className="flex flex-col justify-between gap-4 text-center ">
          <div className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg ctr font-bold text-[40px] bitFont">
            0:0:5
          </div>
          <h1 className="font-medium text-[10px]">Countdown</h1>
        </div>
        <div className="flex flex-col justify-between gap-4 text-center ">
          <div className="w-full h-[158px] border-8 border-[#F5F5F5] rounded-lg ctr font-bold text-[40px] bitFont">
            10:31
          </div>
          <h1 className="font-medium text-[10px]">Time & Date</h1>
        </div>
      </div>


      {/* Modal starts  */}
      <Modal
        showModal={showModal}
        setshowModal={handleClose}
        modalstyle=""
      >
        <div className="w-[1200px] h-[784px] rounded-3xl ">
        <div className="h-[117px] w-full  flex justify-between items-center rounded-t-3xl p-8 bg-white ">
          <h1 className="font-bold text-[32px] flex items-center gap-3">
            Banner Creator{" "}
            <Icon
              icon="heroicons:exclamation-circle"
              style={{ color: "#242424" }}
            />
          </h1>
          <div className="flex justify-between items-center gap-3">
            <BlueBorderButton
              text="Exit"
              className="xl:py-4 xl:px-8 xl:w-[210px] xl:h-[53px] xl:text-semibold xl:text-[16px]"
            />
            <BlueBorderButton
              text="Create New Page"
              className="xl:px-8 xl:w-[210px] xl:h-[53px] xl:text-semibold xl:text-[16px]"
            />

           
          </div>
        </div>
        <div className="flex h-[calc(884px_-_117px)]  ">
          <div className="w-[31%] h-[667px] bg-white flex flex-col gap-6 items-center py-5 overflow-y-scroll rounded-bl-3xl  ">
            <SimpleDropdown
              selectstyle="w-[310px] py-[22px] px-3 text-[26px]"
              selectText="text-[16px] text-[#242424]"
              title="All Category"
            />
            <div className="flex flex-col gap-4">
              <img
                className="w-[310px] h-[167px] rounded-xl object-cover"
                src="https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <img
                className="w-[310px] h-[167px] rounded-xl object-cover"
                src="https://images.pexels.com/photos/845242/pexels-photo-845242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <img
                className="w-[310px] h-[167px] rounded-xl object-cover"
                src="https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <img
                className="w-[310px] h-[167px] rounded-xl object-cover"
                src="https://images.pexels.com/photos/534049/pexels-photo-534049.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
          </div>
          <div className="w-[69%] h-[667px] relative bg-bgcolor rounded-br-3xl">
            <div className="w-full ">
              <img
                className="mt-[70px] mx-[75px] w-[674px] rounded-xl"
                src="https://images.pexels.com/photos/750225/pexels-photo-750225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
            <div className="w-[674px] flex justify-between items-center mx-[75px] mt-[75px]">
              <div className="flex gap-4 items-center ">
                <span>Color:</span>
                <div className="size-6 bg-[#C2C2C2] rounded-full"></div>
                <div className="size-6 bg-[#BDB71F] rounded-full"></div>
                <div className="size-6 bg-[#FF4848] rounded-full"></div>
                <div className="size-6 bg-[#654CFF] rounded-full"></div>
                <div className="size-6 bg-[#49E9FF] rounded-full"></div>
              </div>
           
              {!addtext &&
              <div onClick={()=>setaddtext(true)} className="">
                <BlueBorderButton

                  text="Add Text"
                  className="xl:w-[105px] xl:h-[44px] text-[14px] font-medium xl:py-3 xl:px-6"
                />
              </div>}
              {addtext &&
              <button onClick={()=>settextEditor(!textEditor)} className="w-[155px] h-[56px] flex  items-center justify-center gap-[10px] rounded-full bg-white">
                <span>
                  <Icon
                    icon="iconamoon:arrow-up-2"
                    style={{ color: "#242424" }}
                  />
                </span>
                <span>Edit Text</span>
              </button>}
            </div>
            {textEditor &&
            <div className="absolute w-[392px]  max-h-[645px] overflow-hidden bg-white top-5 right-5 rounded-3xl flex flex-col items-center">
              <div className="w-full flex items-center justify-between py-5 px-6">
                <div className="flex items-center ">
                  <span>
                    <Icon
                      icon="solar:alt-arrow-down-outline"
                      width="24px"
                      height="24px"
                    />
                  </span>
                  <span className="ms-2 font-semibold text-[20px]">
                    Text Banner
                  </span>
                </div>
                <div>
                  <img className="cursor-pointer" onClick={()=>{setaddtext(false);settextEditor(false)}} src={trash} alt="" />
                </div>
              </div>

              <Dropdown
                dropdownName="Text"
                className=" w-full py-5 px-6"
                titleStyle="text-[20px] font-semibold"
              >
                <div className="  flex justify-between items-center">
                  <div>
                    <span className="text-textcolor text-[16px]">
                      Font Family
                    </span>
                  </div>
                  <div>
                    <SimpleDropdown title="Calibri" />
                  </div>
                </div>
                <div className="  flex justify-between items-center">
                  <div>
                    <span className="text-textcolor text-[16px]">
                      Font Weight
                    </span>
                  </div>
                  <div>
                    <SimpleDropdown title="Regular" />
                  </div>
                </div>

                <div className="  flex justify-between items-center">
                  <div>
                    <span className="text-textcolor text-[16px]">
                      Font Size
                    </span>
                  </div>
                  <div>
                    <SimpleDropdown title="Small" />
                  </div>
                </div>

                <div className="  flex justify-between items-center">
                  <div>
                    <span className="text-textcolor text-[16px]">
                      Text Color
                    </span>
                  </div>
                  <div>
                    <SimpleDropdown title="" />
                  </div>
                </div>

                <div className="w-full flex items-center justify-between">
                  <div>
                    <span className="text-textcolor text-xs font-medium">
                      Align
                    </span>
                  </div>
                  <div className="w-[157px] h-[38px] flex items-center">
                    <div className="w-[40px] h-[38px] ctr border  border-s">
                      <Icon
                        icon="uis:align-left"
                        width="20px"
                        height="20px"
                        style={{ color: "#4B5563" }}
                      />{" "}
                    </div>
                    <div className="w-[40px] h-[38px] ctr border  ">
                      <Icon
                        icon="uis:align-center"
                        width="20px"
                        height="20px"
                        style={{ color: "#4B5563" }}
                      />{" "}
                    </div>
                    <div className="w-[40px] h-[38px] ctr border">
                      <Icon
                        icon="uis:align-right"
                        width="20px"
                        height="20px"
                        style={{ color: "#4B5563" }}
                      />
                    </div>
                    <div className="w-[40px] h-[38px] ctr border">
                      <Icon
                        icon="uis:align-justify"
                        width="20px"
                        height="20px"
                        style={{ color: "#4B5563" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="  flex justify-between items-center">
                  <div>
                    <span className="text-textcolor text-[16px]">
                      Line Height
                    </span>
                  </div>
                  <div>
                    <SimpleDropdown title="Calibri" />
                  </div>
                </div>
              </Dropdown>
              <Dropdown
                dropdownName="Links"
                className=" w-full py-5 px-6"
                titleStyle="text-[20px] font-semibold"
              >
                <div className="  flex justify-between items-center">
                  <div>
                    <span className="text-textcolor text-[16px]">
                      Font Family
                    </span>
                  </div>
                  <div>
                    <SimpleDropdown title="Calibri" />
                  </div>
                </div>
                <div className="  flex justify-between items-center">
                  <div>
                    <span className="text-textcolor text-[16px]">
                      Font Family
                    </span>
                  </div>
                  <div>
                    <SimpleDropdown title="Calibri" />
                  </div>
                </div>
              </Dropdown>
            </div>}
          </div>
        </div>
      </div>
      </Modal>
    </>
  );
}
