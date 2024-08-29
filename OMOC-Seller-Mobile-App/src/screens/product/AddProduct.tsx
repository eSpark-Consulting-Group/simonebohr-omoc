import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Customheader from "../../component/Customheader";
import { CONTEXT } from "../../utils/string/strings";
import { add_photo, arrow_down } from "../../utils/images";
import { Height, Width } from "../../utils";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import CustomButton from "../../component/CustomButton";
import { launchImageLibrary } from "react-native-image-picker";
import ApiService from "../../services/api.service";
import en from "../../utils/string/en";
import { showMessage } from "react-native-flash-message";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "../../component/Spinner";

const AddProduct = ({ navigation }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "0",
    title: "Choose Categories",
  });
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [productImage1, setProductImages1] = useState(null);
  const [productImage2, setProductImages2] = useState(null);
  const [productImage3, setProductImages3] = useState(null);
  const [productImage4, setProductImages4] = useState(null);
  const [productImage5, setProductImages5] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);

  useEffect(() => {
    getYourCategories();
  }, []);

  const openPhotoGallery = (index) => {
    try {
      launchImageLibrary(
        {
          mediaType: "photo",
          presentationStyle: "pageSheet",
          selectionLimit: 1,
        },
        async (response: any) => {
          const { assets } = response;
          const file = {
            uri: assets[0].uri,
            name: assets[0].fileName,
            filename: assets[0].fileName,
            type: assets[0].type,
          };
          const formData = new FormData();
          formData.append("product", file);
          setIsLoading(true)
          const imgResponse = await ApiService.addProductImages(formData);
          if (imgResponse.status) {
            console.log(JSON.stringify(imgResponse));
            setImageList([...imageList, imgResponse.data]);
            if (assets && index === 1) {
              setProductImages1(assets[0]);
            } else if (assets && index === 2) {
              setProductImages2(assets[0]);
            } else if (assets && index === 3) {
              setProductImages3(assets[0]);
            } else if (assets && index === 4) {
              setProductImages4(assets[0]);
            } else if (assets && index === 5) {
              setProductImages5(assets[0]);
            }
            setIsLoading(false)
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getYourCategories = async () => {
    try {
      const response = await ApiService.getAllCategoriesByShopId({
        shopId: currentShop?._id,
      });
      if (response?.status) {
        setCategoriesList(response?.data?.reverse());
      } else {
        setCategoriesList([]);
      }
    } catch (e) {
      setCategoriesList([]);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Customheader
        title={CONTEXT.ADD_PRODUCT}
        showBackIcon={true}
        Containerstyle={{ marginTop: 10, paddingBottom: 5 }}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.productView, { marginTop: 35 }]}>
            <Text style={styles.productText}>{CONTEXT.PRODUCT_PHOTO} *</Text>
          </View>
          <TouchableOpacity
            style={styles.addPhotoView}
            onPress={() => openPhotoGallery(1)}
          >
            {!productImage1 ? (
              <View style={styles.addView}>
                <FastImage source={add_photo} style={styles.photoStyle} />
                <Text style={styles.addText}>{CONTEXT.ADD_PHOTO}</Text>
              </View>
            ) : (
              <FastImage
                source={{
                  uri: productImage1?.uri,
                }}
                style={styles.productImage}
              />
            )}
          </TouchableOpacity>
          <ScrollView
            style={styles.addMiniPhotoView}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={styles.multiPhotoView}
              onPress={() => openPhotoGallery(2)}
            >
              {!productImage2 ? (
                <View style={styles.subImageView}>
                  <FastImage source={add_photo} style={styles.photoAdd} />
                  <Text style={styles.addText}>Add Photo</Text>
                </View>
              ) : (
                <FastImage
                  source={{
                    uri: productImage2?.uri,
                  }}
                  style={styles.productImage}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.multiPhotoView}
              onPress={() => openPhotoGallery(3)}
            >
              {!productImage3 ? (
                <View style={styles.subImageView}>
                  <FastImage source={add_photo} style={styles.photoAdd} />
                  <Text style={styles.addText}>Add Photo</Text>
                </View>
              ) : (
                <FastImage
                  source={{
                    uri: productImage3?.uri,
                  }}
                  style={styles.productImage}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.multiPhotoView}
              onPress={() => openPhotoGallery(4)}
            >
              {!productImage4 ? (
                <View style={styles.subImageView}>
                  <FastImage source={add_photo} style={styles.photoAdd} />
                  <Text style={styles.addText}>Add Photo</Text>
                </View>
              ) : (
                <FastImage
                  source={{
                    uri: productImage4?.uri,
                  }}
                  style={styles.productImage}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.multiPhotoView}
              onPress={() => openPhotoGallery(5)}
            >
              {!productImage5 ? (
                <View style={styles.subImageView}>
                  <FastImage source={add_photo} style={styles.photoAdd} />
                  <Text style={styles.addText}>Add Photo</Text>
                </View>
              ) : (
                <FastImage
                  source={{
                    uri: productImage5?.uri,
                  }}
                  style={styles.productImage}
                />
              )}
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.dividerLine} />
          <View style={[styles.productView, { marginVertical: 20 }]}>
            <Text style={styles.productText}>{CONTEXT.PRODUCT_NAME}</Text>
            <Text style={[styles.productSamllText]}>
              Opps! your shop score is low, improve it and get the benefit{" "}
            </Text>
            <View style={styles.nameView}>
              <TextInput
                value={productName}
                placeholder="Name"
                placeholderTextColor={Colors.lightGrey50}
                onChangeText={(txt) => setProductName(txt)}
                keyboardType="default"
                style={styles.textInput}
              />
            </View>
          </View>
          <View
            style={[styles.productView, { marginVertical: Height * (1 / 100) }]}
          >
            <Text style={styles.productText}>{CONTEXT.CATEGORIES}</Text>
            <Text style={[styles.productSamllText]}>
              Opps! your shop score is low, improve it and get the benefit{" "}
            </Text>
            <TouchableOpacity
              style={styles.categoryTextView}
              onPress={() => setShowCategories(!showCategories)}
            >
              <Text style={styles.categoryText}>{selectedCategory.title}</Text>
              <VectorImage source={arrow_down} style={styles.downIconStyle} />
            </TouchableOpacity>
          </View>
          {showCategories && (
            <View style={styles.pickerViewStyle}>
              {categoriesList?.map((item) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    setSelectedCategory(item);
                    setShowCategories(false);
                  }}
                >
                  <Text style={styles.itemText}>{item?.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View
            style={[styles.productView, { marginVertical: Height * (2 / 100) }]}
          >
            <Text style={styles.productText}>{CONTEXT.DETAIL_PRODUCT}</Text>
            <Text style={[styles.productSamllText]}>
              Opps! your shop score is low, improve it and get the benefit{" "}
            </Text>
            <View style={styles.detailView}>
              <TextInput
                value={productDetail}
                placeholder="Name"
                multiline
                placeholderTextColor={Colors.lightGrey50}
                onChangeText={(txt) => setProductDetail(txt)}
                keyboardType="default"
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={[styles.productView, { marginBottom: Height * 0.03 }]}>
            <Text style={styles.productText}>{CONTEXT.DISCOUNTED_PRICE}</Text>
            <Text style={[styles.productSamllText]}>
              Opps! your shop score is low, improve it and get the benefit{" "}
            </Text>
            <View style={[styles.nameView]}>
              <TextInput
                value={discountPrice}
                placeholder="$"
                maxLength={6}
                placeholderTextColor={Colors.lightGrey50}
                onChangeText={(txt) => setDiscountPrice(txt)}
                keyboardType="numeric"
                style={styles.textInput}
              />
            </View>
          </View>
          <View>
            <CustomButton
              text="Next"
              style={[styles.bottonStyle]}
              textstyle={{ color: Colors.whiteColor }}
              onPress={() => {
                navigation.navigate("AddProductVariant", {
                  productDetails: {
                    productName,
                    productDetail,
                    discountPrice,
                    selectedCategory: selectedCategory?.id,
                    imageList,
                  },
                });
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      {isLoading && <Spinner animating={isLoading} />}
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  productView: {
    gap: 2,
    width: "93%",
    alignSelf: "center",
  },
  addMiniPhotoView: {
    width: "93%",
    alignSelf: "center",
  },
  productText: {
    fontSize: Width * (4 / 100),
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
  },
  photoStyle: {
    height: 48,
    width: 48,
    resizeMode: "contain",
  },
  photoAdd: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  addText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: Colors.skyBlueColor,
    margin: 3,
  },
  addView: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: Width * (0.4 / 100),
    borderColor: Colors.skyBlueColor,
    borderRadius: Width * (4 / 100),
    justifyContent: "center",
  },
  subImageView: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: Width * (0.4 / 100),
    borderColor: Colors.skyBlueColor,
    borderRadius: Width * (4 / 100),
    justifyContent: "center",
  },
  addPhotoView: {
    width: "93%",
    height: Height * (18 / 100),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: Height * (2 / 100),
  },
  multiPhotoView: {
    width: Width * (23 / 100),
    height: Height * (10 / 100),
    marginVertical: Height * (1.7 / 100),
    marginRight: Width * (2 / 100),
    justifyContent: "center",
    alignItems: "center",
  },
  productSamllText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: Colors.mediumGrey,
    marginVertical: Width * (1.5 / 100),
  },
  nameView: {
    borderColor: Colors.neutralGrey,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 8,
    marginVertical: 3,
    paddingVertical: 16,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
  },
  detailView: {
    height: Height * (12 / 100),
    borderColor: Colors.neutralGrey,
    borderWidth: 1,
    borderRadius: 14,
    padding: 8,
    marginVertical: 5,
  },
  categoryTextView: {
    flexDirection: "row",
    width: "100%",
    borderColor: Colors.neutralGrey,
    borderWidth: 1,
    borderRadius: 14,
    padding: 8,
    marginVertical: 5,
    paddingVertical: 14,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  downIconStyle: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  bottonStyle: {
    backgroundColor: Colors.skyBlueColor,
    width: "93%",
  },

  pickerViewStyle: {
    width: Width * (88 / 100),
    padding: Width * (2 / 100),
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    width: "90%",
    padding: 10,
  },
  itemText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  dividerLine: { height: 1, backgroundColor: "#EEEEEE", margin: 5 ,width:'93%',alignSelf:'center'},
  productImage: { width: "100%", height: "100%", borderRadius: 24 },
});
