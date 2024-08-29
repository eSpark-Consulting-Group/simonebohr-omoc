import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import DeliveryData from "../../components/DeliveryData";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import { skyBlueColor } from "../../utils/colors";
import en from "../../assets/string/en";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSelectedAddress } from "../../redux/slice/dashboard/AddressSlice";
import CheckoutBottomSheet from "../../components/cartComponent/CheckoutBottomSheet";
import Spinner from "../../components/Spinner";

const DeliveryScreen = ({ navigation }) => {
  const [addressList, setAddressList] = useState(null);
  const isFacused = useIsFocused();
  const dispatch = useDispatch();
  const [showCheckOutSheet, setShowCheckOutSheet] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [cartData, setCartData] = useState(null);
  const [allCartList, setAllCartList] = useState([]);

  const handleData = (data) => {
    setAddressId(data._id);
    dispatch(setSelectedAddress(data));
  };

  useEffect(() => {
    getYourAddress();
    getCartLists();
  }, [isFacused]);

  const getYourAddress = async () => {
    try {
      setIsLoading(true);
      const response = await ApiService.GetAllAddresses(false);
      if (response?.status) {
        setAddressList(response?.data || []);
      } else {
        setAddressList(null);
      }
      setIsLoading(false);
    } catch (e) {
      setAddressList(null);
      setIsLoading(false);
      showMessage({
        message: e?.response?.data?.message || en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  };

  const getCartLists = async () => {
    try {
      const response = await ApiService.getCartList();
      if (response?.status) {
        const data = response?.data?.cartProducts;
        setCartData(response?.data);
        let listArray: { productId: any; quantity: any }[] = [];
        response?.data?.cartList.map((val) => {
          const obj = {
            productId: val?.productId?._id,
            quantity: val?.quantity,
          };
          listArray.push(obj);
        });
        setAllCartList(listArray);
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

  const onPlaceOrder = async () => {
    try {
      const params = {
        products: allCartList || [],
        addressId: addressId,
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
        navigation.navigate("OrderDetails", { cartData });
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
  const onDelete = async (data) => {
    try {
      setIsLoading(true);
      const response = await ApiService.deleteAddress(data?._id);
      setAddressList((prev) => prev.filter((val) => val._id !== data._id));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onSetAsPrimaryAddress = async (data) => {
    try {
      setIsLoading(true);
      const response = await ApiService.postUpdateAddress(data?._id, {
        isPrimary: true,
      });
      setAddressList((prev) => {
        const newArray = [];
        prev.map((val) => {
          if (val._id === data._id) {
            const data = { ...val, isPrimary: true };
            newArray.push(data);
          } else if (!!val.isPrimary) {
            const data = { ...val, isPrimary: false };
            newArray.push(data);
          } else return newArray.push(val);
        });
        return newArray;
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.BackButton}>
        <CustomHeaderShown
          title={strings.DELIVERY}
          navigation={navigation}
          rightheadertext={strings.ADD}
          onRightHeaderPress={() => {
            navigation.navigate("AddressScreen");
          }}
        />
      </View>
      <FlatList
        data={addressList}
        renderItem={({ item }) => (
          <DeliveryData
            data={item}
            SelectedAddress={handleData}
            onClik={() => setShowCheckOutSheet(!showCheckOutSheet)}
            onDelete={() => onDelete(item)}
            onSetAsPrimaryAddress={() => onSetAsPrimaryAddress(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
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
      {isLoading && <Spinner animating={isLoading} />}
    </SafeAreaView>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  BackButton: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
