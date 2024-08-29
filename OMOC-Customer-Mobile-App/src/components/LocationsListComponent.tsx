import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import VectorImage from "react-native-vector-image";
import { location_icon } from "../utils/images";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { lightBlue, skyBlueColor } from "../utils/colors";

const LocationsListComponent = ({ item, onSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <View style={styles.itemDetailContainer}>
        <View style={styles.markerContainer}>
          <VectorImage
            source={location_icon}
            style={styles.userImageStyle}
            tintColor={skyBlueColor}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text style={styles.nameTextStyle}>{item.name}</Text>
          <Text style={styles.userNameTextStyle}>{item.fullAddress}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default LocationsListComponent;

const styles = StyleSheet.create({
  container: {
    width: "93%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  itemDetailContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  nameTextStyle: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: "#242424",
    lineHeight: 19,
  },
  userNameTextStyle: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: "#4B4B4B",
    lineHeight: 13,
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
  markerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightBlue,
    width: 48,
    height: 48,
    borderRadius: 999,
  },
  userImageStyle: {
    width: 20,
    height: 20,
  },
});
