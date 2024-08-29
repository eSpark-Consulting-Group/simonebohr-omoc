import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { lightGrey } from "../utils/colors";

const CustomTextInput = (props) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={[styles.input, props.style]}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize={props?.autoCapitalize || 'none'}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputView: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderRadius: 24,
    width: "92%",
    borderColor: lightGrey,
    paddingVertical: 18,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 14,
    fontWeight: "400",
  },
});
