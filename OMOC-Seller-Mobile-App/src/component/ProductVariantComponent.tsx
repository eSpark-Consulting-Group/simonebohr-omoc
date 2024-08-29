import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import { arrow_down } from "../utils/images";
import { CONTEXT } from "../utils/string/strings";
import { Colors } from "../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";

const ProductVariantComponent = () => {
  const [showProductVariant, setShowProductVariant] = useState(false);

  return (
    <View style={styles.productView}>
      <View style={styles.productCompoView}>
        <View style={styles.mainViewProduct}>
          <View style={styles.productVariant}>
            <View style={styles.viewproductDescription}>
              <Text style={styles.productDescription}>
                {CONTEXT.PRODUCT_VARIANT}
              </Text>
              <TouchableOpacity
                style={[
                  showProductVariant === true
                    ? styles.dropIconOpened
                    : styles.dropIcon,
                ]}
                onPress={() => setShowProductVariant(!showProductVariant)}
              >
                <VectorImage source={arrow_down} />
              </TouchableOpacity>
            </View>

            {showProductVariant && (
              <View style={styles.viewProductName}>
                <Text style={styles.textProductName}>
                  {CONTEXT.ADD_PRODUCT_VARIANT}
                </Text>
                <Text style={styles.oops}>{CONTEXT.OOPS_THE_BENEFIT}</Text>

                <TouchableOpacity style={styles.btnAddProduct}>
                  <Text style={styles.addSpe}>
                    {CONTEXT.ADD_PRODUCT_VARIANT}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductVariantComponent;

const styles = StyleSheet.create({
  productView: {
    backgroundColor: Colors.yellow,
    marginTop: 10,
    borderRadius: 12,
  },
  productDescription: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  viewproductDescription: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productVariant: {
    width: "100%",
    borderRadius: 12,
    justifyContent: "center",
  },
  dropIcon: {},
  dropIconOpened: {
    transform: [{ rotate: "180deg" }],
  },
  viewProductName: {
    marginTop: 15,
    gap: 10,
  },
  textProductName: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 16,
    color: Colors.neutral100,
  },
  oops: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.neutral80,
  },
  btnAddProduct: {
    width: 197,
    height: 51,
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 10,
    borderColor: Colors.skyBlueColor,
    marginTop: 20,
    alignItems: "center",
  },
  addSpe: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.skyBlueColor,
  },
  productCompoView: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    paddingBottom: 15,
  },
  mainViewProduct: {
    marginHorizontal: 10,
  },
});
