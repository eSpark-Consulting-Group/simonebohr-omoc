import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../utils/colors";
import Customheader from "../../component/Customheader";
import { CONTEXT, palceholders, strings } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import { document_upload, plus, shoes } from "../../utils/images";
import SearchTabBar from "../../component/SearchTabBar";
import { MenuProvider } from "react-native-popup-menu";

import CategoryComponent from "../../component/CategoryComponent";
import CategoryBottomSheet from "../../component/CategoryBottomSheet";
import { Height, Width } from "../../utils";
import FastImage from "react-native-fast-image";

const Category = () => {
  const [active, setactive] = useState(false);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [newBottomSheet, setNewBottomSheet] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [addPicture, setAddPicture] = useState(false);

  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };
  return (
    <MenuProvider>
      <SafeAreaView style={styles.safeContainer}>
        <View>
          <Customheader showBackIcon={true} title={strings.CATEGORY} />
        </View>
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.titleManage}>
              {strings.MANAGE_YOUR_CATEGORY}
            </Text>
          </View>
          <View style={styles.manageView}>
            <Text style={styles.mangeText}>{strings.MANAGE_YOUR_SHOP}</Text>
          </View>
          <View style={styles.containerBTN}>
            <TouchableOpacity style={styles.buttonView}>
              <VectorImage source={plus} style={styles.plusIcon} />

              <Text style={styles.textButtonPreview}>
                {CONTEXT.ADD_CATEGORIES}
              </Text>
            </TouchableOpacity>
          </View>

          {!addPicture && (
            <>
              <View>
                <SearchTabBar
                  placeholder={palceholders.SEARCH_CATEGORIES}
                  style={styles.searchBar}
                />
              </View>

              <CategoryComponent
                addPicture={() => {
                  setAddPicture(true);
                }}
              />
            </>
          )}

          {addPicture && (
            <>
              <View style={styles.viewPicture}>
                <View style={styles.pictureTextView}>
                  <Text style={styles.pictureText}>
                    {CONTEXT.PICTURE_CATEGORY}
                  </Text>
                </View>
                {!showProduct && (
                  <TouchableOpacity
                    style={styles.addPhotoView}
                    onPress={() => setShowProduct(true)}
                  >
                    <View style={styles.textSizeView}>
                      <View style={styles.sizeTextView}>
                        <VectorImage source={plus} style={styles.Icon} />
                      </View>
                      <View style={styles.viewSize}>
                        <Text style={styles.textSize}>
                          {strings.SIZE_OF_PICTURE}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {showProduct && (
                  <View style={styles.shoeView}>
                    <View style={styles.viewShoeBox}>
                      <View style={styles.viewImage}>
                        <FastImage source={shoes} style={styles.shoeImage} />
                        <Text>{strings.SHOES}</Text>
                      </View>
                      <TouchableOpacity>
                        <VectorImage
                          source={document_upload}
                          style={{ tintColor: Colors.blackColor }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <View style={styles.pictureTextView}>
                  <Text style={styles.pictureText}>
                    {CONTEXT.TITLE_CATRGORY}
                  </Text>
                </View>
                <View style={styles.viewBox}>
                  <TextInput
                    placeholder={strings.WRITE_TITLE_OF_CATEGORIE}
                    style={styles.input}
                  />
                </View>
              </View>
              <View style={styles.viewProductChoosen}>
                <View style={styles.viewProductText}>
                  <Text style={styles.productChoose}>
                    {CONTEXT.PRODUCT_CHOOSEN}
                  </Text>
                  <Text style={styles.addProduct}>
                    {strings.ADD_YOUR_PRODUCT_FOR_THIS}
                  </Text>
                </View>
                <View style={styles.containerAddProduct}>
                  <TouchableOpacity
                    style={styles.buttonViewAddProduct}
                    onPress={() => {
                      setShowBottomSheet(true);
                    }}
                  >
                    <Text style={styles.textButtonAddProduct}>
                      {strings.ADD_PRODUCTS}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>

        {showBottomSheet && (
          <CategoryBottomSheet
            hideMe={() => {
              setShowBottomSheet(false);
            }}
          />
        )}
      </SafeAreaView>
    </MenuProvider>
  );
};

export default Category;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  mainContainer: {
    marginHorizontal: 15,
  },
  viewShoeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 20,
  },
  shoeImage: {
    height: 72,
    width: 72,
  },
  viewImage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  titleManage: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    color: Colors.blackColor,
    marginTop: 30,
  },
  shoeView: {
    backgroundColor: Colors.lightGrey,
    width: Width * (90 / 100),
    height: Height * (12 / 100),
    borderColor: Colors.lightGrey50,
    borderRadius: 22,
    alignSelf: "center",
    marginTop: Height * (2 / 100),
  },
  mangeText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    color: Colors.blackColor,
  },
  addProduct: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
    color: Colors.mediumGrey,
  },
  manageView: {
    marginTop: 15,
  },
  textSizeView: {
    flexDirection: "row",
    right: 30,
  },
  viewProductText: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  productChoose: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 28,
    color: Colors.neutralBlack,
  },
  input: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "600",
    fontSize: 16,
    color: Colors.grey,
    marginLeft: 10,
    marginTop: 20,
  },
  Icon: {
    height: 24,
    width: 24,
    resizeMode: "contain",
    tintColor: Colors.neutral80,
    alignSelf: "center",
    marginTop: 10,
  },
  viewSize: {
    marginTop: 10,
    right: 20,
    width: "50%",
  },
  viewBox: {
    width: "98%",
    alignSelf: "center",
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.neutralGrey,
    marginTop: 15,
  },
  containerBTN: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 30,
  },
  textButton: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  pictureTextView: {
    marginTop: 20,
    marginLeft: 10,
  },
  containerAddProduct: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 15,
  },
  textSize: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.dangerRed,
  },
  addPhotoView: {
    width: Width * (90 / 100),
    height: Height * (12 / 100),
    borderStyle: "dashed",
    borderWidth: Width * (0.4 / 100),
    borderColor: Colors.lightGrey50,
    borderRadius: Width * (4 / 100),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: Height * (2 / 100),
    backgroundColor: Colors.lightGrey,
  },
  sizeTextView: {
    height: 48,
    width: 48,
    borderWidth: 1,
    borderRadius: 40,
    marginRight: 30,
    borderColor: Colors.lightGrey50,
  },
  textButtonPreview: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  textButtonAddProduct: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.skyBlueColor,
  },
  buttonView: {
    width: "49%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonViewAddProduct: {
    width: "49%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  buttonViewLondon: {
    width: "49%",
    height: 51,
    borderColor: Colors.neutralGrey,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "center",
  },
  plusIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 5,
  },
  viewProductChoosen: {
    width: "100%",
    height: "22%",
    backgroundColor: Colors.whiteColor,
    marginTop: 10,
    borderRadius: 12,
  },
  viewPicture: {
    width: "100%",
    height: "42%",
    backgroundColor: Colors.whiteColor,
    marginTop: 20,
    borderRadius: 12,
  },
  pictureText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 20,
    color: Colors.mediumGrey,
  },
  searchBar: {
    width: "100%",
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.neutralGrey,
  },
});
