import React from "react";
import Modal from "react-modal";
import { placeholder, strings } from "../../../../utils/strings";
import { Icon } from "@iconify/react";
import placeholderLogo from "../../../../assets/icon/Frame 20.svg";

function EditProfile({ openEditProfile, setOpenEditProfile }) {
  return (
    <Modal
      isOpen={openEditProfile}
      onRequestClose={() => {
        setOpenEditProfile(false);
      }}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          borderRadius: "15px",
        },
      }}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-xl font-semibold">{strings.EDIT_PROFILE}</h3>
        <Icon
          icon="ep:close"
          width="24"
          height="24"
          cursor={"pointer"}
          onClick={() => setOpenEditProfile(false)}
        />
      </div>
      <div className="mt-8">
        <div className="w-36 h-36 rounded-full relative m-auto">
          <img src={placeholderLogo} className="w-full h-full rounded-full" />
          <input type="file" className="hidden" id="upload" />
          <label
            htmlFor="upload"
            className="bg-[#EDEDED] rounded-full w-8 h-8 absolute flex justify-center items-center bottom-3 right-0 cursor-pointer"
          >
            <Icon
              icon="akar-icons:camera"
              color="#0094ff"
              width="16"
              height="16"
            />
          </label>
        </div>
        <p className="text-base font-medium text-center pt-5 pb-6">
          OMOC OFFICIAL
        </p>
        <input
          type="text"
          className="border-2 rounded-xl w-full p-4 border-[#AADBFF]"
          value={"OMOC OFFICIAL"}
        />
        <div className="flex justify-end mt-6">
          <button className="bg-[#0094FF] text-white text-base font-semibold rounded-[30px] py-3.5 px-10">
            {strings.SAVE_CHANGE}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditProfile;
