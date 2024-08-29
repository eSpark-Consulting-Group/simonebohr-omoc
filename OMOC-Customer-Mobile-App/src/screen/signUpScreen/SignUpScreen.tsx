import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomCheckBox from "../../components/CustomCheckBox";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import {
  errorRed,
  grey,
  lightGrey,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { palceholders, strings } from "../../assets/string/strings";
import { showMessage } from "react-native-flash-message";
import en from "../../assets/string/en";
import { signUpWithEmailAndPassword } from "../../utils/authApi";
import { validatePassword } from "../../utils/Validate";
const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [nameError, setNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [ageError, setAgeError] = useState("");
  const handleSignUp = async () => {
    // Validate the form inputs here
    let valid = true;

    if (name === "") {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }
    if (userName.trim() === "") {
      setUserNameError("Username is required");
      valid = false;
    } else {
      setUserNameError("");
    }

    if (email.trim() === "") {
      setEmailError("Email or phone is required");
      valid = false;
    } else if (!validateEmail(email) && !validatePassword(email)) {
      setEmailError("Invalid email or password");
      valid = false;
    } else {
      setEmailError("");
    }

    if (age.trim() === "") {
      setAgeError("Age is required");
      valid = false;
    } else {
      setAgeError("");
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (valid) {
      if (!isSelected) {
        showMessage({
          message: "You must agree to the Terms of Service and Privacy Policy",
          duration: 3000,
          backgroundColor: errorRed,
          type: "danger",
        });
        return;
      } else {
        setCheckboxError("");
      }
      try {
        const response = await signUpWithEmailAndPassword({
          email,
          password,
          name,
          userName,
          age,
        });
        if (!!response?.status) {
          navigation.navigate("OtpScreen", {
            data: response?.data?.data.user,
            type:'signUp'
          });
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

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.subContainer} bounces={false}>
        <View style={styles.container}>
          <Text style={styles.signText}>{strings.SING_UP}</Text>
          <Text style={styles.subText}>
            {strings.LOGIN_HEADING}
            <Text style={styles.colorText}>{strings.FAQ}</Text>
            {strings.ABOUT_OMOC}
          </Text>
        </View>
        <View style={{ gap: 16 }}>
          <View>
            <CustomTextInput
              placeholder={palceholders.NAME}
              value={name}
              onChangeText={(newText) => {
                setNameError("");
                setName(newText);
              }}
              style={styles.inpputColor}
            />
            {nameError && <Text style={styles.errorText}>{nameError}</Text>}
          </View>
          <View>
            <CustomTextInput
              placeholder={palceholders.USERNAME}
              value={userName}
              onChangeText={(newText) => {
                setUserNameError("");
                setUserName(newText);
              }}
              style={styles.inpputColor}
            />
            {userNameError && (
              <Text style={styles.errorText}>{userNameError}</Text>
            )}
          </View>
          <View>
            <CustomTextInput
              placeholder={palceholders.AGE}
              value={age}
              onChangeText={(newText) => {
                setAgeError("");
                setAge(newText);
              }}
              style={styles.inpputColor}
            />
            {ageError && <Text style={styles.errorText}>{ageError}</Text>}
          </View>
          <View>
            <CustomTextInput
              placeholder={palceholders.EMAIL_NUMBER}
              value={email}
              onChangeText={(newText) => {
                setEmailError("");
                setEmail(newText);
              }}
              style={styles.inpputColor}
              autoCapitalize="none"
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          </View>
          <View>
            <CustomTextInput
              placeholder={palceholders.PASSWORD}
              value={password}
              onChangeText={(newText) => {
                setPasswordError("");
                setPassword(newText);
              }}
              style={styles.inpputColor}
              secureTextEntry={true}
            />
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
          </View>

          <View style={styles.checkbox}>
            <CustomCheckBox
              style={styles.checkBoxIcon}
              disabled={false}
              value={isSelected}
              onSelect={(newValue) => {
                setIsSelected(!isSelected);
              }}
              boxType="square"
              onFillColor={skyBlueColor}
              onCheckColor={"white"}
            />
            <Text style={styles.checkText}>{strings.AGREE}</Text>
          </View>
        </View>
        <CustomButton
          text="Sign Up"
          textstyle={styles.textstyle}
          style={styles.button}
          onPress={handleSignUp}
        />
        <View style={styles.noteViwe}>
          <Text style={styles.noteText}>
            {strings.AGREEMENT}
            <Text style={styles.boldNotetext}>{strings.TERMS_CONDITIONS}</Text>
            {strings.AND}
          </Text>
          <Text style={styles.boldNotetext}>{strings.PRICACY_POLICY}</Text>
        </View>
        <View style={styles.signUpBtn}>
          <Text style={styles.signUpText}>{strings.CREATE_ACCOUNT} </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.colorText}>{strings.SING_UP}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  subContainer: {
    marginTop: 15,
    flex: 1,
  },
  signText: {
    fontSize: 32,
    fontWeight: "700",
    color: skyBlueColor,
    textAlign: "center",
  },
  subText: {
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 15,
    lineHeight: 25.2,
    fontSize: 14,
    color: "#757575",
  },
  colorText: {
    color: skyBlueColor,
    fontSize: 12,
    fontWeight: "400",
  },
  container: {
    marginBottom: 20,
  },
  inpputColor: {
    backgroundColor: lightGrey,
    marginVertical: 1,
  },
  checkbox: {
    flexDirection: "row",
    gap: 20,
    width: "90%",
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 5,
  },
  checkText: {
    color: grey,
    fontSize: 12,
    fontWeight: "400",
    width: "80%",
  },
  button: {
    backgroundColor: "#0094FF",
    marginTop: 20,
  },
  textstyle: {
    color: whiteColor,
  },
  noteViwe: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  noteText: {
    color: grey,
    lineHeight: 35,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "400",
  },
  boldNotetext: {
    fontWeight: "500",
    color: "black",
    textAlign: "center",
    marginBottom: 5,
    fontSize: 12,
  },
  boldNotetextPolicy: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  signUpBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: grey,
    fontSize: 12,
    fontWeight: "400",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 30,
    marginTop: 2,
  },
  checkBoxIcon: {
    height: 18,
    width: 18,
    resizeMode:"contain"
  },
});
