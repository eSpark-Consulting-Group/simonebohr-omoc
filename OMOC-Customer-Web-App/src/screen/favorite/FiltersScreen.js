import React, { useState } from "react";
import Header from "../../component/commonComponent/Header";
import { strings } from "../../utils/strings";
import { Col, Container, Row } from "react-bootstrap";
import omocLogo from "../../assets/icon/omoc_black_logo.svg";
import { Icon } from "@iconify/react";
import fullTrackSuit from "../../assets/images/fullTrackSuit.png";
import profile from "../../assets/images/profile_pic.png";

const data = [
  { title: "Live Strean" },
  { title: "For You" },
  { title: "Following" },
];
const FiltersScreen = () => {
  const [selected, setSelected] = useState(0);
  const [follow, setFollow] = useState("Follow");
  const handleButton = () => {
    if (follow === "Follow") {
      setFollow("Following");
    } else {
      setFollow("Follow");
    }
  };
  return (
    <div>
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <div className="bg-[#F8F9FD] px-20 max-md:px-6 py-2">
        <div className="bg-white rounded-[32px] flex w-4/5	flex-wrap  lg:w-1/2 px-5 py-2 justify-between mx-auto">
          {data.map((val, index) => {
            return (
              <div
                className={`${
                  selected === index ? "bg-[#9039FF] text-white" : "bg-white"
                } rounded-3xl py-2 px-4 cursor-pointer`}
                onClick={() => {
                  setSelected(index);
                }}
              >
                <p className="text-xs font-medium">{val.title}</p>
              </div>
            );
          })}
        </div>
        <div>
          <Container fluid>
            <Row>
              <Col md="9">
                <div className="bg-white rounded-xl px-5 py-3 my-5">
                  <div className="flex justify-between">
                    <div className="flex gap-2 w-1/2">
                      <img src={omocLogo} />
                      <div>
                        <div className="flex gap-2">
                          <p className="text-lg font-medium">
                            {strings.OMOC_OFFICIAL}
                          </p>
                          <Icon
                            icon="bitcoin-icons:verify-filled"
                            color="#3d9ffb"
                          />
                        </div>
                        <p className="text-xs">
                          {strings.LOREM_TEXT}
                          <span className="text-xs font-semibold">
                            {" "}
                            Read More
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className=" ">
                      <button
                        className={`${
                          follow === "Follow"
                            ? "bg-[#0094FF] text-white"
                            : "bg-[#F5F5F5] text-[#9E9E9E]"
                        } rounded-3xl px-4 py-2`}
                        onClick={handleButton}
                      >
                        <p className="text-[10px] ">{follow}</p>
                      </button>
                    </div>
                  </div>
                  <div className="ml-16 mt-4 flex items-end border-b-[1px] pb-4 gap-2">
                    <img className=" rounded-xl" src={fullTrackSuit} />
                    <div>
                      <div className="w-14 h-14 rounded-full bg-[#F5F5F5] flex justify-center items-center">
                        <Icon icon="ph:heart" width={24} height={24} />
                      </div>
                      <p className="text-sm font-medium text-center mt-1">
                        123,4K
                      </p>
                      <div className="w-14 h-14 rounded-full bg-[#F5F5F5] flex justify-center items-center my-2">
                        <Icon
                          width={24}
                          height={24}
                          icon="mynaui:chat-messages"
                        />
                      </div>
                      <p className="text-sm font-medium text-center mt-1">
                        123,4K
                      </p>
                      <div className="w-14 h-14 rounded-full bg-[#F5F5F5] flex justify-center items-center mt-2">
                        <Icon
                          icon="solar:bag-5-linear"
                          width={24}
                          height={24}
                        />
                      </div>
                      <p className="text-sm font-medium text-center mt-1">
                        123,4K
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="bg-white rounded-xl p-3 my-5 mr-20 max-md:mr-6">
                  {data.map(() => {
                    return (
                      <div className="flex items-center justify-between  border-b-[1px] py-3">
                        <div className="flex gap-1 items-center">
                          <img className="w-14 h-14" src={profile} />
                          <div>
                            <div className="flex gap-1">
                              <p className="text-lg font-medium">John Wick</p>
                              <Icon
                                icon="bitcoin-icons:verify-filled"
                                color="#3d9ffb"
                              />
                            </div>
                            <p className="text-sm text-[#AEAEAE]">Follow you</p>
                          </div>
                        </div>
                        <button
                          className={`${
                            follow === "Follow"
                              ? "bg-[#0094FF] text-white"
                              : "bg-[#F5F5F5] text-[#9E9E9E]"
                          } rounded-3xl px-3 py-2`}
                          onClick={handleButton}
                        >
                          <p className="text-[10px] ">{follow}</p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default FiltersScreen;
