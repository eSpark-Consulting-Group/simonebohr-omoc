import React from "react";
import ReactModal from "react-modal";
import { strings } from "../../utils/strings";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "20%",
  },
};
const RemoveLoginInfoModal = ({ openModal, closedModal }) => {
  return (
    <div>
      <div
        className="modal show "
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header className="flex border-0 !justify-center pb-0">
            <Modal.Title>
              <p className="text-center font-medium">
                {strings.REMOVE_LOGIN_INFO}
              </p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className="text-xs text-center leading-5 mx-5 ">
              {strings.YOU_NEED_TO_ENTER_NAME_PASSWORD}
            </p>
          </Modal.Body>

          <Modal.Footer className="!justify-start !p-0 !block">
            <div className="flex  h-10">
              <button className="w-1/2  border-r-[1px] " onClick={closedModal}>
                <p className="text-[#007AFF]">{strings.CANCEL}</p>
              </button>

              <button className="w-1/2 pt-2">
                <p className="text-[#FF0000]">{strings.REMOVE}</p>
              </button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
};

export default RemoveLoginInfoModal;
