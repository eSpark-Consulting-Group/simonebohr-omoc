import React from "react";
import Header from "../../component/commonComponent/Header";
import export_icon from "../../assets/icon/export_icon.svg";
import { strings } from "../../utils/strings";
import MainFooter from "../../component/appComponent/MainFooter";

const UploadScreen = () => {
  return (
    <div>
      <div className="mx-20 max-md:mx-6">
        <Header />
      </div>
      <div className="bg-[#F8F9FD] h-full p-5">
        <div className="mx-20 max-md:mx-6 p-5 h-full bg-white">
          <div className="bg-[#F8F8F8] h-full py-5">
            <img className="mx-auto" src={export_icon} />
            <p className="text-2xl font-medium text-center my-5">
              {strings.SELECT_VIDEO_TO_UPLOAD}
            </p>
            <p className="text-[#9E9E9E] text-lg font-medium text-center">
              {strings.DRAG_AND_DROP_FILE}
            </p>
            <p className="text-[#9E9E9E] text-lg font-medium text-center my-5">
              {strings.MP4_WEB720_RESOLUTION_30MIN_LESS}
            </p>
            <div className="flex justify-center items-center">
              <button className="bg-[#0094FF] rounded-[24px] h-12	w-80 mx-auto">
                <p className="text-white font-medium">{strings.SELECT_FILE}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default UploadScreen;
