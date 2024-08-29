import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../component/CustomButton";
import CustomTextInput from "../../component/CustomTextInput";
import { palceholders, strings } from "../../utils/string/strings";
import { Colors } from "../../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { forgotwithEmail } from "../../utils/authApi";
import { showMessage } from "react-native-flash-message";
import en from "../../utils/string/en";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [passwordShow, setpasswordShow] = useState(false);
  const [fetching, setFetching] = useState(false);

  const onSendBtn = async () => {
    try {
      const response = await forgotwithEmail({ email: email });
      if (!response?.status) {
        console.log(JSON.stringify(response?.response?.data, null, 3));
        return showMessage({
          message: response?.message || en.InternalServerError,
          duration: 3000,
          backgroundColor: "red",
          type: "danger",
        });
      }
      navigation.navigate("OtpScreen", {
        data: { email },
        type: "forgotPassowrd",
      });

    } catch (error) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    } finally {
      setFetching(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.alltext}>
          <Text style={styles.signText}>
            {strings.FORGOT} {strings.PASSWORD}{" "}
          </Text>
          <Text style={styles.subText}>
            {strings.LOREM_IPSUM}
            <Text style={styles.faq}>{strings.FAQ}</Text>
            <Text>{strings.ABOUT_OMOC}</Text>
          </Text>
        </View>
        <CustomTextInput
          placeholder={palceholders.EMAIL_NUMBER}
          value={email}
          onChangeText={(newText) => setEmail(newText)}
          secureTextEntry={passwordShow}
          onPress={() => setpasswordShow(!passwordShow)}
          showpasswod={passwordShow}
          optional={false}
        />
        <CustomButton
          text={email === "" ? strings.SEND : strings.SEND_CODE}
          style={[
            styles.btn,
            {
              backgroundColor:
                email === "" ? Colors.lightGrey : Colors.skyBlueColor,
            },
          ]}
          textstyle={{
            color: email === "" ? Colors.lightGrey50 : Colors.whiteColor,
          }}
          onPress={() => onSendBtn()}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  alltext: {
    marginHorizontal: 30,
  },
  mainContainer: {
    flexDirection: "column",
    gap: 20,
    marginTop: 15,
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
    marginTop: 20,
    lineHeight: 25.2,
    fontSize: 14,
    color: Colors.lightBlack,
    fontWeight: "400",
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
  faq: {
    color: Colors.blackColor,
    fontSize: 14,
    fontWeight: "400",
    marginHorizontal: 10,
    fontFamily: GILROY_MEDIUM,
  },
});
