import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { placeholder, strings } from "../../utils/strings";
import "../../assets/commonStyling/commonStyling.css";
import { Icon } from "@iconify/react";
import profile from "../../assets/images/profile_pic.png";
const data = [1, 2, 3, 4, 5, 6];
const ShareWishlistModal = ({ show, handleClose }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header className="!justify-center border-0 py-1 px-4">
          <Modal.Title>{strings.SHARE_WISHLIST}</Modal.Title>
          <div className="absolute right-5">
            <Icon
              width={20}
              height={20}
              icon="radix-icons:cross-2"
              onClick={() => {
                handleClose();
              }}
            />
          </div>
        </Modal.Header>
        <Modal.Body className="py-1 px-4 h-96 overflow-auto ">
          <div className="flex relative mt-4">
            <div className="absolute left-2 top-3">
              <Icon className="" icon="carbon:search" />
            </div>
            <input
              className="bg-[#F5F5F5] pl-8 rounded-[14px] w-full py-2"
              placeholder={placeholder.SEARCH}
            />
          </div>
          <div className="my-4">
            {data.map(() => {
              return (
                <div className="flex items-center justify-between my-2">
                  <div className="flex items-center gap-2">
                    <img className="w-12 h-12 rounded-full" src={profile} />
                    <div>
                      <p className="font-medium">Jordan Paul</p>
                      <p className="text-sm text-[#4B4B4B]">paul24</p>
                    </div>
                  </div>
                  <input type="checkbox" />
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-center">
          <button className="bg-[#0094FF] w-full rounded-[24px] py-[14px]">
            <p className="text-white font-medium">{strings.SHARE}</p>
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShareWishlistModal;
