import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "../utils/colors";
import { GILROY_MEDIUM } from "../utils/fonts";

const LoaderButton = ({
  onButtonPress,
  isLoading,
  bottonStyle,
  buttonText,
}) => {
  return (
    <TouchableOpacity style={[bottonStyle]} onPress={() => onButtonPress()}>
      {!isLoading ? (
        <Text style={styles.buttonText}>{buttonText}</Text>
      ) : (
        <ActivityIndicator color={"#000000"} />
      )}
    </TouchableOpacity>
  );
};

export default LoaderButton;

const styles = StyleSheet.create({
  btnViwe: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    height: 48,
    width: "96%",
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 15,
  },
  buttonText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
});
