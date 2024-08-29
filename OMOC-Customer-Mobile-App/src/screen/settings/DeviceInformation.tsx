import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DeviceInfo from "react-native-device-info";
import NetInfo from "@react-native-community/netinfo";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { midGray, neutralBlack, whiteColor } from "../../utils/colors";
import { GILROY_REGULAR } from "../../utils/fonts";

const DeviceInformation = ({ navigation }) => {
  const [first, setfirst] = useState();
  const appVersion = DeviceInfo.getVersion();
  const deviceModal = DeviceInfo.getDeviceId();
  const filterText = deviceModal.match(/([a-zA-Z]+\d+)[^\d,]*/);
  if (filterText) {
    const result = filterText[0];
  }
  const systemVersion = DeviceInfo.getSystemVersion();
  NetInfo.fetch().then((state) => {
    setfirst(state.type);
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerContainer}>
        <CustomHeaderShown
          title={strings.DEVICE_INFORMATION}
          navigation={navigation}
        />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.keyText}>{strings.APP_VERSION}</Text>
          <Text style={styles.valueText}>{appVersion}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.keyText}>{strings.SYSTEM_VERSION}</Text>
          <Text style={styles.valueText}>{systemVersion}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.keyText}>{strings.DEVICE_MODAL}</Text>
          <Text style={styles.valueText}>{filterText?.[0]}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.keyText}>{strings.NETWORD_TYPE}</Text>
          <Text style={styles.valueText}>{first}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeviceInformation;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  headerContainer: {
    marginHorizontal: 15,
  },
  mainContainer: {
    marginTop: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    paddingVertical: 12,
    alignItems: "center",
    marginTop:10,
    paddingHorizontal:16
  },
  keyText: {
    color: neutralBlack,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: GILROY_REGULAR,
  },
  valueText: {
    color: neutralBlack,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
});
