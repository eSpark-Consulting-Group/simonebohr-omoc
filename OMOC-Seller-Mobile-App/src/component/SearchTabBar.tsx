import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import VectorImage from "react-native-vector-image";
import { search } from "../utils/images";
import { Height } from "../utils";
import { Colors } from "../utils/colors";

const SearchTabBar = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <VectorImage source={search} style={styles.icon} />
      <TextInput
        style={styles.searchInput}
        keyboardType="default"
        placeholder={props.placeholder}
        placeholderTextColor={Colors.grey}
        onChangeText={props.onChange}
        value={props.value}
        onPressIn={props.onPressIn}
      />
    </View>
  );
};

export default SearchTabBar;

const styles = StyleSheet.create({
  searchInput: {
    width: "90%",
    color: "#000000",
    paddingVertical: 10,
  },
  container: {
    gap: 8,
    marginTop: Height * (2 / 100),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
    paddingHorizontal: 16,
    borderRadius: 14,
    borderColor: "#EDEDED",
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    alignItems:"center"
  },
  icon: {
    height: 20,
    width: 20,
  },
});
