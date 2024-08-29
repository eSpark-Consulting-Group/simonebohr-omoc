import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Customheader from "../../component/Customheader";
import { CONTEXT,strings } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import {
  arrow_down,
  blue_add_icon,
  checkbox,
  info_circle,
} from "../../utils/images";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import CustomButton from "../../component/CustomButton";
import AutoReturnModel from "./barcodeModals/AutoReturnModel";
import ProductNameModel from "./barcodeModals/ProductNameModel";

const ReturnSettingsBarcode = () => {
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [messageDescrip, setMessageDescrip] = useState('');
  const [returnModel, setReturnModel] = useState(false);
  const [productNameModel, setProductNameModel] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Customheader
        title={CONTEXT.BARCODE}
        showBackIcon={true}
        Containerstyle={styles.customHeaderStyle}
        onPress={() => {}}
        optionImage={info_circle}
        rightIconStyle={styles.infoIconStyle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Text style={styles.returnText}>{CONTEXT.RETURN_SETTING_PAGE}</Text>
          <Text style={[styles.greyColor, { marginTop: 8 }]}>
            {CONTEXT.SETUP_RULES}
          </Text>
          <Text style={styles.autoText}>{CONTEXT.AUTOMATIC_RETURN}</Text>

          <View style={styles.whiteView}>
            <View style={[styles.rowView, { justifyContent: "space-between" }]}>
              <Text style={[styles.MediumText, { width: "70%" }]}>
                {CONTEXT.AUTO_PROCESSABLE}
              </Text>
              <VectorImage source={info_circle} style={styles.infoIconStyle} />
            </View>

            <View style={[styles.rowView, { marginVertical: "8%" }]}>
              <VectorImage source={checkbox} style={styles.checkStyle} />
              <Text style={styles.selectColor}>
                {CONTEXT.CHECKLIST_AUTORETURN}
              </Text>
            </View>
            <Text style={styles.MediumText}>
              {CONTEXT.AUTOMATIC_PRODUCT_RETUEN}
            </Text>
            <Text style={[styles.greyColor, { marginTop: "5%" }]}>
              {CONTEXT.SELECT_PRODUCT_CONDITIONS}
            </Text>

            <TouchableOpacity style={styles.productNameView} onPress={()=>setProductNameModel(true)}>
              <Text style={styles.pNameText}>{CONTEXT.PRODUCT_NAME}</Text>
              <VectorImage source={arrow_down} style={styles.infoIconStyle} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.toucableIcon} onPress={()=>setReturnModel(true)}>
              <VectorImage source={blue_add_icon} style={styles.pluseStyle} />
              <Text style={styles.addCard}>{CONTEXT.ADD_CONDITION}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.autoText}>{CONTEXT.AUTOMATIC_RETURN}</Text>

          <View style={styles.whiteView}>
            <View style={[styles.rowView, { justifyContent: "space-between" }]}>
              <Text style={[styles.MediumText, { width: "79%" }]}>
                {CONTEXT.SET_THE_FORM_TO_FILLED}
              </Text>
              <VectorImage source={info_circle} style={styles.infoIconStyle} />
            </View>

            <View style={[styles.rowView, { marginVertical: "8%" }]}>
              <VectorImage source={checkbox} style={styles.checkStyle} />
              <Text style={styles.selectColor}>
                {CONTEXT.CHECKLIST_AUTORETURN}
              </Text>
            </View>

            <Text style={styles.selectColor}>{CONTEXT.LABEL_FOR_MANUAL}</Text>

            <View style={styles.textBoxView}>
              <TextInput
                placeholder="Write label or description for your costumer"
                placeholderTextColor={Colors.grey}
                style={styles.textInputStyle}
                value={description}
                onChangeText={(txt)=>setDescription(txt)}
              />
            </View>

            <Text style={[styles.greyColor, {marginTop:18}]}>
                {CONTEXT.SELECT_THE_INFORMATION_BUYER}
              </Text>
    
            <View style={styles.productNameView}>
              <Text style={styles.pNameText}>{strings.FULL_NAME}</Text>
              <VectorImage source={arrow_down} style={styles.infoIconStyle} />
            </View>

            <View style={styles.productNameView}>
              <Text style={styles.pNameText}>{strings.EMAIL_ADDRESS}</Text>
              <VectorImage source={arrow_down} style={styles.infoIconStyle} />
            </View>

            <View style={styles.toucableIcon}>
              <VectorImage source={blue_add_icon} style={styles.pluseStyle} />
              <Text style={styles.addCard}>{CONTEXT.ADD_INFORMATION_TYPE}</Text>
            </View>

          </View>

          <Text style={styles.autoText}>{CONTEXT.RETURN_CONFIRMATION_MESSAGE}</Text>

          <View style={[styles.whiteView,{marginBottom:'2%'}]}>
            <View style={[styles.rowView, { justifyContent: "space-between" }]}>
              <Text style={[styles.MediumText, { width: "79%" }]}>
                {CONTEXT.SET_THE_FORM_TO_FILLED}
              </Text>
              <VectorImage source={info_circle} style={styles.infoIconStyle} />
            </View>

            <View style={[styles.rowView, { marginVertical: "8%" }]}>
              <VectorImage source={checkbox} style={styles.checkStyle} />
              <Text style={styles.selectColor}>
                {CONTEXT.CHECKLIST_AUTORETURN}
              </Text>
            </View>

            <Text style={styles.selectColor}>{CONTEXT.CONFIMATON_MESSGAE}</Text>

            <View style={styles.textBoxView}>
              <TextInput
                placeholder="Write label or description for your costumer"
                placeholderTextColor={Colors.grey}
                style={styles.textInputStyle}
                value={message}
                onChangeText={(txt)=>setMessage(txt)}
              />
            </View>

            <Text style={[styles.selectColor,{ marginTop: 17}]}>{CONTEXT.FILL_CONFIRMATION_MESSAGE}</Text>

            <View style={[styles.textBoxView,{height:155}]}>
              <TextInput
                placeholder="Write message"
                placeholderTextColor={Colors.grey}
                style={styles.textInputStyle}
                multiline={true}
                value={messageDescrip}
                onChangeText={(txt)=>setMessageDescrip(txt)}
              />
            </View>        
            </View>

        
        </View>
        <View style={{ marginVertical:'10%'}}>
          <CustomButton
            text="Save Settings"
            style={[styles.bottonStyle]}
            textstyle={{ color: Colors.whiteColor }}
            // onPress={() => navigation.navigate("AddProductVariant")}
          />
        </View>

      </ScrollView>
{returnModel && <AutoReturnModel hideMe={()=>setReturnModel(false)}/>}
{productNameModel && <ProductNameModel hideMe={()=>setProductNameModel(false)}/>}

    </SafeAreaView>
  );
};

