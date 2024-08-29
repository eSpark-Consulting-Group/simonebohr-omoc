import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  blackColor,
  grey,
  midBlack,
  purple,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { StatusBar } from "react-native";
import FastImage from "react-native-fast-image";
import { menImage, new_man_image, save_icon, unsave } from "../../utils/images";
import VectorImage from "react-native-vector-image";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import Spinner from "../../components/Spinner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageService from "../../services/storage.service";

const AllWishlist = ({ navigation, route }) => {
  const [loder, setLoader] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const { headerName } = route?.params;
  const [data, setData] = useState([]);
  const [productId, setProductId] = useState([]);
  useEffect(() => {
    getProductList();
  }, []);


  const getProductList = async () => {
    try {
      setLoader(true);
      const response = await ApiService.getProductWishlist(headerName.id);
      setData(response.data);
      console.log("response123--", response.data);
      setLoader(false);
    } catch (e) {
      showMessage({
        message: "Internal Server Error",
        duration: 3000,
        backgroundColor: "skyblue",
        type: "danger",
      });
    }
  };

  const removeProductList = async (ItemId) => {
    try {
      const data = {
        wishListId: headerName.id,
        productIds: [ItemId],
      };
      const response = await ApiService.removeWishlistProduct(data);
      setProductId([])
      showMessage({
        message: response.message,
        duration: 3000,
        backgroundColor: "skyblue",
        type: "danger",
      });
      getProductList();  
    } catch (e) {
      showMessage({
        message: "Internal Server Error",
        duration: 3000,
        backgroundColor: "skyblue",
        type: "danger",
      });
    }
  };


  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.backBtn}>
        <CustomHeaderShown navigation={navigation} title={headerName.name} />
      </View>
      <View style={styles.outFlatViewStyle}>
        <FlatList
          numColumns={2}
          data={data}
          extraData={forceUpdate}
          renderItem={({ item }) => (
            <View style={styles.viewCart}>
              <FastImage
                source={{ uri: item.images[0].url }}
                style={styles.imageStyle}
              />
              <TouchableOpacity
                style={styles.saveIconPostion}
                onPress={()=>removeProductList(item._id)}
              >
                {item.isActive === false ? (
                  <VectorImage source={unsave} style={styles.saveImg} />
                ) : (
                  <VectorImage
                    source={save_icon}
                    style={[styles.saveImg, { tintColor: purple }]}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.priceView}>
                <Text style={styles.priceName}>${item.price}</Text>
                <Text
                  style={[
                    styles.discountText,
                    { textDecorationLine: "line-through" },
                  ]}
                >
                  {" "}
                  ${item.originalPrice}
                </Text>
                <Text style={[styles.discountText, { color: blackColor }]}>
                  {" "}
                  -15%
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      {loder && <Spinner animating={loder} />}
    </SafeAreaView>
  );
};

export default AllWishlist;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  leftIcon: {
    width: 48,
    height: 48,
    backgroundColor: midBlack,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  outFlatViewStyle: {
    marginTop: 25,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  saveImg: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  backBtn: {
    marginHorizontal: 15,
  },
  viewCart: {
    width: 170,
    height: 215,
    backgroundColor: whiteColor,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 8,
    margin: 10,
  },
  imageStyle: {
    width: 165,
    height: 174,
    resizeMode: "contain",
    borderRadius: 12,
    backgroundColor: whiteColor,
  },
  saveIconPostion: {
    position: "absolute",
    right: 10,
    bottom: 45,
    zIndex: 2,
  },
  productName: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color: blackColor,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  priceView: {
    width: 150,
    flexDirection: "row",
    marginVertical: 4,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  priceName: {
    fontSize: 15,
    fontFamily: GILROY_SEMIBOLD,
    color: blackColor,
  },
  discountText: {
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    color: grey,
  },
});
