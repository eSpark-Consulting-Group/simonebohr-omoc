import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../utils/colors";
import { strings } from "../../utils/string/strings";
import { GILROY_REGULAR } from "../../utils/fonts";
import { forgotPasswordOtpVerify, verifyOpt } from "../../utils/authApi";
import { showMessage } from "react-native-flash-message";
import en from "../../utils/string/en";
import StorageService from "../../services/storage.service";
import { useDispatch, useSelector } from "react-redux";
import { changeShop } from "../../redux/slice/dashboard/ShopSlice";

const OtpScreen = ({ navigation, route }) => {
  const { data, type } = route.params;
  // const dispatch = useDispatch<any>();
  const [email, setEmail] = useState(data.email);
  const [resendTime, setResendTime] = useState(300);

  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (resendTime > 0) {
        setResendTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const areAllFieldsFilled = () => {
    return otp.every((value) => /^\d+$/.test(value));
  };

  const onVerifyOtp = async () => {
    Keyboard.dismiss();
    const newOtp = `${otp[0]}${otp[1]}${otp[2]}${otp[3]}`;
    try {
      if (type === "forgotPassowrd") {
        const response = await forgotPasswordOtpVerify({
          email,
          otp: newOtp,
        });

        navigation.navigate("ChangePasswordScreen", {
          token: response.data.token,
        });
      } else {
        const response = await verifyOpt({
          email,
          otp: "1234",
        });
        if (!!response?.status) {
          StorageService.setUser(response?.data?.data || null);
          navigation.navigate("SliderScreen");
        }
      }
    } catch (e) {
      showMessage({
        message: e.response.data.message || en.InternalServerError,
        duration: 3000,
        backgroundColor: "skyBlueColor",
        type: "danger",
      });
    }
  };
  return (
    <SafeAreaView style={styles.mainConatiner}>
      <View style={styles.container}>
        <Text style={styles.otpText}>{strings.OTP}</Text>
        <Text style={styles.subText}>
          {strings.LOREM_IPSUM}
          <Text style={styles.faqText}>{strings.FAQ}</Text>
          <Text>{strings.ABOUT_OMOC}</Text>
        </Text>
      </View>
      <View style={styles.otpcontainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleOTPChange(index, text)}
            ref={(ref) => (inputRefs.current[index] = ref)}
            placeholder=""
          />
        ))}
      </View>
      <View>
        <Text style={styles.time}>{formatTime(resendTime)}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => onVerifyOtp()}>
        <Text style={styles.textstyle}>{strings.SUBMIT}</Text>
      </TouchableOpacity>
      <View style={styles.btnViwe}>
        <Text style={styles.resendText}>{strings.DOSENT_RECEIVE_OTP}</Text>
        <TouchableOpacity
          disabled={resendTime > 0}
          onPress={() => {
            if (resendTime <= 0) {
              setResendTime(300);
            }
          }}
        >
          <Text
            style={[
              styles.resendBtn,
              resendTime > 0 && styles.disabledResendBtn,
            ]}
          >
            {" "}
            {strings.RESEND}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  otpText: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.blackColor,
    textAlign: "center",
    marginTop: 25,
    lineHeight: 44.8,
  },
  subText: {
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: 15,
    lineHeight: 25,
    fontSize: 14,
    color: Colors.lightBlack,
    marginBottom: 40,
    fontWeight: "500",
    fontFamily: GILROY_REGULAR,
  },
  faqText: {
    color: Colors.blackColor,
    fontWeight: "400",
    fontSize: 14,
  },
  container: {
    marginHorizontal: 30,
  },
  otpcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  input: {
    width: "20%",
    height: 82,
    fontSize: 24,
    textAlign: "center",
    borderRadius: 24,
    backgroundColor: Colors.lightGrey,
  },
  time: {
    textAlign: "center",
    marginVertical: 30,
    color: "#817D7D",
  },
  resendText: {
    textAlign: "center",
    marginVertical: 30,
    color: Colors.grey,
    fontSize: 12,
    fontWeight: "400",
  },
  resendBtn: {
    color: Colors.blackColor,
    marginVertical: 30,
    fontSize: 12,
    marginLeft: 4,
  },
  btnViwe: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.skyBlueColor,
    marginTop: 40,
    width: "92%",
    alignSelf: "center",
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  textstyle: {
    color: Colors.whiteColor,
  },
  disabledResendBtn: {
    color: Colors.grey,
  },
});
