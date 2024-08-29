import { StyleSheet, Text, View, SafeAreaView, Switch } from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { strings } from "../../utils/string/strings";
import { Colors } from "../../utils/colors";
import { GILROY_REGULAR, GILROY_SEMIBOLD } from "../../utils/fonts";

const ShopStatusScreen = () => {
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Customheader title={strings.SHOP_STATUS} showBackIcon={true} />
      </View>
      <View style={styles.viewHeader}>
        <View style={styles.textHeader}>
          <Text style={styles.ageText}>{strings.DEACTIVE_YOUR_SHOP}</Text>
          <Switch
            trackColor={{ true: "#0094FF" }}
            value={switchOn}
            onValueChange={() => {
              setSwitchOn(!switchOn);
            }}
          />
        </View>
        <Text style={styles.oops}>{strings.OOPS}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ShopStatusScreen;

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
