import { StyleSheet, Text, View, SafeAreaView, Switch } from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { strings } from "../../utils/string/strings";
import { Colors } from "../../utils/colors";
import { GILROY_REGULAR, GILROY_SEMIBOLD } from "../../utils/fonts";

const AgeRestrictionScreen = () => {
  const [switchOne, setSwitchOne] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <SafeAreaView>
      <Customheader
        title={strings.AGE}
        showBackIcon={true}
        Containerstyle={{ marginTop: 15, paddingBottom: 5 }}
      />
      <View style={styles.viewHeader}>
        <View style={styles.textHeader}>
          <Text style={styles.ageText}>{strings.AGE_TEXT}</Text>
          <Switch
            trackColor={{ true: "#0094FF" }}
            value={switchOne}
            onValueChange={() => {
              setSwitchOne(!switchOne);
            }}
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 1 }] }}
          />
        </View>
        <Text style={styles.oops}>{strings.OOPS}</Text>
      </View>
      <View style={styles.viewHeaderage}>
        <View style={styles.textHeader}>
          <Text style={styles.ageText}>{strings.AGE_PRODUCT}</Text>
          <Switch
            trackColor={{ true: "#0094FF" }}
            value={switchOn}
            onValueChange={() => {
              setSwitchOn(!switchOn);
            }}
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 1 }] }}
          />
        </View>
        <Text style={styles.oops}>{strings.OOPS}</Text>
      </View>
    </SafeAreaView>
  );
};

export default AgeRestrictionScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  header: {
    marginTop: 15,
  },
  viewHeader: {
    width: "92%",

    marginTop: 40,
    left: 16,
    gap: 24,
  },
  textHeader: {
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ageText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    color: Colors.neutralBlack,
    marginTop: 10,
  },
  oops: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.mediumGrey,
  },
  viewHeaderage: {
    width: "92%",

    marginTop: 25,
    left: 16,
    gap: 24,
  },
});
