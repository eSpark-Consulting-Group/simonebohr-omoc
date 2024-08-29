import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import {
  blackColor,
  darkGrey,
  gray88,
  grey,
  lightBlue,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import PriceButtom from "../../components/PriceButtom";
import BrandName from "../../components/BrandName";
import { add_to_save, bag_icon, message_icon } from "../../utils/images";
import FastImage from "react-native-fast-image";
import { showMessage } from "react-native-flash-message";
import en from "../../assets/string/en";
import ApiService from "../../services/api.service";
import VectorImage from "react-native-vector-image";
import { useSelector } from "react-redux";
import CheckoutBottomSheet from "../../components/cartComponent/CheckoutBottomSheet";
import AddwhishlistBottomsheet from "./AddwhishlistBottomsheet";
import { SCREEN_HEIGHT } from "../../utils";

const ProductDetailScreen = ({ navigation, route }) => {
  const [showCheckOutSheet, setShowCheckOutSheet] = useState(false);
  const [wishlistModel, setWishlistModel] = useState(false);
  const [collectionModel, setCollectionModel] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [allCartList, setAllCartList] = useState([]);
  const selectedAddress = useSelector((state) => state.AddressSlice);
  const [wishlistId, setWishlistId] = useState("");
  const { data } = route.params;
  const product = {
    sizes: ["S", "M", "L", "XL"],
    colors: ["red", "blue", "green", "white"],
  };

  const [productDetail, setProductDetail] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loder, setLoader] = useState(false);

  useEffect(() => {
    getYourProducts();
  }, []);

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const addToCart = async () => {
    try {
      const productId = data.id;
      const quantity = 3;
      const response = await ApiService.addToCartProduct({
        productId,
        quantity,
      });
      showMessage({
        message: en.addToCart,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    } catch (e) {
      showMessage({
        message: e?.response?.data?.message || en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  };

  const getYourProducts = async () => {
    try {
      setLoader(true);
      const productId = data?.id;
      const response = await ApiService.getProductDetail({ productId });
      if (response?.status) {
        setProductDetail([response?.data]);
        setCartData(response?.data);
        setSelectedColor(response?.data?.color);
        onlistArray(response?.data);
      }
      setLoader(false);
    } catch (e) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  };

  const onlistArray = async (data) => {
    try {
      let listArray: { productId: any; quantity: any }[] = [];
      const obj = {};
      obj.productId = data?._id;
      obj.quantity = data?.quantity || 0;
      listArray.push(obj);
      setAllCartList(listArray);
    } catch (e) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  };

  const onPlaceOrder = async () => {
    try {
      const params = {
        products: allCartList || [],
        addressId: selectedAddress._id,
        paymentType: "cod",
      };
      const response = await ApiService.placeNewOrder(params);
      if (response?.status) {
        showMessage({
          message: response.message,
          duration: 3000,
          backgroundColor: skyBlueColor,
          type: "danger",
        });
        setShowCheckOutSheet(false);
        navigation.navigate("OrderDetails", { productDetail });
      }
    } catch (e) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.subContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "100%" }}
        >
          <ImageBackground
            source={{ uri: data?.images[0]?.url }}
            style={styles.image}
            resizeMode="cover"
          >
            <View style={styles.headerStyle}>
              <CustomHeader
                navigation={() => navigation.goBack()}
                image={add_to_save}
                rightOnPress={() => setWishlistModel(true)}
              />
            </View>
          </ImageBackground>
          <View style={styles.contentContainer}>
            <View style={styles.productHeader}>
              <Text style={styles.productName}>{productDetail[0]?.name}</Text>
              <PriceButtom buttText={`$${productDetail[0]?.price}.00`} />
            </View>
            <View style={styles.brandContent}>
              <BrandName
                imageSource={require("../../assets/brandIcon.png")}
                title={productDetail[0]?.addedBy?.name}
                buttText={""}
              />
            </View>
            <View>
              <Text style={styles.sizeText}>size</Text>
              <View style={styles.sizeContainer}>
                {product.sizes.map((size) => {
                  return (
                    <TouchableOpacity
                      key={size}
                      onPress={() => handleSizeSelection(size)}
                      style={[
                        styles.sizeButton,
                        {
                          borderColor:
                            selectedSize === size ? skyBlueColor : grey,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color:
                            selectedSize === size ? skyBlueColor : darkGrey,
                        }}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View>
              <Text style={styles.sizeText}>Color</Text>
              <View style={styles.sizeContainer}>
                {product.colors.map((color) => {
                  return (
                    <TouchableOpacity
                      key={color}
                      onPress={() => handleColorSelection(color)}
                      style={[
                        styles.colorSwatch,
                        { backgroundColor: color },
                        selectedColor === color && styles.selectedColorSwatch,
                      ]}
                    />
                  );
                })}
              </View>
            </View>
            <View style={styles.containerDescription}>
              <View style={styles.header}>
                <Text style={styles.title}>Description</Text>
              </View>
              <View style={styles.points}>
                <Text style={styles.point}>Condition: New</Text>
                <Text style={styles.point}>
                  Weight: {productDetail[0]?.weight} Kg
                </Text>
                <Text style={styles.point}>
                  Category: {productDetail[0]?.category}
                </Text>
                <Text style={styles.point}>Catalog: Hoodie</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textDes}>{product.description}</Text>
              </View>
            </View>
            <View style={styles.buttoncontainer}>
              <View style={styles.iconImageView}>
                <TouchableOpacity
                  style={styles.buttonView}
                  onPress={() => navigation.navigate("MessageScreen")}
                >
                  <VectorImage
                    source={message_icon}
                    style={styles.imageBottom}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonView}
                  onPress={() => addToCart()}
                >
                  <VectorImage source={bag_icon} style={styles.imageBottom} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowCheckOutSheet(!showCheckOutSheet)}
              >
                <Text style={styles.buttonText}>Buy Now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <Modal visible={wishlistModel} transparent>
        <AddwhishlistBottomsheet
          hideMe={() => setWishlistModel(false)}
          onSingleAdd={() => {
            setWishlistModel(false);
            navigation.navigate("WishlistsScreen", {
              selectedProduct: productDetail,
            });
          }}
        />
      </Modal>
      {showCheckOutSheet && (
        <Modal visible={showCheckOutSheet} transparent>
          <CheckoutBottomSheet
            cartData={cartData}
            hideMe={() => {
              setShowCheckOutSheet(false);
            }}
            onConfirmPayment={() => {
              onPlaceOrder();
            }}
            onPressPayment={() => {
              navigation.navigate("PaymentScreen");
              setShowCheckOutSheet(false);
            }}
            onPressVoucher={() => {
              navigation.navigate("VoucherScreen");
              setShowCheckOutSheet(false);
            }}
            onPressDelivery={() => {
              navigation.navigate("DeliveryScreen");
              setShowCheckOutSheet(false);
            }}
          />
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  image: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.4,
  },
  productName: {
    fontSize: 20,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 18,
  },
  productDescription: {
    marginVertical: 10,
  },
  brandContent: { width: "100%" },
  sizeButton: {
    width: 58,
    height: 30,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderWidth: 1,
    borderColor: blackColor,
    backgroundColor: whiteColor,
  },
  selectedSizeButton: {
    backgroundColor: skyBlueColor,
  },
  text: {
    color: blackColor,
  },
  selectedText: {
    color: whiteColor,
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subContainer: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor:whiteColor,
    marginBottom: 20,
    paddingHorizontal:20,
    width: "100%",
    flex:1,
    alignSelf: "center",
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowColor: '#000000',
    elevation: 4,
    borderTopRightRadius:40,
    borderTopLeftRadius:40
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  sizeText: {
    color: "black",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  optionButton: {
    width: 58,
    height: 30,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderWidth: 1,
    borderColor: blackColor,
    backgroundColor: whiteColor,
  },
  selectedOptionButton: {
    backgroundColor: skyBlueColor,
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 100,
    margin: 5,
  },
  selectedColorSwatch: {
    borderWidth: 3,
    borderRadius: 100,
    padding: 10,
    borderColor: blackColor,
  },
  containerDescription: {
    borderColor: darkGrey,
    margin: 10,
    borderRadius: 5,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  points: {
    marginBottom: 10,
  },
  point: {
    fontSize: 14,
    marginBottom: 10,
  },
  textContainer: {
    marginTop: 10,
  },
  textDes: {
    fontSize: 12,
    color: darkGrey,
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  button: {
    backgroundColor: skyBlueColor,
    padding: 10,
    borderRadius: 24,
    width: "60%",
    justifyContent: "center",
    height: 51,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
  },
  imageBottom: {
    width: 24,
    height: 24,
    tintColor: skyBlueColor,
  },
  headerStyle: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 15,
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 100,
  },
  iconImageView: {
    flexDirection: "row",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});

export default ProductDetailScreen;
