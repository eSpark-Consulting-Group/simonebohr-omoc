import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../../utils/colors";
import { strings } from "../../utils/string/strings";
import CustomHeader from "../../component/Customheader";
import { pancil_icon } from "../../utils/images";
import VectorImage from "react-native-vector-image";
import { GILROY_REGULAR } from "../../utils/fonts";
import CustomButton from "../../component/CustomButton";
import ApiService from "../../services/api.service";
import { useSelector } from "react-redux";
import Spinner from "../../component/Spinner";
import { showMessage } from "react-native-flash-message";

const GeneralInformationScreen = ({ navigation }) => {
  const [shopName, setShopName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [owner, setOwner] = useState("");
  const [Tax, setTax] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [addressOne, setaddressOne] = useState("");
  const [addressTwo, setaddressTwo] = useState("");
  const [fetching, setFetching] = useState(false);
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      setFetching(true);
      const response = await ApiService.getGeneralInfo(currentShop?._id);
      const data = response.data;
      setFetching(false);
      setShopName(data.businessDetails.name);
      setCompanyName(data.businessDetails.companyName);
      setOwner(data.sellerDetails.name);
      setTax(data.businessDetails.taxId);
      setPhone(data.sellerDetails.phone);
      setMail(data.sellerDetails.email);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSaveBtn = async () => {
    try {
      const data = {
        name: shopName,
        companyName: companyName,
        ownerName: owner,
        taxId: Tax,
        phone: phone,
        email: mail,
      };
      const shopId = currentShop?._id;
      const response = await ApiService.editGeneralInfo(shopId, data); 
      showMessage({
        message: response.message,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.header}>
        <CustomHeader
          title={strings.GENERAL_INFORMATION}
          showBackIcon={true}
          Containerstyle={{ marginTop: 10, paddingBottom: 5 }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainView}>
          <View style={styles.text}>
            <Text style={styles.shopText}>{strings.SHOP_NAME} </Text>
            <TextInput
              placeholder={strings.ALISON}
              placeholderTextColor={Colors.neutralBlack}
              keyboardType="name-phone-pad"
              value={shopName}
              onChangeText={(e) => setShopName(e)}
              style={styles.alisonText}
            />
          </View>
          <View style={styles.text}>
            <Text style={styles.shopText}>{strings.COMPANY_NAME}</Text>
            <TextInput
              placeholder="Enter Company name"
              placeholderTextColor={Colors.neutralBlack}
              keyboardType="name-phone-pad"
              value={companyName}
              onChangeText={(e) => setCompanyName(e)}
              style={styles.alisonText}
            />
          </View>
          <View style={styles.viewMainText}>
            <View style={styles.ownerView}>
              <Text style={styles.owner}>{strings.OWNER}</Text>
              <TextInput
                placeholder={strings.PLACEHOLDER}
                placeholderTextColor={Colors.neutralBlack}
                keyboardType="name-phone-pad"
                value={owner}
                onChangeText={(e) => setOwner(e)}
                style={styles.alisonText}
              />
            </View>
            <View style={styles.ownerView}>
              <Text style={styles.owner}>{strings.TAX}</Text>
              <TextInput
                placeholder={strings.PLACEHOLDER}
                placeholderTextColor={Colors.neutralBlack}
                keyboardType="name-phone-pad"
                value={Tax}
                onChangeText={(e) => setTax(e)}
                style={styles.alisonText}
              />
            </View>
          </View>
          <View style={styles.viewMainText}>
            <View style={styles.ownerView}>
              <Text style={styles.owner}>{strings.PHONE_NUMBER}</Text>
              <TextInput
                placeholder="Enter number"
                placeholderTextColor={Colors.neutralBlack}
                keyboardType="number-pad"
                value={phone}
                onChangeText={(e) => setPhone(e)}
                style={styles.alisonText}
              />
            </View>
            <View style={styles.ownerView}>
              <Text style={styles.owner}>{strings.MAIL}</Text>
              <TextInput
                placeholder={strings.INDONESIA}
                placeholderTextColor={Colors.neutralBlack}
                keyboardType="email-address"
                value={mail}
                onChangeText={(e) => setMail(e)}
                style={styles.alisonText}
              />
            </View>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.add1}>{strings.ADDRESS1}</Text>
            <TouchableOpacity>
              <VectorImage source={pancil_icon} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={styles.input}
              value={addressOne}
              onChangeText={(e) => setaddressOne(e)}
              placeholder={strings.SEARCH_ADDRESS}
              keyboardType="default"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.add1}>{strings.ADDRESS2}</Text>
            <TouchableOpacity>
              <VectorImage source={pancil_icon} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={styles.input}
              value={addressTwo}
              onChangeText={(e) => setaddressTwo(e)}
              placeholder={strings.SEARCH_ADDRESS}
              keyboardType="default"
            />
          </View>
        </View>
        <View style={styles.buttonView}>
          <CustomButton
            style={styles.button}
            text={strings.ADD_NEW_ADDRESS}
            textstyle={{ color: Colors.skyBlueColor }}
            onPress={() => {
              navigation.navigate("MapScreen");
            }}
          />
          <CustomButton
            style={styles.savebutton}
            text={strings.SAVE_CHANGE}
            textstyle={{ color: Colors.whiteColor }}
            onPress={() => onSaveBtn()}
          />
        </View>
      </ScrollView>
      {fetching && <Spinner animating={fetching} />}
    </SafeAreaView>
  );
};

export default GeneralInformationScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: Colors.whiteColor,
    flex: 1,
  },
  header: {
    marginHorizontal: 8,
    marginTop: 10,
  },
  mainView: {
    marginTop: 30,
    left: 16,
    gap: 12,
  },
  icon: {
    marginTop: 3,
  },
  viewMainText: {
    flexDirection: "row",
    gap: 10,
  },
  text: {
    width: "92%",
    height: 66,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 16,
    borderColor: Colors.gray88,
    paddingBottom: 15,
  },
  shopText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16.8,
    color: Colors.grey,
  },
  alisonText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.neutralBlack,
  },
  ownerView: {
    width: "45%",
    height: 66,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12.5,
    paddingVertical: 16,
    borderColor: Colors.gray88,
    paddingBottom: 20,
  },
  owner: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16.8,
    color: Colors.grey,
  },
  placeholder: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.neutralBlack,
  },
  inputBox: {
    width: "92%",
    flexDirection: "row",
    gap: 8,
    marginLeft: 5,
  },
  add1: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 25.2,
    color: Colors.grey,
  },
  input: {
    height: 56,
    width: "92%",
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 12.5,
    paddingHorizontal: 16,
    gap: 10,
    borderColor: Colors.gray88,
  },
  button: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.skyBlueColor,
    marginRight: 30,
  },
  savebutton: {
    backgroundColor: Colors.skyBlueColor,
    borderRadius: 24,
    marginRight: 30,
  },
  buttonView: {
    marginTop: 90,
    bottom: 30,
    width: "98%",
    gap: 10,
    alignSelf: "center",
    left: 20,
  },
});
