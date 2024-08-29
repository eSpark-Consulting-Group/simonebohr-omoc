import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { neutralBlack, skyBlueColor, whiteColor } from "../utils/colors";
import ProductItemsComponent from "./ProductItemsComponent";
import VectorImage from "react-native-vector-image";
import {
  brandIcon,
  verifyBlue_icon,
} from "../utils/images";
import FastImage from "react-native-fast-image";
import {
  GILROY_BLACK_ITALIC,
  GILROY_MEDIUM,
  GILROY_REGULAR,
} from "../utils/fonts";

const WishlistsComponents = ({ data, onPress, onProfileClick }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.headerProfileView}
          onPress={onProfileClick}
        ></TouchableOpacity>
      </View>
      <ProductItemsComponent />
      <View style={styles.itemFooterView}>
        <FastImage source={brandIcon} style={styles.userProfile} />
        <VectorImage source={verifyBlue_icon} style={styles.verifyBlueIcon} />
        <Text style={styles.itemText}>{data?.title}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            $98<Text style={styles.buttonSecondText}>.00</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default WishlistsComponents;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 282,
    alignSelf: "center",
    marginBottom: 30,
    padding: 0,
  
  },
  itemFooterView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionsView: {
    flexDirection: "row",
    gap: 10,
    marginRight: 10,
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  itemLikeView: {
    flexDirection: "row",
    width: "40%",
    gap: 5,
  },
  likesText: {
    fontFamily: GILROY_BLACK_ITALIC,
    fontWeight: "400",
    fontSize: 10,
    color: neutralBlack,
    width: 120,
  },
  likedByText: {
    fontFamily: GILROY_BLACK_ITALIC,
    fontWeight: "500",
    fontSize: 10,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  headerProfileView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  userProfile: {
    width: 32,
    height: 32,
  },
  itemText: {
    color: neutralBlack,
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    marginRight: "38%",
  },
  verifyBlueIcon: {
    marginRight: -7,
  },
  button: {
    height: 24,
    width: 72,
    backgroundColor: skyBlueColor,
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: whiteColor,
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
  },
  buttonSecondText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    color: whiteColor,
  },
});
