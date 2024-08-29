import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { palceholders, strings } from "../../assets/string/strings";
import {
  errorRed,
  lightBlack,
  lightGrey,
  lightGrey50,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { forgotPasswordAPI } from "../../utils/authApi";
import { showMessage } from "react-native-flash-message";
import Spinner from "../../components/Spinner";
import en from "../../assets/string/en";

const ForgotScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState("");
  const [fetching, setFetching] = useState(false);

  const handleSendCode = async () => {
    try {
      setFetching(true);
      const param = {
        email: "sameer@yopmail.com",
      };
      const data = {
        email: inputText,
      };
      const response = await forgotPasswordAPI(param);
      if (response?.status === 200) {
        navigation.navigate("OtpScreen", {
          data: param,
          type: "forgotPassowrd",
        });
      }
    } catch (error) {
      showMessage({
        message: error?.response?.data?.message || en.InternalServerError,
        duration: 3000,
        backgroundColor: errorRed,
        type: "danger",
      });
    } finally {
      setFetching(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.signText}>
            {strings.FORGOT} {strings.PASSWORD}{" "}
          </Text>
          <Text style={styles.subText}>{strings.RESET_INSTRUCTIONS}</Text>
        </View>
        <CustomTextInput
          placeholder={palceholders.EMAIL_NUMBER}
          value={inputText}
          onChangeText={(newText) => setInputText(newText)}
          style={styles.inputColor}
        />
        <CustomButton
          disable={!inputText.length}
          text={inputText === "" ? strings.SEND : strings.SEND_CODE}
          style={[
            styles.btn,
            { backgroundColor: inputText === "" ? lightGrey : skyBlueColor },
          ]}
          textstyle={{ color: inputText === "" ? lightGrey50 : whiteColor }}
          onPress={handleSendCode}
        />
      </View>
      {fetching && <Spinner animating={fetching} />}
    </SafeAreaView>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  mainContainer: {
    flexDirection: "column",
    gap: 20,
    marginTop: 15,
  },
  signText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0094FF",
    textAlign: "center",
    lineHeight: 44.8,
  },
  subText: {
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 20,
    lineHeight: 25.2,
    fontSize: 14,
    color: lightBlack,
    fontWeight: "400",
  },
  inputColor: {
    backgroundColor: lightGrey,
    marginTop: 30,
  },
  textstyle: {
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 18,
  },
  btn: {
    marginTop: 50,
  },
});
