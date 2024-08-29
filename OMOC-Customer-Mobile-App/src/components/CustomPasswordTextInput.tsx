import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { lightGrey } from "../utils/colors";
import VectorImage from "react-native-vector-image";
import { eye_view, hide_password } from "../utils/images";
import { GILROY_REGULAR } from "../utils/fonts";
import FastImage from "react-native-fast-image";

const CustomPasswordTextInput = (props) => {
  return (
    <View style={[styles.inputView, props.style]}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize={props?.autoCapitalize || "none"}
      />
      <View>
        <TouchableOpacity onPress={() => props.onShowPassword()}>
          {!props.secureTextEntry ? (
            <VectorImage source={eye_view} style={styles.ViewImg} />
          ) : (
            <FastImage source={hide_password} style={styles.ViewImg} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomPasswordTextInput;

const styles = StyleSheet.create({
  inputView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: "93%",
    borderColor: lightGrey,
    paddingVertical: 18,
    paddingHorizontal: 16,
    height: 56,
    flexDirection: "row",
    alignSelf: "center",
  },
  input: {
    width:'93%',
    paddingVertical: 18,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    height: 50,

  },
  ViewImg: {
    width: 20,
    height: 20,
  },
});
