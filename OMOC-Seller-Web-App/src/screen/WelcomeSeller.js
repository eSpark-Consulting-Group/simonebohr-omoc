import React, { useState } from "react";
import bgImg from "../assets/image/sellerBg_img.png";
import bgImg3 from "../assets/image/sellerBg_3_img.png";
import bgImg2 from "../assets/image/sellerBg_2_img.png";
import omocIcon from "../assets/icon/web-logo.svg";
import CuastomInputBox from "../component/CuastomInputBox";
import LoginGoogleButton from "../component/LoginGoogleButton";
import CustomButton from "../component/CustomButton";
import Footer from "../component/Footer";
import back_icon from "../assets/icon/back_icon.svg";
import { placeholder, strings } from "../utils/strings";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../assets/CommonStyling/CommonStyling.css";
import { useDispatch, useSelector } from "react-redux";
import { sellerGoogleAuth, sellerSignup } from "../Store/Slices/AuthSlice";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { shopDetails } from "../Store/Slices/DashboardSlice";
import Loader from "../utils/Loader";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SliderData = [
  {
    image: bgImg,
  },
  {
    image: bgImg2,
  },
  {
    image: bgImg3,
  },
];
const WelcomeSeller = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.userData);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [imgIndex, setImgIndex] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  // ===========Google Auth Handler===========
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      googleHandle(tokenResponse.access_token);
    },
    onFailure: (error) => console.log(error),
    onError: (error) => console.log(error),
  });

  // =============Google login and signup=============
  async function googleHandle(token) {
    await dispatch(sellerGoogleAuth(token))
      .then((responsejson) => {
        const response = responsejson.payload.response;
        if (response.statusCode == 200) {
          toast.success(response.message);
          if (response.data.isShopExists) {
            dispatch(shopDetails(response.data.shopDetails));
            navigate("/Home");
          } else {
            navigate("/Seller-enqury");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const nextSlide = () => {
    // setImgIndex(imgIndex + 1);
    if (imgIndex < SliderData.length - 1) {
      setImgIndex(imgIndex + 1);
    }
  };

  const prevSlide = () => {
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1);
    }
  };

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  // ===========Signup Api handling function============
  async function handleSignup() {
    if ((userEmail || userPhone) && userPassword) {
      if (
        (userEmail.match(emailRegex) || userPhone) &&
        userPassword.length >= 8
      ) {
        const requestData = {
          ...(userEmail && { email: userEmail }),
          password: userPassword,
          ...(userPhone && { phone: userPhone, countryCode: countryCode }),
        };
        await dispatch(sellerSignup(requestData))
          .then((responseJson) => {
            const response = responseJson.payload.response;
            if (response.statusCode == 200) {
              toast.success(response.message);
              navigate("/Seller-enqury");
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (
          !userEmail.match(emailRegex) &&
          !userPhone &&
          userPassword.length < 8
        ) {
          setEmailError("Please enter valid email");
          setPasswordError(
            "password length must be at least 8 characters long"
          );
        } else if (!userEmail.match(emailRegex) && !userPhone) {
          setEmailError("Please enter valid email");
        } else if (userPassword.length < 8) {
          setPasswordError(
            "password length must be at least 8 characters long"
          );
        }
      }
    } else {
      if (!userEmail && !userPhone && !userPassword) {
        setEmailError("This field is required");
        setPasswordError("This field is required");
      } else if (!userEmail && !userPhone) {
        setEmailError("This field is required");
      } else if (!userPassword) {
        setPasswordError("This field is required");
      } else {
        setEmailError("");
        setPasswordError("");
      }
    }
  }

  return (
    <div className="bg-white">
      {isLoading ? <Loader /> : ""}
      <div className=" md:flex">
        <div className="md:w-full lg:w-1/2 px-16  py-10 !mb-0 h-full ">
          <div className="flex">
            <img src={omocIcon} className="w-[115px] h-[30px]" />
          </div>
          <div className="mt-16 xl:mt-16 lg:mt-7">
            <h1 className="text-5xl font-semibold">
              {strings.WELCOME_OMOC_SELLER}
            </h1>
            <p className="font-medium text-base text-gray-400 mt-4">
              {strings.ONLINE_MARKET_CREATINE_SELLER}
            </p>
            <div className="mt-10">
              <LoginGoogleButton
                title={strings.REGISTER_WITH_GOOGLE}
                clickBtn={() => login()}
              />
            </div>
            <div className="flex justify-center mt-4 hrlineClass">
              <p className="text-xs mx-4 font-medium text-slate-300 w-full text-center">
                {strings.SIGNUP_WITH_EMAIL}
              </p>
            </div>
            {state?.key == "phone" ? (
              <div className="mt-3 rounded-full ">
                <PhoneInput
                  enableSearch={true}
                  containerStyle={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#F5F5F5",
                    borderRadius: "50px",
                    borderRadius: "25px",
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    height: "56px",
                  }}
                  inputStyle={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  buttonStyle={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  country={"in"}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  onChange={(value, country) => {
                    let dial = country.dialCode;
                    let phone = value.slice(dial.length, value.length);
                    setUserPhone(phone);
                    setcountryCode(dial);
                    setEmailError("");
                  }}
                />
                <p className="text-[#C80000] text-sm mt-1 pl-3">{emailError}</p>
              </div>
            ) : (
              <div className="mt-5">
                <CuastomInputBox
                  placeholder={placeholder.EMAIL_PHONE}
                  isEmail={true}
                  userEmail={userEmail}
                  setUserEmail={setUserEmail}
                  setErrorHandle={setEmailError}
                />
                <p className="text-[#C80000] text-sm mt-1 pl-3">{emailError}</p>
              </div>
            )}
            <div className="mt-5">
              <CuastomInputBox
                placeholder={placeholder.PASSWORD}
                isPassword={true}
                userPassword={userPassword}
                setUserPassword={setUserPassword}
                setErrorHandle={setPasswordError}
              />
              <p className="text-[#C80000] text-sm mt-1 pl-3">
                {passwordError}
              </p>
            </div>
            <div>
              <p className="text-[#757575] ml-3 mt-5">
                {strings.BY_SIGNUP_YOU_AGREE}{" "}
                <span className="text-black font-medium">
                  {strings.TERMS_CONDITION}{" "}
                </span>
                {strings.AND}{" "}
                <span className="text-black font-medium">
                  {strings.PRIVACY_POLICY}
                </span>
              </p>
            </div>
            <div className="mt-5">
              <CustomButton
                title={strings.SIGN_UP}
                isSignup={true}
                // StoreEmail={StoreEmail}
                handleSignup={handleSignup}
              />
            </div>
            <p className="font-medium text-[#242424] text-center mt-5">
              {strings.ALREADY_HAVE_ACCOUNT}
              <span
                className="text-[#0094FF] cursor-pointer"
                onClick={() => {
                  navigate("/Sign-in", { state: { key: state?.key } });
                }}
              >
                {" "}
                {strings.SIGN_IN}
              </span>
            </p>
          </div>
          <Footer />
        </div>

        <div className="md:w-full lg:w-1/2 h-auto relative responsiveClass">
          <img src={SliderData[imgIndex].image} className="w-full !h-screen" />

          <div className=" absolute bottom-10 right-10 flex">
            <button
              className=" mr-3 bg-[#fff] h-[72px] w-[72px] rounded-full shadow-2xl flex
               justify-center items-center"
              onClick={prevSlide}
            >
              <Icon icon="ep:arrow-up" color="blue" rotate={3} />
            </button>
            <button
              className="bg-[#fff] h-[72px] w-[72px] rounded-full shadow-2xl flex
               justify-center items-center"
              onClick={nextSlide}
            >
              <Icon icon="ep:arrow-up" color="blue" rotate={1} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSeller;
