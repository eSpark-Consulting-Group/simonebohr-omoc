import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import {
  fillBlue,
  grey,
  lightBlack,
  lightGrey,
  whiteColor,
} from "../utils/colors";
import FastImage from "react-native-fast-image";
import { strings } from "../assets/string/strings";

const OrderCard = ({ data, fromCart }) => {
  const item = fromCart ? data?.data[0] : data;
  const imageUrl = fromCart ? item?.images[0].url : data?.images[0].url;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.productImg}>
        <FastImage source={{ uri: imageUrl }} style={styles.imgShow} />
      </View>
      <View style={styles.container}>
        <Text style={styles.mainHeading}>{item?.name}</Text>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>{item?.type || "creame"}</Text>
        </View>
        <View style={styles.quantityBtn}>
          <Text style={styles.price}>{strings.TOTAL_PRICE} </Text>
          <Text style={styles.priceText}>
            {"\u0024"}
            {item.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    gap: 15,
    marginVertical: 8,
    borderBottomWidth: 5,
    paddingBottom: 8,
    borderColor: lightGrey,
    backgroundColor: whiteColor,
    borderRadius: 20,
  },
  mainHeading: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
  subHeadingContainer: {
    width: "70%",
    height: 22,
    backgroundColor: lightGrey,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignItems: "center",
  },
  subHeading: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: lightBlack,
  },
  quantityBtn: {
    marginTop: 22,
    flexDirection: "row",
  },
  container: {
    gap: 10,
    marginTop: 10,
  },
  priceText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    fontWeight: "500",
  },
  productImg: {
    width: "31%",
    backgroundColor: lightGrey,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  imgShow: {
    width: 105,
    height: 105,
    resizeMode: "contain",
  },
  price: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: grey,
  },
});
