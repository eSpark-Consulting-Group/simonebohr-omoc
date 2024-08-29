import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { GILROY_MEDIUM } from "../utils/fonts";
import { Colors } from "../utils/colors";

const CustomTwoButton = (props) => {
  const [buttonPress, setbuttonPress] = useState(false);
  const handlePressFirst = () => {
    setbuttonPress(!buttonPress);
    if (props.onPressFirst) {
      props.onPressFirst();
    }
  };

  const handlePressSecond = () => {
    setbuttonPress(!buttonPress);
    if (props.onPressSecond) {
      props.onPressSecond();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.buttonView,
          props.style,
          {
            backgroundColor: buttonPress
              ? Colors.whiteColor
              : Colors.skyBlueColor,
          },
        ]}
        onPress={handlePressFirst}
      >
        <Text
          style={[
            styles.textButton,
            {
              color: buttonPress ? Colors.skyBlueColor : Colors.whiteColor,
            },
          ]}
        >
          {props.firstTitile}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.buttonView,
          {
            backgroundColor: buttonPress
              ? Colors.skyBlueColor
              : Colors.whiteColor,
          },
        ]}
        onPress={handlePressSecond}
      >
        <Text
          style={[
            styles.textButton,
            {
              color: buttonPress ? Colors.whiteColor : Colors.skyBlueColor,
            },
          ]}
        >
          {props.secondTitile}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTwoButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 25, 
  },
  textButton: {
    fontSize: 14.5,
    fontFamily: GILROY_MEDIUM,
  },
  buttonView: {
    width: "49%",
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
  },
});
