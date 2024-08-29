import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import VectorImage from "react-native-vector-image";
import { whiteColor, skyBlueColor, offWhite } from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { neutralBlack, grey } from "../../utils/colors";
import { back_icon } from "../../utils/images";
import CustomButton from "../../components/CustomButton";

const RequestVerificationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBackContainer}
          onPress={() => {
            navigation.pop();
          }}
        >
          <VectorImage source={back_icon} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerText}>
            {strings.REQUEST_VERIFICATION_HEADER}
          </Text>
        </View>
      </View>
      <View style={styles.mainImageView}>
        <View style={styles.viewImage}>
          <Text style={styles.imageText}>Image</Text>
        </View>
      </View>
      <View style={styles.verificationView}>
        <View style={styles.textContainer}>
          <Text style={styles.verificationText}>
            {strings.VERIFICATION_REQUEST}
          </Text>
          <Text style={styles.textLorem}>{strings.LOREM_TEXT}</Text>
        </View>
        <View style={styles.btnView}>
          <CustomButton
            textstyle={styles.btnText}
            style={styles.btnContainer}
            text="Request Now"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RequestVerificationScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: offWhite,
    flex: 1,
  },
  header: {
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  viewImage: {
    width: 56,
    height: 37,
    borderRadius: 40,
    padding: 5,
    gap: 10,
    backgroundColor: whiteColor,
    alignItems: "center",
    justifyContent: "center",
  },
  verificationView: {
    color: whiteColor,
    backgroundColor: whiteColor,
    flex: 1,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  mainImageView: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  verificationText: {
    marginTop: 40,
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
    color: neutralBlack,
    fontWeight: "600",
  },
  textLorem: {
    fontSize: 12,
    lineHeight: 21.6,
    color: grey,
    marginTop: 20,
  },
  btnView: {
    flex: 1,
  },
  textRequest: {
    width: 100,
    height: 19,
    fontSize: 16,
    lineHeight: 19,
    color: whiteColor,
    fontFamily: GILROY_REGULAR,
    fontWeight: "600",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    color:neutralBlack
  },
  headerBackContainer: {
    height: 48,
    width: 48,
    backgroundColor: whiteColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  headerCenter: {
    width: "80%",
    alignItems: "center",
  },
  btnContainer: {
    backgroundColor: skyBlueColor,
    position: "absolute",
    bottom: 1,
  },
  btnText: {
    color: whiteColor,
  },
  textContainer: {
    marginHorizontal: 20,
  },
  imageText:{
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color:neutralBlack
  }
});
