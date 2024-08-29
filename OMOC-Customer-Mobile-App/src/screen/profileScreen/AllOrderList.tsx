import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { blackColor, skyBlueColor, whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import OrderList from "./OrderList";
import Spinner from "../../components/Spinner";
import { GILROY_BOLD, GILROY_REGULAR } from "../../utils/fonts";

const AllOrderList = ({ navigation }) => {
  const [orderData, setOrderData] = useState([]);
  const [loder, setLoader] = useState(false);

  useEffect(() => {
    getCartLists();
  }, []);

  const getCartLists = async () => {
    try {
      setLoader(true);
      const response = await ApiService.GetOrder();
      setOrderData(response.data);
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

  const renderEmptyCommentsList = () => {
    return (
      <>
        {!loder ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyContainerText}>No Orders Found</Text>
          </View>
        ) : null}
      </>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.leftBackIcon}>
        <CustomHeaderShown title="Order" navigation={navigation} />
      </View>
      <View style={styles.orderListContainer}>
      {!!orderData.length ? (
        <FlatList
          data={orderData}
          renderItem={({ item }) => <OrderList data={item} />}
          showsVerticalScrollIndicator={false}
          style={styles.orderList}
          extraData={orderData}
        />
      ) : (
        renderEmptyCommentsList()
      )}
      </View>
     
      {loder && <Spinner animating={loder} />}
    </SafeAreaView>
  );
};

export default AllOrderList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  leftBackIcon: {
    marginHorizontal: 20,
  },
  orderList: {
    marginTop: 10,
    paddingVertical: 12,
    alignSelf: "center",
  },
  emptyContainerText: {
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
    color: "#000000",
    textAlign: "center",
  },
  emptyContainer: {
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  orderListContainer:{ flex: 1, alignItems: "center", justifyContent: "center" }
});
