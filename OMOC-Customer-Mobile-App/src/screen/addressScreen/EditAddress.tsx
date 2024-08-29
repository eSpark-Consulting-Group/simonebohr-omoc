import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { grey, lightGrey, skyBlueColor, whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { palceholders, strings } from "../../assets/string/strings";
import CustomTextInput from "../../components/CustomTextInput";
import FloatInput from "../../components/FloatInput";
import CustomCheckBox from "../../components/CustomCheckBox";
import CustomButton from "../../components/CustomButton";
import { show_map_icon } from "../../utils/images";
import ApiService from "../../services/api.service";

const EditAddress = ({navigation,route}) => {
  const getData =route.params.data
  console.log('getData=====>',getData)
  const [id, setID] = useState(getData._id);
  const [name, setName] = useState(getData.name);
  const [address, setAddress] = useState(getData.address);
  const [state, setState] = useState(getData.region);
  const [phone, setPhone] = useState(getData.phoneNumber);
  const [city, setCity] = useState(getData.city);
  const [zipCode, setZipCode] = useState(getData.zipCode);
  const [country, setCountry] = useState(getData.country);


  const Addressupdate = async () => {
    try {
     const formData={
      name,address,
      region:state,
      phoneNumber:phone,city,
      zipCode:zipCode,
      country,
     }
      const response = await ApiService.postUpdateAddress(id, formData); 
      console.log("response ------->", JSON.stringify(response));
      navigation.goBack('')
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <CustomHeaderShown
          title={strings.EDIT_ADDRESS}
          rightheadericon={show_map_icon}
          onRightHeaderPress={() => navigation.navigate("MapScreen")}
          navigation={navigation}
        />
      </View>
      <View style={styles.inputContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContainer}>
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
            />
            <FloatInput
              onChangeText={(text) => {
                setState(text);
              }}
              value={state}
              placeholder={palceholders.STATE_PROVINCE_REGION}
            />
            <FloatInput
              onChangeText={(text) => {
                setPhone(text);
              }}
              value={phone}
              placeholder={palceholders.PHONE_NUMBER}
            />
            <FloatInput
              onChangeText={(text) => {
                setCity(text);
              }}
              value={city}
              placeholder={palceholders.CITY}
            />
            <FloatInput
              onChangeText={(text) => {
                setZipCode(text);
              }}
              value={zipCode}
              placeholder={palceholders.ZIP_CODE}
            />
            <FloatInput
              onChangeText={(text) => {
                setCountry(text);
              }}
              value={country}
              placeholder={palceholders.COUNTRY}
            />
          </View>
        </ScrollView>
        <View style={styles.btnCheckContainer}>
          <View>
            <CustomButton
              style={[styles.btn]}
              textstyle={styles.btnText}
              text={strings.EDIT_ADDRESS}
              onPress={()=>Addressupdate(getData._id)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  headerContainer: {
    marginHorizontal: 20,
  },
  inputContainer: {
    marginTop: 30,
    gap: 10,
    flex: 1,
  },
  checkBox: {
    marginLeft: 30,
  },
  checkBoxContainer: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    marginBottom: 40,
  },
  scrollContainer: {
    gap: 10,
  },
  btn: {
    backgroundColor: skyBlueColor,
    marginTop: 40,
  },
  btnText: {
    color: whiteColor,
  },
  btnCheckContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  iconstyle: {
    width: 24,
    height: 24,
  },
});
