import React, { useState } from "react";
import omocLogo from "../assets/icon/Vector.svg";
import omocIcon from "../assets/icon/web-logo.svg";
import { strings } from "../utils/strings";
import { useNavigate } from "react-router";
import OtpInput from "react-otp-input";
import ReactFlagsSelect from "react-flags-select";
import "../assets/CommonStyling/CommonStyling.css";
import { useDispatch, useSelector } from "react-redux";
import DashboardSublyApi from "../helper/DashboardApi";
import { toast } from "react-toastify";
import { shopDetails } from "../Store/Slices/DashboardSlice";

const buttonTab = [
  { lable: "Yes", isSeller: true },
  { lable: "No", isSeller: false },
];

const showData = [
  {
    image: omocLogo,
    text: "Are You Already Selling?",
    logoName: "Omoc",
  },
  {
    text: "What Products Are You Selling?",
    btnTetx1: "Physical Product",
    btnTetx2: "Digital Product",
    btnTetx3: "Service",
  },
  {
    text: "What Will The Name of Your Business be?",
    inputText: "Name",
    btnTetx2: "Next",
  },
  {
    text: "Where is Your Business Located?",
    inputText: "Country",
    btnTetx2: "Next",
  },
  {
    text: "Input Email Address",
    inputText: "Your Email Address",
    btnTetx2: "Next",
  },
  {
    text: "Verification OTP",
    inputText: "Your Email Address",
    btnTetx2: "Submit",
    otp: "Does’t receive OTP?",
    resend: "Resend",
  },
];

