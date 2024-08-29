import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import loginBg1 from "../../assets/images/Frame 1000005441 (3).png";
import { placeholder, strings } from "../../utils/strings";
import profileIcon from "../../assets/icon/profile.svg";
import { useNavigate } from "react-router-dom";
import SettingSublyApi from "../../helper/SettingsApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SetUpProfile = () => {
  const { token } = useSelector((state) => state.userData.userDetails);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [profileImg, setProfileImg] = useState([]);
  const [userInformation, setUserInformation] = useState();
  console.log("IMAGE", imageFile);
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("profile", file);
      setProfileImg(URL.createObjectURL(file));
      setImageFile(formData);
    }
  };
  console.log("LENGTH", profileImg?.length);
  async function updateUserInformation() {
    // setIsLoading(true);
    const formData = new FormData();
    userName && formData.append("userName", userName);
    name && formData.append("name", name);
    userBio && formData.append("bio", userBio);
    if (imageFile) {
      formData.append("profile", imageFile.get("profile"));
    }
    await SettingSublyApi.upDatePersonalInformation(formData, token).then(
      (response) => {
        // setIsLoading(false);
        if (response.statusCode === 200) {
          toast.success(response.message);
          navigate("/Home");
        } else {
          toast.error(response.message);
        }
      }
    );
  }

  useEffect(() => {
    async function userDetails() {
      // setIsLoading(true);
      await SettingSublyApi.fetchPersonalInformation(token).then((response) => {
        // setIsLoading(false);
        if (response.statusCode == 200) {
          console.log("DATA", response.data);
          setUserInformation(response.data);
        }
      });
    }
    userDetails();
  }, []);
  useEffect(() => {
    if (userInformation) {
      setUserBio(userInformation.bio || "");
      setUserName(userInformation.userName || "");
      setName(userInformation.name || "");
    }
  }, [userInformation]);
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="6">
            <div className="flex items-center justify-center">
              <div className="p-5 ">
                <div className="flex justify-between">
                  <Icon icon="ep:arrow-up" rotate={3} />
                  <p className="text-[28px] font-medium">
                    {strings.SETUP_PROFILE}
                  </p>
                  <p></p>
                </div>
                <div className="">
                  <label
                    htmlFor="fileInput"
                    className="h-36 w-36 rounded-full bg-[#E8F5FF] mx-auto flex items-center justify-center"
                  >
                    {userInformation?.profileImg?.length === 0 ? (
                      <img src={profileIcon} />
                    ) : (
                      <img
                        className="h-36 w-36 rounded-full"
                        src={userInformation?.profileImg}
                      />
                    )}
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <p className="text-center my-2 text-[#0094FF] text-sm font-medium">
                    {strings.UPLOAD_PHOTO}
                  </p>

                  <div className="border-[1px] border-[#E0E0E0] rounded-[14px] p-2 w-full mx-auto mt-5">
                    <p className="text-xs text-[#9E9E9E]">
                      {strings.DISPLY_NAME}
                    </p>
                    <input
                      className="w-full focus:outline-none"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="border-[1px] border-[#E0E0E0] rounded-[14px] p-2 w-full mx-auto mt-3">
                    <p className="text-xs text-[#9E9E9E]">
                      {strings.USER_NAME}
                    </p>
                    <input
                      className="w-full focus:outline-none"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="border-[1px] border-[#E0E0E0] rounded-[14px] p-2 w-full mx-auto mt-3">
                    <p className="text-xs text-[#9E9E9E]">{placeholder.BIO}</p>
                    <input
                      className="w-full focus:outline-none"
                      value={userBio}
                      onChange={(e) => {
                        setUserBio(e.target.value);
                      }}
                    />
                  </div>
                  <div className=" my-3 flex justify-center">
                    <p className="text-sm text-[#757575] w-full">
                      {strings.PROFILE_NAME_USERNAME_REGISTERED_WITH_OMOC}
                    </p>
                  </div>
                  <div className="items-center w-full  flex">
                    <button
                      className="rounded-3xl bg-[#0094FF] w-full mx-auto py-2"
                      onClick={() => {
                        updateUserInformation();
                      }}
                    >
                      <p className="text-white">{strings.SAVE_CHANGES}</p>
                    </button>
                  </div>
                  <div className="items-center w-full  flex my-3">
                    <button
                      className="rounded-3xl border-[1px] border-[#0094FF] w-full mx-auto py-2"
                      onClick={() => {
                        navigate("/Home");
                      }}
                    >
                      <p className=" text-[#0094FF]">{strings.SKIP}</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
      </Container>
    </div>
  );
};

export default SetUpProfile;
