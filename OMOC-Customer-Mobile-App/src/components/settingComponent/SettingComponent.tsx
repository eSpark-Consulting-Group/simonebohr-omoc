import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import VectorImage from "react-native-vector-image";
import { next_icon } from "../../utils/images";
import { midGray, neutralBlack, red } from "../../utils/colors";
import { GILROY_REGULAR } from "../../utils/fonts";

const SettingComponent = ({ data, navigation }) => {
  const handleOnClick = () => {
    let str = data.title.replace(/\s/g, "");
    navigation.navigate(str);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleOnClick}>
      <Text style={styles.textStyle}>{data.title}</Text>
      <View style={styles.rightContainer}>
        {data.isUpdate && <View style={styles.update} />}
        <VectorImage style={styles.iconStyle} source={next_icon} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderBottomColor: midGray,
    paddingHorizontal: 5,
    marginTop: 8,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: neutralBlack,
    lineHeight: 22,
  },
  iconStyle: {
    width: 5,
    height: 10,
  },
  update: {
    height: 10,
    width: 10,
    backgroundColor: red,
    borderRadius: 20,
  },
  rightContainer: {
    flexDirection: "row",
    gap: 8,
    height: 22,
    alignItems: "center",
  },
});
