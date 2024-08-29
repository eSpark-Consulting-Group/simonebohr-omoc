import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { bankData } from "../../sampleData/BankData";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import VectorImage from "react-native-vector-image";
import React, { useState } from "react";
import {
  apple_icon,
  dropdown_icon,
  klarna_image,
  mastercard_icon,
  paypal_icon,
} from "../../utils/images";
import BankDetails from "../../components/BankDetails";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { midGray, neutralBlack } from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import FastImage from "react-native-fast-image";

const PaymentScreen = ({ navigation }) => {
  const [isShow, setIsShow] = useState(false);
  function dropDown() {
    setIsShow(!isShow);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.BackButton}>
        <CustomHeaderShown title={"Payment Method"} navigation={navigation} />
      </View>
      <View style={styles.Header}>
        <TouchableOpacity style={styles.Button}>
          <View style={styles.Container}>
            <View>
              <VectorImage source={mastercard_icon} style={styles.MasterImg} />
            </View>
            <Text style={styles.CreditText}>{strings.CREDIT_CARD}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.BankButton}>
          <TouchableOpacity
            style={styles.Container}
            onPress={() => {
              dropDown();
            }}
          >
            <VectorImage source={mastercard_icon} style={styles.MasterImg} />
            <Text style={styles.CreditText}>{strings.BANK_TRANSFER}</Text>
            <TouchableOpacity style={styles.DropIcon}>
              <VectorImage source={dropdown_icon} />
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
        {isShow && (
          <FlatList
            data={bankData}
            renderItem={({ item }) => <BankDetails data={item} />}
          />
        )}
        <TouchableOpacity style={styles.Button}>
          <View style={styles.Container}>
            <VectorImage source={paypal_icon} style={styles.MasterImg} />
            <Text style={styles.CreditText}>{strings.PAYPAL}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}>
          <View style={styles.Container}>
            <FastImage source={klarna_image} style={styles.MasterImg} />
            <Text style={styles.CreditText}>{strings.KLARNA}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}>
          <View style={styles.Container}>
            <VectorImage source={apple_icon} style={styles.MasterImg} />
            <Text style={styles.CreditText}>{strings.APPLE_PAY}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  Button: {
    width: "85%",
    height: 40,
    marginTop: 35,
    marginLeft: 10,
    borderBottomColor: midGray,
    borderBottomWidth: 1,
  },
  BackButton: {
    marginLeft: 15,
  },
  CreditText: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 10,
    fontFamily: GILROY_REGULAR,
  },
  MasterImg: {
    height: 24,
    width: 24,
  },
  Container: {
    flexDirection: "row",
    marginVertical: -8,
  },
  BankButton: {
    width: "92%",
    height: 40,
    marginTop: 40,
    marginLeft: 10,
    borderBottomColor: midGray,
    borderBottomWidth: 1,
  },
  DropIcon: {
    color: neutralBlack,
    marginLeft: "60%",
    marginTop: 8,
  },
  OtherBankText: {
    marginTop: 15,
    marginLeft: 25,
  },
  OtherBankView: {
    borderBottomWidth: 1,
    width: "92%",
    marginLeft: 10,
    fontWeight: "400",
    fontFamily: GILROY_MEDIUM,
    fontsize: 14,
    height: "15%",
    borderColor: midGray,
    marginVertical: 4,
  },
  Header: {
    marginTop: 15,
  },
});
