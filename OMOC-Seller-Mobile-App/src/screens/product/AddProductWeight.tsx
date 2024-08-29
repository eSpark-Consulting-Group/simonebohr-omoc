import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Customheader from "../../component/Customheader";
import { ellips_On, ellips_Off } from "../../utils/images";
import { CONTEXT } from "../../utils/string/strings";
import { Height, Width } from "../../utils/index";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import CustomButton from "../../component/CustomButton";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import en from "../../utils/string/en";
import { useSelector } from "react-redux";
import Spinner from "../../component/Spinner";

const AddProductWeight = ({ navigation, route }) => {
  const { productDetails } = route.params;
  const [selectedValue, setSelectedValue] = useState("option1");
  const [productVariant, setProductVariant] = useState("");
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);
  const [loading, setLoading] = useState(false);

  const addYourProduct = async () => {
    setLoading(true);
    try {
      const product = {
        productInfo: {
          name: productDetails?.productName,
          category: productDetails?.selectedCategory,
          images: productDetails?.imageList || [],
          originalPrice: 1000,
          quantity: parseInt(productDetails?.stockTotal),
          brand: "samsung",
          type: "electroincs",
          price: 800,
          currencyType: "usd",
          recommendedCategory: "mobile/electronics",
          availablePaymentMode: ["cod", "credit_card", "bank_transfer"],
          genders: ["boy", "men"],
          expectedShippingTime: "2-3",
          toolTip: "Mobile samsung new",
          barCode: "kjbgiru38457",
          color: "red",
          size: "blue",
          weight: 45,
          weightUnit: "lbs",
          maxOrderUnit: 10,
        },
        productVariants: [
          {
            color: "white",
            price: 4000,
            stock: 50,
            sku: "999",
            status: true,
            barCode: "kjbgiru38457",
            weight: 45,
          },
          {
            color: "red",
            price: 4200,
            stock: 25,
            sku: "996",
            status: true,
          },
        ],
        productManagement: {
          assignGeneratedSKU: true,
          quantity: 10,
          wareHouseId: "f234",
          sku: "2345",
          barCode: "2",
        },
        faqs: [
          {
            question: "How do I get my order?",
            answer: "You can track your order in your account.",
          },
        ],
      };

      const response = await ApiService.createProduct({
        shopId: currentShop?._id,
        product,
      });
      setLoading(false);
      if (response?.status) {
        showMessage({
          message: "Product added to the shop",
          duration: 3000,
          backgroundColor: Colors.skyBlueColor,
          type: "danger",
        });
        navigation.popToTop();
      }
    } catch (e) {
      setLoading(false);
      showMessage({
        message: e?.response?.data?.message || en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.errorRed,
        type: "danger",
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Customheader
        title={CONTEXT.ADD_PRODUCT}
        showBackIcon={true}
        Containerstyle={{ marginTop: 15, paddingBottom: 5 }}
      />
      <View style={[styles.productView, { marginTop: Height * (4 / 100) }]}>
        <Text style={styles.productText}>{CONTEXT.ADD_PRODUCT_VARIANT}</Text>
        <Text style={[styles.productSamllText]}>
          Opps! your shop score is low, improve it and get the benefit.
        </Text>
      </View>
      <TextInput
        value={productVariant}
        style={styles.squareView}
        onChangeText={(text) => {
          setProductVariant(text);
        }}
        placeholder="None"
        placeholderTextColor={Colors.grey}
      />
      <View
        style={[
          styles.productView,
          { marginTop: Height * (2 / 100), marginBottom: Height * (38 / 100) },
        ]}
      >
        <Text style={styles.productText}>{CONTEXT.SHIPPING_SERVICES}</Text>
        <Text style={styles.productSamllText}>
          Opps! your shop score is low, improve it and get the benefit.{" "}
        </Text>

        <TouchableOpacity
          style={styles.radioView}
          onPress={() => setSelectedValue("option1")}
        >
          <VectorImage
            source={selectedValue === "option1" ? ellips_On : ellips_Off}
            style={styles.ellipIconStyle}
          />
          <Text style={styles.shippingTypeText}>Default Setting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioView}
          onPress={() => setSelectedValue("option2")}
        >
          <VectorImage
            source={selectedValue === "option2" ? ellips_On : ellips_Off}
            style={styles.ellipIconStyle}
          />
          <Text style={styles.shippingTypeText}>Custom Shipping</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.saveButtonView}>
        <CustomButton
          text="Add Your Product"
          style={[styles.bottonStyle]}
          textstyle={{ color: Colors.whiteColor }}
          onPress={() => addYourProduct()}
        />
      </View>
      {loading && <Spinner animating={loading} />}
    </SafeAreaView>
  );
};

export default AddProductWeight;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  productView: {
    width: "93%",
    alignSelf: "center",
  },
  productText: {
    fontSize: 16,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
  },
  productSamllText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: Colors.mediumGrey,
    marginVertical: 10,
  },
  shippingTypeText: {
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
    marginVertical: 8,
    color: Colors.midBlack,
    marginLeft: 10,
  },
  noneText: {
    fontSize: Width * (3.6 / 100),
    fontFamily: GILROY_REGULAR,
    color: Colors.mediumGrey,
    alignSelf: "flex-start",
  },
  squareView: {
    width: "93%",
    borderColor: Colors.neutralGrey,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: Width * (3.3 / 100),
    paddingVertical: 16,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: Width * (1.5 / 100),
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  bottonStyle: {
    backgroundColor: Colors.skyBlueColor,
  },
  radioView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Height * (0.5 / 100),
  },
  ellipIconStyle: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  saveButtonView: {
    backgroundColor: Colors.whiteColor,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderRadius: 40,
  },
});
