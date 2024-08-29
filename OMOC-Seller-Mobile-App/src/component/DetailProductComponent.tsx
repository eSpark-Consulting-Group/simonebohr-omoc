import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import {
  add_photo,
  arrow_down,
  blank_round_circle,
  blue_round_circle,
} from "../utils/images";
import { CONTEXT, strings } from "../utils/string/strings";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FastImage from "react-native-fast-image";

const DetailProductComponent = () => {
  const [showDetailProduct, setShowDetailProduct] = useState(false);

  return (
    <View style={styles.productView}>
      <View style={styles.productCompoView}>
        <View style={styles.mainViewProduct}>
          <View style={styles.viewproductDescription}>
            <Text style={styles.productDescription}>
              {CONTEXT.DETAIL_PRODUCT}
            </Text>
            <TouchableOpacity
              style={[
                showDetailProduct === true
                  ? styles.dropIconOpened
                  : styles.dropIcon,
              ]}
              onPress={() => setShowDetailProduct(!showDetailProduct)}
            >
              <VectorImage source={arrow_down} />
            </TouchableOpacity>
          </View>
          {showDetailProduct && (
            <View style={styles.viewProductPhoto}>
              <Text style={styles.textProductName}>
                {CONTEXT.PRODUCT_PHOTO}
              </Text>
              <Text style={styles.oops}>{strings.OOPS}</Text>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <ScrollView
                  style={styles.addMiniPhotoView}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={styles.photoMainView}>
                    <TouchableOpacity style={styles.addPhotoView}>
                      <View style={styles.addView}>
                        <FastImage
                          source={add_photo}
                          style={styles.photoStyle}
                        />
                        <Text style={styles.addText}>{CONTEXT.MAIN_PHOTO}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addPhotoView}>
                      <View style={styles.addView}>
                        <FastImage
                          source={add_photo}
                          style={styles.photoStyle}
                        />
                        <Text style={styles.addText}>{CONTEXT.PHOTO_TWO}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addPhotoView}>
                      <View style={styles.addView}>
                        <FastImage
                          source={add_photo}
                          style={styles.photoStyle}
                        />
                        <Text style={styles.addText}>{CONTEXT.PHOTO_TWO}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </KeyboardAwareScrollView>
              <View style={styles.viewProductPhoto}>
                <Text style={styles.textProductName}>{CONTEXT.PRODUCT}</Text>
                <Text style={styles.oops}>{strings.OOPS}</Text>
                <TouchableOpacity style={styles.ChooseCategories}>
                  <Text style={styles.textChoose}>{CONTEXT.MERK}</Text>
                  <VectorImage source={arrow_down} />
                </TouchableOpacity>
                <View style={styles.sizeView}>
                  <TouchableOpacity style={styles.touchableSize}>
                    <Text style={styles.textChoose}>{CONTEXT.SIZE}</Text>
                    <VectorImage source={arrow_down} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.touchableSize}>
                    <Text style={styles.textChoose}>{CONTEXT.MERK}</Text>
                    <VectorImage source={arrow_down} />
                  </TouchableOpacity>
                </View>
                <View style={styles.viewExample}>
                  <TextInput
                    placeholder={CONTEXT.EXAMPLE_SHOES}
                    style={styles.input}
                    multiline={true}
                  />
                </View>
                <View style={styles.toolView}>
                  <Text style={styles.tooltips}>{CONTEXT.TOOLTIPS}</Text>
                  <Text style={styles.tooltips}>0/70</Text>
                </View>
                <View style={styles.viewCustomerOrder}>
                  <Text style={styles.customOrder}>
                    {CONTEXT.CUSTOM_AND_ORDER_SETTING}
                  </Text>
                  <Text style={styles.addAdditional}>
                    {CONTEXT.ADD_ADDITIONAL_DETAILS}
                  </Text>
                  <TouchableOpacity style={styles.btnAddSpecial}>
                    <Text style={styles.addSpe}> {CONTEXT.ADD_SPECIAL}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.viewPriceUSD}>
                  <Text style={styles.customOrder}>{CONTEXT.PRICE}</Text>

                  <View style={styles.usdMainView}>
                    <View style={styles.usdView}>
                      <Text style={styles.textChoose}>{strings.USD}</Text>
                    </View>
                    <TextInput
                      style={styles.textInputPrice}
                      placeholder={strings.INPUT_PRICE}
                    />
                  </View>
                </View>
                <View style={styles.viewMaximamNum}>
                  <Text style={styles.customOrder}>
                    {CONTEXT.MAXIMUM_NUMBER}
                  </Text>
                  <View style={styles.viewFashion}>
                    <TouchableOpacity>
                      <VectorImage source={blank_round_circle} />
                    </TouchableOpacity>
                    <Text style={styles.thereIsNo}>{CONTEXT.THERE_IS_NO}</Text>
                  </View>
                  <View style={styles.viewFashion}>
                    <TouchableOpacity>
                      <VectorImage source={blue_round_circle} />
                    </TouchableOpacity>
                    <Text style={styles.thereIsNo}>
                      {CONTEXT.LIMIT_THE_MAXIMUM}
                    </Text>
                  </View>
                  <Text style={styles.setupmeximumText}>
                    {CONTEXT.SETUP_MEXIMUM}
                  </Text>
                  <TouchableOpacity style={styles.ChooseCategories}>
                    <Text style={styles.textChoose}>10</Text>
                    <VectorImage source={arrow_down} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default DetailProductComponent;

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
  viewProductPhoto: {
    width: "100%",
    gap: 16,
    marginTop: 15,
  },
  photoMainView: {
    flexDirection: "row",
    gap: 10,
  },
  addMiniPhotoView: {},
  sizeView: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  input: {
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
    color: Colors.grey,
  },
  dropIcon: {},
  dropIconOpened: {
    transform: [{ rotate: "180deg" }],
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
  addPhotoView: {},
  addView: {
    width: 160,
    height: 160,
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: Colors.lightGrey50,
    borderRadius: 16,
    justifyContent: "center",
  },
  photoStyle: {
    height: 48,
    width: 48,
    tintColor: Colors.neutral80,
    resizeMode: "contain",
  },
  addText: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: Colors.neutral80,
    margin: 3,
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

  touchableSize: {
    width: "50%",
    height: 56,
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
  viewExample: {
    height: 171,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    borderColor: Colors.gray88,
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
  viewCustomerOrder: {
    gap: 24,
  },
  customOrder: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 16,
    color: Colors.neutral100,
  },
  addAdditional: {
    fontFamily: GILROY_REGULAR,
    fontSize: 10,
    color: Colors.grey,
    letterSpacing: 1,
  },
  btnAddSpecial: {
    width: 197,
    height: 51,
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 10,
    borderColor: Colors.skyBlueColor,
  },
  addSpe: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.skyBlueColor,
  },
  viewPriceUSD: {
    width: "100%",
    gap: 16,
  },
  usdView: {
    width: 40,
    height: 19,
    borderRightWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.gray88,
  },
  usdMainView: {
    width: "100%",
    height: 51,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 12,
    borderColor: Colors.gray88,
    flexDirection: "row",
  },
  textInputPrice: {
    width: "80%",
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    color: Colors.grey,
    marginLeft: 10,
  },
  viewMaximamNum: {
    gap: 16,
  },
  setupmeximumText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.neutralBlack,
  },
  thereIsNo: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.neutral100,
    width: "90%",
  },
  viewFashion: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
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
