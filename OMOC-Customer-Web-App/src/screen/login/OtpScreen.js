import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { strings } from "../../utils/strings";
import omocIcon from "../../assets/icon/omoc_logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { custVerify } from "../../Store/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";

const OtpScreen = () => {
  const navigate = useNavigate();
  const isLogin = useLocation();
  const { isLoading } = useSelector((state) => state.userData);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { email, phone } = useSelector(
    (state) => state.userData.userDetails.user
  );
  const renderWelcome = isLogin.state ? isLogin.state : true;
  console.log("ISLOGIN", renderWelcome);
  async function verifyHandle() {
    const requestData = {
      ...(email && { email: email }),
      ...(phone && { phone: phone }),
      otp: otp,
    };
    await dispatch(custVerify(requestData))
      .then((responseJson) => {
        const response = responseJson.payload.response;
        if (response.statusCode == 200) {
          toast.success(response.message);
          {
            renderWelcome == false ? navigate("/Home") : navigate("/Welcome");
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="bg-[#F8F9FD] h-screen">
      {isLoading ? <Loader /> : ""}
      <div className="flex justify-between h-20 items-center mx-10">
        <div className="flex items-center">
          <img src={omocIcon} className="w-[115px] h-[30px]" />
        </div>
        <button className="w-32 h-12 bg-[#0094FF] text-center rounded-3xl">
          <p className="text-[#fff]">{strings.LOGIN}</p>
        </button>
      </div>
      <div className=" sm:w-1/2 w-[90%]  pb-10 bg-[#fff] mx-auto rounded-[32px]">
        <p className="text-center pt-10 text-[44px] font-semibold px-10">
          {/* {showData[5].text} */}
          {strings.VERIFICATION_OTP}
        </p>
        <p className="text-center">{strings.OTP_SEND_EMAIL}</p>
        <div className="bg-yellow-40 mt-5">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span> </span>}
            renderInput={(props) => <input {...props} />}
            containerStyle={"justify-center gap-2"}
            inputStyle={
              "!w-20 !h-20  bg-[#F5F5F5] rounded-[10px] text-center text-3xl"
            }
            inputType={"number"}
          />
        </div>
        <div className="flex items-center justify-center mt-5">
          <button
            className="w-[50%] h-12 bg-[#0094FF] rounded-[60px]"
            onClick={() => {
              verifyHandle();
            }}
          >
            <p className="text-[#fff]">{strings.SUBMIT}</p>
          </button>
        </div>
        <div className="flex items-center justify-center mt-5 gap-1">
          <p className="text-[#AEAEAE]">{strings.DONT_RECEIVE_OTP}</p>
          <p className="text-[#0094FF] cursor-pointer">{strings.RESEND}</p>
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
