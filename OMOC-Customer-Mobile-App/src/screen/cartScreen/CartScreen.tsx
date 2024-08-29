import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomCheckBox from "../../components/CustomCheckBox";
import VectorImage from "react-native-vector-image";
import {
  fillBlue,
  lightGrey,
  midBlack,
  neutralBlack,
  whiteColor,
} from "../../utils/colors";
import FastImage from "react-native-fast-image";
import { shirt_img } from "../../utils/images";

const CartScreen = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.CheckBoxView}>
        <CustomCheckBox
          boxType="square"
          style={styles.CheckBox}
          onFillColor={fillBlue}
          onCheckColor="white"
        />
      </View>
      <View style={styles.mainContainer}>
        <FastImage source={shirt_img} style={styles.showImg} />
      </View>
      <View style={styles.AllText}>
        <Text style={styles.TextBig}>Hoodie Havana V1</Text>
        <View style={styles.SubTextStyle}>
          <Text style={styles.SubText}>Cream, Large</Text>
        </View>
        <Text style={styles.Text}>$1799</Text>
      </View>
      <View style={styles.ImageView}>
        <TouchableOpacity>
          <VectorImage
            source={require("../../assets/edit_icon.svg")}
            style={styles.EditImg}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    marginTop: "15%",
    backgroundColor: whiteColor,
    marginLeft: 20,
  },
  mainContainer:{
    flex:1
  },
  TextBig: {
    color: neutralBlack,
    lineHeight: 16.48,
    fontWeight: "500",
    fontSize: 16,
    marginTop: 5,
  },
  SubText: {
    color: neutralBlack,
    fontSize: 12,
    height: 14,
    width: 81,
    fontWeight: "400",
  },
  SubTextStyle: {
    borderRadius: 22,
    backgroundColor: lightGrey,
    height: 22,
    width: 113,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    color: midBlack,
    fontSize: 16,
    fontWeight: "500",
    height: 19,
  },
  AllText: {
    marginLeft: 20,
    gap: 10,
  },
  CheckBox: {
    color: fillBlue,
    height: 18,
    width: 18,
  },
  CheckBoxView: {
    marginRight: 20,
    marginTop: 45,
  },
  EditImg: {
    height: 12,
    width: 12,
  },
  ImageView: {
    justifyContent: "flex-end",
  },
  showImg: {
    width: "70%",
    height: "40%",
  },
});
