import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Height, Width } from "../utils";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import VectorImage from "react-native-vector-image";
import { Colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { arrowleft_icon } from "../utils/images";

const Customheader = ({
  optionImage,
  title,
  showBackIcon,
  onPress,
  Containerstyle,
  rightIconStyle
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, Containerstyle]}>
      {showBackIcon && (
        <TouchableOpacity
          style={styles.containItem}
          onPress={() => navigation.goBack()}
        >
          <VectorImage source={arrowleft_icon} style={styles.backIcon} />
        </TouchableOpacity>
      )}
      <View style={{alignSelf: "center" }}>
        <Text style={styles.text}>{title}</Text>
      </View>
      {optionImage && (
        <TouchableOpacity onPress={onPress} style={styles.rightHeaderIcon}>
          <VectorImage source={optionImage} style={[styles.icon,rightIconStyle]} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Customheader;

const styles = StyleSheet.create({
  container: {
    marginTop: 8 ,
    justifyContent: "center",
    width: "97%",
    paddingVertical: 2,
    alignItems: "center",
    alignSelf: "center",
  },
  containItem: {
    position: "absolute",
    left: 0,
    zIndex: 0,
    paddingLeft: 10,
    paddingRight: 30,
  },
  text: {
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
    textAlign: "center",
    lineHeight: 28,
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode:'contain'
  },
  rightHeaderIcon: {
    paddingLeft: 30,
    paddingRight: 15,
    paddingBottom: 15,
    position: "absolute",
    right: 0,
    zIndex: 0,
  },
  backIcon: {
    height: 20,
    width: 10,
    tintColor: "#242424",
    transform: [{ rotateZ: "180deg" }],
  },
});
