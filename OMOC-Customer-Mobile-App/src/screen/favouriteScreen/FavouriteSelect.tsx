import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { grey, lightGrey, skyBlueColor } from "../../utils/colors";
import { GILROY_MEDIUM } from "../../utils/fonts";

const FavouriteSelect = ({ data, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(data);
      }}
      style={[
        styles.selectBtn,
        { backgroundColor: data.isSelected ? skyBlueColor : lightGrey },
      ]}
    >
      <Text
        style={[
          styles.selectText,
          { color: data.isSelected ? lightGrey : grey },
        ]}
      >
        {data?.title}
      </Text>
    </TouchableOpacity>
  );
};

export default FavouriteSelect;

const styles = StyleSheet.create({
  selectBtn: {
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  selectText: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    lineHeight:19
  },
});
