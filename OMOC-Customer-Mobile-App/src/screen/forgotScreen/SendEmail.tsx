import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  grey,
  lightBlack,
  neutralBlack,
  purpleColor,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { strings } from "../../assets/string/strings";

const SendEmail = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.signText}>{strings.EMAIL_WAS_SEND}</Text>
          <Text style={styles.subText}>
            {strings.SEND_AN_EXTERNAL_LINK}
            <Text style={styles.colorText}>simon@shopomoc.com</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.sendTime}>04.58</Text>
        </View>
        <View style={styles.signUpBtn}>
          <Text style={styles.signUpText}>{strings.DOSENT_RECEIVE_EMAIL}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChangePassword");
            }}
          >
            <Text style={styles.resendText}>{strings.RESEND}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  subContainer: {
    gap: 20,
    marginTop: 20,
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
    marginTop: 20,
    lineHeight: 25,
    fontSize: 14,
    color: lightBlack,
    marginBottom: 40,
    fontWeight: "400",
  },
  colorText: {
    color: purpleColor,
  },
  sendTime: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: neutralBlack,
  },
  signUpBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    color: "#9E9E9E",
  },
  resendText: {
    color: skyBlueColor,
    fontSize: 12,
    fontWeight: "400",
  },
  signUpText: {
    color: grey,
    fontSize: 12,
    fontWeight: "400",
  },
});
