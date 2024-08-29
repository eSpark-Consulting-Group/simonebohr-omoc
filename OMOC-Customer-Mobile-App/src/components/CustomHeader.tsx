import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import VectorImage from "react-native-vector-image";
import backIcon from "../assets/Icon/back_icon.svg";
import { skyBlueColor, whiteColor } from "../utils/colors";
import { GILROY_MEDIUM } from "../utils/fonts";
import FastImage from "react-native-fast-image";

const CustomHeader = ({ navigation, image ,rightOnPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={navigation}>
        <VectorImage source={backIcon} />
      </TouchableOpacity>
        <TouchableOpacity onPress={rightOnPress}>
          <VectorImage source={image} />
        </TouchableOpacity>   
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "500",
  },
  rightText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    color: skyBlueColor,
  },
  backButton: {
    justifyContent: "center",
    backgroundColor: whiteColor,
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 100,
  },
});
