import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import {
  whiteColor,
  skyBlueColor,
  grey,
  lightGrey50,
  midGray,
  neutralBlack,
} from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { GILROY_REGULAR } from "../../utils/fonts";
import CustomButton from "../../components/CustomButton";

const ChangePasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.CHANGE_PASSWORD_TITLE}
          navigation={navigation}
        />
      </View>
      <View style={styles.mainView}>
        <View style={styles.viewloremText}>
          <Text style={styles.loremText}>{strings.LOREM_TEXT}</Text>
        </View>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Current Password"
            placeholderTextColor="#C2C2C2"
          />
        </View>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholder="New Password"
            placeholderTextColor="#C2C2C2"
          />
        </View>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm New Password"
            placeholderTextColor="#C2C2C2"
          />
        </View>
      </View>
      <CustomButton
        onPress={() => navigation.navigate("LoginActivityScreen")}
        textstyle={styles.textBtn}
        style={styles.btn}
        text={strings.SAVE}
      />
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  header: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  mainView: {
    marginTop: 40,
    gap: 14,
    marginHorizontal: 15,
  },
  loremText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 21.6,
    color: grey,
  },
  viewloremText: {
    height: 88,
    width: "89%",
  },
  viewInput: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 16,
    gap: 10,
    borderColor: midGray,
  },
  textInput: {
    color: neutralBlack,
  },
  toucableView: {
    width: "90%",
    height: 56,
    marginTop: "85%",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 10,
    backgroundColor: skyBlueColor,
  },
  saveText: {
    alignSelf: "center",
    marginTop: 5,
    color: whiteColor,
  },
  btn: {
    backgroundColor: skyBlueColor,
    position: "absolute",
    bottom: 10,
  },
  textBtn: {
    color: whiteColor,
  },
});
