import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { midGray, neutralBlack } from "../../utils/colors";
import { GILROY_REGULAR } from "../../utils/fonts";

const CountryComponent = ({ value }) => {
  return (
    <TouchableOpacity style={styles.listContainer} onPress={() => {}}>
        <Text style={styles.countryName}>{value.item.value}</Text>
    </TouchableOpacity>
  );
};

export default CountryComponent;

const styles = StyleSheet.create({
  listContainer: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal:8,
    borderBottomColor: midGray,
    width:"92%",
    alignSelf:'center',
    marginTop:10
  },
  countryName:{
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color:neutralBlack
  }
});
