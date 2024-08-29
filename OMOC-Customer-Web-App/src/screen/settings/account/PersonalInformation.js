import React, { useEffect, useState } from "react";
import SettingsSideBar from "../../../component/commonComponent/SettingsSideBar";
import { placeholder, strings } from "../../../utils/strings";
import editIcon from "../../../assets/icon/edit_icon.svg";
import SettingSublyApi from "../../../helper/SettingsApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductSublyApi from "../../../helper/ProductApi";

const PersonalInformation = ({ setIsLoading }) => {
  const { token } = useSelector((state) => state.userData.userDetails);

  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userLanguage, setUserLanguage] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userInformation, setUserInformation] = useState();
  const [profileImg, setProfileImg] = useState();
  const [imageFile, setImageFile] = useState("");
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("profile", file);
      setProfileImg(URL.createObjectURL(file));
      setImageFile(formData);
    }
  };

  async function updateUserInformation() {
    setIsLoading(true);
    const formData = new FormData();
    // Append all user data fields to FormData
    userName && formData.append("name", userName);
    userPhone && formData.append("phone", userPhone);
    userEmail && formData.append("email", userEmail);
    userBio && formData.append("bio", userBio);
    userLanguage && formData.append("language", userLanguage);
    userPassword && formData.append("password", userPassword);
    if (imageFile) {
      // Append image file if available
      formData.append("profile", imageFile.get("profile"));
    }
    await SettingSublyApi.upDatePersonalInformation(formData, token).then(
      (response) => {
        setIsLoading(false);
        if (response.statusCode === 200) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    );
  }

  useEffect(() => {
    async function userDetails() {
      setIsLoading(true);
      await SettingSublyApi.fetchPersonalInformation(token).then((response) => {
        setIsLoading(false);
        if (response.statusCode == 200) {
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
      setUserPhone(userInformation.phone || "");
      setUserEmail(userInformation.email || "");
      setUserLanguage(userInformation.language || "");
      setUserPassword(userInformation.password || "");
    }
  }, [userInformation]);

  return (
    <div className="bg-white rounded-xl p-3">
      <p className="text-2xl font-medium">{strings.PERSONAL_INFORMATION}</p>
      <label htmlFor="fileInput" className="flex justify-center relative">
        <div>
          <img
            className="rounded-full w-32 h-32"
            src={userInformation?.profileImg}
            alt="Profile"
          />
          <div className="w-10 h-10 rounded-full bg-[#9039FF] absolute bottom-0 ml-20 border-2 border-white flex justify-center items-center">
            <label htmlFor="fileInput">
              <img src={editIcon} alt="Edit" />
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </label>
      <div className="my-5">
        <input
          placeholder={placeholder.NAME}
          className="rounded-[14px] border-[1px] p-3 w-full my-1"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          placeholder={placeholder.BIO}
          className="rounded-[14px] border-[1px] p-3 w-full my-1"
          value={userBio}
          onChange={(e) => {
            setUserBio(e.target.value);
          }}
        />
        <input
          placeholder={placeholder.PHONE_NUMBER}
          className="rounded-[14px] border-[1px] p-3 w-full my-1"
          value={userPhone}
          onChange={(e) => {
            setUserPhone(e.target.value);
          }}
        />
        <input
          placeholder={placeholder.EMAIL_ADDRESS}
          className="rounded-[14px] border-[1px] p-3 w-full my-1"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <input
          placeholder={placeholder.LANGUAGE}
          className="rounded-[14px] border-[1px] p-3 w-full my-1"
          value={userLanguage}
          onChange={(e) => {
            setUserLanguage(e.target.value);
          }}
        />
        <input
          placeholder={placeholder.PASSWORD}
          className="rounded-[14px] border-[1px] p-3 w-full my-1"
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
        <button
          className="bg-[#0094FF] rounded-3xl px-4 py-2 mt-3"
          onClick={() => {
            updateUserInformation();
          }}
          // disabled={
          //   userName &&
          //   userBio &&
          //   userLanguage &&
          //   userEmail &&
          //   userPassword &&
          //   userPhone
          //     ? false
          //     : true
          // }
        >
          <p className="text-white font-medium">{strings.SAVE}</p>
        </button>
      </div>
    </div>
  );
};

export default PersonalInformation;