export default ReturnSettingsBarcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  customHeaderStyle: { marginTop: 15, paddingBottom: 5 },
  infoIconStyle: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginHorizontal: 8,
  },
  checkStyle: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginHorizontal: 8,
  },
  pluseStyle: {
    width: 15 ,
    height: 15 ,
    resizeMode: "contain",
    marginHorizontal: 8,
  },
  returnText: {
    fontSize: 23,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
  },
  mainContainer: {
    paddingHorizontal: 15,
    marginTop: "8%",
  },
  greyColor: {
    fontSize: 13,
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
  },
  selectColor: {
    fontSize: 14.5,
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
  },
  autoText: {
    fontSize: 21,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    marginVertical: 25,
  },
  whiteView: {
    width: "100%",
    paddingVertical: 25,
    borderRadius: 10,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
  },
  MediumText: {
    fontSize: 19,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    lineHeight:24
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
  },
  productNameView: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.gray66,
    paddingVertical: 12,
    paddingHorizontal: 7,
  },
  pNameText: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  addCard: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.skyBlueColor,
  },
  toucableIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  textBoxView: {
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.gray66,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  textInputStyle: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.lightBlack,
  },
  bottonStyle:{
    width: "90%",
    backgroundColor: Colors.skyBlueColor,
  }
});
