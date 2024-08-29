import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import { Colors } from "../../utils/colors";
import {
  GILROY_MEDIUM,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import ProductDescriptionComponent from "../../component/ProductDescriptionComponent";
import DetailProductComponent from "../../component/DetailProductComponent";
import ProductVariantComponent from "../../component/ProductVariantComponent";
import ManagementProductComponent from "../../component/ManagementProductComponent";
import AboutShippingComponent from "../../component/AboutShippingComponent";
import IndividualisationFormsComponent from "../../component/IndividualisationFormsComponent";
import FaqComponent from "../../component/FaqComponent";
import ConfiguratorProductsComponent from "../../component/ConfiguratorProductsComponent";

const AddNewProduct = () => {
  


  return (
    <SafeAreaView style={styles.safeContainer}>
      <View>
        <Customheader showBackIcon={true} title={CONTEXT.OMOC_SELLER} />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.textheader}>
          <Text style={styles.textNewProduct}>
            {CONTEXT.ADD_YOUR_NEW_PRODUCT}
          </Text>
        </View>

        <ScrollView style={styles.scrollView}>

          <ProductDescriptionComponent/>
          <DetailProductComponent/>
          <ProductVariantComponent/>
          <ManagementProductComponent/>
          <AboutShippingComponent/>
          <IndividualisationFormsComponent/>
          <FaqComponent/>
          <ConfiguratorProductsComponent/>

  
          <TouchableOpacity style={styles.btnAddYourProduct}>
            <Text style={styles.addYourProduct}>
              {strings.ADD_YOUR_PRODUCT}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddNewProduct;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.ghostWhite,
  },
  mainContainer: {
    marginHorizontal: 15,
  },
  textheader: {
    marginTop: 30,
  },
  textNewProduct: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 24,
    color: Colors.blackColor,
  },
  btnAddYourProduct: {
    backgroundColor: Colors.skyBlueColor,
    height: 51,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  addYourProduct: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.whiteColor,
  },
  scrollView: {
    marginBottom: 120,
  },

});
