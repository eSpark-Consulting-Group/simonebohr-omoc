import React, { useState } from "react";
import { placeholder, strings } from "../utils/strings";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../assets/CommonStyling/CommonStyling.css";
import bgImg from "../assets/image/sellerBg_img.png";
import bgImg3 from "../assets/image/sellerBg_3_img.png";
import bgImg2 from "../assets/image/sellerBg_2_img.png";
import Footer from "../component/Footer";
import omocIcon from "../assets/icon/web-logo.svg";
import LoginGoogleButton from "../component/LoginGoogleButton";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { sellerGoogleAuth } from "../Store/Slices/AuthSlice";
import { shopDetails } from "../Store/Slices/DashboardSlice";

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

function SignUpWith() {
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nextSlide = () => {
    // setImgIndex(imgIndex + 1);
    if (imgIndex < SliderData.length - 1) {
      setImgIndex(imgIndex + 1);
    }
  };
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

  const prevSlide = () => {
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1);
    }
  };

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }
  return (
    <div className="bg-white">
      <div className="lg:flex h-full">
        <div className="md:w-full lg:w-1/2 px-16  py-10 !mb-0  pb-6">
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
            <div className="my-4 space-y-4">
              <button
                onClick={() => {
                  navigate("/Sign-up", { state: { key: "email" } });
                }}
                className={` w-full  hover:text-white   h-[56px] border bg-[#F5F5F5] text-[#404040] hover:bg-[#0094FF] rounded-full`}
              >
                {strings.SIGN_UP_WITH_EMAIL}
              </button>
              <button
                onClick={() => {
                  navigate("/Sign-up", { state: { key: "phone" } });
                }}
                className={` w-full  hover:text-white   h-[56px] border bg-[#F5F5F5] text-[#404040] hover:bg-[#0094FF] rounded-full`}
              >
                {strings.SIGN_UP_WITH_PHONE_NUMBER}
              </button>
            </div>
            <p className="font-medium text-[#242424] text-center mt-5">
              {strings.ALREADY_HAVE_ACCOUNT}
              <span
                className="text-[#0094FF] cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                {" "}
                {strings.SIGN_IN}
              </span>
            </p>
          </div>
          <Footer />
        </div>

        <div className="md:w-full lg:w-1/2 h-auto relative ">
          <img src={SliderData[imgIndex].image} className="w-full !h-screen" />
          <div className=" absolute bottom-10 right-10 flex">
            <button
              className=" mr-3 bg-[#fff] h-[72px] w-[72px] rounded-full shadow-2xl flex justify-center items-center"
              onClick={prevSlide}
            >
              <Icon icon="ep:arrow-up" color="blue" rotate={3} />
            </button>
            <button
              className="bg-[#fff] h-[72px] w-[72px] rounded-full shadow-2xl flex justify-center items-center"
              onClick={nextSlide}
            >
              <Icon icon="ep:arrow-up" color="blue" rotate={1} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpWith;
