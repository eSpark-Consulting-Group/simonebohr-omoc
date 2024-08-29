import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { grey, midGray, neutralBlack, red, whiteColor } from "../../utils/colors";
import { palceholders, strings } from "../../assets/string/strings";
import { GILROY_REGULAR } from "../../utils/fonts";

const SafetySettings = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.SAFTEY_SETTINGS}
          navigation={navigation}
        />
      </View>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate("ChangePasswordScreen")}>
          <Text style={styles.textStyle}>{palceholders.PASSWORD}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text style={styles.textStyle}>{strings.LOGIN_ACTIVITY}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text style={styles.textStyle}>
            {strings.SAVED_LOGIN_INFORMATION}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text style={styles.textStyle}>
            {strings.TWO_FACTOR_AUTHENTICATION}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text style={styles.deleteText}>{strings.DELETE_YOUR_DATA}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SafetySettings;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  mainContainer: {
    marginTop: 20,
  },
  container: {
    borderBottomWidth: 1,
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal:8,
    width:"92%",
    alignSelf:'center',
    borderBottomColor: midGray,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily:GILROY_REGULAR,
    color:neutralBlack
  },
  deleteText: {
    fontSize: 16,
    fontWeight: "400",
    color: red,
  },
});
