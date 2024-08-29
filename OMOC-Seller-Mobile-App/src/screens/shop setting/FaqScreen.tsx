import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { strings } from "../../utils/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import Customheader from "../../component/Customheader";
import GeneralFaqComponent from "../../component/GeneralFaqComponent";
import ProductFaqComponent from "../../component/ProductFaqComponent";
import { add_icon, search } from "../../utils/images";
import VectorImage from "react-native-vector-image";
import ApiService from "../../services/api.service";
import { useSelector } from "react-redux";

const FaqScreen = ({ navigation }) => {
  const [buttonPress, setbuttonPress] = useState(false);
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);
  console.log("------SHOPID", currentShop);

  const getFaqData = async () => {
    try {
      const response = await ApiService.getListOfFaq(currentShop?._id);
      const data = response.data.faqs;
      setFaqData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getFaqData();
  }, [currentShop]);

  const handlePressFirst = () => {
    setbuttonPress(!buttonPress);
  };

  const handlePressSecond = () => {
    setbuttonPress(!buttonPress);
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Customheader
        title={strings.FAQ}
        showBackIcon={true}
        optionImage={search}
        onPress={() => navigation.navigate("FaqSearchScreen")}
      />

      <View style={styles.viewGeneralProduct}>
        <TouchableOpacity
          style={[
            styles.buttonView,
            {
              backgroundColor: buttonPress
                ? Colors.lightGrey
                : Colors.skyBlueColor,
            },
          ]}
          onPress={handlePressFirst}
        >
          <Text
            style={[
              styles.textGeneral,
              {
                color: buttonPress ? Colors.neutralBlack : Colors.whiteColor,
              },
            ]}
          >
            {strings.GENERAL_FAQ}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonView,
            {
              backgroundColor: buttonPress
                ? Colors.skyBlueColor
                : Colors.lightGrey,
            },
          ]}
          onPress={handlePressSecond}
        >
          <Text
            style={[
              styles.textProduct,
              {
                color: buttonPress ? Colors.whiteColor : Colors.blackColor,
              },
            ]}
          >
            {strings.PRODUCT_FAQ}
          </Text>
        </TouchableOpacity>
      </View>
      {!buttonPress && (
        <GeneralFaqComponent navigation={navigation} data={faqData} />
      )}
      {buttonPress && <ProductFaqComponent navigation={navigation} />}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("AddProductFaqScreen")}
      >
        <VectorImage source={add_icon} style={styles.addIcon} />
        <Text style={styles.btnText}>{strings.ADD_PRODUCT_FAQ}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: Colors.whiteColor,
  },
  header: {
    marginTop: 15,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewGeneralProduct: {
    backgroundColor: Colors.lightGrey,
    marginTop: 20,
    borderRadius: 24,
    alignSelf: "center",
    flexDirection: "row",
  },

  viewProduct: {
    width: 174,
    height: 49,
    marginTop: 4,
    marginLeft: 20,
  },
  textGeneral: {
    fontFamily: GILROY_REGULAR,
    color: Colors.whiteColor,
    fontSize: 12,
  },
  textProduct: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    fontSize: 13,
  },
  buttonView: {
    borderRadius: 30,
    width: 174,
    paddingVertical: 18,
    alignItems: "center",
  },
  styleIcon: {
    height: 24,
    width: 24,
    resizeMode: "contain",
    backgroundColor: "red",
  },
  continueButton: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: Colors.skyBlueColor,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 24,
    position: "absolute",
    bottom: 30,
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 6,
  },
  addIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    tintColor: Colors.whiteColor,
  },
});
