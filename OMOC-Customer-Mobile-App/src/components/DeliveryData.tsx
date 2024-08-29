import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { dots_icon } from "../utils/images";
import VectorImage from "react-native-vector-image";
import { GILROY_BLACK, GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import {
  dangerRed,
  grey,
  lightBlue,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu"
import ApiService from "../services/api.service";

const DeliveryData = ({
  data,
  SelectedAddress,
  onClik,
  onDelete,
  onSetAsPrimaryAddress,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        SelectedAddress(data), onClik();
      }}
    >
      <Text style={styles.emoji}>{data.icon}</Text>
      <View style={styles.container}>
        <View style={styles.addressNameView}>
          <Text style={styles.grandmaText}>{data.name}</Text>
          {data.isPrimary && (
            <View style={styles.primaryBtn}>
              <Text style={styles.PrimaryText}>{"Primary Address"}</Text>
            </View>
          )}
        </View>
        <Text style={styles.subText}>{data.phoneNumber}</Text>
        <Text style={styles.addressText}>
          {`${data.address}, ${data.city}, ${data.zipCode}, ${data.region}, ${data.region}`}
        </Text>
        <View style={styles.border}></View>
      </View>
      <View style={styles.dotsIconView}>
        <Menu>
          <MenuTrigger>
            <VectorImage
              source={dots_icon}
              style={[
                styles.dotsIcon,
                { marginLeft: data.PrimaryAddress ? -20 : 0 },
              ]}
            />
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption
              style={styles.addressBtn}
              onSelect={() => onSetAsPrimaryAddress()}
            >
              <Text style={styles.defaultAddressText}>
                Set as primary address
              </Text>
            </MenuOption>
            <MenuOption
              style={styles.editAddressBtn}
              onSelect={() => {
                navigation.navigate("EditAddress", { data });
              }}
            >
              <Text style={styles.editAddressText}>Edit Address</Text>
            </MenuOption>
            <MenuOption style={styles.deleteBtn} onSelect={() => onDelete()}>
              <Text style={styles.deleteText}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </TouchableOpacity>
  );
};
export default DeliveryData;

const styles = StyleSheet.create({
  mainContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    gap: 10,
    paddingBottom: 13,
    borderBottomColor: "#EDEDED",
  },
  emoji: {
    height: 34,
    width: 28,
  },
  container: {
    gap: 4,
  },
  grandmaText: {
    color: neutralBlack,
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22.4,
  },
  primaryBtn: {
    backgroundColor: lightBlue,
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  PrimaryText: {
    color: skyBlueColor,
    fontSize: 10,
    lineHeight: 11.77,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  subText: {
    color: grey,
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 22,
  },
  addressText: {
    color: grey,
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 20,
  },
  dotsIconView: {
    position: "absolute",
    right: 4,
    top: 0,
  },
  dotsIcon: {
    height: 20,
    width: 20,
  },

  addressBtn: {},
  defaultAddressText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    lineHeight: 17,
    color: neutralBlack,
  },
  editAddressBtn: {},
  editAddressText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    lineHeight: 17,
    color: neutralBlack,
  },
  deleteBtn: {
    width: "50%",
  },
  deleteText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    lineHeight: 17,
    color: dangerRed,
  },
  addressNameView: { flexDirection: "row", alignItems: "center", gap: 10 },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "transparent",
    paddingRight: 25,
  },
  optionsWrapper: {
    borderRadius: 10,
    backgroundColor: whiteColor,
    paddingLeft: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.4,
    elevation: 3,
    gap: 4,
    padding: 15,
  },
};
