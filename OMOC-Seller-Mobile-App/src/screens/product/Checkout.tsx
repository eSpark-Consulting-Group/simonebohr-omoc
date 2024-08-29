import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { strings } from "../../utils/string/strings";
import Customheader from "../../component/Customheader";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import { add_icon } from "../../utils/images";

const Checkout = () => {
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerContainer}>
        <Customheader
          title={strings.CHECKOUT}
          showBackIcon={true}
          optionImage={undefined}
          onPress={undefined}
          Containerstyle={undefined}
          rihgtIconStyle={undefined}
        />
      </View>
      <View style={styles.headerCheckout}>
        <Text style={styles.checkoutText}>{strings.CHECKOUT}</Text>
      </View>
      <View style={styles.viewActive}>
        <Text style={styles.activeText}>{strings.ACTIVE_THE_TERMS}</Text>
        <Switch
          trackColor={{ true: "#0094FF" }}
          style={styles.toggle}
          value={switchOn}
          onValueChange={() => {
            setSwitchOn(!switchOn);
          }}
        />
      </View>
      <Text style={styles.setup}>{strings.SETUP_RULES}</Text>
      <View style={styles.textView}>
        <Text style={styles.configureText}>{strings.CONFIGURE}</Text>
        <View style={styles.writeLabelView}>
          <Text style={styles.writeLabel}>{strings.WRITE_LABEL}</Text>
        </View>
        <Text style={styles.example}>{strings.EXAMPLE_THIS_IS}</Text>

        <TouchableOpacity style={styles.touchable}>
          <VectorImage
            source={add_icon}
            style={{ tintColor: Colors.skyBlueColor }}
          />
          <Text style={styles.textAddCondition}>{strings.ADD_CONDITION}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  headerContainer: {
    marginTop: 15,
  },
  headerCheckout: {
    marginTop: 30,
    marginLeft: 16,
  },
  checkoutText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 33.6,
    color: Colors.blackColor,
  },
  activeText: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 28,
    color: Colors.blackColor,
  },
  viewActive: {
    marginTop: 20,
    marginLeft: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggle: {
    marginRight: 20,
  },
  setup: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.46,
    color: Colors.mediumGrey,
    marginLeft: 16,
  },
  configureText: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 10,
    color: Colors.lightBlack,
  },
  textView: {
    marginTop: 25,
    marginLeft: 16,
  },
  writeLabel: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.grey,
  },
  writeLabelView: {
    marginLeft: 10,
    marginTop: 25,
  },
  example: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 10,
    color: Colors.grey,
    marginTop: 25,
  },
  touchable: {
    flexDirection: "row",
    marginTop: 15,
  },
  textAddCondition: {
    marginTop: 5,
    color: Colors.skyBlueColor,
  },
});
