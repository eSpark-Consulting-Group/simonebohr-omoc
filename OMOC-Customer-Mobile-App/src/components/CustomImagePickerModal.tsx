import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { skyBlueColor, whiteColor } from "../utils/colors";

const CustomImagePickerModal = ({
  isVisible,
  handleOpenCamera,
  handleOpenGallery,
  handleClose,
}) => {
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={handleOpenCamera} style={styles.button}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenGallery} style={styles.button}>
            <Text style={styles.buttonText}>Open Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClose} style={styles.button}>
            <Text style={[styles.buttonText,{color:'red'}]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: 200,
    backgroundColor: whiteColor,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },

  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    color: skyBlueColor,
    textAlign: "center",
  },
});

export default CustomImagePickerModal;
