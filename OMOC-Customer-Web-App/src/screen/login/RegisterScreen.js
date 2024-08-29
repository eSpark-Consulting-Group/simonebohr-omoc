import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/icon/omoc_logo.svg";
import { placeholder, strings } from "../../utils/strings";
import LoginGoogleButton from "../../component/commonComponent/LoginGoogleButton";
import CustomInputBox from "../../component/commonComponent/CustomInputBox";
import CustomButton from "../../component/commonComponent/CustomButton";
import Footer from "../../component/authComponent/Footer";
import loginBg1 from "../../assets/images/Frame 1000005441 (3).png";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { custGoogleAuth, custSignup } from "../../Store/Slices/AuthSlice";
import { useGoogleLogin } from "@react-oauth/google";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Loader from "../../utils/Loader";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.userData);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signUp, setsignUp] = useState(false);
  const [mobile, setmobile] = useState(false);
  const [usercountryCode, setusercountryCode] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  // ===========Signup Api handling function============
  async function handleSignup() {
    if (userEmail || (userPhone && userPassword && userName)) {
      if (
        (userEmail.match(emailRegex) && userPassword.length > 7) ||
        userPhone
      ) {
        const requestData = {
          ...(userEmail && { email: userEmail }),
          ...(userName && { userName: userName }),
          ...(name && { name: name }),
          ...(dob && { dob: dob }),
          password: userPassword,
          ...(userPhone && { phone: userPhone, countryCode: usercountryCode }),
        };
        await dispatch(custSignup(requestData))
          .then((responseJson) => {
            const response = responseJson.payload.response;
            if (response.statusCode == 200) {
              toast.success(response.message);
              navigate("/Verification", { state: { isLogin: false } });
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
          setPasswordError("Password should be less then 9 digit or character");
        } else if (!userEmail.match(emailRegex)) {
          setEmailError("Please enter valid email");
        } else if (!userPassword.length < 9) {
          setPasswordError("Password should be less then 9 digit or character");
        } else if (!userName.length < 3) {
          setUserNameError(
            "User Name should be less then 3 digit or character"
          );
        } else if (!name.length < 3) {
          setNameError("Name should be less then 3 digit or character");
        } else if (!userPassword.length < 4) {
          setDobError("Date of birth should be less then 4 digit or character");
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
      } else if (!userName) {
        setPasswordError("This field is required");
      } else if (!name) {
        setPasswordError("This field is required");
      } else if (!dob) {
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
            navigate("/Home");
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
          <Col md="6" className="pt-5 pl-5 px-8">
            <Container>
              <Row>
                <Col className="!px-20">
                  <img src={logo} />
                  <div className="mt-16 xl:mt-16 lg:mt-7">
                    <h1 className="text-5xl font-semibold">
                      {strings.SIGN_UP}
                    </h1>
                    <p className="font-medium text-base text-gray-400 mt-4">
                      {strings.BRING_SHOPING_FEELING_WITH_YOUR_FRIEND}
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
                                setusercountryCode(dial);
                              }}
                            />
                          </div>
                        ) : (
                          <div className="mt-5">
                            <input
                              className="w-full h-14 bg-[#F5F5F5] px-4 rounded-3xl text-sm font-normal mb-3"
                              placeholder={placeholder.NAME}
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                            <p className="text-[#C80000] text-sm mt-1 pl-3">
                              {nameError}
                            </p>
                            <input
                              className="w-full h-14 bg-[#F5F5F5] px-4 rounded-3xl text-sm font-normal mb-3"
                              placeholder={strings.USER_NAME}
                              value={userName}
                              onChange={(e) => {
                                setUserName(e.target.value);
                              }}
                            />
                            <p className="text-[#C80000] text-sm mt-1 pl-3">
                              {userNameError}
                            </p>
                            <input
                              className="w-full h-14 bg-[#F5F5F5] px-4 rounded-3xl text-sm font-normal mb-3"
                              placeholder={strings.DATE_OF_BIRTH}
                              type="date"
                              value={dob}
                              onChange={(e) => {
                                setDob(e.target.value);
                              }}
                            />
                            <p className="text-[#C80000] text-sm mt-1 pl-3">
                              {dobError}
                            </p>
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
                        <div className="flex gap-3 mt-3">
                          <input type="checkbox" />
                          <p className="text-sm text-[#9E9E9E]">
                            {strings.I_AGREE_TO_TERMS_AND_SERVICE_POLICY}
                          </p>
                        </div>
                        <div className="mt-5">
                          <CustomButton
                            title={strings.REGISTER}
                            isSignup={true}
                            handleSignup={handleSignup}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="my-4 space-y-4">
                        <button
                          onClick={() => setsignUp(true)}
                          className={` w-full  hover:text-white   h-[56px] border bg-[#F5F5F5] text-[#404040] hover:bg-[#0094FF] rounded-full`}
                        >
                          {strings.SIGNUP_WITH_EMAIL_}
                        </button>
                        <button
                          onClick={() => {
                            setsignUp(true);
                            setmobile(true);
                          }}
                          className={` w-full  hover:text-white   h-[56px] border bg-[#F5F5F5] text-[#404040] hover:bg-[#0094FF] rounded-full`}
                        >
                          {strings.SIGNUP_WITH_PHONE_NUMBER}
                        </button>
                      </div>
                    )}
                    <p className="font-normal text-[#242424] text-center mt-5">
                      {strings.ALREADY_HAVE_ACCOUNT}
                      <span
                        className="text-[#0094FF] cursor-pointer"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        {" "}
                        {strings.SIGNIN}
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
            <img className="w-full h-screen" src={loginBg1} />
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

export default RegisterScreen;
