import React from "react";
import ReactModal from "react-modal";
import hoodie from "../../assets/images/hoodie.png";
import omocLogo from "../../assets/icon/omoc_black_logo.svg";
import { placeholder, strings } from "../../utils/strings";
import { Icon } from "@iconify/react";
import { Col, Container, Row } from "react-bootstrap";
import saveIcon from "../../assets/icon/save_icon.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
  },
};
const PostModal = ({ isOpen, closeModal }) => {
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Container className="relative">
          <Row>
            <Col md="8">
              <div className="">
                <img className="w-full" src={hoodie} />
              </div>
            </Col>
            <Col md="4">
              <div className="">
                <div className="flex items-center justify-between border-b-[1px] pb-3 mx-2">
                  <div className="flex items-center cursor-pointer ">
                    <img
                      className="w-8 h-8 border-[1px] border-white z-30 rounded-full"
                      src={omocLogo}
                    />
                    <img
                      className="w-8 h-8 -ml-4 border-[1px] border-white z-20 rounded-full"
                      src={omocLogo}
                    />
                    <img
                      className="w-8 h-8 -ml-4 border-[1px] border-white z-10 rounded-full"
                      src={omocLogo}
                    />
                    <p className="text-[10px] ml-1 w-28">
                      Liked by{" "}
                      <span className="text-[10px] font-medium">Omoc</span> and{" "}
                      <span className="text-[10px] font-medium">
                        {" "}
                        27 others
                      </span>
                    </p>
                  </div>
                  <Icon
                    className="cursor-pointer"
                    icon="ph:dots-three-vertical-bold"
                  />
                </div>
                <div className="flex gap-2 items-center mx-3 my-3">
                  <img width={32} height={32} src={omocLogo} />
                  <p>{strings.OMOC_OFFICIAL}</p>
                  <Icon icon="bitcoin-icons:verify-filled" color="#3d9ffb" />
                </div>
                <div className="">
                  <p className="text-xs mx-3">{strings.LOREM_TEXT}</p>
                </div>
                <div className="border-t-[1px] mx-3 my-3 absolute bottom-0 ">
                  <div className="flex gap-4 my-3">
                    <img src={saveIcon} />
                    <Icon icon="mdi:heart" color="red" />
                    <Icon icon="mynaui:chat-messages" />
                    <Icon icon="mingcute:send-line" />
                  </div>
                  <div className="flex items-center relative">
                    <input
                      className="bg-[#F5F5F5] h-10 w-full px-2 rounded-[20px]"
                      placeholder={placeholder.MESSAGE}
                    />
                    <Icon
                      className="absolute right-2"
                      icon="mingcute:send-line"
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="flex"></div>
      </ReactModal>
    </div>
  );
};

export default PostModal;
