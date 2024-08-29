import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/icon/omoc_logo.svg";
import { placeholder, strings } from "../../utils/strings";
import LoginGoogleButton from "../../component/commonComponent/LoginGoogleButton";
import CustomInputBox from "../../component/commonComponent/CustomInputBox";
import CustomButton from "../../component/commonComponent/CustomButton";
import loginBg1 from "../../assets/images/Frame 1000005441 (3).png";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/authComponent/Footer";
import { custGoogleAuth, custLogin } from "../../Store/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Loader from "../../utils/Loader";
import apple from "../../assets/icon/appleIcon.svg";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.userData);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signUp, setsignUp] = useState(false);
  const [mobile, setmobile] = useState(false);
  const [countryCode, setcountryCode] = useState("");

  // ===========Login Api handling function============
  async function handleLogin() {
    if (userEmail || (userPhone && userPassword)) {
      if (
        (userEmail.match(emailRegex) && userPassword.length > 7) ||
        userPhone
      ) {
        setEmailError("");
        setPasswordError("");
        const requestData = {
          ...(userEmail && { email: userEmail }),
          password: userPassword,
          ...(userPhone && { phone: userPhone }),
        };
        await dispatch(custLogin(requestData))
          .then((responseJson) => {
            const response = responseJson.payload.response;
            if (response.statusCode == 200) {
              toast.success(response.message);
              navigate("/Set-upProfile");
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (!userEmail.match(emailRegex) && userPassword.length < 7) {
          setEmailError("Please enter valid email");
          setPasswordError(
            "Password should not be less then 8 digit or character"
          );
        } else if (!userEmail.match(emailRegex)) {
          setEmailError("Please enter valid email");
        } else if (!userPassword.length < 9) {
          setPasswordError(
            "Password should not be less then 8 digit or character"
          );
        }
      }
    } else {
      if (!userEmail && !userPassword) {
        setEmailError("This field is required");
        setPasswordError("This field is required");
      } else if (!userEmail) {
        setEmailError("This field is required");
      } else if (!userPassword) {
        setPasswordError("This field is required");
      } else if (!userPhone) {
        setPasswordError("This field is required");
      } else {
        setEmailError("");
        setPasswordError("");
      }
    }
  }

  // ============Google Auth Handler===========
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      googleHandle(tokenResponse.access_token);
    },
    onFailure: (error) => console.log(error),
    onError: (error) => console.log(error),
  });

  // =============Google login and signup=============
  async function googleHandle(token) {
    await dispatch(custGoogleAuth(token))
      .then((responsejson) => {
        const response = responsejson.payload.response;
        if (response.statusCode == 200) {
          if (response.data.isFirstLogin) {
            toast.success(response.message);
            navigate("/Welcome");
          } else {
            navigate("/Set-upPhone");
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
    <div>
      {isLoading ? <Loader /> : ""}
      <Container fluid>
        <Row className="">
          <Col md="6" className="pt-5 pl-5">
            <Container>
              <Row>
                <Col>
                  <img src={logo} />
                  <div className="mt-16 xl:mt-16 lg:mt-7">
                    <h1 className="text-5xl font-semibold">
                      {strings.WELCOME_OMOC}
                    </h1>
                    <p className="font-medium text-base text-gray-400 mt-4">
                      {strings.ONLINE_MARKET_CREATINE_SELLER}
                    </p>
                    {signUp === true ? (
                      <div>
                        {mobile === true ? (
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
                                let phone = value.slice(
                                  dial.length,
                                  value.length
                                );
                                setUserPhone(phone);
                                setcountryCode(dial);
                              }}
                            />
                          </div>
                        ) : (
                          <div className="mt-3">
                            <CustomInputBox
                              placeholder={placeholder.Email}
                              isEmail={true}
                              userEmail={userEmail}
                              setUserEmail={setUserEmail}
                              setErrorHandle={setEmailError}
                            />
                            <p className="text-[#C80000] text-sm mt-1 pl-3">
                              {emailError}
                            </p>
                          </div>
                        )}

                        <div className="mt-3">
                          <CustomInputBox
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

                        <div className="flex justify-between mt-5">
                          <div className="flex gap-2 ml-3 items-center ">
                            <input type="checkBox" />
                            <p className="text-sm font-medium">
                              {strings.REMEMBER_ME}
                            </p>
                          </div>
                          <button
                            className="text-[#0094FF] font-medium"
                            onClick={() => {
                              navigate("/ForgotPassword");
                            }}
                          >
                            {strings.FORGOT_PASSWORD}
                          </button>
                        </div>
                        <div>
                          <p className="text-[#757575] ml-3 mt-5">
                            {strings.BY_LOGIN_YOU_AGREE}{" "}
                            <span className="text-black font-medium">
                              {strings.TERMS_CONDITION}{" "}
                            </span>
                            {strings.AND}{" "}
                            <span className="text-black font-medium">
                              {" "}
                              {strings.PRIVACY_POLICY}
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="my-4 space-y-4">
                        <button
                          onClick={() => setsignUp(true)}
                          className={` w-full  hover:text-white   h-[56px] border bg-[#F5F5F5] text-[#404040] hover:bg-[#0094FF] rounded-full`}
                        >
                          {strings.LOGIN_WITH_EMAIL}
                        </button>
                        <button
                          onClick={() => {
                            setsignUp(true);
                            setmobile(true);
                          }}
                          className={` w-full  hover:text-white   h-[56px] border bg-[#F5F5F5] text-[#404040] hover:bg-[#0094FF] rounded-full`}
                        >
                          {strings.LOGIN_WITH_PHONE_NUMBER}
                        </button>
                      </div>
                    )}
                    <div className="flex justify-center mt-4 hrlineClass">
                      <p className="text-xs mx-4 font-medium text-slate-300 w-full text-center">
                        {strings.SIGN_WITH_EMAIL}
                      </p>
                    </div>
                    <div className="mt-10">
                      <LoginGoogleButton
                        title={strings.LOGIN_WITH_GOOGLE}
                        clickBtn={() => login()}
                      />
                    </div>
                    <div className="mt-3">
                      <button
                        // onClick={() => clickBtn()}
                        className="w-full border rounded-[40px] py-6 px-4 flex justify-center items-center"
                      >
                        <img src={apple} className="h-6 w-6 mr-2" />
                        <p className="text-base font-medium ">
                          {" "}
                          {strings.LOGIN_WITH_APPLE}
                        </p>
                      </button>
                    </div>

                    <div className="mt-5">
                      <CustomButton
                        title={strings.LOGIN}
                        isLogin={true}
                        handleLogin={handleLogin}
                      />
                    </div>
                    <p className="font-normal text-[#242424] text-center mt-5">
                      {strings.DONT_HAVE_ACCOUNT}
                      <span
                        className="text-[#0094FF] cursor-pointer"
                        onClick={() => {
                          navigate("/Register");
                        }}
                      >
                        {strings.SIGN_UP_FREE}
                      </span>
                    </p>
                  </div>
                  <div className="md:block">
                    <Footer />
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md="6" className="relative">
            <img className="w-full h-screen" src={loginBg1} fluid />
            <div className=" absolute bottom-10 right-10 flex">
              <button
                className=" mr-3 bg-[#fff] h-[72px] w-[72px] rounded-full shadow-2xl flex justify-center items-center"
                // onClick={prevSlide}
              >
                <Icon icon="ep:arrow-up" color="blue" rotate={3} />
              </button>
              <button
                className="bg-[#fff] h-[72px] w-[72px] rounded-full shadow-2xl flex justify-center items-center"
                // onClick={nextSlide}
              >
                <Icon icon="ep:arrow-up" color="blue" rotate={1} />
              </button>
            </div>
          </Col>
        </Row>
        <div className="block  md:hidden">
          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default LoginScreen;
