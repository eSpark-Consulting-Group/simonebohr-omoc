import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../component/CustomTextInput";
import CustomButton from "../../component/CustomButton";
import { Colors } from "../../utils/colors";
import { palceholders, strings } from "../../utils/string/strings";
import { GILROY_REGULAR } from "../../utils/fonts";
import { showMessage } from "react-native-flash-message";
import { validatePassword } from "../../utils/Validate";
import en from "../../utils/string/en";
import { changeWithForgotPassword } from "../../utils/authApi";

const ChangePasswordScreen = ({ navigation, route }) => {
  const { token } = route.params;

  const [reTypePassword, setReTypeNewPassword] = useState("");

  const [fetching, setFetching] = useState(false);

  const [passwordHide, setPasswordHide] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const isValid = () => {
    if (password?.newPassword == "" || reTypePassword == "") {
      return false;
    }
    return true;
  };
  const handleSubmmit = async () => {
    let isFormValid = false;
    console.log(password);
    if (!password?.newPassword?.length || !password?.confirmPassword?.length) {
      showMessage({
        message: "The password fields should not be empty",
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
      isFormValid = false;
    } else if (password?.newPassword !== password?.confirmPassword) {
      showMessage({
        message: "The password and the confirm password must be same",
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
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
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    } else {
      isFormValid = true;
    }

    if (isFormValid) {
      setFetching(true);
      try {
        const data = {
          password: password?.newPassword,
          token: token,
        };

        const response = await changeWithForgotPassword(data);
        showMessage({
          message: response?.message,
          duration: 3000,
          backgroundColor: Colors.skyBlueColor,
          type: "danger",
        });
        navigation.replace("LoginScreen");
      } catch (e: any) {
        showMessage({
          message: e?.response?.data?.message || en.InternalServerError,
          duration: 3000,
          backgroundColor: Colors.skyBlueColor,
          type: "danger",
        });
      } finally {
        setFetching(false);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerConatiner}>
        <Text style={styles.signText}>{strings.CHANGE_PASSWORD}</Text>
        <Text style={styles.subText}>
          {strings.LOREM_IPSUM}
          <Text style={styles.faqText}>
            {strings.FAQ}
            <Text style={styles.aboutOmoc}>{strings.ABOUT_OMOC}</Text>
          </Text>
        </Text>
      </View>
      <CustomTextInput
        style={styles.PasswordText}
        placeholder={palceholders.NEW_Password}
        onChangeText={(text: string) => {
          setPassword({
            ...password,
            newPassword: text,
          });
        }}
        secureTextEntry={passwordHide.newPassword}
        onPress={() => {
          setPasswordHide({
            ...passwordHide,
            newPassword: !passwordHide.newPassword,
          });
        }}
        showpasswod={passwordHide.newPassword}
        optional={true}
      />
      <View style={{ marginTop: -20 }}>
        <CustomTextInput
          style={[styles.PasswordText]}
          placeholder={palceholders.RE_TYPE_NEW_PASSWORD}
          onChangeText={(text: string) => {
            setReTypeNewPassword(text);
            setPassword({
              ...password,
              confirmPassword: text,
            });
          }}
          secureTextEntry={!password.confirmPassword}
          onPress={() =>
            setPasswordHide({
              ...passwordHide,
              confirmPassword: !passwordHide?.confirmPassword,
            })
          }
          showpasswod={passwordHide.confirmPassword}
          optional={true}
        />
      </View>
      <View style={[styles.btnView]}>
        <CustomButton
          text="Submit"
          style={[
            styles.Btn,
            {
              backgroundColor: isValid()
                ? Colors.skyBlueColor
                : Colors.lightGrey,
            },
          ]}
          textstyle={{
            color: isValid() ? Colors.whiteColor : Colors.lightGrey50,
          }}
          onPress={handleSubmmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: Colors.whiteColor,
  },
  signText: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.neutralBlack,
    textAlign: "center",
    lineHeight: 44.8,
  },
  subText: {
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 10,
    lineHeight: 25.2,
    fontSize: 14,
    color: Colors.grey,
  },

  Btn: {},
  headerConatiner: {
    marginTop: 40,
    marginHorizontal: 30,
  },
  faqText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    textAlign: "center",
    color: Colors.neutralBlack,
  },
  aboutOmoc: {
    color: Colors.grey,
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
    justifyContent: "space-between",
    alignSelf: "center",
  },
  PasswordText: {
    fontWeight: "400",
    fontSize: 14,
    padding: 10,
    fontFamily: GILROY_REGULAR,
  },
  btnView: {
    marginTop: 30,
  },
});
