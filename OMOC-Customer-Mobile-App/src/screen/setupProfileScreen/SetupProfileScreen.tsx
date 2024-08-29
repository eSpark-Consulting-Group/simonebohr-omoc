import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  grey,
  lightBlack,
  lightBlue,
  lightGrey50,
  skyBlueColor,
  whiteColor,
  black,
} from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { palceholders, strings } from "../../assets/string/strings";
import VectorImage from "react-native-vector-image";
import { profile10_icon } from "../../utils/images";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import CustomButton from "../../components/CustomButton";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import StorageService from "../../services/storage.service";
import ImagePicker from "react-native-image-crop-picker";
import FastImage from "react-native-fast-image";
import CustomImagePickerModal from "../../components/CustomImagePickerModal";
import { showMessage } from "react-native-flash-message";

const SetupProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalImage, setModalImage] = useState(false);

  useEffect(() => {
    StorageService.getUser().then((res) => {
      const data = JSON.parse(res);
      setUserName(data.user.userName);
      setDisplayName(data.user.name);
      setBio(data.user.bio);
    });
  }, []);

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setModalImage(false);
        setSelectedImage(image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setModalImage(false);
        setSelectedImage(image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSaveChanges = async () => {
    if(selectedImage !== null){
      navigation.navigate("HelpFavouriteScreen", {
        userName: userName,
        displayName: displayName,
        bio: bio,
        image: selectedImage,
      });
    }
    else{
      showMessage({
        message: "please select Image and fill all detail",
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
   
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <CustomImagePickerModal
        isVisible={modalImage}
        handleOpenCamera={() => openCamera()}
        handleOpenGallery={() => openGallery()}
        handleClose={() => setModalImage(false)}
      />
      <View style={styles.backBtnView}>
        <CustomHeaderShown
          navigation={navigation}
          title={strings.SETUP_PROFILE}
          rightheadertext={strings.SKIP}
        />
      </View>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.profileIconView}
          onPress={() => setModalImage(true)}
        >
          {selectedImage !== null ? (
            <FastImage
              style={styles.profileIcon}
              source={{ uri: selectedImage.path }}
            />
          ) : (
            <VectorImage style={styles.profileIcon} source={profile10_icon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadPhotoView}  onPress={() => setModalImage(true)}>
          <Text style={styles.uploadPhotoText}>{strings.UPLOAD_PHOTO}</Text>
        </TouchableOpacity>
        <View style={styles.inputText}>
          <Text style={styles.usernameText}>{palceholders.DISPLAY_NAME}</Text>
          <TextInput
            value={displayName}
            onChangeText={(text) => {
              setDisplayName(text);
            }}
            keyboardType={"default"}
            placeholder="Enter name"
            style={styles.placeTextStyle}
          />
        </View>
        <View style={styles.inputText}>
          <Text style={styles.usernameText}>{palceholders.USERNAME}</Text>
          <TextInput
            value={userName}
            onChangeText={(text) => {
              setUserName(text);
            }}
            placeholder="Enter name"
            style={styles.placeTextStyle}
            keyboardType={"default"}
          />
        </View>
        <View style={styles.inputText}>
          <Text style={styles.usernameText}>{palceholders.BIO}</Text>
          <TextInput
            value={bio}
            onChangeText={(text) => {
              setBio(text);
            }}
            placeholder="Enter Bio"
            style={styles.placeTextStyle}
            multiline={true}
            keyboardType={"default"}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Profile, name, and username is obtained from your Google account
            that has been registered with omoc
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <CustomButton
            text={strings.SAVE_CHANGES}
            textstyle={styles.buttonTextStyle}
            style={styles.btnStyle}
            onPress={() => onSaveChanges()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetupProfileScreen;
const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  backBtnView: {
    marginHorizontal: 15,
  },
  profileIconView: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 141,
    width: 141,
    backgroundColor: lightBlue,
    borderRadius: 70,
    marginTop: "10%",
  },
  profileIcon: {
    height: 141,
    width: 141,
    borderRadius: 70,
    resizeMode: "contain",
  },
  uploadPhotoText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 14,
    fontWeight: "500",
    color: skyBlueColor,
  },
  placeTextStyle: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 14,
    color: black,
  },
  uploadPhotoView: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  inputText: {
    paddingVertical: 12,
    width: "95%",
    borderRadius: 14,
    borderWidth: 0.8,
    paddingLeft: 15,
    padding: 10,
    borderColor: lightGrey50,
    marginTop: 15,
    alignSelf: "center",
  },
  usernameText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    marginBottom: 10,
    color: grey,
  },
  buttonTextStyle: {
    color: whiteColor,
  },
  btnContainer: {
    width: "100%",
    marginTop: "30%",
    marginBottom: 10,
  },
  textContainer: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  btnStyle: {
    backgroundColor: skyBlueColor,
  },
  text: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: lightBlack,
    lineHeight: 16,
  },
});
