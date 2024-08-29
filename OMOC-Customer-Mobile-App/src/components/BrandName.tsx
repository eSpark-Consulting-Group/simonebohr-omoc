import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { whiteColor, skyBlueColor } from "../utils/colors";
import PriceButtom from "./PriceButtom";
import { GILROY_BLACK, GILROY_SEMIBOLD } from "../utils/fonts";
import { verifyBlue_icon } from "../utils/images";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
const BrandName = ({ imageSource, title, buttText }) => {
  return (
    <View style={styles.container}>
      <FastImage source={imageSource} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.row}>
            <VectorImage source={verifyBlue_icon} style={styles.imageBadge} />
            <Text style={styles.title}>{title}</Text>
          </View>
          {buttText && <PriceButtom buttText={buttText} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 15,
  },
  image: {
    width: 32,
    height: 32,

    resizeMode: "cover",
    marginBottom: 10,
    marginLeft: 1,
  },
  content: {
    flexDirection: "column",
    // flex: 1,
  },
  row: {
    flexDirection: "row",
    height: 20,
    marginTop: 2,
  },
  column: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: GILROY_SEMIBOLD,
    // fontWeight: "300",
    alignSelf: "center",
    marginLeft: 3,
  },
  price: {
    fontSize: 14,
  },
  buttonContent: {
    marginRight: 20,
    flex: 1,
  },
  buyButton: {
    backgroundColor: whiteColor,
    padding: 10,
    borderRadius: 100,
    alignSelf: "flex-end",
    width: 75,
    height: 28,
    justifyContent: "center",
  },
  buyButtonText: {
    color: skyBlueColor,
    textAlign: "center",
    fontSize: 11,
    height: 13,
  },
  imageBadge: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 10,
    alignSelf: "center",
  },
});

export default BrandName;
