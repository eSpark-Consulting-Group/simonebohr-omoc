import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import CustomFollowButton from "./CustomFollowButton";
import { skyBlueColor, whiteColor } from "../utils/colors";
import { GILROY_REGULAR } from "../utils/fonts";

const screenWidth = Dimensions.get("window").width;
const buttonWidthPercentage = 20;
const LikeShow = ({ data }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <FastImage source={data.image} style={styles.profileImg} />
        <VectorImage source={data.verify} style={styles.icon} />
        <Text style={styles.nameText}>{data.name}</Text>
      </View>
      <TouchableOpacity style={styles.followContainer}>
        <Text style={styles.followText}>Fellow</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LikeShow;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    width:"95%",
    gap: 10,
    justifyContent:'space-between'
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 15,
  },
  profileImg: {
    height: 32,
    width: 32,
    borderRadius: 50,
  },
  icon: {
    width: 16,
    height: 16,
  },
  followContainer: {
    backgroundColor: skyBlueColor,
    paddingHorizontal: 16,
    borderRadius: 24,
    paddingVertical: 8,
  },
  followText: {
    color: whiteColor,
    fontSize: 10,
    fontFamily: GILROY_REGULAR,
  },
  folloebtn: {
    height: 28,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
