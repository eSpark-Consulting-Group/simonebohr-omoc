import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { Colors } from "../../utils/colors";
import PriceButtom from "../../component/PriceButtom";
import { blue_notification, blue_print, dot_option } from "../../utils/images";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import { CONTEXT } from "../../utils/string/strings";
import { Height, Width, formattedDate } from "../../utils";
import { GILROY_MEDIUM, GILROY_SEMIBOLD } from "../../utils/fonts";
import Customheader from "../../component/Customheader";
import { useSelector } from "react-redux";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import Spinner from "../../component/Spinner";

const OrderDetailScreen = ({ navigation, route }) => {
  const Status = route.params.selectedStatus;
  const { item } = route.params;
  const [visibleModel, setModalVisible] = useState(false);
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);
  const product = {
    productname: "Hoodie Havana V1",
    code: "CODE123123124124",
    address: "8 St Andrew's Pl, Harrogate HG2 7RW England",
    courier: "DHL Express",
    fee: " ( $20 Fee ) ",
    id: "ID : 1230123931",
    note: "DHL Express",
    price: "$799",
    Invcode: "NV/CODE123123124124",
    date: "2 Febuary 2023",
    name: "Jonny Deep",
    Fullfillorder: "Fullfill Order",
    request: "Request to pickup",
    Track: "Track Order",
  };



  const onStatusBtn = async () => {
    try {
      const data = {
        orderId: item?.orderDetails?.orderId,
      };
      const response = await ApiService.postOrderStatus({
        shopId: currentShop?._id,
        data,
      });
      showMessage({
        message: response.data.message,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    } catch (error) {
      console.log("Error foe Status Order", error);
    }
  };

  const onNotifyBtn = async () => {
    try {
      const data = {
        userId: item?.userAddress.userId,
      };
      const response = await ApiService.oneToOneChat(data);
      navigation.navigate('Chats')
      showMessage({
        message: response.message,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    } catch (error) {
      console.log("Error foe Status Order", error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModel}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={[styles.centeredView]}>
          <TouchableOpacity style={styles.modelContainer}>
            <Text style={styles.reportText}>{CONTEXT.REPORTORDER}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.canceltText}>{CONTEXT.CANCELORDER}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <FastImage
        source={{ uri: item?.productDetails?.images[0]?.url }}
        style={styles.image}
        resizeMode="contain"
      >
        <Customheader
          showBackIcon={true}
          optionImage={dot_option}
          onPress={() => setModalVisible(true)}
          Containerstyle={{ marginTop: 15 }}
        />
      </FastImage>
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{item.productDetails.name}</Text>
            {Status === "Delivered" ? (
              <PriceButtom
                buttText={CONTEXT.PRINTED}
                bgColor={Colors.neutralGrey}
                textColor={Colors.grey}
              />
            ) : (
              <PriceButtom
                buttText={"New Order"}
                bgColor={Colors.neutralGreen}
                textColor={Colors.green}
              />
            )}
          </View>
          <Text style={styles.codeText}>{item.orderDetails.orderId}</Text>
          <Text style={[styles.sizeText, { marginTop: 15 }]}>
            {CONTEXT.ADDRESS}
          </Text>
          <Text
            style={styles.smallText}
          >{`${item.userAddress.address}, ${item?.userAddress?.city}, ${item?.userAddress?.zipCode}, ${item?.userAddress?.region}, ${item?.userAddress?.country}`}</Text>
          <View style={styles.bottomView} />
          <Text style={styles.sizeText}>{CONTEXT.COURIER}</Text>
          <Text style={styles.smallText}>
            {item.courierDetails.name}
            <Text style={styles.feestyle}>
              {` ($${item.courierDetails.shippingCharge} Fee) `}
              <Text style={styles.smallText}>
                {`ID : ${item.courierDetails._id}`}
              </Text>
            </Text>
          </Text>
          <View style={styles.bottomView} />
          <Text style={styles.sizeText}>{CONTEXT.NOTE}</Text>
          <Text style={styles.smallText}>
            {product.note}
            <Text style={styles.feestyle}>
              {product.fee}
              <Text style={styles.smallText}>{product.id}</Text>
            </Text>
          </Text>
          <View style={styles.bottomView} />
          <Text style={styles.sizeText}>{CONTEXT.TOTAL_PRICE}</Text>
          <Text
            style={styles.smallText}
          >{`$${item.orderDetails.totalAmount}`}</Text>
          <View style={styles.bottomView} />
          <View style={[styles.invStyle]}>
            <Text
              style={styles.smallText}
            >{`NV/CODE123123124124 / ${formattedDate(
              item.orderDetails.orderDate
            )} / ${item.userName}`}</Text>
          </View>
          <View style={styles.buttoncontainer}>
            <View style={styles.viewImage}>
              <VectorImage source={blue_print} style={styles.imageBottom} />
              <TouchableOpacity onPress={()=>onNotifyBtn()}>
              <VectorImage
                source={blue_notification}
                style={styles.imageBottom}
              />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onStatusBtn()}
            >
              <Text style={styles.buttonText}>
                {[
                  Status == "NewOrder"
                    ? product.Fullfillorder
                    : Status == "Ready"
                    ? product.request
                    : product.Track,
                ]}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: Height * 0.4,
  },
  productName: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    fontSize: Width * (4.5 / 100),
  },
  text: {
    color: Colors.blackColor,
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.whiteColor,
    width: Width * (100 / 100),
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: Height * (55 / 100),
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  sizeText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    fontSize: Width * (3.7 / 100),
    marginVertical: Width * (1.3 / 100),
  },
  codeText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.mediumGrey,
    fontSize: Width * (3.4 / 100),
    marginVertical: Width * (1.8 / 100),
  },
  smallText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.mediumGrey,
    fontSize: Width * (3.1 / 100),
    marginVertical: Width * (0.3 / 100),
  },
  feestyle: {
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.mediumGrey,
    fontSize: 12,
  },
  bottomView: {
    marginVertical: Height * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey50,
  },
  selectedOptionButton: {
    backgroundColor: Colors.skyBlueColor,
  },
  invStyle: {
    marginVertical: Width * 0.03,
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 100,
    margin: 5,
  },
  selectedColorSwatch: {
    borderWidth: 2,
    borderColor: Colors.whiteColor,
  },
  containerDescription: {
    borderColor: Colors.lightGrey,
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
    color: Colors.grey,
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewImage: {
    width: Width * (15 / 100),
    flexDirection: "row",
  },
  button: {
    backgroundColor: Colors.skyBlueColor,
    padding: 5,
    borderRadius: 24,
    width: Width * (55 / 100),
    justifyContent: "center",
    height: 40,
  },
  buttonText: {
    fontSize: 13,
    color: "white",
    alignSelf: "center",
  },
  imageBottom: {
    width: Width * (14 / 100),
    height: Height * (7 / 100),
    resizeMode: "contain",
  },
  headerStyle: {
    position: "absolute",
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  modelContainer: {
    marginVertical: Width * (5 / 100),
  },
  centeredView: {
    width: Width * (40 / 100),
    borderRadius: 9,
    position: "absolute",
    top: Height * (6 / 100),
    right: Width * (13 / 100),
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Width * (3 / 100),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  canceltText: {
    fontSize: Width * (3 / 100),
    fontFamily: GILROY_MEDIUM,
    color: Colors.dangerRed,
    marginBottom: Width * (3 / 100),
  },
  reportText: {
    fontSize: Width * (3 / 100),
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
  },
});

export default OrderDetailScreen;
