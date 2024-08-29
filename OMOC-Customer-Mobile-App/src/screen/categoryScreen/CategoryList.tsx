import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  blackColor,
  gray88,
  grey,
  lightGrey50,
  midBlack,
  purple,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { StatusBar } from "react-native";
import FastImage from "react-native-fast-image";
import {
  menImage,
  new_man_image,
  save_icon,
  unsave,
} from "../../utils/images";
import VectorImage from "react-native-vector-image";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../../utils/fonts";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";

const CategoryList = ({ navigation, route }) => {
  const { headerName } = route?.params;
  const wishCartData = [
    { id: 1, title: "Hoodies Havana V1", price: 1799},
    { id: 2, title: "Hoodies Havana V1", price: 5676},
    { id: 3, title: "Hoodies Havana V1", price: 567 },
    { id: 4, title: "Hoodies Havana V1", price: 890},
    { id: 5, title: "Hoodies Havana V1", price: 890},
    { id: 6, title: "Hoodies Havana V1", price: 890},
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.backBtn}>
        <CustomHeaderShown navigation={navigation} title={headerName.title} />
      </View>
      <View style={styles.outFlatViewStyle}>
        <FlatList
          numColumns={2}
          data={wishCartData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.viewCart}>
              <FastImage source={new_man_image} style={styles.imageStyle} resizeMode='cover' />
              <Text style={styles.productName}>{item.title}</Text>
              <View style={styles.priceView}>
                <Text style={styles.priceName}>${item.price}</Text>
                <Text style={[styles.discountText,{textDecorationLine: 'line-through'}]}>   ${item.price}</Text>
                <Text style={[styles.discountText,{color: blackColor}]}> -15%</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CategoryList;

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
    alignSelf:'center',
    alignItems: "center",
    width: "100%",
    flex:1
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
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 6,
    marginTop: 12,
    width: SCREEN_WIDTH / 2 - 28,
    gap: 6,
    height: SCREEN_HEIGHT/3.7,
  },
  imageStyle: {
    flex:1,
    width: '100%',
    borderRadius: 10,
    backgroundColor: whiteColor,
  },
  saveIconPostion: {
    position: "absolute",
    right: 10,
    bottom: 45,
    zIndex: 2,
  },
  productName: {
    fontSize: 16,
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
    alignItems:'center'
  },
  priceName: {
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    color: blackColor,
  },
  discountText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: grey,
  },
});


