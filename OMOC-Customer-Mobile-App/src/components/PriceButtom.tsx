import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { whiteColor, skyBlueColor } from "../utils/colors";
import { GILROY_BOLD } from "../utils/fonts";
const PriceButtom = ({ buttText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.buttonContent}>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>{buttText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: "row",
  },
  content: {
    flexDirection: "column",
    flex: 1,
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
    fontSize: 16,
    fontFamily: GILROY_BOLD,
    alignSelf: "center",
    marginLeft: 10,
    color: whiteColor,
  },
  price: {
    fontSize: 14,
  },
  buttonContent: {
    marginRight: 20,
    flex: 1,
  },
  buyButton: {
    backgroundColor: skyBlueColor,
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
    width: 75,
    height: 28,
    justifyContent: "center",
  },
  buyButtonText: {
    color: whiteColor,
    textAlign: "center",
    fontSize: 11,
    height: 13,
  },
});

export default PriceButtom;
