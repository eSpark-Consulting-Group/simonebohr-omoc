import { Icon } from "@iconify/react";
import React from "react";
import Modal from "react-modal";
import { strings } from "../../../utils/strings";
import profile from "../../../assets/image/Ellipse 647.png";

function EmployeeList({openList, setOpenList}) {
  return (
    <Modal
      isOpen={openList}
        onRequestClose={() => {
          setOpenList(false);
        }}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "30%",
          borderRadius: "15px",
          padding: "0px",
        },
      }}
    >
      <div className="flex justify-between items-center border-b py-4 gap-4">
        <h3 className="text-base font-semibold pl-4 w-[90%]">
          {strings.LIST_EMPLOYEE}
        </h3>
        <Icon
          icon="ep:close"
          width="22"
          height="22"
          cursor={"pointer"}
          className="mr-4"
            onClick={() => setOpenList(false)}
        />
      </div>
      <div className="p-4 !py-0 overflow-auto">
        <div className="h-60">
          {[1, 2, 3, 4, 5].map(() => (
            <div className="flex items-center gap-4 my-4">
              <img src={profile} className="w-10 h-10" />
              <p className="text-sm font-medium">John Wick</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default EmployeeList;
