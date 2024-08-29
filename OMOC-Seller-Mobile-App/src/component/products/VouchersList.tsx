import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";
import { three_dots_icon } from "../../utils/images";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import VectorImage from "react-native-vector-image";

const VouchersList = ({ item, navigation, onDeleteVoucher }) => {
  return (
    <View style={styles.container}>
      <View style={styles.hoodieView}>
        <Text style={styles.hoodieText}>{item.name}</Text>
        <Menu rendererProps={{ anchorStyle: styles.anchorStyle }}>
          <MenuTrigger style={styles.menuTriggerView}>
            <VectorImage source={three_dots_icon} style={styles.dotIcon} />
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption style={styles.menuOptionView} onSelect={() => {}}>
              <Text style={styles.menuTextColor}>Preview</Text>
            </MenuOption>
            <MenuOption style={styles.menuOptionView} onSelect={() => {}}>
              <Text style={styles.editAddressText}>Edit Voucher</Text>
            </MenuOption>
            <MenuOption
              style={styles.menuOptionView}
              onSelect={() => onDeleteVoucher()}
            >
              <Text style={styles.menuDeleteTextColor}>Delete Voucher</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.liveStreamView}>
        <View
          style={[
            styles.backViewStaus,
            { backgroundColor: Colors.lightSkyBlue },
          ]}
        >
          <Text style={[styles.statusText, { color: Colors.skyBlueColor }]}>
            {item.type}
          </Text>
        </View>
        <View
          style={[
            styles.backViewStaus,
            {
              backgroundColor: !!item.isExpired
                ? Colors.lightRed
                : Colors.neutralGreen,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: !!item.isExpired ? Colors.dangerRed : Colors.green },
            ]}
          >
            {!!item.isExpired ? "Expired" : "Active"}
          </Text>
        </View>
      </View>
      <Text style={styles.codeText}>{item._id}</Text>
      <Text style={styles.noteText}>Total Vouher : {item.quantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: 8,
    padding: 12,
    backgroundColor: Colors.whiteColor,
    width: "93%",
    borderRadius: 12,
    gap: 8,
    paddingHorizontal: 12,
  },
  hoodieText: {
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
    fontSize: 14,
    lineHeight: 17,
  },
  hoodieView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backViewStaus: {
    backgroundColor: Colors.neutralGreen,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 30,
  },
  statusText: {
    fontSize: 10,
    color: Colors.green,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 15,
  },
  codeText: {
    fontFamily: GILROY_REGULAR,
    color: Colors.grey,
    fontSize: 14,
    lineHeight: 19,
  },
  noteText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
    fontSize: 12,
    lineHeight: 17,
  },
  liveStreamView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    gap: 20,
  },
  dotView: {
    width: 1.5,
    height: 10.5,
  },
  dotIcon: {
    tintColor: "#9E9E9E",
    height: 13,
  },
  menuOptionView: {
    marginTop: 10,
  },
  menuTextColor: {
    color: "#0094FF",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    lineHeight: 14,
  },
  editAddressText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 13,
    color: Colors.neutralBlack,
  },
  menuTriggerView: {
    paddingLeft: 25,
    paddingBottom: 20,
  },
  menuDeleteTextColor: {
    color: "#C80000",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    lineHeight: 14,
  },
});

export default VouchersList;
const optionsStyles = {
  optionsContainer: {
    backgroundColor: "transparent",
    paddingRight: 15,
  },
  optionsWrapper: {
    borderRadius: 12,
    backgroundColor: Colors.whiteColor,
    paddingLeft: 12,
    paddingVertical: 8,
    shadowColor: "#00000017",
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.01,
    shadowRadius: 1.4,
    elevation: 1,
  },
};
