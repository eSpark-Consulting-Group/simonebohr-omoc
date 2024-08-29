import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import FastImage from "react-native-fast-image";
import Customheader from "../../../component/Customheader";
import { CONTEXT } from "../../../utils/string/strings";
import { Colors } from "../../../utils/colors";
import { Height } from "../../../utils";
import { GILROY_MEDIUM, GILROY_SEMIBOLD } from "../../../utils/fonts";
import CustomButton from "../../../component/CustomButton";
import Slider from "@react-native-community/slider";
import { appIcon, arrow_down, sliderThumb } from "../../../utils/images";
import CountryPicker from "react-native-country-picker-modal";
import ApiService from "../../../services/api.service";
import { showMessage } from "react-native-flash-message";
import en from "../../../utils/string/en";
import { validateEmail } from "../../../utils/Validate";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const categoryList = [
  { id: 1, name: "Physical Product" },
  { id: 2, name: "Physical Product" },
  { id: 3, name: "Service" },
];

const CreateNewShop = ({ navigation }) => {
  const [stepCount, setStepCount] = useState(1);
  const [sellingName, setsellingName] = useState({
    id: 1,
    name: "Physical Product",
  });
  const [countryCode, setCountryCode] = useState("");
  const [shopEmail, setShopEmail] = useState("");
  const [countryName, setCountryName] = useState("");
  const [alreadySelling, setAlreadySelling] = useState(true);
  const [businessName, setBusinessName] = useState("");

  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotateZ: `-${rotation.value}deg`,
        },
      ],
    }),
    [rotation.value]
  );

  useEffect(() => {
    const cleanup = () => {
      cancelAnimation(rotation);
      rotation.value = 0;
    };

    if (true) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 700,
          easing: Easing.linear,
        }),
        -1
      );
    } else {
      cleanup();
    }
    return cleanup;
  }, [rotation]);

  const getTitleText = () => {
    if (stepCount === 1) {
      return "Are you already Selling?";
    } else if (stepCount === 2) {
      return "What Products Are You Selling?";
    } else if (stepCount === 3) {
      return "What Will The Name of Your Business be?";
    } else if (stepCount === 4) {
      return "What Will The Email of Your Business be?";
    } else if (stepCount === 5) {
      return "Where is Your Business Located?";
    }
  };
  const getButtonText = () => {
    if (stepCount === 1 || stepCount === 2) {
      return "Next";
    } else if (stepCount === 3) {
      return "Submit name";
    } else if (stepCount === 4) {
      return "Submit email";
    } else if (stepCount === 5) {
      return "Create Store";
    }
  };
  const onCountrySelect = (country) => {
    setCountryCode(country.cca2);
  };

  const renderCategoryList = ({ item }) => {
    const found = sellingName?.id === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.buttonsView,
          {
            backgroundColor: found ? Colors.purpleColor : Colors.lightGrey,
          },
        ]}
        onPress={() => {
          setsellingName(item);
        }}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: found ? Colors.whiteColor : Colors.neutralBlack,
            },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const onCreateShop = async () => {
    if (stepCount === 3 && !businessName.trim().length) {
      showMessage({
        message: en.bussinessNameError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
      return;
    } else if (stepCount === 4) {
      if (!shopEmail.trim().length) {
        showMessage({
          message: en.emailError,
          duration: 3000,
          backgroundColor: Colors.skyBlueColor,
          type: "danger",
        });
        return;
      } else if (!validateEmail(shopEmail)) {
        showMessage({
          message: en.InvalidEmailError,
          duration: 3000,
          backgroundColor: Colors.skyBlueColor,
          type: "danger",
        });
        return;
      }
    }
    if (stepCount <= 4) {
      setStepCount(stepCount + 1);
    } else {
      setStepCount(stepCount + 1);
      setTimeout(() => {
        callApi();
      }, 500);
    }
  };

  const callApi = async () => {
    try {
      const requestData = {
        isAlreadySelling: alreadySelling,
        businessName: businessName,
        country: "India",
        email: shopEmail,
        category: sellingName?.name,
      };
      const response = await ApiService.createNewShop(requestData);
      if (response?.status) {
        navigation.replace("OtpScreen", {
          data: response.data,
        });
      }
    } catch (e) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Customheader
        showBackIcon={true}
        title={"Create New Shop"}
        Containerstyle={{ marginTop: 10, paddingBottom: 5 }}
      />
      <View style={styles.subComponent}>
        <Text style={styles.stepText}>{`Step ${stepCount} of 6`}</Text>
        <View style={styles.subContainer}>
          <View style={styles.sliderView}>
            <Slider
              style={{ borderRadius: 100 }}
              value={stepCount}
              minimumValue={1}
              maximumValue={4}
              minimumTrackTintColor={Colors.skyBlueColor}
              maximumTrackTintColor={Colors.lightGrey}
              thumbImage={sliderThumb}
            />
          </View>
          <Text style={styles.titleText}>{getTitleText()}</Text>
          {stepCount === 1 ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.buttonView,
                  {
                    backgroundColor: alreadySelling
                      ? Colors.purpleColor
                      : Colors.lightGrey,
                  },
                ]}
                onPress={() => {
                  setAlreadySelling(true);
                }}
              >
                <Text
                  style={[
                    styles.textButton,
                    {
                      color: alreadySelling
                        ? Colors.whiteColor
                        : Colors.neutralBlack,
                    },
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonView,
                  {
                    backgroundColor: !alreadySelling
                      ? Colors.purpleColor
                      : Colors.lightGrey,
                  },
                ]}
                onPress={() => {
                  setAlreadySelling(false);
                }}
              >
                <Text
                  style={[
                    styles.textButton,
                    {
                      color: !alreadySelling
                        ? Colors.whiteColor
                        : Colors.neutralBlack,
                    },
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {stepCount === 2 ? (
            <View style={{ gap: 15, width: "95%" }}>
              <FlatList data={categoryList} renderItem={renderCategoryList} />
            </View>
          ) : null}
          {stepCount === 3 ? (
            <TextInput
              value={businessName}
              style={styles.businessNameTextInput}
              placeholder="Type your custom username"
              onChangeText={(text) => setBusinessName(text)}
            />
          ) : null}
          {stepCount === 4 ? (
            <TextInput
              value={shopEmail}
              style={styles.businessNameTextInput}
              placeholder="Type your custom email"
              onChangeText={(text) => setShopEmail(text)}
              autoCapitalize="none"
            />
          ) : null}
          {stepCount === 5 ? (
            <>
              <TextInput
                style={styles.businessNameTextInput}
                placeholder="Type your custom username"
              />
              <View style={styles.viewInputCOUNTRY}>
                <CountryPicker
                  {...{
                    countryCode,
                    onSelect: onCountrySelect,
                    withFlag: true,
                    withFilter: true,
                    withCountryNameButton: true,
                    withEmoji: true,
                    modalProps: {},
                  }}
                  containerButtonStyle={{ height: 100 }}
                />
              </View>
            </>
          ) : null}
          {stepCount === 6 ? (
            <View>
              <View style={{ gap: 20, alignItems: "center" }}>
                <Text style={styles.creatingStoreText}> Creating store...</Text>
                <View style={styles.progressBarView}>
                  <Animated.View
                    style={[styles.loaderView, animatedStyles]}
                  ></Animated.View>
                  <FastImage
                    source={appIcon}
                    style={styles.logoImage}
                    resizeMode="center"
                  />
                </View>
                <Text style={styles.loadingText}>loading...</Text>
              </View>
            </View>
          ) : null}
          {stepCount <= 5 ? (
            <View style={{ width: "100%", marginTop: 50 }}>
              <CustomButton
                text={getButtonText()}
                style={styles.button}
                textstyle={styles.btnName}
                onPress={onCreateShop}
              />
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateNewShop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 50,
    width: "90%",
    marginTop: 30,
    alignSelf: "center",
    borderRadius: 24,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    color: Colors.whiteColor,
  },
  buttonView: {
    width: "47%",
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.purpleColor,
  },
  button: {
    backgroundColor: Colors.skyBlueColor,
  },
  btnName: {
    color: Colors.whiteColor,
    fontWeight: "500",
    fontSize: 16,
  },
  titleText: {
    textAlign: "center",
    width: "90%",
    color: "#222222",
    fontWeight: "500",
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 24,
    marginBottom: 20,
  },
  stepText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.lightBlack,
  },

  buttonsView: {
    backgroundColor: Colors.skyBlueColor,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    width: "100%",
    marginTop: 15,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
  businessNameTextInput: {
    backgroundColor: Colors.lightGrey,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    width: "95%",
    marginTop: 15,
    paddingHorizontal: 15,
  },
  progressBarView: {},
  creatingStoreText: {
    color: "#121212",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 10,
  },
  loadingText: {
    color: "#121212",
    fontWeight: "500",
    fontSize: 20,
  },
  logoImage: {
    width: 40,
    height: 40,
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    top: 15,
  },
  loaderView: {
    width: 70,
    height: 70,
    backgroundColor: "transparent",
    marginBottom: 10,
    borderRadius: 100,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderColor: Colors.skyBlueColor,
  },
  sliderView: { width: "95%", marginBottom: 25 },
  subComponent: { marginTop: Height * 0.15 },
});
