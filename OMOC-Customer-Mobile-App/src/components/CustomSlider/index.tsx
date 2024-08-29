import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const CustomSlider = ({ onFontSizeChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.triangleShape}>
        <View
          style={{
            transform: [
              {
                rotate: "270deg",
              },
            ],
          }}
        >
          <Slider
            vertical={true}
            style={styles.slider}
            value={1}
            minimumValue={20}
            maximumValue={40}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            onValueChange={(val) => {
              onFontSizeChange(val);
              console.log(JSON.stringify(val))
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 10,
    marginLeft: 40,
    flexDirection: "row",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  triangleShape: {
    height: '100%',
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 0,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderTopWidth: 200,
    borderTopColor: "#F8F8F899",
    borderRadius: 10,
  },
  slider: {
    width: 202,
    height: 40,
    position: "absolute",
    zIndex: 3,
    left: 0,
    top: -19,
  },
});
export default CustomSlider;
