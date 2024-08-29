import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import FastImage from "react-native-fast-image";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { palceholders, strings } from "../../assets/string/strings";
import { blackColor, grey, skyBlueColor, whiteColor } from "../../utils/colors";
import { GILROY_MEDIUM } from "../../utils/fonts";
import FloatInput from "../../components/FloatInput";
import CustomButton from "../../components/CustomButton";
import CountryBottomSheet from "../../components/settingComponent/CountryBottomSheet";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";
import ApiService from "../../services/api.service";
import ImagePicker from "react-native-image-crop-picker";
import CustomImagePickerModal from "../../components/CustomImagePickerModal";
import { showMessage } from "react-native-flash-message";
import Spinner from "../../components/Spinner";

const PersonalInformation = ({ navigation }) => {
  const [loder, setLoader] = useState(false);
  useEffect(() => {
    getDeatil();
  }, []);

  const [selectImagePath, setSelectImagePath] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [language, setLanguage] = useState("");
  const [showCountry, setShowCounrty] = useState(false);
  const [userName, setUserName] = useState("");
  const [modalImage, setModalImage] = useState(false);

  const getDeatil = async () => {
    try {
      setLoader(true);
      const response = await ApiService.GetProfileInterest();
      const data = response.data.data;
      setUserName(data?.userName);
      setName(data?.name);
      setPhone(data?.phone);
      setBio(data?.bio);
      setAddress(data?.email);
      setLanguage(data?.language);
      setSelectedImage(data?.profileImg);
      setLoader(false);
    } catch (e) {
      console.log("No deatil error", JSON.stringify(e));
    }
  };

  const onSaveChanges = async () => {
    try {
      const formData = new FormData();
      !!language.length && formData.append("language", language);
      !!userName.length && formData.append("userName", userName);
      !!name.length && formData.append("name", name);
      !!bio.length && formData.append("bio", bio);
      !!phone.length && formData.append("phone", phone);
      !!address.length && formData.append("email", address);
      formData.append("profile", {
        uri: selectedImage ? selectedImage : selectImagePath.path,
        type: "image/jpeg",
        name: "IMG_0004.JPG",
        filename: "IMG_0004.JPG",
      });
      const response = await ApiService.postUpdateInterest(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseData = response.message;
      showMessage({
        message: responseData,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
        position: "center",
      });
    } catch (error) {
      console.log("update profile", JSON.stringify(error));
    }
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setSelectImagePath(image);
        setSelectedImage(image.path);
        setModalImage(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setSelectImagePath(image);
        setSelectedImage(image.path);
        setModalImage(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <CustomHeaderShown
            title={strings.PERSONAL_INFORMATION}
            navigation={navigation}
          />
        </View>
        <CustomImagePickerModal
          isVisible={modalImage}
          handleOpenCamera={() => openCamera()}
          handleOpenGallery={() => openGallery()}
          handleClose={() => setModalImage(false)}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={selectedImage ? styles.topContainer : styles.borderContainer}
            onPress={() => setModalImage(true)}
          >
            <FastImage
              style={styles.profileImg}
              source={{ uri: selectedImage }}
            />
            <Text style={styles.editText}>{strings.EDIT_PROFILE}</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.inputContainer,
              { marginTop: selectedImage ? "8%" : "13%" },
            ]}
          >
            <FloatInput
              onChangeText={(text) => {
                setName(text);
              }}
              value={name}
              placeholder={palceholders.NAME}
              style={styles.inputStyle}
            />
            <FloatInput
              onChangeText={(text) => {
                setBio(text);
              }}
              value={bio}
              placeholder={palceholders.BIO}
            />
            <FloatInput
              onChangeText={(text) => {
                setPhone(text);
              }}
              value={phone}
              placeholder={palceholders.PHONE_NUMBER}
            />
            <FloatInput
              onChangeText={(text) => {
                setAddress(text);
              }}
              value={address}
              placeholder={palceholders.EMAIL_ADDRESS}
            />

            <FloatInput
              onPress={() => {
                setShowCounrty(true);
              }}
              onChangeText={(text) => {
                setLanguage(text);
              }}
              value={language}
              placeholder={palceholders.LANGUAGE}
            />
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          <CustomButton
            textstyle={styles.textStyle}
            style={styles.btn}
            text={strings.SAVE}
            onPress={() => onSaveChanges()}
          />
        </View>
        {showCountry && (
          <CountryBottomSheet
            hideMe={() => setShowCounrty(false)}
            language={language}
            setLanguage={setLanguage}
          />
        )}
      </View>
      {loder && <Spinner animating={loder} />}
    </SafeAreaView>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  mainContainer: {
    flex: 1,
  },
  header: {
    marginHorizontal: 15,
  },
  topContainer: {
    alignItems: "center",
    marginTop: "6%",
  },
  borderContainer: {
    alignSelf: "center",
    width: 75,
    height: 75,
    borderRadius: 40,
    borderColor: blackColor,
    borderWidth: 1,
    marginTop: "6%",
  },
  profileImg: {
    width: 75,
    height: 75,
    resizeMode: "contain",
    borderRadius: 40,
  },
  editText: {
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
    color: grey,
    marginTop: 15,
  },
  inputContainer: {
    gap: 10,
  },
  inputStyle: {},
  btn: {
    backgroundColor: skyBlueColor,
  },
  textStyle: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
  },
  btnContainer: {
    width: "100%",
    marginTop: 5,
    marginBottom: WINDOW_HEIGHT * 0.05,
  },
  picker: {
    marginLeft: 10,
  },
});
