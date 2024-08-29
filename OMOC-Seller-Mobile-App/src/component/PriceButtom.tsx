import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors} from "../utils/colors";
import { GILROY_BOLD, GILROY_MEDIUM } from "../utils/fonts";
import { Height, Width } from "../utils";

const PriceButtom = ({ buttText ,bgColor,textColor}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.buttonContent}>
          <TouchableOpacity style={[styles.buyButton,{ backgroundColor:bgColor}]}>
              <Text style={[styles.buyButtonText,{color:textColor}]}>{buttText}</Text>
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
  buttonContent: {
    marginRight: 20,
    flex: 1,
  },
  buyButton: {
    width:Width*(23/100),
    height:Height*(3/100),
    borderRadius: 10,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems:'center'
  },
  buyButtonText: {
    textAlign: "center",
    fontSize:Width*(3.6/100),
    fontFamily:GILROY_MEDIUM,
  },
});

export default PriceButtom;
