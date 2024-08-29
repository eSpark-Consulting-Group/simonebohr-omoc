import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import VectorImage from "react-native-vector-image";
import { whiteColor, midGray, neutralBlack } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { next_icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";

const SocialSettingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.SOCIAL_SETTING}
          navigation={navigation}
        />
      </View>
      <View style={styles.listView}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate("RequestVerificationScreen")}
        >
          <Text style={styles.textStyle}>{strings.REQUEST_VERIFICATION}</Text>
          <VectorImage style={styles.victorimage} source={next_icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate("AdsSettingScreen")}
        >
          <Text style={styles.textStyle}>{strings.ADS_SETTINGS}</Text>
          <VectorImage style={styles.victorimage} source={next_icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate("SensitiveContentScreen")}
        >
          <Text style={styles.textStyle}>{strings.SENSITIVE_CONTENT}</Text>
          <VectorImage style={styles.victorimage} source={next_icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SocialSettingScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  header: {
    marginHorizontal: 15,
  },
  victorimage: {
    height: 9,
    width: 5,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color:neutralBlack
  },
  listView: {
    width: "92%",
    alignSelf: "center",
    marginTop: 15,
  },
});
