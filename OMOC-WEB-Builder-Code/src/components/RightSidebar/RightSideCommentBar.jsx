import { Icon } from "@iconify/react";
import React, { useState } from "react";

export default function RightSideCommentBar() {
  const [active, setactive] = useState(false);
  return (
    <>
      <div className="w-[280px] h-auto  bg-white relative">
        <div className="flex justify-between items-center  p-4">
          <div className="flex items-center w-[216px] h-[36px] border rounded-[4px] p-[10px] gap-2">
            <div className="flex items-center">
              <Icon
                icon="ep:search"
                width="13px"
                height="13px"
                style={{ color: "#757575" }}
              />
              <input
                type="text"
                className="outline-none ps-[10px] placeholder:text-[12px] placeholder:text-textcolor"
                placeholder="Search"
              />
            </div>
          </div>
          <div>
            <Icon icon="solar:sort-linear" width="24px" height="24px" />
          </div>
        </div>
        <div
          onClick={() => setactive(true)}
          className={`flex flex-col px-4 py-2 gap-[9px] ${
            !active ? "text-textcolor " : "bg-[#F5F5F5]"
          }`}
        >
          <div className="flex justify-between items-center">
            <div className=" text-[10px] font-medium">Layer 1</div>
            <Icon icon="ri:more-fill" width="16px" height="16px" />
          </div>

          <div className="flex items-center ">
            <img
              className="size-[16px] rounded-full "
              src="https://wallpapers.com/images/hd/whatsapp-dp-man-in-cap-ucw3kyzqvvuadj33.jpg"
              alt=""
            />
            <span className="text-xs font-medium mx-1">Jacob Neilson</span>
            <span className="text-[10px]">2min</span>
          </div>

          <p className="text-[10px] h-11">
            Lorem ipsum dolor sit amet consectetur. Enim sed neque etiam eu nunc
            vestibulum magna mauris. Sociis mauris amet quams mauris amet quam
          </p>
        </div>
        <div
          onClick={() => setactive(true)}
          className={`flex flex-col px-4 py-2 gap-[9px] ${
            !active ? "text-textcolor " : "bg-[#F5F5F5]"
          }`}
        >
          <div className="flex justify-between items-center">
            <div className=" text-[10px] font-medium">Layer 1</div>
            <Icon icon="ri:more-fill" width="16px" height="16px" />
          </div>

          <div className="flex items-center ">
            <img
              className="size-[16px] rounded-full "
              src="https://wallpapers.com/images/hd/whatsapp-dp-man-in-cap-ucw3kyzqvvuadj33.jpg"
              alt=""
            />
            <span className="text-xs font-medium mx-1">Jacob Neilson</span>
            <span className="text-[10px]">2min</span>
          </div>

          <p className="text-[10px] h-11">
            Lorem ipsum dolor sit amet consectetur. Enim sed neque etiam eu nunc
            vestibulum magna mauris. Sociis mauris amet quams mauris amet quam
          </p>
        </div>
        <div
          onClick={() => setactive(true)}
          className={`flex flex-col px-4 py-2 gap-[9px] ${
            !active ? "text-textcolor " : "bg-[#F5F5F5]"
          }`}
        >
          <div className="flex justify-between items-center">
            <div className=" text-[10px] font-medium">Layer 1</div>
            <Icon icon="ri:more-fill" width="16px" height="16px" />
          </div>

          <div className="flex items-center ">
            <img
              className="size-[16px] rounded-full "
              src="https://wallpapers.com/images/hd/whatsapp-dp-man-in-cap-ucw3kyzqvvuadj33.jpg"
              alt=""
            />
            <span className="text-xs font-medium mx-1">Jacob Neilson</span>
            <span className="text-[10px]">2min</span>
          </div>

          <p className="text-[10px] h-11">
            Lorem ipsum dolor sit amet consectetur. Enim sed neque etiam eu nunc
            vestibulum magna mauris. Sociis mauris amet quams mauris amet quam
          </p>
        </div>
        <div
          onClick={() => setactive(true)}
          className={`flex flex-col px-4 py-2 gap-[9px] ${
            !active ? "text-textcolor " : "bg-[#F5F5F5]"
          }`}
        >
          <div className="flex justify-between items-center">
            <div className=" text-[10px] font-medium">Layer 1</div>
            <Icon icon="ri:more-fill" width="16px" height="16px" />
          </div>

          <div className="flex items-center ">
            <img
              className="size-[16px] rounded-full "
              src="https://wallpapers.com/images/hd/whatsapp-dp-man-in-cap-ucw3kyzqvvuadj33.jpg"
              alt=""
            />
            <span className="text-xs font-medium mx-1">Jacob Neilson</span>
            <span className="text-[10px]">2min</span>
          </div>

          <p className="text-[10px] h-11">
            Lorem ipsum dolor sit amet consectetur. Enim sed neque etiam eu nunc
            vestibulum magna mauris. Sociis mauris amet quams mauris amet quam
          </p>
        </div>
        <div
          onClick={() => setactive(true)}
          className={`flex flex-col px-4 py-2 gap-[9px] ${
            !active ? "text-textcolor " : "bg-[#F5F5F5]"
          }`}
        >
          <div className="flex justify-between items-center">
            <div className=" text-[10px] font-medium">Layer 1</div>
            <Icon icon="ri:more-fill" width="16px" height="16px" />
          </div>

          <div className="flex items-center ">
            <img
              className="size-[16px] rounded-full "
              src="https://wallpapers.com/images/hd/whatsapp-dp-man-in-cap-ucw3kyzqvvuadj33.jpg"
              alt=""
            />
            <span className="text-xs font-medium mx-1">Jacob Neilson</span>
            <span className="text-[10px]">2min</span>
          </div>

          <p className="text-[10px] h-11">
            Lorem ipsum dolor sit amet consectetur. Enim sed neque etiam eu nunc
            vestibulum magna mauris. Sociis mauris amet quams mauris amet quam
          </p>
        </div>

        <div
          className={`w-[234px] h-[342px] bg-[#FFFFFF] rounded-xl p-3 absolute ${
            active ? "flex" : "hidden"
          } flex-col justify-between top-28 right-80`}
        >
          <div className="">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <div className="flex items-center">
                <Icon
                  icon="fluent:ios-arrow-left-24-filled"
                  width="16px"
                  height="16px"
                />
                <Icon
                  className="ms-1"
                  icon="fluent:ios-arrow-right-24-filled"
                  width="16px"
                  height="16px"
                />
              </div>
              <div className="flex">
                <Icon icon="ri:more-fill" width="16px" height="16px" />
                <Icon
                  className="mx-3"
                  icon="teenyicons:tick-circle-outline"
                  width="16px"
                  height="16px"
                />
                <Icon
                  onClick={() => setactive(false)}
                  icon="icon-park-outline:close"
                  width="16px"
                  height="16px"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[9px] py-2 border-b ">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-textcolor gap-[10px]">
                  <img
                    className="size-4 rounded-full"
                    src="https://i.pinimg.com/564x/90/8f/76/908f76ea93c49062710f069f582421e1.jpg"
                    alt=""
                  />{" "}
                  <span className="font-medium">Jacob</span>
                  <span className="text-[10px]">2min</span>
                </div>
                <div>ssdncs</div>
              </div>

              <p className="h-[68px] lin text-[12px] leading-[12px text-textcolor">
                Lorem ipsum dolor sit amet consectetur. Enim sed neque etiam eu
                nunc vestibulum magna mauris. Sociis mauris amet quam
              </p>
            </div>
            <div className="flex flex-col gap-[9px] py-2 border-b ">
              <div className="flex items-center text-xs text-textcolor gap-[10px]">
                <img
                  className="size-4 rounded-full"
                  src="https://i.pinimg.com/564x/90/8f/76/908f76ea93c49062710f069f582421e1.jpg"
                  alt=""
                />{" "}
                <span className="font-medium">Jacob</span>
                <span className="text-[10px]">2min</span>
              </div>
              <p className="h-[68px] lin text-[12px] leading-[12px text-textcolor">
                Lorem ipsum dolor sit amet consectetur. Enim sed neque etiam eu
                nunc vestibulum magna mauris. Sociis mauris amet quam
              </p>
            </div>
          </div>
          <div className=" w-full h-[25px] flex items-center border rounded-full justify-between px-1">
            <div>
              <input
                placeholder="Comment"
                className="ps-1 placeholder:text-[12px] placeholder:font-medium outline-none h-[12px] w-[143px] font-medium text-[12px]"
                type="bg-blue "
              />
            </div>
            <div>
              <Icon
                icon="material-symbols-light:arrow-circle-right"
                width="20px"
                height="20px"
                style={{ color: "#0094FF" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
