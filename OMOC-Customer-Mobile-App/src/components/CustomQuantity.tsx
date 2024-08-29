import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import { add_icon, dec_icon } from "../utils/images";
import { GILROY_REGULAR } from "../utils/fonts";
import { creamColor, skyBlueColor, whiteColor } from "../utils/colors";

const CustomQuantity = ({ count, onIncrement, onDecrement }) => {
  const increment = () => {
    onIncrement();
  };

  const decrement = () => {
    onDecrement();
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={decrement} style={styles.decriment}>
        <VectorImage source={dec_icon} style={styles.iconColor} />
      </TouchableOpacity>
      <Text style={styles.quantityStyle}>{count}</Text>
      <TouchableOpacity onPress={increment} style={styles.decriment}>
        <VectorImage source={add_icon} style={styles.iconColor} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomQuantity;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    height: 28,
    backgroundColor: creamColor,
    borderRadius: 24,
    gap:20,
    alignItems: "center",
    justifyContent:'center'
  },
  decriment: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: whiteColor,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityStyle: {
    fontSize: 10,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
  iconColor:{
    tintColor:skyBlueColor
  }
});
