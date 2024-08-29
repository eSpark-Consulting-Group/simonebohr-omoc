import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = (props) => {
  return (
    <View style={styles.btnViwe}>
      <TouchableOpacity
        style={[styles.button, props.style]}
        onPress={props.onPress}
        disabled={props.disable}
      >
        <Text style={[styles.buttonText, props.textstyle]}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnViwe: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    height: 51,
    width: "92%",
    borderRadius: 24,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
});
