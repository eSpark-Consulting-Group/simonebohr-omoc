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
import React, { useState } from "react";
import { ProgressCircle } from "react-native-svg-charts";

import FastImage from "react-native-fast-image";

import Slider from "@react-native-community/slider";
import VectorImage from "react-native-vector-image";
import { showMessage } from "react-native-flash-message";
import Customheader from "../../component/Customheader";
import { Colors } from "../../utils/colors";
import { appIcon, omoc_image, sliderThumb } from "../../utils/images";
import { Height } from "../../utils";
import CustomButton from "../../component/CustomButton";
import ApiService from "../../services/api.service";
import en from "../../utils/string/en";
import { GILROY_MEDIUM, GILROY_SEMIBOLD } from "../../utils/fonts";

const NewShop = ({ navigation }) => {
  const [stepCount, setStepCount] = useState(1);
  const [sellingName, setsellingName] = useState({ name: "Physical Product" });
  const [countryCode, setCountryCode] = useState("");
  const [alreadySelling, setAlreadySelling] = useState(true);
  const [businessName, setBusinessName] = useState("");
  const [shopEmail, setShopEmail] = useState("");
  const [countryName, setCountryName] = useState("");

  const getTitleText = () => {
    if (stepCount === 1) {
      return "What Will The Name of Your Business be?";
    } else if (stepCount === 2) {
      return "What Will The Email of Your Business be?";
    } else if (stepCount === 3) {
      return "Suggested username based on your business name";
    }
  };
  const getButtonText = () => {
    if (stepCount === 1) {
      return "Submit name";
    } else if (stepCount === 2) {
      return "Submit email";
    } else if (stepCount === 3) {
      return "Create Store";
    }
  };
  const onCreateShop = async () => {
    if (stepCount < 3) {
      setStepCount(stepCount + 1);
    } else {
      try {
        const requestData = {
          isAlreadySelling: alreadySelling,
          businessName: businessName,
          country: "India",
          email: shopEmail,
          category: sellingName?.name,
        };
        const response = await ApiService.createNewShop(requestData);
        console.log("response", JSON.stringify(response));
        if (response?.status) {
          navigation.navigate("OtpScreen", {
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
      <View style={{ marginTop: Height * 0.15 }}>
        {stepCount <= 3 ? (
          <Text style={styles.stepText}>{`Step ${stepCount} of 4`}</Text>
        ) : null}
        <View style={styles.subContainer}>
          <View style={{ width: "95%", marginBottom: 20 }}>
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
            <TextInput
              value={businessName}
              style={styles.businessNameTextInput}
              placeholder="Type your custom username"
              onChangeText={(text) => setBusinessName(text)}
            />
          ) : null}
          {stepCount === 2 ? (
            <TextInput
              value={shopEmail}
              style={styles.businessNameTextInput}
              placeholder="Type your custom email"
              onChangeText={(text) => setShopEmail(text)}
            />
          ) : null}
          {stepCount === 3 ? (
            <TextInput
              style={styles.businessNameTextInput}
              placeholder="Type your custom username"
            />
          ) : null}
          {stepCount === 4 ? (
            <View style={{ gap: 20, alignItems: "center" }}>
              <Text style={styles.creatingStoreText}>Creating store...</Text>
              <View style={styles.progressBarView}>
                <ProgressCircle
                  style={{ height: 72, alignItem: "center" }}
                  progress={90 / 100}
                  progressColor={Colors.skyBlueColor}
                  backgroundColor={"#0094FF33"}
                  strokeWidth={4}
                  startAngle={10}
                  animate
                  animationDuration={10000}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <FastImage
                      source={appIcon}
                      style={{ width: 40, height: 40 }}
                      resizeMode="center"
                    />
                  </View>
                </ProgressCircle>
              </View>
              <Text style={styles.loadingText}>loading...</Text>
            </View>
          ) : null}
          {stepCount <= 3 ? (
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

export default NewShop;

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
  loadingText: {
    color: "#121212",
    fontWeight: "500",
    fontSize: 20,
  },
  progressBarView: { width: 70, height: 70 },
  creatingStoreText: {
    color: "#121212",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 10,
  },
});
