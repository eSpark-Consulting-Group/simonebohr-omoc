import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { three_dots_icon } from "../utils/images";
import VectorImage from "react-native-vector-image";
import { CONTEXT } from "../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { Colors } from "../utils/colors";
const data = [
  {
    title: "Voucher Summer",
    number: "23904810283",
    total: "Total Voucher : 999",
    status: "Active",
    live: "Livestream",
    icon: three_dots_icon,
  },

  {
    title: "Voucher Summer",
    number: "23904810283",
    total: "Total Voucher : 999",
    status: "Active",
    live: "Newsletter",
    icon: three_dots_icon,
  },
];

const VoucherComponent = () => {
  return (
    <MenuProvider>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <>
              {
                <View style={styles.viewContainer}>
                  <View style={styles.viewtitle}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.number}>{item.number}</Text>
                    <Text style={styles.total}>{item.total}</Text>
                  </View>
                  <View style={styles.statusViewContainer}>
                    <View>
                      <View style={[styles.statusView]}>
                        <Text style={[styles.status]}>{item.status}</Text>
                      </View>
                      <Text style={styles.liveStream}>{item.live}</Text>
                    </View>
                    <Menu>
                      <MenuTrigger>
                        <VectorImage
                          source={item.icon}
                          style={styles.arrowDown}
                        />
                      </MenuTrigger>
                      <MenuOptions optionsContainerStyle={styles.modalContent}>
                        <MenuOption
                          onSelect={() => Alert.alert(`Edit`)}
                          style={styles.viewRemove}
                        >
                          <Text style={styles.remove}>{CONTEXT.PREVIEW}</Text>
                        </MenuOption>
                        <MenuOption
                          onSelect={() => Alert.alert(`Delete`)}
                          style={styles.viewBan}
                        >
                          <Text style={styles.banUser}>
                            {CONTEXT.EDIT_VOUCHER}
                          </Text>
                        </MenuOption>
                        <MenuOption
                          onSelect={() => Alert.alert(`Delete`)}
                          style={styles.viewBan}
                        >
                          <Text style={styles.banUser}>
                            {CONTEXT.DELETE_VOUCHER}
                          </Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
              }
            </>
          );
        }}
      />
    </MenuProvider>
  );
};

export default VoucherComponent;

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: Colors.whiteColor,
    width: "100%",
    height: 80,
    borderRadius: 12,
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    flex: 1,
  },
  viewtitle: {
    gap: 5,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 12,
    color: Colors.charcoal,
    marginTop: 15,
  },
  status: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 14,
    color: Colors.green,
  },
  mainView: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusView: {
    width: 45,
    height: 22,
    backgroundColor: Colors.lightGreen,
    borderRadius: 22,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 25,
    marginLeft: 20,
    bottom: 10,
  },
  number: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
  },
  total: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.lightBlack,
  },
  threeDotsIcon: {
    tintColor: Colors.blackColor,
    height: 16,
    marginTop: 30,
  },
  statusViewContainer: {
    flexDirection: "row",
    gap: 30,
  },
  liveStream: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 12,
    color: Colors.lightBlack,
  },
  arrowDown: {
    marginTop: 30,
    height: 18,
    tintColor: Colors.blackColor,
  },
  textLondon: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    marginTop: 5,
    fontWeight: "400",
    color: Colors.mediumGrey,
  },

  banUser: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.blackColor,
  },
  viewBan: {
    width: 162,
    height: 36,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.whiteColor,
  },
  remove: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.skyBlueColor,
  },
  viewRemove: {
    width: 162,
    height: 36,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.aliceBlue,
  },

  modalContent: {
    marginTop: "12%",
    width: "45%",
    zIndex: 4,
    alignSelf: "center",
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
  },
});
