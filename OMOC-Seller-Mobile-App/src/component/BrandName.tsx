import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";
import PriceButtom from "./PriceButtom";
import { GILROY_BLACK } from "../utils/fonts";
import { verifyBlue_icon } from "../utils/images";
import FastImage from "react-native-fast-image";

const BrandName = ({ imageSource, title, buttText }) => {
  return (
    <View style={styles.container}>
      <FastImage source={imageSource} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.row}>
            <FastImage source={verifyBlue_icon} style={styles.imageBadge} />
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
    fontSize: 14,
    fontFamily: GILROY_BLACK,
    fontWeight: "500",
    alignSelf: "center",
    marginLeft: 10,
  },
  price: {
    fontSize: 14,
  },
  buttonContent: {
    marginRight: 20,
    flex: 1,
  },
  buyButton: {
    backgroundColor: Colors.whiteColor,
    padding: 10,
    borderRadius: 100,
    alignSelf: "flex-end",
    width: 75,
    height: 28,
    justifyContent: "center",
  },
  buyButtonText: {
    color: Colors.skyBlueColor,
    textAlign: "center",
    fontSize: 11,
    height: 13,
  },
  imageBadge: {
    width: 15,
    height: 15,

    resizeMode: "cover",
    marginLeft: 10,
    alignSelf: "center",
  },
});

export default BrandName;
