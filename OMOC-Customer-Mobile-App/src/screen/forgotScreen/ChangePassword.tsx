import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import {
  lightBlack,
  lightGrey,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { palceholders, strings } from "../../assets/string/strings";
import CustomPasswordTextInput from "../../components/CustomPasswordTextInput";
import { changeWithForgotPassword } from "../../utils/authApi";
import { validatePassword } from "../../utils/Validate";
import { showMessage } from "react-native-flash-message";
import en from "../../assets/string/en";
import Spinner from "../../components/Spinner";

const ChangePassword = ({ navigation, route }) => {
  const { token } = route.params;
  const [fetching, setFetching] = useState(false);
  const [passwordHide, setPasswordHide] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmmit = async () => {
    let isFormValid = false;
    if (!password?.newPassword?.length || !password?.confirmPassword?.length) {
      showMessage({
        message: "The password fields should not be empty",
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
      isFormValid = false;
    } else if (password?.newPassword !== password?.confirmPassword) {
      showMessage({
        message: "The password and the confirm password must be same",
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
      isFormValid = false;
    } else if (
      password?.newPassword?.length < 8 ||
      !validatePassword(password?.newPassword)
    ) {
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
      setFetching(true)
      try {
        const response = await changeWithForgotPassword({
          password: password.newPassword,
          token,
        });
        showMessage({
          message: response?.message,
          duration: 3000,
          backgroundColor: skyBlueColor,
          type: "danger",
        });
        navigation.replace("LoginScreen");
      } catch (e) {
        showMessage({
          message: e?.response?.data?.message || en.InternalServerError,
          duration: 3000,
          backgroundColor: skyBlueColor,
          type: "danger",
        });
      }finally{
        setFetching(false)
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerConatiner}>
        <Text style={styles.signText}>{strings.CHANGE_PASSWORD}</Text>
        <Text style={styles.subText}>
          {strings.STRONG_PASSWORD_INSTRUCTION}
        </Text>
      </View>
      <CustomPasswordTextInput
        value={password.newPassword}
        style={[styles.textInput, styles.inputTop]}
        placeholder={palceholders.NEW_Password}
        onChangeText={(text) =>
          setPassword((prev) => {
            return { ...prev, newPassword: text };
          })
        }
        secureTextEntry={passwordHide.newPassword}
        onShowPassword={() =>
          setPasswordHide((prev) => {
            return { ...prev, newPassword: !passwordHide.newPassword };
          })
        }
      />
      <CustomPasswordTextInput
        value={password.confirmPassword}
        style={styles.textInput}
        placeholder={palceholders.RE_TYPE_NEW_PASSWORD}
        onChangeText={(text) =>
          setPassword((prev) => {
            return { ...prev, confirmPassword: text };
          })
        }
        secureTextEntry={passwordHide.confirmPassword}
        onShowPassword={() =>
          setPasswordHide((prev) => {
            return { ...prev, confirmPassword: !passwordHide.confirmPassword };
          })
        }
      />
      <View style={{ marginTop: 25 }}>
        <CustomButton
          text="Submit"
          style={styles.Btn}
          textstyle={{ color: whiteColor }}
          onPress={handleSubmmit}
        />
      </View>
      {fetching && <Spinner animating={fetching} />}
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: whiteColor,
  },
  signText: {
    fontSize: 32,
    fontWeight: "700",
    color: skyBlueColor,
    textAlign: "center",
    lineHeight: 44.8,
  },
  subText: {
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 10,
    lineHeight: 25.2,
    fontSize: 14,
    color: lightBlack,
  },
  inputTop: {
    marginTop: 20,
  },
  textInput: {
    backgroundColor: lightGrey,
  },
  Btn: {
    backgroundColor: "#0094FF",
  },
  headerConatiner: {
    marginTop: 10,
  },
});
