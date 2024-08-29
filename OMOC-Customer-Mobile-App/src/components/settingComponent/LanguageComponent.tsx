import { StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import { grey, midGray } from "../../utils/colors";

const LanguageComponent = ({ data }) => {
  return (
    <View style={styles.viewText}>
      <View style={styles.textone}>
        <Text>{data.item.title}</Text>
        <Text style={styles.textdescription}>{data.item.description}</Text>
      </View>
    </View>
  );
};

export default LanguageComponent;

const styles = StyleSheet.create({
  viewText: {
    paddingLeft: 16,
    borderBottomWidth: 2,
    borderBottomColor: midGray,
    flex: 1,
    paddingBottom: 8,
  },
  textone: {
    width: "90%",
    padding: 12,
    paddingRight: 8,
    justifyContent: "space-between",
  },
  textdescription: {
    marginTop: 10,
    color: grey,
  },
});