const WelcomScreenEnquri = () => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userData.userDetails);
  const [activeTab, setActiveTab] = useState(0);
  const [index, setIndex] = useState(0);
  const [otp, setOtp] = useState("");
  const [selectCountry, setSelectCountry] = useState(null);
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(null);
  const [productType, setProductType] = useState(null);
  const [bussinessName, setBussinessName] = useState("");
  const [bussinessEmail, setBussinessEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const nextData = () => {
    setIndex(index + 1);
  };
  const handleTabClick = (index) => {
    setActiveTab(index);
    setIndex((pre) => pre + 1);
  };

  // ===============Create Shop API======================
  async function createShopHandle() {
    const requestData = {
      isAlreadySelling: isSeller,
      businessName: bussinessName,
      country: selectCountry,
      email: bussinessEmail,
      category: productType,
    };
    await DashboardSublyApi.createShop(requestData, token)
      .then((responseJson) => {
        if (responseJson.statusCode == 200) {
          toast.success(responseJson.message);
          dispatch(shopDetails(responseJson.data));
          nextData();
        } else {
          toast.error(responseJson.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // ==============OTP verification API==============

  async function verifyHandle() {
    const requestData = { email: bussinessEmail, otp: otp };
    await DashboardSublyApi.shopOtpVerify(requestData, token)
      .then((responseJson) => {
        if (responseJson.statusCode == 200) {
          toast.success(responseJson.message);
          dispatch(shopDetails(responseJson.data));
          navigate("/Home");
        } else {
          toast.error(responseJson.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="bg-[#F8F9FD] h-screen shopCreateClass">
      <div className="flex justify-between h-20 items-center mx-10">
        <div className="flex items-center">
          <img src={omocIcon} className="w-[115px] h-[30px]" />
        </div>
      </div>
      <div>
        <p
          style={{ visibility: index > 4 ? "hidden" : "" }}
          className={`text-center my-5 text-xl font-semibold text-[#757575] `}
        >
          Step {index + 1} of 5
        </p>
      </div>
      <div className="w-1/2 pb-10 bg-[#fff] mx-auto rounded-[32px] max-sm:w-[90%]">
        {index === 0 && (
          <div>
            <input
              className="w-[95%] my-5 mx-3"
              type="range"
              min="0"
              max="100"
              value="20"
            />
            <div className="w-32 h-32 bg-[#000] rounded-full justify-center items-center mx-auto gap-1 flex mt-5">
              <img className="w-6 h-6" src={showData[0].image} />
              <p className="text-[#fff] text-base font-bold">
                {showData[0].logoName}
              </p>
            </div>
            <p className="text-center mt-5 text-[44px] font-semibold px-10">
              {showData[0].text}
            </p>
            <div className="w-[310px] bg-[#F5F5F5] h-[68px] rounded-[60px] mx-auto mt-10">
              <div className="justify-between flex">
                {buttonTab.map((button, index) => (
                  <button
                    key={index}
                    className={`w-1/2 rounded-[60px] py-[21px] ${
                      activeTab === index ? "bg-[#0094FF]" : "bg-transparent"
                    }`}
                    onClick={() => {
                      handleTabClick(index);
                      setIsSeller(button.isSeller);
                    }}
                  >
                    <p
                      className={`${
                        activeTab === index ? "text-[#fff]" : "text-[000]"
                      }`}
                    >
                      {button.lable}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {index === 1 && (
          <div>
            <input
              className="w-[95%] my-5 mx-3"
              type="range"
              min="0"
              max="100"
              value="40"
            />
            <p className="text-center mt-5 text-[44px] font-semibold px-10">
              {showData[1].text}
            </p>
            <div className="bg-yellow-40 flex items-center justify-center mt-5">
              <button
                className="w-[50%] h-12 bg-[#0094FF] rounded-[60px]"
                onClick={() => {
                  nextData();
                  setProductType(showData[1].btnTetx1);
                }}
              >
                <p className="text-[#fff]">{showData[1].btnTetx1}</p>
              </button>
            </div>
            <div className="bg-yellow-40 flex items-center justify-center mt-5">
              <button
                className="w-[50%] h-12 bg-[#F5F5F5] rounded-[60px]"
                onClick={() => {
                  nextData();
                  setProductType(showData[1].btnTetx2);
                }}
              >
                <p>{showData[1].btnTetx2}</p>
              </button>
            </div>
            <div className="bg-yellow-40 flex items-center justify-center mt-5">
              <button
                className="w-[50%] h-12 bg-[#F5F5F5] rounded-[60px]"
                onClick={() => {
                  nextData();
                  setProductType(showData[1].btnTetx3);
                }}
              >
                <p>{showData[1].btnTetx3}</p>
              </button>
            </div>
          </div>
        )}
        {index === 2 && (
          <div>
            <input
              className="w-[95%] my-5 mx-3"
              type="range"
              min="0"
              max="100"
              value="60"
            />
            <p className="text-center mt-5 text-[44px] font-semibold px-10">
              {showData[2].text}
            </p>
            <div className="bg-yellow-40 flex items-center justify-center mt-5">
              <input
                className="w-[50%] h-12  bg-[#F5F5F5] rounded-[60px] text-center"
                placeholder={showData[2].inputText}
                value={bussinessName}
                onChange={(e) => {
                  setBussinessName(e.target.value);
                }}
              />
            </div>
            <div className="bg-yellow-40 flex items-center justify-center mt-5">
              <button
                disabled={bussinessName ? false : true}
                className="w-[50%] h-12 bg-[#0094FF] rounded-[60px]"
                onClick={nextData}
              >
                <p className="text-[#fff]">{showData[2].btnTetx2}</p>
              </button>
            </div>
          </div>
        )}
        {index === 3 && (
          <div>
            <input
              className="w-[95%] my-5 mx-3"
              type="range"
              min="0"
              max="100"
              value="80"
            />
            <p className="text-center mt-5 text-[44px] font-semibold px-10">
              {showData[3].text}
            </p>
            <div className="bg-yellow-40 flex items-center justify-center mt-5">
              <ReactFlagsSelect
                selected={selectCountry}
                onSelect={(code) => setSelectCountry(code)}
                className="w-[70%] bg-[#F5F5F5] rounded-[60px] text-center border-0	!p-2"
                placeholder={showData[3].inputText}
              />
            </div>

            <div className="bg-yellow-40 flex items-center justify-center mt-5">
              <button
                className="w-[60%] h-14 bg-[#0094FF] rounded-[60px]"
                onClick={nextData}
              >
                <p className="text-[#fff]">{showData[3].btnTetx2}</p>
              </button>
            </div>
          </div>
        )}
        {index === 4 && (
          <div>
            <input
              className="w-[95%] my-5 mx-3"
              type="range"
              min="0"
              max="100"
              value="100"
            />
            <p className="text-center mt-5 text-[44px] font-semibold px-10">
              {showData[4].text}
            </p>
            <div className="bg-yellow-40 mt-5">
              <div className="w-1/2 m-auto max-md:w-full">
                <input
                  className="w-[100%] h-12  bg-[#F5F5F5] rounded-[60px] text-center"
                  placeholder={showData[4].inputText}
                  value={bussinessEmail}
                  onChange={(e) => {
                    setBussinessEmail(e.target.value);
                    if (e.target.value.match(emailRegex)) {
                      setEmailError("");
                    } else {
                      setEmailError("Please enter valid email");
                    }
                  }}
                />
                <p className="text-[#C80000] text-sm mt-1 pl-3">{emailError}</p>
              </div>
            </div>
            <div className="bg-yellow-40 flex items-center justify-center mt-5">
              <button
                disabled={bussinessEmail && !emailError ? false : true}
                className="w-[50%] h-12 bg-[#0094FF] rounded-[60px]"
                onClick={() => {
                  createShopHandle();
                }}
              >
                <p className="text-[#fff]">{showData[4].btnTetx2}</p>
              </button>
            </div>
          </div>
        )}
        {index === 5 && (
          <div>
            <p className="text-center pt-10 text-[44px] font-semibold px-10">
              {showData[5].text}
            </p>
            <div className="bg-yellow-40 mt-5">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
                containerStyle={"justify-center gap-2"}
                inputStyle={
                  "!w-20 !h-20  bg-[#F5F5F5] rounded-[10px] text-center text-3xl max-md:!w-14 max-md:!h-14"
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
                <p className="text-[#fff]">{showData[5].btnTetx2}</p>
              </button>
            </div>
            <div className="flex items-center justify-center mt-5 gap-1">
              <p className="text-[#AEAEAE]">{showData[5].otp}</p>
              <p className="text-[#0094FF] cursor-pointer">
                {showData[5].resend}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomScreenEnquri;
