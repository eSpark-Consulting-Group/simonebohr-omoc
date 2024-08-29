import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { strings } from "../../utils/string/strings";
import { Colors } from "../../utils/colors";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import {
  shoes,
  three_dots_icon,
  user_frame,
  shoe_image,
} from "../../utils/images";
import VectorImage from "react-native-vector-image";
import FastImage from "react-native-fast-image";

const data = [
  {
    image: shoes,
    icon: user_frame,
    name: "Shoes",
    title: "JPG",
    status: "All Right Reserved",
    iconthree_dots: three_dots_icon,
  },
  {
    image: shoes,
    name: "Intro Video",
    title: "JPG",
    status: "All Right Reserved",
    iconthree_dots: three_dots_icon,
  },
];
const ManageFilesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Customheader
        title={strings.FILES}
        showBackIcon={true}
        Containerstyle={{ marginTop: 15, paddingBottom: 5 }}
      />
      <View style={styles.textView}>
        <Text style={styles.manageFiles}>{strings.MANAGE_FILES}</Text>
        <Text style={styles.manage}>{strings.MANAGE}</Text>
      </View>
      <View style={styles.viewNamePost}>
        <Text style={[styles.title]}>{strings.FILE_NAME}</Text>
        <Text style={[styles.title]}>{strings.TYPE}</Text>
        <Text style={styles.title}>{strings.LICENCE}</Text>
        <View />
      </View>
      <FlatList
        style={styles.flatlist}
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.viewBox}>
              <View style={styles.imageView}>
                <FastImage source={item.image} style={styles.imageIcon} />
                <Text style={styles.textname}>{item.name}</Text>
              </View>
              <Text style={styles.textTitle}>{item.title}</Text>
              <Text style={styles.banned}>{item.status}</Text>
              <TouchableOpacity
                style={styles.toucableThreeDot}
                onPress={() => setModalVisible(true)}
              >
                <VectorImage
                  source={item.iconthree_dots}
                  style={styles.vectorIcon}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
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
              <Text style={styles.remove}>{strings.EDIT_LICENSE}s</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewBan}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.banUser}>{strings.DELETE_FILE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ManageFilesScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  header: {
    marginTop: 15,
  },
  textView: {
    marginHorizontal: 16,
    marginTop: 30,
    gap: 8,
  },
  manageFiles: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 24,
    color: Colors.blackColor,
    lineHeight: 34,
  },
  manage: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.dimGray,
    lineHeight: 19,
  },
  titleView: {
    width: "95%",
    backgroundColor: Colors.ghostWhite,
    alignSelf: "center",
    marginTop: 25,
    borderRadius: 12,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 16,
    flexDirection: "row",
  },
  text: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    lineHeight: 15,
    color: Colors.charcoal,
    marginTop: 5,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 13,
    color: Colors.charcoal,
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
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.skyBlueColor,
  },
  imageIcon: {
    height: 52,
    width: 52,
    alignSelf: "center",
  },
  viewBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 67,
    width: "95%",
    backgroundColor: "#FFFFFF",
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  textname: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    textAlign: "center",
    color: Colors.lightBlack,
    // right: 60,
    alignSelf: "center",
    width: 40,
  },
  textTitle: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 13,
    color: Colors.neutralBlack,
    alignSelf: "center",
  },
  viewStatus: {
    left: 40,
    width: 80,
    borderRadius: 22,
  },
  toucableIconView: {},

  toucableThreeDot: {
    alignSelf: "center",
  },
  vectorIcon: {
    tintColor: "black",
    height: 14,
    width: 4,
  },
  titleNumberView: {
    gap: 4,
    alignSelf: "center",
    height: 40,
    width: 89,
  },
  flatlist: {
    backgroundColor: Colors.creamColor,
    marginTop: 10,
    paddingBottom: 10,
  },
  banned: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 13,
    alignSelf: "center",
    color: Colors.blackColor,
    marginTop: 10,
    width: 89,
    alignItems: "center",
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
  textBoxView: {
    backgroundColor: Colors.whiteColor,
    position: "absolute",
    marginTop: "50%",
    height: 0.8,
    width: "44%",
    left: "40%",
    borderRadius: 16,
    padding: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 3,
  },
  viewNamePost: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "95%",
    backgroundColor: '#FFFFFF',
    alignSelf: "center",
    marginTop: 25,
    borderRadius: 12,
    paddingVertical: 20,
  },
  viewtitleName: {
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  modalContent: {
    marginTop: 18,
    left: "15%",
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
  imageView: { flexDirection: "row", gap: 10 },
});
