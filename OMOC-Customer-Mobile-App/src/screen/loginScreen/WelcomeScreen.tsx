import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState ,useEffect} from "react";
import VectorImage from "react-native-vector-image";
import {
  blackColor,
  grey,
  lightBlack,
  lightGrey,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import {
  GILROY_BOLD,
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { showMessage } from "react-native-flash-message";
import en from "../../assets/string/en";
import { setGoogleLogin } from "../../utils/authApi";
import StorageService from "../../services/storage.service";
import { appleAuth } from "@invertase/react-native-apple-authentication";

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '773879950938-6ttvtpfocbujpsqiiie9kso5hoqcjnbl.apps.googleusercontent.com',
    });
   
   }, [])

//  -------- Google login ------
async function onGoogleButtonPress() {
  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });
  const { idToken } = await GoogleSignin.signIn();
  try {
    const response = await setGoogleLogin(idToken);
    if (response?.status === 200) {
      StorageService.setUser(response.data.data || null);
      navigation.replace("TabNavigator");
    }
  } catch (error) {
    showMessage({
      message: "Something went worng",
      duration: 3000,
      backgroundColor: skyBlueColor,
      type: "danger",
    });
  }
}

//  -------- Apple login ------
const onAppleButtonPress = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    console.log(appleAuthRequestResponse);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Header}>
          <Text style={styles.HeaderBigText}>
            {strings.WELCOME}
            <Text style={styles.OmocColor}> {strings.OMOC}</Text>
          </Text>
        </View>
        <View style={styles.HeaderSmallText}>
          <Text style={styles.FirstTextColor}>
            {strings.LOGIN_HEADING}
            <Text style={styles.HeaderTextFAQ} onPress={() => {}}>
              {strings.FAQ}
            </Text>
            {strings.ABOUT_OMOC}
          </Text>
        </View>
        <View style={styles.Login}>
          <TouchableOpacity
            style={styles.LoginInput}
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            <Text style={styles.LoginText}>{strings.LOGIN_WITH_EMAIL}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.LoginPNView}>
          <TouchableOpacity
            style={styles.LoginPN}
            onPress={() => {
              navigation.navigate("LoginPhone");
            }}
          >
            <Text style={styles.LoginPNText}>
              {strings.LOGIN_WITH_PHONE_NUMBER}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Divider}>
          <View style={styles.DividerLine} />
          <View>
            <Text style={styles.DividerText}>{strings.LOGIN_WITH}</Text>
          </View>
          <View style={styles.DividerLine} />
        </View>
        <View style={styles.LoginWithGoogleInput}>
          <TouchableOpacity
            style={styles.LoginWithGoogle}
            onPress={() =>onGoogleButtonPress()}>
            <View style={styles.LoginWithAppleInput}>
              <VectorImage
                source={require("../../assets/google_icon.svg")}
                style={styles.GoogleImage}
              />
              <Text style={styles.LoginWithGoogleText}>
                {strings.LOGIN_WITH_GOOGLE}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.LoginWithApple}>
          <TouchableOpacity
            style={styles.LoginWithGoogle}
            onPress={() => onAppleButtonPress()}
          >
            <View style={styles.LoginWithAppleInput}>
              <VectorImage
                source={require("../../assets/apple_icon.svg")}
                style={styles.AppleImage}
              />
              <Text style={styles.LoginWithGoogleText}>
                {strings.LOGIN_WITH_APPLE}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.TextByLogging}>
          <Text style={styles.TextByLoginColor}>
            {strings.AGREEMENT}
            <Text style={styles.TermsText} onPress={() => {}}>
              {strings.TERMS_CONDITIONS}
            </Text>
            <Text> {strings.AND} </Text>
            <Text style={styles.PrivacyText} onPress={() => {}}>
              {strings.PRICACY_POLICY}
            </Text>
          </Text>
        </View>
        <View style={styles.Bottom}>
          <Text style={styles.BottomText}>
            {strings.CREATE_ACCOUNT}
            <Text
              style={styles.SignUp}
              onPress={() => {
                navigation.navigate("SignUpScreen");
              }}
            >
              {strings.SING_UP}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  Header: {
    marginTop: 30,
  },
  HeaderBigText: {
    fontSize: 32,
    fontWeight: "700",
    color: neutralBlack,
    textAlign: "center",
    fontFamily: GILROY_BOLD,
  },
  OmocColor: {
    color: skyBlueColor,
  },
  HeaderSmallText: {
    marginTop: 15,
    marginHorizontal: 35,
    alignSelf: "center",
  },
  FirstTextColor: {
    lineHeight: 25,
    textAlign: "center",
    color: lightBlack,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: GILROY_SEMIBOLD,
  },
  HeaderTextFAQ: {
    color: "#0691cc",
    fontSize: 12,
    fontWeight: "400",
    marginHorizontal: 10,
    fontFamily: GILROY_REGULAR,
  },
  EmailInput: {
    alignItems: "center",
    marginTop: 45,
  },
  ViewImg: {
    width: 25,
    height: 19,
  },
  Login: {
    alignItems: "center",
    marginTop: "25%",
  },
  LoginInput: {
    borderRadius: 24,
    borderWidth: 0.09,
    width: "92%",
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: skyBlueColor,
  },
  LoginPNView: {
    alignItems: "center",
    marginTop: 10,
  },
  LoginPN: {
    borderRadius: 24,
    borderWidth: 0.09,
    width: "92%",
    height: 51,
    backgroundColor: lightGrey,
    alignItems: "center",
    justifyContent: "center",
  },
  LoginPNText: {
    fontWeight: "500",
    textAlign: "center",
    fontFamily: GILROY_MEDIUM,
    color: blackColor,
  },
  LoginText: {
    fontWeight: "500",
    textAlign: "center",
    fontFamily: GILROY_MEDIUM,
    color: whiteColor,
  },

  Divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 10,
    width: "92%",
    alignSelf: "center",
  },
  DividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  DividerText: {
    textAlign: "center",
    marginHorizontal: 10,
    color: grey,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    fontFamily: GILROY_REGULAR,
  },
  LoginWithGoogle: {
    borderRadius: 24,
    borderWidth: 0.09,
    height: 51,
    backgroundColor: lightGrey,
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
  },
  LoginWithGoogleInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  LoginWithApple: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  GoogleImage: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  LoginWithGoogleText: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
  },
  BetweenAppleGoogle: {
    alignItems: "center",
    marginTop: 30,
  },
  LoginWithAppleInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  AppleImage: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  LoginWithAppleText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  TextByLogging: {
    alignItems: "center",
    marginTop: "30%",
    marginHorizontal: 30,
  },
  TextByLoginColor: {
    textAlign: "center",
    fontWeight: "400",
    color: lightBlack,
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    lineHeight: 21,
  },
  TermsText: {
    fontWeight: "400",
    color: "black",
    fontSize: 13,
  },
  PrivacyText: {
    fontWeight: "400",
    color: "black",
    fontSize: 13,
  },
  Bottom: {
    marginTop: 30,
  },
  BottomText: {
    color: grey,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
  SignUp: {
    color: "#0691cc",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
});
