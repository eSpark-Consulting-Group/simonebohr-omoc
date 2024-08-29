import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
} from "react-native";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_SEMIBOLD,
  GILROY_REGULAR,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import {
  arrow_down,
  checkbox,
  clock,
  uncheckbox,
} from "../../utils/images";
import FastImage from "react-native-fast-image";
import CustomTwoButton from "../../component/CustomTwoButton";
import VectorImage from "react-native-vector-image";
import CustomButton from "../../component/CustomButton";

const OrderSetting = () => {
  const [switchOne, setSwitchOne] = useState(true);
  const [discount, setDiscount] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Customheader title={CONTEXT.ORDER_SETTING} showBackIcon={true} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>
            {CONTEXT.CUSTOM_AND_ORDER_SETTING}
          </Text>
          <View style={styles.enableView}>
            <View style={{ marginTop: "6%" }}>
              <Text style={styles.PhotoText}>{CONTEXT.ENABLE_PRE_ORDER}</Text>
              <Text style={styles.smallText}>
                {CONTEXT.ASSIGN_THE_GENERATE}
              </Text>
            </View>
            <Switch
              trackColor={{ true: "#0094FF" }}
              value={switchOne}
              onValueChange={() => {
                setSwitchOne(!switchOne);
              }}
              style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
            />
          </View>

          <View style={styles.defaultView}>
            <Text style={styles.PhotoText}>
              {CONTEXT.DEFAULT_ADD_CART_TEXT}
            </Text>
            <View style={styles.borderView}>
              <TextInput
                placeholder="Pre-order Now"
                placeholderTextColor={Colors.LightShadeGray}
                style={styles.TextinputStyle}
              />
            </View>
            <Text style={styles.smallText}>
              {CONTEXT.TEXT_REPLACE_ON_ADDCARD}
            </Text>
          </View>

          <View style={styles.defaultView}>
            <Text style={styles.PhotoText}>{CONTEXT.AVAILABLE_QUANTITY}</Text>
            <View style={styles.borderView}>
              <TextInput
                placeholder="Write the number of product"
                placeholderTextColor={Colors.LightShadeGray}
                style={styles.TextinputStyle}
              />
            </View>
          </View>

          <View style={styles.defaultView}>
            <Text style={styles.PhotoText}>{CONTEXT.AVAILABLE_DATE}</Text>
            <View style={styles.dateStyle}>
              <View style={styles.dateView}>
                <TextInput
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={Colors.LightShadeGray}
                  style={styles.TextinputStyle}
                />
              </View>
              <View
                style={[
                  styles.dateView,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >
                <TextInput
                  placeholder="12:00 PM"
                  maxLength={8}
                  placeholderTextColor={Colors.LightShadeGray}
                  style={[styles.TextinputStyle, { width: "80%" }]}
                />
                <VectorImage source={clock} style={styles.imageStyle} />
              </View>
            </View>
          </View>

          <TouchableOpacity style={[styles.dateStyle, { marginTop: "5%", marginBottom:discount ?0:'58%' }]} onPress={()=>setDiscount(!discount)}>
            <Text style={styles.PhotoText}>{CONTEXT.MANAGE_DISCOUNT}</Text>
            {discount ?<VectorImage source={checkbox} style={[styles.imageStyle, {marginRight:10}]} />:
            <VectorImage source={uncheckbox} style={[styles.imageStyle,{marginRight:10}]} />}
         </TouchableOpacity>

         {discount === true && <View style={styles.defaultView}>
            <Text style={styles.PhotoText}>{CONTEXT.DISCOUNT_TYPE}</Text>
            <View style={styles.fixedView}>
              <Text style={styles.TextinputStyle}>Fixed</Text>
              <VectorImage source={arrow_down} style={styles.imageStyle} />
            </View>
          </View>}

          {discount === true && <View style={[styles.defaultView,{ marginBottom:'25%'}]}>
            <Text style={styles.PhotoText}>{CONTEXT.DISCOUNTED_PRICE_PERCENTAGE}</Text>
            <View style={styles.borderView}>
              <TextInput
                placeholder="Write down your price percentage (eg 38,50,100)"
                placeholderTextColor={Colors.LightShadeGray}
                style={styles.TextinputStyle}
              />
            </View>
          </View>}

          <View style={styles.BtnView}>
          <CustomButton
            text={strings.SAVE}
            style={styles.button}
            textstyle={styles.btnName}
          />
        </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  mainContainer: {
    marginTop: "5%",
    marginHorizontal: 13,
    flex: 1,
  },
  titleText: {
    fontSize: 23,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    marginTop: "6%",
  },
  enableView: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  PhotoText: {
    fontSize: 15.5,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  smallText: {
    fontSize: 11.5,
    fontFamily: GILROY_REGULAR,
    color: Colors.grey,
    marginTop: "3%",
  },
  defaultView: {
    marginTop: "8%",
  },
  borderView: {
    marginTop: "3%",
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutralGrey,
    padding: 9,
    paddingVertical: 15,
  },
  dateStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "2%",
  },
  dateView: {
    width: "48%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutralGrey,
    padding: 9,
    paddingVertical: 15,
  },
  imageStyle: {
    height: 20,
    width: 23,
    resizeMode: "contain",
  },
  TextinputStyle: {
    color: Colors.blackColor,
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
  },
  fixedView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "2%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutralGrey,
    padding: 9,
    paddingVertical: 15,
  },
  button: {
    width:358,
    backgroundColor: Colors.skyBlueColor,
  },
  btnName: {
    color: Colors.whiteColor,
  },
  BtnView: {
    alignItems: "center",
    marginTop:25,
    position:"absolute",
    bottom:15
  },
});
