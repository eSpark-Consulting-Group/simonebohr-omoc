import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const Spinner = ({
  animating,
  bgColor = "rgba(52, 52, 52, 0.25)",
  tintColor = "white",
  size = "large",
  text,
  textStyle,
}) => (
  <View style={Styles.container}>
    {animating && (
      <View
        style={[
          Styles.container,
          Styles.innerContainer,
          !animating && Styles.containerNone,
          { backgroundColor: bgColor },
        ]}
      >
        <ActivityIndicator
          animating={animating}
          size={size}
          color={tintColor}
        />
        {true ? (
          <Text style={[{ marginTop: 10, color: "#ffffff" }, textStyle]}>
            {text}
          </Text>
        ) : null}
      </View>
    )}
  </View>
);

const Styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerNone: {
    display: "none",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },
});

export default Spinner;
