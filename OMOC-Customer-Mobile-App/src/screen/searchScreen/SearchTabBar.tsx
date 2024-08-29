import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import VectorImage from "react-native-vector-image";
import { searchbar_icon } from "../../utils/images";
import { neutralBlack } from "../../utils/colors";

const SearchTabBar = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <VectorImage source={searchbar_icon} style={styles.icon} />
      <TextInput
        ref={props.ref}
        value={props.value}
        style={styles.searchInput}
        placeholder={props.placeholder}
        onPressIn={props.onPressIn}
        placeholderTextColor={"#9E9E9E"}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
      />
    </View>
  );
};

export default SearchTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  searchInput: {
    fontSize: 14,
    fontWeight: "400",
    color: neutralBlack,
    marginEnd: 10,
    height: 45,
    alignItems: "center",
    width: "85%",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
