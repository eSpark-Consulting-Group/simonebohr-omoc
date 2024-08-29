import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import VectorImage from "react-native-vector-image";
import {
  check_icon,
  profile_pic1,
  square_un_checkbox,
} from "../utils/images";
import FastImage from "react-native-fast-image";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";

const UserListComponent = ({ item, onSelect, isSelected }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <View style={styles.itemDetailContainer}>
        <FastImage
          source={{ uri: item?.profileImg }}
          style={styles.userImageStyle}
          defaultSource={profile_pic1}
        />
        <View style={{ gap: 5 }}>
          <Text style={styles.nameTextStyle}>{item.name}</Text>
          <Text style={styles.userNameTextStyle}>{item.userName}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <VectorImage
          style={styles.iconStyle}
          source={!!isSelected ? check_icon : square_un_checkbox}
        />
      </View>
    </TouchableOpacity>
  );
};
export default UserListComponent;

const styles = StyleSheet.create({
  container: {
    width: "93%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
    color: "#242424",
    lineHeight: 13,
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
  rightContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  userImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
});
