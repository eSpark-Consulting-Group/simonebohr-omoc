import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const screenWidth = Dimensions.get("window").width;
const buttonWidthPercentage = 20;
const CustomFollowButton = (props, followStatus) => {
  console.log(followStatus)
  const [follow, setFollow] = useState("Follow");
  const handleFollow = () => {
    if (follow === "Follow") {
      setFollow("Following");
    } else {
      setFollow("Follow");
    }
  };
  return (
    <TouchableOpacity
      onPress={handleFollow}
      style={[
        styles.BtnContainer,
        { backgroundColor: follow === "Follow" ? "#0094FF" : "#fff" },
        props.style,
      ]}
    >
      <Text style={{ color: follow === "Follow" ? "#fff" : "#0094FF" }}>
        {follow}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomFollowButton;

const styles = StyleSheet.create({
  BtnContainer: {
    borderWidth: 1,
    width: (screenWidth * buttonWidthPercentage) / 80,
    height: 25,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#AADBFF",
  },
});
