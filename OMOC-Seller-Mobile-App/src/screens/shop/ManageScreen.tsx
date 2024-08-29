import {
  FlatList,
  StyleSheet,
  Text,
  View,Alert
} from "react-native";
import React, { useState } from "react";
import { three_dots_icon } from "../../utils/images";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import { CONTEXT, strings } from "../../utils/string/strings";
import VectorImage from "react-native-vector-image";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,MenuProvider
} from "react-native-popup-menu";

const data = [
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    status: "Banned",
    iconthree_dots: three_dots_icon,
  },
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    iconthree_dots: three_dots_icon,
  },
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    iconthree_dots: three_dots_icon,
  },
  {
    name: "Jhon Dope",
    title: "Bomber Jacket..",
    number: 23904810283,
    iconthree_dots: three_dots_icon,
  },
];
const ManageScreen = () => {

  return (
    <MenuProvider>
      <View style={styles.titleView}>
        <View style={styles.viewNamePost}>
          <Text style={styles.title}>{strings.NAME_USERS}</Text>
          <Text style={styles.title}>{strings.LINK_POST}</Text>
          <Text style={[styles.title, { marginLeft: 15 }]}>
            {strings.STATUS}
          </Text>
        </View>
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={styles.viewBox}>
                <View style={styles.viewName}>
                  <Text style={styles.textJhon}>{item.name}</Text>
                  <View style={styles.titleNumberView}>
                    <Text style={styles.textBomber}>{item.title}</Text>
                    <Text style={styles.textnumber}>{item.number}</Text>
                  </View>
                  <View style={item.status ? styles.viewStatus : { width: 70 }}>
                    <Text style={styles.banned}>{item.status}</Text>
                  </View>
                
                  <Menu>
                    <MenuTrigger>
                    <VectorImage
                      source={item.iconthree_dots}
                      style={styles.vectorIcon}
                    />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={styles.modalContent}>
                      <MenuOption onSelect={() => Alert.alert(`Edit`)} style={styles.viewRemove}>
                      <Text style={styles.remove}>{CONTEXT.REMOVE_ACCESS}</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => Alert.alert(`Delete`)} style={styles.viewBan}>
                      <Text style={styles.banUser}>{strings.BAN_USER}</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>

                </View>
              </View>
            );
          }}
        />
      </View>
  
    </MenuProvider>
  );
};

export default ManageScreen;

const styles = StyleSheet.create({
  titleView: {
    width: "95%",
    borderRadius: 12,
    backgroundColor: Colors.ghostWhite,
    justifyContent: "space-around",
    paddingVertical: 16,
    marginTop: 20,
    marginHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 14,
    lineHeight: 15,
    color: Colors.charcoal,
    marginRight: 50,
  },
  icon: {
    bottom: 5,
  },
  input: {
    width: "92%",
  },
  textHeader: {
    marginTop: 15,
    left: 16,
    gap: 30,
    flexDirection: "row",
  },
  request: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.skyBlueColor,
  },
  manage: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.lightGrey50,
  },
  tabSelectTexT: {},
  tabViewContiner: {
    flexDirection: "row",

    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  viewBox: {
    height: 67,
    width: "95%",
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignSelf: "center",
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.09,
    shadowRadius: 0.1,
    elevation: 3,
  },
  viewName: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginLeft: 5,
  },

  textJhon: {
    fontFamily: GILROY_REGULAR,
    fontSize: 13,
    textAlign: "center",
    color: Colors.lightBlack,
  },
  textBomber: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12.5,
    color: Colors.neutralBlack,
  },
  textnumber: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12.5,
    color: Colors.lightBlack,
  },
  viewStatus: {
    left: 30,
    height: 30,
    width: 70,
    borderRadius: 22,
    backgroundColor: Colors.lightRed,
  },
  toucableIconView: {},

  toucableThreeDot: {
    alignSelf: "center",
  },
  vectorIcon: {
    tintColor: "black",
    height: 14,
    width: 4,
    marginHorizontal: 30,
  },
  titleNumberView: {
    gap: 4,
    left: 25,
    alignSelf: "center",
  },
  flatlist: {
    backgroundColor: Colors.creamColor,
    marginTop: 10,
    paddingBottom: 10,
    flex: 1,
  },
  banned: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 12,
    alignSelf: "center",
    color: Colors.dangerRed,
    marginTop: 10,
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
  viewNamePost: {
    width: "90%",
    flexDirection: "row",
  },
  modalContent: {
     marginLeft: -15,
    width: '45%',
    zIndex: 4,
    alignSelf:'center',
     padding: 8,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
  },
});
