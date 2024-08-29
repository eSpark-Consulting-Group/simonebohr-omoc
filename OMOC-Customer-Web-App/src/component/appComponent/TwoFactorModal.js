import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { strings } from "../../utils/strings";
const TwoFactorModal = ({ closedModal }) => {
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={closedModal}>
          <Modal.Title>Enable 2FA</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Enter your password to confirm that you want to enable two-factor
            authentication
          </p>
        </Modal.Body>

        <Modal.Footer className="w-full">
          <div className="flex  border-t-[1px] ">
            <button className="w-1/2  border-r-[1px] pt-2">
              <p className="text-[#007AFF]">{strings.CANCEL}</p>
            </button>

            <button className="w-1/2 pt-2">
              <p className="text-[#FF0000]">{strings.REMOVE}</p>
            </button>
          </div>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default TwoFactorModal;
