import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import { palceholders, strings } from "../../utils/string/strings";
import {
  GILROY_BOLD,
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { eye_view, google_icon, hide } from "../../utils/images";
import FastImage from "react-native-fast-image";
import { validateEmail, validatePassword } from "../../utils/Validate";
import {
  loginWithGoogle,
  signUpWithEmailAndPassword,
} from "../../utils/authApi";
import { showMessage } from "react-native-flash-message";
import en from "../../utils/string/en";
import StorageService from "../../services/storage.service";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Spinner from "../../component/Spinner";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordShow, setpasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = () => {
    if (email === "" || password === "") {
      return false;
    }
    return true;
  };

  const onPressSignup = async () => {
    let isFormValid = false;
    if (email.length === 0 || !validateEmail(email)) {
      showMessage({
        message: en.InvalidEmailError,
        duration: 3000,
        backgroundColor: Colors.errorRed,
        type: "danger",
      });
      isFormValid = false;
    } else if (password.length < 8 || !validatePassword(password)) {
      isFormValid = false;
      showMessage({
        message: en.InvalidPasswordError,
        duration: 3000,
        backgroundColor: Colors.errorRed,
        type: "danger",
      });
    } else {
      isFormValid = true;
    }

    if (isFormValid) {
      setIsLoading(true);
      try {
        const response = await signUpWithEmailAndPassword({
          email,
          password,
        });
        setIsLoading(false);
        if (response?.status === 200) {
          StorageService.setUser(response?.data?.data || null);
          navigation.navigate("CreateNewShop");
        }
      } catch (error) {
        setIsLoading(false);
        console.log('response signup error',JSON.stringify(error.response.data.message))
        showMessage({
          message: error?.response?.data?.message || en.InternalServerError,
          duration: 3000,
          backgroundColor: Colors.errorRed,
          type: "danger",
        });
      }
    }
  };
  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const { idToken } = await GoogleSignin.signIn();
    try {
      const response = await loginWithGoogle(idToken);
      if (!!response.status) {
        StorageService.setUser(response.data || null);
        if (!!response.data.isShopExists) {
          navigation.replace("TabNavigator");
        } else {
          navigation.navigate("CreateNewShop");
        }
      }
    } catch (error) {
      showMessage({
        message: "Something went worng",
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.subContainer} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.Header}>
          <Text style={styles.HeaderBigText}>{strings.SING_UP}</Text>
        </View>
        <View style={styles.HeaderSmallText}>
          <Text style={styles.FirstTextColor}>
            {strings.LOREM_IPSUM}
            <Text style={styles.HeaderTextFAQ} onPress={() => {}}>
              {strings.FAQ}
            </Text>
            {strings.ABOUT_OMOC}
          </Text>
        </View>
        <View style={styles.EmailInput}>
          <TextInput
            style={styles.EmailText}
            placeholder={palceholders.EMAIL_NUMBER}
            placeholderTextColor={Colors.grey}
            onChangeText={(text) => {
              setEmail(text);
            }}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.PasswordInput}>
          <TextInput
            style={styles.PasswordText}
            secureTextEntry={!passwordShow}
            placeholder={palceholders.PASSWORD}
            placeholderTextColor={Colors.grey}
            onChangeText={(text) => {
              setpassword(text);
            }}
          />
          <TouchableOpacity onPress={() => setpasswordShow(!passwordShow)}>
            {passwordShow ? (
              <VectorImage
                source={hide}
                style={styles.ViewImg}
                tintColor={"black"}
              />
            ) : (
              <VectorImage source={eye_view} style={styles.ViewImg} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.Login}>
          <TouchableOpacity
            onPress={() => onPressSignup()}
            style={[
              styles.LoginInput,
              {
                backgroundColor: isValid()
                  ? Colors.skyBlueColor
                  : Colors.lightGrey,
                borderColor: isValid()
                  ? Colors.skyBlueColor
                  : Colors.mediumGrey,
                borderWidth: 0.4,
              },
            ]}
          >
            <Text
              style={[
                styles.LoginText,
                { color: isValid() ? Colors.whiteColor : Colors.lightGrey50 },
              ]}
            >
              {strings.SING_UP}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotScreen");
          }}
        >
          <Text style={styles.ForgotText}>{strings.FORGOT_PASSWORD}</Text>
        </TouchableOpacity>
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
            onPress={() => onGoogleButtonPress()}
          >
            <View style={styles.RegisterWithAppleInput}>
              <VectorImage source={google_icon} style={styles.GoogleImage} />
              <Text style={styles.RegisterWithGoogleText}>
                {strings.REGISTER_WITH_GOOGLE}
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
                navigation.navigate("LoginScreen");
              }}
            >
              {strings.SIGN_IN}
            </Text>
          </Text>
        </View>
      </ScrollView>
      {isLoading && <Spinner animating={isLoading} />}
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  subContainer: {
    flex: 1,
  },
  Header: {
    marginTop: 30,
  },
  HeaderBigText: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.neutralBlack,
    textAlign: "center",
    fontFamily: GILROY_BOLD,
    lineHeight: 44,
  },
  OmocColor: {
    color: Colors.skyBlueColor,
  },
  HeaderSmallText: {
    marginTop: 15,
    marginHorizontal: 60,
    alignSelf: "center",
  },
  FirstTextColor: {
    textAlign: "center",
    color: Colors.grey,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: GILROY_SEMIBOLD,
    lineHeight: 24,
  },
  HeaderTextFAQ: {
    color: Colors.blackColor,
    fontSize: 14,
    fontWeight: "400",
    marginHorizontal: 10,
    fontFamily: GILROY_MEDIUM,
  },
  EmailInput: {
    alignItems: "center",
    marginTop: 45,
  },
  EmailText: {
    fontWeight: "400",
    borderWidth: 0.09,
    height: 56,
    width: "92%",
    borderRadius: 24,
    fontSize: 14,
    padding: 10,
    backgroundColor: Colors.lightGrey,
    paddingStart: 20,
    fontFamily: GILROY_REGULAR,
  },
  PasswordInput: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    borderWidth: 0.09,
    height: 56,
    borderRadius: 24,
    padding: 10,
    backgroundColor: Colors.lightGrey,
    width: "92%",
    alignSelf: "center",
  },
  PasswordText: {
    fontWeight: "400",
    fontSize: 14,
    padding: 10,
    width: "90%",
    fontFamily: GILROY_REGULAR,
  },
  ViewImg: {
    width: 25,
    height: 19,
  },
  Login: {
    alignItems: "center",
    marginTop: 20,
  },
  LoginInput: {
    borderRadius: 24,
    borderWidth: 0.09,
    width: "92%",
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGrey,
  },
  LoginText: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: GILROY_MEDIUM,
  },
  ForgotText: {
    marginTop: 15,
    textAlign: "right",
    marginRight: 15,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: Colors.neutralBlack,
  },
  Divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 10,
  },
  DividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  DividerText: {
    textAlign: "center",
    marginHorizontal: 10,
    color: Colors.grey,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14,
    fontFamily: GILROY_REGULAR,
  },
  Next: {
    alignItems: "center",
    marginTop: 30,
  },
  LoginWithGoogle: {
    borderRadius: 24,
    borderWidth: 0.09,
    height: 51,
    backgroundColor: Colors.lightGrey,
    width: "92%",
  },
  LoginWithGoogleInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  GoogleImage: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  RegisterWithGoogleText: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
  },
  BetweenAppleGoogle: {
    alignItems: "center",
    marginTop: 30,
  },

  RegisterWithAppleInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  TextByLogging: {
    alignItems: "center",
    marginTop: "25%",
    marginHorizontal: 30,
  },
  TextByLoginColor: {
    textAlign: "center",
    lineHeight: 22,
    color: Colors.lightBlack,
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
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
    marginBottom: 50,
  },
  BottomText: {
    color: Colors.grey,
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
