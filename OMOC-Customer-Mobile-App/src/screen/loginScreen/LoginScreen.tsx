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
import {
  grey,
  lightBlack,
  lightGrey,
  lightGrey50,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { palceholders, strings } from "../../assets/string/strings";
import auth from '@react-native-firebase/auth';

import {
  GILROY_BOLD,
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { apple_icon, eye_view, google_icon } from "../../utils/images";
import { showMessage } from "react-native-flash-message";
import en from "../../assets/string/en";
import StorageService from "../../services/storage.service";
import { setGoogleLogin, signInWithEmailAndPassword } from "../../utils/authApi";
import { validateEmail, validatePassword } from "../../utils/Validate";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [changeInputStyle, setChangeInputStyle] = useState(false);
  const [passwordHide, setpasswordHide] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '773879950938-6ttvtpfocbujpsqiiie9kso5hoqcjnbl.apps.googleusercontent.com',
    });
   }, [])

  
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


  const isValid = () => {
    if (email === "" || password === "") {
      return false;
    }
    return true;
  };
  const onPressSignIn = async () => {
    let isFormValid = false;
    if (email.length === 0 || !validateEmail(email)) {
      showMessage({
        message: en.InvalidEmailError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
      isFormValid = false;
    } else if (password.length < 8 || !validatePassword(password)) {
      isFormValid = false;
      showMessage({
        message: en.InvalidPasswordError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    } else {
      isFormValid = true;
    }

    if (isFormValid) {
      try {
        const response = await signInWithEmailAndPassword({
          email,
          password,
        });
        if (response?.status === 200) {
          StorageService.setUser(response.data.data || null);
          navigation.replace("TabNavigator");
        }
      } catch (e) {
        showMessage({
          message: e?.response?.data?.message || en.InternalServerError,
          duration: 3000,
          backgroundColor: skyBlueColor,
          type: "danger",
        });
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.subContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
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
        <View
          style={!changeInputStyle ? styles.emailInput : styles.focusedInput}
        >
          <TextInput
            style={styles.emailText}
            placeholder={palceholders.EMAIL}
            placeholderTextColor={grey}
            onChangeText={(text) => {
              setEmail(text);
            }}
            autoFocus={false}
            onFocus={() => {
              setChangeInputStyle(true);
            }}
            autoCapitalize="none"
          />
        </View>
        <View
          style={!changeInputStyle ? styles.emailInput : styles.focusedInput}
        >
          <TextInput
            style={styles.PasswordText}
            secureTextEntry={!passwordHide}
            placeholder={palceholders.PASSWORD}
            placeholderTextColor={grey}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setpassword(text);
            }}
            value={password}
            autoFocus={false}
            onFocus={() => {
              setChangeInputStyle(true);
            }}
          />
          
          <TouchableOpacity
            onPress={() => {
              setpasswordHide(!passwordHide);
            }}
          >
            <VectorImage source={eye_view} style={styles.ViewImg} />
          </TouchableOpacity>
        </View>
        <View style={styles.Login}>
          <TouchableOpacity
            style={[
              styles.LoginInput,
              { backgroundColor: isValid() ? skyBlueColor : lightGrey },
            ]}
            onPress={() => onPressSignIn()}
            disabled={!isValid()}
          >
            <Text
              style={[
                styles.LoginText,
                { color: isValid() ? whiteColor : lightGrey50 },
              ]}
            >
              {strings.LOGIN}
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
            onPress={() =>onGoogleButtonPress()}>
            <View style={styles.LoginWithAppleInput}>
              <VectorImage source={google_icon} style={styles.GoogleImage} />
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
              <VectorImage source={apple_icon} style={styles.AppleImage} />
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
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
    color: neutralBlack,
    textAlign: "center",
    fontFamily: GILROY_BOLD,
    lineHeight: 44,
  },
  OmocColor: {
    color: skyBlueColor,
  },
  HeaderSmallText: {
    marginTop: 15,
    marginHorizontal: 35,
    alignSelf: "center",
    marginBottom: 45,
  },
  FirstTextColor: {
    textAlign: "center",
    color: lightBlack,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: GILROY_SEMIBOLD,
    lineHeight: 24,
  },
  HeaderTextFAQ: {
    color: skyBlueColor,
    fontSize: 12,
    fontWeight: "400",
    marginHorizontal: 10,
    fontFamily: GILROY_REGULAR,
  },
  emailInput: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 0.09,
    height: 56,
    borderRadius: 24,
    padding: 10,
    backgroundColor: lightGrey,
    width: "92%",
    alignSelf: "center",
  },
  emailText: {
    fontWeight: "400",
    height: 56,
    flex: 1,
    paddingStart: 20,
    fontFamily: GILROY_REGULAR,
  },
  focusedInput: {
    alignItems: "center",
    marginTop: 15,
    flexDirection: "row",
    borderWidth: 1,
    height: 56,
    borderRadius: 24,
    padding: 10,
    borderColor: "#E0E0E0",
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
    backgroundColor: lightGrey,
    alignItems: "center",
    justifyContent: "center",
  },
  LoginText: {
    fontWeight: "500",
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
    width: "92%",
    alignItems: "center",
    justifyContent: "center",
  },
  LoginWithGoogleInput: {
    width: "100%",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
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
});
