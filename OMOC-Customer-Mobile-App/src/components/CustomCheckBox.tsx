import { StyleSheet, View } from "react-native";
import React from "react";
import CheckBox from "@react-native-community/checkbox";

const CustomCheckBox = (props) => {
  return (
    <View>
      <CheckBox
        style={[styles.checkBox, props.style]}
        boxType={props.boxType}
        onFillColor={props.onFillColor}
        onCheckColor={props.onCheckColor}
        onValueChange={(val) => props.onSelect(val)}
        value={props.checkboxValue}
      />
    </View>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  checkBox: {
    height: 20,
    width: 10,
  },
});
