import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  blackColor,
  blue,
  gray88,
  grey,
  lightGrey,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { palceholders, strings } from "../../assets/string/strings";
import FloatInput from "../../components/FloatInput";
import CustomCheckBox from "../../components/CustomCheckBox";
import CustomButton from "../../components/CustomButton";
import { order_success, show_map_icon } from "../../utils/images";
import { showMessage } from "react-native-flash-message";
import ApiService from "../../services/api.service";
import en from "../../assets/string/en";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import FastImage from "react-native-fast-image";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { Touchable } from "react-native";

const AddressScreen = ({ navigation }) => {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validateInputs = () => {
    if (
      name.trim() === "" ||
      address.trim() === "" ||
      state.trim() === "" ||
      phone.trim() === "" ||
      city.trim() === "" ||
      zipCode.trim() === "" ||
      country.trim() === ""
    ) {
      return false;
    }
    return true;
  };
  const addAddress = async () => {
    try {
      const params = {
        name,
        address,
        region: state,
        phoneNumber: phone,
        city,
        zipCode,
        country,
        icon,
        isPrimary,
      };
      const response = await ApiService.addNewAddress(params);   
      if (response?.status) {
        showMessage({
          message: response.message,
          duration: 3000,
          backgroundColor: skyBlueColor,
          type: "danger",
        });
        getTours()
        navigation.navigate("DeliveryScreen");
      }
    } catch (e) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  };


  const getTours =async()=>{
    try {
      const response = await ApiService.getTour()
      console.log('response-->',response)
    } catch (error) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  }


  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <CustomHeaderShown
          title={strings.ADD_NEW_ADDERSS}
          rightheadericon={show_map_icon}
          navigation={navigation}
          onRightHeaderPress={() => navigation.navigate("MapScreen")}
        />
      </View>
      <View style={styles.inputContainer}>
        <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true} style={styles.scrollContainer}>
          <View style={{ gap: 10,}}>
            <FloatInput
              onChangeText={(text) => {
                setIcon(text);
              }}
              value={icon}
              placeholder={"Icon address"}
              keyboardType='default'
            />
            {/* <View style={styles.emojiContainer}> 
            <EmojiSelector
          onEmojiSelected={(emoji) => setIcon(emoji)}
          showSearchBar={true}
          showTabs={true}
          showHistory={true}
          showSectionTitles={true}
          category={Categories.all}
        />
        </View> */}
            <FloatInput
              onChangeText={(text) => {
                setName(text);
              }}
              value={name}
              placeholder={palceholders.NAME}
            />
            <FloatInput
              onChangeText={(text) => {
                setAddress(text);
              }}
              value={address}
              placeholder={palceholders.ADDERSS}
              keyboardType='email-address'
            />
            <FloatInput
              onChangeText={(text) => {
                setState(text);
              }}
              value={state}
              placeholder={palceholders.STATE_PROVINCE_REGION}
              keyboardType='default'
            />
            <FloatInput
              onChangeText={(text) => {
                setPhone(text);
              }}
              value={phone}
              placeholder={palceholders.PHONE_NUMBER}
              keyboardType='phone-pad'
            />
            <FloatInput
              onChangeText={(text) => {
                setCity(text);
              }}
              value={city}
              placeholder={palceholders.CITY}
              keyboardType='default'
            />
            <FloatInput
              onChangeText={(text) => {
                setZipCode(text);
              }}
              value={zipCode}
              placeholder={palceholders.ZIP_CODE}
              keyboardType='phone-pad'
            />
            <FloatInput
              onChangeText={(text) => {
                setCountry(text);
              }}
              value={country}
              placeholder={palceholders.COUNTRY}
              keyboardType='default'
            />
          </View>
        </ScrollView>



        <View style={styles.btnCheckContainer}>
          <View style={styles.checkBoxContainer}>
            <CustomCheckBox
              boxType="square"
              onFillColor={skyBlueColor}
              onCheckColor={whiteColor}
              onSelect={() => {
                setIsPrimary(!isPrimary);
              }}
            />
            <Text style={{ color: isPrimary ? skyBlueColor : grey }}>
              {strings.SET_AS_PRIMARY_ADDRESS}
            </Text>
          </View>
          <View style={styles.btnView}>
            <CustomButton
              onPress={() => addAddress()}
              style={validateInputs() ? styles.validBtn : styles.btn}
              textstyle={
                validateInputs() ? styles.whiteBtnText : styles.btnText
              }
              text={strings.ADD_ADDRESS}
              disable={!validateInputs()}
            />
          </View>
        </View>    
      </View>

      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
          <TouchableOpacity style={styles.containeModal} onPress={() => setShowModal(false)}>
            <View style={styles.addressModel}>
              <FastImage source={order_success} style={styles.confirmImg} />
              <Text style={styles.saveText}>Address Saved</Text>
            </View>
          </TouchableOpacity>
        </Modal>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  headerContainer: {
    marginHorizontal: 20,
  },
  scrollContainer: {
    marginBottom: "45%",
  },
  inputContainer: {
    marginTop: 30,
    gap: 10,
    flex: 1,
  },

  checkBoxContainer: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  btn: {
    width: 350,
    backgroundColor: lightGrey,
    marginTop: 40,
  },
  validBtn: {
    width: 350,
    backgroundColor: skyBlueColor,
    marginTop: 40,
  },
  btnText: {
    color: "grey",
  },
  whiteBtnText: {
    color: whiteColor,
  },
  btnCheckContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: "center",
    position: "absolute",
    bottom: 6,
    backgroundColor: whiteColor,
  },
  iconstyle: {
    width: 24,
    height: 24,
  },
  btnView: {
    marginTop: 20,
  },
  emojiContainer: {
    width: 340,
    height: 200,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "red",
  },
  containeModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent:"center"
  },
  addressModel: {
    padding: 8,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 13,
    backgroundColor: whiteColor,
  },
  confirmImg: {
    width: 65,
    height: 65,
    resizeMode: "container",
  },
  saveText: {
    fontSize: 17,
    fontFamily: GILROY_REGULAR,
    color: blackColor,
    marginTop: 19,
  },
});
