import { SafeAreaView, StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import { grey, neutralGrey, whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { GILROY_REGULAR } from "../../utils/fonts";

const ContactSync = ({ navigation }) => {
  const [switchOn, setSwitchOn] = useState(false);
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.CONTACT_SYNC}
          navigation={navigation}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.headingText}>{strings.CONTACT_SYNC}</Text>
        <Switch
          trackColor={{ true: "#0094FF" }}
          value={switchOn}
          onValueChange={() => {
            setSwitchOn(!switchOn);
          }}
        />
      </View>
      <Text style={styles.subText}>{strings.SYNC_YOUR_CONTACT}</Text>
    </SafeAreaView>
  );
};

export default ContactSync;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    alignItems: "center",
    marginTop:30

  },
  subText: {
    marginHorizontal: 15,
    lineHeight: 21,
    color: grey,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
  headingText: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    marginVertical:20,
    color: neutralGrey,
  },
});
