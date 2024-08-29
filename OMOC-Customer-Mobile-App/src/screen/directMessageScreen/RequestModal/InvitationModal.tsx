import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../../utils/fonts";
import VectorImage from "react-native-vector-image";
import {
  lightGrey,
  blackColor,
  whiteColor,
  skyBlueColor,
  grey,
  purpleColor,
  lightGrey50,
  red,
} from "../../../utils/colors";
import { warn_notify } from "../../../utils/images";
import { strings } from "../../../assets/string/strings";

const InvitationModal = ({ hideMe, visibleModal }) => {
  const [selectBtn, setSelectBtn] = useState(1);
  const [rejectModal, setRejectModal] = useState(false);

  return (
    <View>
      <Modal
        visible={visibleModal}
        animationType="fade"
        onRequestClose={() => hideMe()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.imgTextStyle}>
              <VectorImage style={styles.imageStyle} source={warn_notify} />
              <Text style={styles.productText}>
                This Group was sent from outside your contacts, do you approve
                this message?
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={selectBtn === 1 ? styles.activeBtn : styles.deactiveBtn}
                onPress={() => {
                  setSelectBtn(1), hideMe();
                }}
              >
                <Text
                  style={
                    selectBtn === 1 ? styles.activeText : styles.deactiveText
                  }
                >
                  {strings.ACCEPT}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={selectBtn === 2 ? styles.activeBtn : styles.deactiveBtn}
                onPress={() => {
                  setRejectModal(true);
                }}
              >
                <Text
                  style={
                    selectBtn === 2 ? styles.activeText : styles.deactiveText
                  }
                >
                  {strings.DENY}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={selectBtn === 3 ? styles.activeBtn : styles.deactiveBtn}
                onPress={() => {
                  setSelectBtn(3), hideMe();
                }}
              >
                <Text
                  style={
                    selectBtn === 3 ? styles.activeText : styles.deactiveText
                  }
                >
                  {strings.BLOCK}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={rejectModal}
        animationType={"fade"}
        onRequestClose={() => setRejectModal(!rejectModal)}
      >
        <View style={styles.modalView}>
          <View style={styles.cartModalView}>
            <Text style={styles.rejectText}>Reject Group invitation</Text>
            <Text style={styles.invitationText}>
              You can't repeat this action, are you sure {"\n"}you want to
              decline the group invitation?
            </Text>
            <View style={styles.horizontalStyle}>
              <TouchableOpacity onPress={() => setRejectModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRejectModal(false);
                }}
              >
                <Text style={styles.rejectTextStyle}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InvitationModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  imgTextStyle: {
    flexDirection: "row",
    width: '95%',
    alignSelf: "center",
    marginVertical: 18,
    justifyContent: "space-between",
  },
  contentContainer: {
    backgroundColor: whiteColor,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    position: "absolute",
    bottom: 1,
   paddingBottom: 35,
  },
  imageStyle: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginBottom: 10,
  },
  productText: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color: blackColor,
    marginLeft: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "98%",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  activeBtn: {
    backgroundColor: purpleColor,
    padding: 9,
    paddingHorizontal: 37,
    borderRadius: 20,
  },
  deactiveBtn: {
    backgroundColor: whiteColor,
    borderColor: lightGrey50,
    borderWidth: 0.8,
    padding: 9,
    paddingHorizontal: 37,
    borderRadius: 20,
  },
  activeText: {
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    color: whiteColor,
  },
  deactiveText: {
    fontSize: 13,
    fontFamily: GILROY_MEDIUM,
    color: grey,
  },

  modalView: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cartModalView: {
    width: "80%",
    backgroundColor: whiteColor,
    borderRadius: 20,
    paddingVertical: 19,
    alignContent: "center",
  },
  rejectText: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: blackColor,
    textAlign: "center",
  },
  horizontalStyle: {
    marginTop: 15,
    borderColor: lightGrey50,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancelText: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: skyBlueColor,
    marginTop: 15,
    borderRightColor: lightGrey50,
    borderRightWidth: 1,
  },
  rejectTextStyle: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: red,
    marginTop: 15,
  },
});
