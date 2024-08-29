import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import {
  blackColor,
  lightGrey,
  skyBlueColor,
  whiteColor,
} from "../utils/colors";
import VectorImage from "react-native-vector-image";
import { delete_icon } from "../utils/images";
import { GILROY, GILROY_REGULAR } from "../utils/fonts";
import { strings } from "../assets/string/strings";

const CustomTotalCost = (props) => {
  const { isDelete } = props;

  return (
    <View style={styles.container}>
      <View style={styles.totalprice}>
        <Text style={styles.textTotal}>{strings.TOTAL_COST}</Text>
        <Text style={styles.textTotal}>
          {"\u0024"}
          {props.price}
        </Text>
      </View>
      <View style={styles.costContainer}>
        {isDelete && (
          <TouchableOpacity style={styles.delete}>
            <VectorImage source={delete_icon} />
          </TouchableOpacity>
        )}
        <CustomButton
          text={strings.PROCESS_TO_CHECKOUT}
          textstyle={styles.textColor}
          style={[styles.btn, { width: "95%", paddingLeft: isDelete ? 3 : 0 }]}
          onPress={props.onPress}
          disable={!props.cartData.length}
        />
      </View>
    </View>
  );
};

export default CustomTotalCost;

const styles = StyleSheet.create({
  totalprice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
  },
  textColor: {
    color: whiteColor,
    textAlign: "center",
    marginLeft: 30,
  },
  textTotal: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: GILROY_REGULAR,
  },
  container: {
    paddingTop: 30,
    gap: 30,
    position: "absolute",
    bottom: 0,
    backgroundColor: whiteColor,
    width: "100%",
    shadowColor: blackColor,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    paddingBottom: 10,
  },
  costContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    flex: 1,
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: skyBlueColor,
    color: whiteColor,
    overflow: "hidden",
    flex: 1,
    alignItems: "center",
  },
  delete: {
    backgroundColor: lightGrey,
    width: 48,
    height: 48,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
