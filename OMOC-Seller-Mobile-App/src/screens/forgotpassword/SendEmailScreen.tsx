import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../../utils/colors";
import { strings } from "../../utils/string/strings";
import { GILROY_MEDIUM } from "../../utils/fonts";

const SendEmailScreen = ({ navigation,initialValue = 2}) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}.${formattedSeconds}`;
  };

  const [time, setTime] = React.useState(initialValue * 60);
    const timerRef = React.useRef(time);
  
    React.useEffect(() => {
      const timerId = setInterval(() => {
        timerRef.current -= 1;
        if (timerRef.current < 0) {
          clearInterval(timerId);
        } else {
          setTime(timerRef.current);
        }
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.signText}>{strings.EMAIL_WAS_SEND}</Text>
          <Text style={styles.subText}>
            {strings.LOREM_IPSUM}
            <Text style={styles.colorText}>
              {strings.FAQ}
              <Text style={styles.aboutText}>{strings.ABOUT_OMOC}</Text>
            </Text>
          </Text>
        </View>
        <View>
          <Text style={styles.sendTime}>{formatTime(time)}</Text>
        </View>
        <View style={styles.signUpBtn}>
          <Text style={styles.signUpText}>{strings.DOSENT_RECEIVE_EMAIL}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChangePasswordScreen");
            }}
          >
            <Text style={styles.resendText}>{strings.RESEND}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  subContainer: {
    gap: 20,
    marginTop: 20,
    marginHorizontal: 30,
  },
  aboutText: {
    color: Colors.lightGrey50,
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
    lineHeight: 25,
    fontSize: 14,
    color: Colors.lightGrey50,
    marginBottom: 40,
    fontWeight: "400",
  },
  colorText: {
    color: Colors.blackColor,
    fontSize: 14,
    fontWeight: "400",
    marginHorizontal: 10,
    fontFamily: GILROY_MEDIUM,
  },
  sendTime: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: Colors.neutralBlack,
  },
  signUpBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    color: "#9E9E9E",
  },
  resendText: {
    color: Colors.neutralBlack,
    fontSize: 12,
    fontWeight: "400",
  },
  signUpText: {
    color: Colors.grey,
    fontSize: 12,
    fontWeight: "400",
  },
});
