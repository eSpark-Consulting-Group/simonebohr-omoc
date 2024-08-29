import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import FastImage from "react-native-fast-image";
import { order_success } from "../../utils/images";
import { grey, lightGrey, skyBlueColor, whiteColor } from "../../utils/colors";
import { GILROY_MEDIUM, GILROY_SEMIBOLD } from "../../utils/fonts";
import OrderCard from "../../components/OrderCard";
import CustomButton from "../../components/CustomButton";

const OrderDetails = ({ navigation, route }) => {
  const { cartData, productDetail } = route.params;
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    if (cartData && cartData.cartProducts) {
      setCartItem(cartData.cartProducts);
    } else if (productDetail) {
      setCartItem([productDetail]);
    } else {
      setCartItem([]);
    }
  }, [cartData, productDetail]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerStyle}>
        <CustomHeaderShown title={strings.DETAILS} navigation={navigation} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <FastImage source={order_success} style={styles.orderImg} />
          </View>
          <Text style={styles.headingText}>
            {strings.YOUR_ORDER_HAS_BEEN_ACCEPTED}
          </Text>
        </View>
        <View>
          <View style={styles.transactionContainer}>
            <Text style={styles.dateText}>{strings.TRANSACTION_DATE}</Text>
            <Text style={styles.date}>{strings.DATE}</Text>
          </View>
          <View style={styles.transactionContainer}>
            <Text style={[styles.dateText, styles.invText]}>{strings.INV}</Text>
            <TouchableOpacity>
              <Text style={styles.inoviceBtn}>{strings.CHECK_INVOICE}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.productText}>{strings.PRODUCT_DETAIL}</Text>
          <FlatList
            data={cartItem}
            renderItem={({ item }) => (
              <OrderCard
                data={item}
                fromCart={Boolean(cartData && cartData.cartProducts)}
              />
            )}
          />
        </View>
        <View style={styles.btnCheckContainer}>
          <View>
            <CustomButton
              style={[styles.btn]}
              textstyle={styles.btnText}
              text={strings.TRACK_YOUR_ORDER}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: lightGrey,
  },
  headerStyle: {
    marginHorizontal: 15,
  },
  orderImg: {
    width: "30%",
    height: "59%",
    marginBottom: 10,
  },
  topContainer: {
    width: "100%",
    height: "61.5%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    height: "44 %",
  },
  headingText: {
    fontSize: 24,
    fontWeight: "500",
    width: "60%",
    textAlign: "center",
    lineHeight: 33,
  },
  transactionContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  dateText: {
    fontSize: 12,
    color: grey,
    lineHeight: 13,
  },
  inoviceBtn: {
    color: skyBlueColor,
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  invText: {
    marginTop: 10,
  },
  cardContainer: {
    borderTopWidth: 2,
    marginTop: 20,
    marginHorizontal: 15,
    borderTopColor: lightGrey,
    marginBottom: 60,
  },
  productText: {
    marginTop: 30,
    fontSize: 20,
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
  },
  btn: {
    backgroundColor: skyBlueColor,
  },
  btnCheckContainer: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
    bottom: 5,
    width: "100%",
    zIndex: 4,
  },
  btnText: {
    color: whiteColor,
  },
});
