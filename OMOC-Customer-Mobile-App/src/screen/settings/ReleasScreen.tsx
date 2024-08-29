import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import DeviceInfo from "react-native-device-info";
import React from "react";
import VectorImage from "react-native-vector-image";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { info_icon, logo_icon } from "../../utils/images";
import {
  lightGrey,
  midGray,
  neutralBlack,
  neutralGrey,
  red,
  whiteColor,
} from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";

const ReleasScreen = ({ navigation }) => {
  const appVersion = DeviceInfo.getVersion();
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerContainer}>
        <CustomHeaderShown
          title={strings.RELEASE_NOTE}
          rightheadericon={info_icon}
          navigation={navigation}
          onRightHeaderPress={() => navigation.navigate("DeviceInformation")}
        />
      </View>
      <View style={styles.container}>
        <VectorImage source={logo_icon} />
        <Text style={styles.headingText}>{strings.OMOC}</Text>
        <Text style={styles.versionText}>v{appVersion}</Text>
      </View>
      <TouchableOpacity style={styles.bottomContainer}>
        <Text style={styles.updateText}>{strings.UPDATE_APP}</Text>
        <View style={styles.update} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReleasScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  headerContainer: {
    marginHorizontal: 15,
  },
  container: {
    height: "40%",
    width: "100%",
    backgroundColor: lightGrey,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 5,
    textTransform: "capitalize",
  },
  versionText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    color: neutralGrey,
    marginTop: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal:16,
    borderBottomWidth: 1,
    borderBlockColor: midGray,
  },
  update: {
    height: 10,
    width: 10,
    backgroundColor: red,
    borderRadius: 20,
  },
  updateText: {
    fontSize: 16,
    color: neutralBlack,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
});
