import {
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import SearchTabBar from "../../component/SearchTabBar";
import VectorImage from "react-native-vector-image";
import {
  profile,
  shop,
  shopping_cart,
  three_dots_icon,
} from "../../utils/images";
import CustomButton from "../../component/CustomButton";
import AddAdmin from "./ShopModel/AddAdmin";

const UserAndPermission = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showAddShip, setShowAddShip] = useState(false);
  const requestData = [
    {
      name: "James Harden",
      mail: "Jamesharden@gmail.com",
      Active: "Active",
      Status: true,
    },
    {
      name: "Ariana Grande",
      mail: "Jamesharden@gmail.com",
      Active: " ",
      Status: false,
    },
    {
      name: "Ariana Grande",
      mail: "Jamesharden@gmail.com",
      Active: " ",
      Status: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Customheader
        title={CONTEXT.USER_AND_PERMISION}
        showBackIcon={true}
        optionImage={null}
        onPress={() => {}}
        Containerstyle={styles.customHeaderStyle}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>{CONTEXT.USER_AND_PERMISION}</Text>
        <Text style={styles.manageText}>{CONTEXT.MANAGE_SHOP}</Text>
        <SearchTabBar placeholder={CONTEXT.SEARCH} style={styles.searching} />
        <View style={styles.viewNamePost}>
          <Text style={styles.title}>{CONTEXT.USER_NAME}</Text>
          <Text style={styles.title}>{CONTEXT.ACCESS}</Text>
          <Text style={styles.title}>{strings.STATUS}</Text>
          <View />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={requestData}
            renderItem={({ item }) => {
              return (
                <View style={styles.userView}>
                  <View style={styles.textView}>
                    <Text style={styles.titleUser}>{item.name}</Text>
                    <Text numberOfLines={0} style={styles.smallText}>
                      {item.mail}
                    </Text>
                  </View>
                  <VectorImage source={shop} style={styles.accessIcon} />
                  <VectorImage source={profile} style={styles.accessIcon} />
                  <VectorImage
                    source={shopping_cart}
                    style={styles.accessIcon}
                  />
                  {item.Status === true ? (
                    <View
                      style={[
                        styles.activeView,
                        { backgroundColor: Colors.lightGreen },
                      ]}
                    >
                      <Text style={styles.activeText}>{item.Active}</Text>
                    </View>
                  ) : (
                    <View style={[styles.activeView]}></View>
                  )}
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.toucableThreeDot}
                  >
                    <VectorImage
                      source={three_dots_icon}
                      style={styles.vectorIcon}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.BtnView}>
        <CustomButton
          text={CONTEXT.ADD_ADMIN}
          style={styles.button}
          textstyle={styles.btnName}
          onPress={() => setShowAddShip(true)}
        />
      </TouchableOpacity>
      {showAddShip && <AddAdmin hideMe={() => setShowAddShip(false)} />}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.viewRemove}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.remove}>{strings.EDIT}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewBan}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.banUser}>{strings.REMOVE_ACCESS_}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UserAndPermission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  mainContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 23,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    marginTop: "6%",
    marginLeft: 15,
  },
  manageText: {
    fontSize: 15,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
    marginTop: "3%",
    marginLeft: 15,
  },
  searching: {
    borderRadius: 24,
    borderColor: Colors.neutralGrey,
    paddingVertical: 8,
    marginTop: "8%",
  },
  viewNamePost: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "5%",
    alignSelf: "center",
    paddingVertical: 20,
    backgroundColor: Colors.ghostWhite,
    borderRadius: 15,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 14,
    color: Colors.charcoal,
  },
  titleUser: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 13,
    color: Colors.charcoal,
  },
  viewBox: {},
  userView: {
    width: "95%",
    paddingBottom: 15,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.09,
    shadowRadius: 0.1,
    elevation: 3,
  },
  smallText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 11,
    color: Colors.lightBlack,
    marginTop: 3,
  },
  toucableThreeDot: {
    alignSelf: "flex-end",
    marginBottom: 4,
  },
  vectorIcon: {
    tintColor: "black",
    height: 15,
    width: 12,
    resizeMode: "contain",
  },
  remove: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 14,
    color: Colors.skyBlueColor,
  },
  viewRemove: {
    width: 150,
    height: 36,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.aliceBlue,
  },
  banUser: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 8,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  modalContent: {
    marginTop: "50%",
    left: "18%",
    width: "44%",
    padding: 10,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.4,
    elevation: 5,
  },
  accessIcon: {
    height: 17,
    width: 17,
    resizeMode: "contain",
    marginHorizontal: -10,
  },
  activeView: {
    width: "20%",
    padding: 7,
    alignItems: "center",
    borderRadius: 15,
    marginLeft: 25,
  },
  activeText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 10.5,
    color: Colors.green,
  },
  textView: {
    marginRight: 8,
  },
  button: {
    backgroundColor: Colors.skyBlueColor,
  },
  btnName: {
    color: Colors.whiteColor,
  },
  BtnView: {
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 40,
  },
  customHeaderStyle: {
    marginTop: 15,
  },
});
