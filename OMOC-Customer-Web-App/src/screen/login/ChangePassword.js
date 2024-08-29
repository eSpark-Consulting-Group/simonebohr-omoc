import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/icon/omoc_logo.svg";
import { placeholder, strings } from "../../utils/strings";
import LoginGoogleButton from "../../component/commonComponent/LoginGoogleButton";
import CustomInputBox from "../../component/commonComponent/CustomInputBox";
import CustomButton from "../../component/commonComponent/CustomButton";
import loginBg1 from "../../assets/images/Frame 1000005441 (3).png";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../component/authComponent/Footer";
import AuthSublyApi from "../../helper/AuthApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";

const ChangePassword = () => {
  const newToken = useLocation();
  const { token } = useSelector((state) => state.userData.userDetails);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [updateToken, setUpdateToken] = useState(newToken.state);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function changePass() {
    if (newPassword !== reEnterPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    const passData = {
      token: newToken.state,
      password: newPassword,
    };
    await AuthSublyApi.changePassword(token, passData).then((response) => {
      setIsLoading(false);
      if (response.statusCode == 200) {
        navigate("/");
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <div>
      {isLoading ? <Loader /> : ""}
      <Container fluid>
        <Row className="">
          <Col md="6" className="pt-5 !px-20 max-md:mb-10">
            <Container>
              <Row>
                <Col>
                  <img src={logo} alt="logo" />
                  <div className="mt-16 xl:mt-16 lg:mt-7">
                    <h1 className="text-5xl font-semibold">
                      {strings.CHANGE_PASSWORD}
                    </h1>
                    <p className="text-base text-gray-400 mt-4 leading-7">
                      {strings.ONLINE_MARKET_CREATINE_SELLER}
                    </p>
                    <div className="mt-5">
                      <input
                        className="w-full h-14 bg-[#F5F5F5] px-4 rounded-3xl text-sm font-normal"
                        placeholder={placeholder.NEW_PASSWORD}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-4">
                      <input
                        className="w-full h-14 bg-[#F5F5F5] px-4 rounded-3xl text-sm font-normal"
                        placeholder={placeholder.CONFIRM_NEW_PASSWORD}
                        value={reEnterPassword}
                        onChange={(e) => {
                          setReEnterPassword(e.target.value);
                        }}
                      />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                      className="w-full bg-[#0094FF] h-12 rounded-3xl mt-4"
                      onClick={changePass}
                    >
                      <p className="text-white">{strings.LOGIN}</p>
                    </button>
                  </div>
                  <div className="md:block hidden w-[40%] fixed bottom-0">
                    <Footer />
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md="6" className="relative">
            <img className="w-full h-screen" src={loginBg1} alt="background" />
            <div className=" absolute bottom-10 right-10 flex">
              <button className="mr-3 bg-[#fff] h-[72px] w-[72px] rounded-full shadow-2xl flex justify-center items-center">
                <Icon icon="ep:arrow-up" color="blue" rotate={3} />
              </button>
              <button className="bg-[#fff] h-[72px] w-[72px] rounded-full shadow-2xl flex justify-center items-center">
                <Icon icon="ep:arrow-up" color="blue" rotate={1} />
              </button>
            </div>
          </Col>
        </Row>
        <div className="block md:hidden">
          <Footer />
        </div>
      </Container>
    </div>
  );
};

export default ChangePassword;
