import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import {
  arrow_down,
  blank_round_circle,
  blue_round_circle,
} from "../utils/images";
import { CONTEXT, strings } from "../utils/string/strings";
import { Colors } from "../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";

const AboutShippingComponent = () => {
  const [showAboutShipping, setShowAboutShipping] = useState(false);

  return (
    <View style={styles.productView}>
      <View style={styles.productCompoView}>
        <View style={styles.mainViewProduct}>
          <View style={styles.viewproductDescription}>
            <Text style={styles.productDescription}>
              {CONTEXT.ABOUT_SHIPPING}
            </Text>
            <TouchableOpacity
              style={[
                showAboutShipping === true
                  ? styles.dropIconOpened
                  : styles.dropIcon,
              ]}
              onPress={() => setShowAboutShipping(!showAboutShipping)}
            >
              <VectorImage source={arrow_down} />
            </TouchableOpacity>
          </View>

          {showAboutShipping && (
            <>
              <View style={styles.viewProductName}>
                <Text style={styles.textProductName}>
                  {CONTEXT.PRODUCT_WEIGHT}
                </Text>
                <Text style={styles.oops}>{CONTEXT.OOPS_THE_BENEFIT}</Text>
                <View>
                  <TouchableOpacity style={styles.inputBoxTouchable}>
                    <TextInput
                      style={styles.inputBox}
                      placeholder={CONTEXT.STOCK_TOTAL}
                    />
                    <Text style={styles.lbs}>{CONTEXT.LBS}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.viewRecommendation}>
                <Text style={styles.recommendation}>
                  {CONTEXT.SHIPPING_SERVICES}
                </Text>
                <Text style={styles.oops}>{strings.OOPS}</Text>
                <View style={styles.viewFashion}>
                  <TouchableOpacity>
                    <VectorImage source={blue_round_circle} />
                  </TouchableOpacity>
                  <Text style={styles.fashion}>{CONTEXT.DEFAULT_SETTINGS}</Text>
                </View>
                <View style={styles.viewFashion}>
                  <TouchableOpacity>
                    <VectorImage source={blank_round_circle} />
                  </TouchableOpacity>
                  <Text style={styles.fashion}>{CONTEXT.CUSTOM_SHIPPING}</Text>
                </View>
              </View>
              <View style={styles.viewCategories}>
                <Text style={styles.recommendation}>
                  {CONTEXT.SHIPPING_TIME}
                </Text>
                <Text style={styles.oops}>{CONTEXT.OOPS_THE_BENEFIT}</Text>
              </View>
              <TouchableOpacity style={styles.ChooseCategories}>
                <Text style={styles.textChoose}>{CONTEXT.SELECT_ESTIMATE}</Text>
                <VectorImage source={arrow_down} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default AboutShippingComponent;

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
  dropIcon: {},
  dropIconOpened: {
    transform: [{ rotate: "180deg" }],
  },
  viewProductName: {
    marginTop: 15,
    gap: 10,
  },
  viewManagement: {
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
  inputBox: {
    width: "90%",
    color: Colors.grey,
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
  },
  inputBoxTouchable: {
    width: "100%",
    height: 51,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: Colors.gray88,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  toolView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tooltips: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.neutralBlack,
  },
  viewRecommendation: {
    width: "100%",
    marginTop: 15,
    gap: 16,
  },
  recommendation: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 16,
    color: Colors.neutral100,
  },
  setupOwn: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 16,
    color: Colors.neutral100,
    width: "82%",
  },
  fashion: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.neutral100,
  },
  viewCategories: {
    marginTop: 15,
    gap: 16,
  },
  ChooseCategories: {
    width: "100%",
    height: 57,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: Colors.gray88,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textChoose: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.neutralBlack,
  },
  viewFashion: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  lbs: {
    color: Colors.grey,
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
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
