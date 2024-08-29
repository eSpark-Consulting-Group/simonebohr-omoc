import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { brandIcon, verifyBlue_icon } from "../utils/images";
import { GILROY_MEDIUM } from "../utils/fonts";
import VectorImage from "react-native-vector-image";
import {
  fillBlue,
  lightGrey,
  offwhite,
  skyBlueColor,
  whiteColor,
} from "../utils/colors";
import FastImage from "react-native-fast-image";
import CustomCheckBox from "./CustomCheckBox";
import { useNavigation } from "@react-navigation/native";
const CustomCartHeading = ({
  data,
  title,
  color,
  checkStatus,
  status,
  OnEditPress,
  onShopSelect
}) => {
  const navigation = useNavigation();
  const [selectAll, setSelectAll] = useState(false);
  const [shopClick, setShopClick] = useState(false);
  useEffect(() => {
    setSelectAll(status);
  }, [status]);
 const shopName= data.shopName
  const renderCheckBox = () => (
    <CustomCheckBox
      boxType="square"
      style={styles.CheckBox}
      onFillColor={skyBlueColor}
      onCheckColor={"white"}
      checkboxValue={selectAll}
      onSelect={() => onShopSelect()}
    />
  );

  return (
    <View style={styles.mainContainer}>
       <View style={styles.container}>
          {checkStatus && renderCheckBox()}
          <FastImage source={brandIcon} />
          <Text style={styles.heading}>{shopName}</Text>
          <VectorImage style={styles.verifyImg} source={verifyBlue_icon} />
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => OnEditPress()}
          >
            <Text style={{ color: color }}>{title}</Text>
          </TouchableOpacity>
        </View>
      <View style={styles.btmBorder}></View>
    </View>
  );
};

export default CustomCartHeading;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: lightGrey,
  },
  container: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: lightGrey,
    alignItems: "center",
  },
  heading: {
    marginTop: 7,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  verifyImg: {
    marginTop: 7,
    width: 16,
    height: 16,
  },
  btmBorder: {
    borderTopWidth: 2,
    borderColor: offwhite,
    marginTop: 15,
  },
  editBtn: {
    position: "absolute",
    right: 5,
    marginTop: 7,
  },
  CheckBox: {
    height: 18,
    width: 18,
  },
});
