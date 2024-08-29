import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState ,useEffect} from "react";
import VectorImage from "react-native-vector-image";
import { CountryPicker } from "react-native-country-codes-picker";
import {
  grey,
  lightBlack,
  lightGrey,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { palceholders, strings } from "../../assets/string/strings";
import {
  GILROY_BOLD,
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { setGoogleLogin } from "../../utils/authApi";
import StorageService from "../../services/storage.service";
import { showMessage } from "react-native-flash-message";
import en from "../../assets/string/en";

const LoginPhone = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [flag, setFlag] = useState("\uD83C\uDDEE\uD83C\uDDF3");
  const [value, setValue] = useState();
  const [userDeatil, setUserDeatil] = useState(null);
  const [passwordHide, setpasswordHide] = useState(false);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '773879950938-6ttvtpfocbujpsqiiie9kso5hoqcjnbl.apps.googleusercontent.com',
    });
   }, [])

  const isValid = () => {
    if (email === "" || password === "") {
      return false;
    }
    return true;
  };


   const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserDeatil({ userInfo });
      getGoogleapi()
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const getGoogleapi = async () => {
    try {
      const idToken = userDeatil?.userInfo?.idToken;
      const response = await setGoogleLogin(idToken);
      if (response?.status === 200) {
        StorageService.setUser(response.data.data || null);
        navigation.replace("TabNavigator");
      }
    } catch (e) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false}>
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
        <View style={styles.inputView}>
          <View style={styles.CountryView}>
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={styles.CountryInput}
            >
              <Text style={styles.flagText}>{flag}</Text>
            </TouchableOpacity>
            <CountryPicker
              show={show}
              pickerButtonOnPress={(item) => {
                setShow(false);

                setFlag(item.flag);
              }}
              lang={""}
            />
            <View>
              <TextInput
                style={styles.PhoneNumberInput}
                placeholder="Phone Number"
              />
            </View>
          </View>
          <View style={styles.PasswordInput}>
            <TextInput
              style={styles.PasswordText}
              secureTextEntry={!passwordHide}
              placeholder={palceholders.PASSWORD}
              placeholderTextColor={grey}
              value={password}
              onChange={(text) => {
                setpassword(text);
              }}
            />
            <TouchableOpacity
            onPress={() => {
              setpasswordHide(!passwordHide);
            }}
          >
              <VectorImage
                source={require("../../assets/eye_view.svg")}
                style={styles.ViewImg}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Login}>
          <TouchableOpacity
            style={styles.LoginInput}
            onPress={() => {
              navigation.replace("TabNavigator");
            }}
          >
            <Text style={styles.LoginText}>{strings.LOGIN}</Text>
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
          <Text style={styles.DividerText}>{strings.LOGIN_WITH}</Text>
          <View style={styles.DividerLine} />
        </View>
        <View style={styles.LoginWithGoogleInput}>
          <TouchableOpacity
            style={styles.LoginWithGoogle}
            onPress={() =>
              onGoogleButtonPress()}>
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
          <TouchableOpacity
            style={styles.LoginWithGoogle}
            onPress={() => {
              navigation.navigate("SetupProfileScreen");
            }}
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

export default LoginPhone;

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
  countryText: {
    color: "black",
    fontSize: 20,
  },
  OmocColor: {
    color: skyBlueColor,
  },
  HeaderSmallText: {
    marginTop: 15,
    marginHorizontal: 35,
    alignSelf: "center",
  },
  flagText: {
    height: 40,
    width: 40,
    marginHorizontal: 10,
    fontSize: 30,
  },
  FirstTextColor: {
    textAlign: "center",
    color: lightBlack,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_SEMIBOLD,
    lineHeight: 24,
  },
  HeaderTextFAQ: {
    color: "#0691cc",
    fontSize: 12,
    fontWeight: "bold",
    marginHorizontal: 10,
    fontFamily: GILROY_REGULAR,
  },
  CountryView: {
    marginTop: 45,
    flexDirection: "row",
    paddingLeft: 15,
    borderRadius: 25,
    paddingHorizontal: 15,
    alignSelf: "center",
    height: 56,
    width: "92%",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  CountryInput: {
    backgroundColor: whiteColor,
    borderColor: grey,
    borderRightWidth: 0.5,
  },
  PhoneNumberInput: {
    paddingLeft: 20,
    fontSize: 14,
    height: 56,
  },
  PasswordInput: {
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    height: 56,
    borderRadius: 24,
    padding: 10,
    backgroundColor: whiteColor,
    width: "92%",
    alignSelf: "center",
    borderColor: "#E0E0E0",
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
    marginTop: 30,
  },
  LoginInput: {
    borderRadius: 24,
    borderWidth: 0.09,
    width: "92%",
    height: 51,
    backgroundColor: skyBlueColor,
  },
  LoginText: {
    fontWeight: "500",
    textAlign: "center",
    marginTop: 15,
    fontFamily: GILROY_MEDIUM,
    color: whiteColor,
  },
  ForgotText: {
    marginTop: 15,
    textAlign: "right",
    marginRight: 15,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: neutralBlack,
  },
  Divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
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
    color: grey,
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
    backgroundColor: lightGrey,
    width: "95%",
  },
  LoginWithGoogleInput: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
    width:'100%',
    gap:15
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
  LoginWithApple: {
    borderRadius: 20,
    borderWidth: 1,
    height: 50,
    backgroundColor: "lightgray",
    width: "95%",
  },
  LoginWithAppleInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
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
    marginTop: 30,
    marginHorizontal: 30,
  },
  TextByLoginColor: {
    textAlign: "center",
    fontWeight: "400",
    color: lightBlack,
    fontSize: 12,
    lineHeight: 21,
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
  inputView: { gap: 15 },
});
