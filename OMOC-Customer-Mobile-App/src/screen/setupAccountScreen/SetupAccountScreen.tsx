import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { grey, lightBlack, skyBlueColor, whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { GILROY_BOLD, GILROY_REGULAR } from "../../utils/fonts";
import CustomButton from "../../components/CustomButton";
import { CountryPicker } from "react-native-country-codes-picker";

const SetupAccountScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState("\uD83C\uDDEE\uD83C\uDDF3");
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.backBtn}>
        <CustomHeaderShown
          title={strings.SETUP_ACCOUNT}
          navigation={navigation}
        />
      </View>
      <View style={styles.setupTextView}>
        <Text style={styles.setupText}>{strings.SETUP_PHONE_NUMBER}</Text>
      </View>
      <View style={styles.paraTextView}>
        <Text style={styles.paraText}>
         {strings.SETUP_PHONE_NUMBER_TITLE}
        </Text>
      </View>
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
      <View style={styles.btnContainer}>
        <CustomButton
          text={strings.VERIFY_NOW}
          textstyle={styles.buttonTextStyle}
          style={styles.btnStyle}
          onPress={() => {
            navigation.navigate("OtpScreen");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SetupAccountScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  backBtn: {
    marginHorizontal: 15,
  },
  setupText: {
    color: skyBlueColor,
    fontFamily: GILROY_BOLD,
    fontSize: 28,
    fontWeight: "700",
  },
  setupTextView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  paraText: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    lineHeight: 25,
    textAlign: "center",
    color: lightBlack,
  },
  paraTextView: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
    marginTop: 15,
  },
  buttonTextStyle: {
    color: whiteColor,
  },
  btnStyle: {
    backgroundColor: skyBlueColor,
  },
  btnContainer: {
    marginTop: 45,
  },
  CountryView: {
    width:'92%',
    marginTop: 40,
    flexDirection: "row",
    paddingLeft: 15,
    borderRadius: 25,
    paddingHorizontal: 15,
    alignSelf:'center',
    height: 56,
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
  flagText: {
    height: 40,
    width: 40,
    marginHorizontal: 10,
    fontSize: 30,
  },
  PhoneNumberInput: {
    paddingLeft: 20,
    fontSize: 14,
    height: 56,
  },
});
