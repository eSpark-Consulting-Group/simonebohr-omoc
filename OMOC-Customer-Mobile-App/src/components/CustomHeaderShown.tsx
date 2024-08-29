import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import VectorImage from "react-native-vector-image";
import backIcon from "../assets/Icon/back_icon.svg";
import { neutralBlack, skyBlueColor } from "../utils/colors";
import { GILROY_MEDIUM } from "../utils/fonts";

const CustomHeaderShown: FC<{
  navigation?: any;
  title?: string;
  rightheadertext?: string;
  onRightHeaderPress?: () => void;
  rightheadericon?: any;
}> = ({
  navigation,
  title,
  rightheadertext,
  onRightHeaderPress,
  rightheadericon,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}
        style={styles.backView}
      >
        <VectorImage source={backIcon} style={styles.BackButton} />
      </TouchableOpacity>
      <Text style={[styles.titleText]}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          onRightHeaderPress();
        }}
        style={styles.rightView}
      >
        {rightheadertext && (
          <Text style={styles.rightText}>{rightheadertext}</Text>
        )}
        {rightheadericon && (
          <VectorImage source={rightheadericon} style={styles.iconstyle} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeaderShown;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 2,   
  },
  titleText: {
    fontSize: 20,
    fontWeight: "500",
    color: neutralBlack,
    fontFamily: GILROY_MEDIUM,
    textAlign:'center'
  },
  rightText: {
    fontSize: 16,
    fontWeight: "500",
    color: skyBlueColor,
  },
  BackButton: {
  },
  backView: {
    paddingRight: 25,
    paddingVertical: 8,
    position: "absolute",
    left: 0,
    alignItems:'center',
    justifyContent:'center'
  },
  rightView: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    position: "absolute",
    right: 0,
    paddingLeft: 25,
    paddingVertical: 8,
  },
  iconstyle: {
    width: 24,
    height: 24,
  },
});
