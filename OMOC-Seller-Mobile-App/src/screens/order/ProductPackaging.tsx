import {
    Alert,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { Colors } from "../../utils/colors";
  import Customheader from "../../component/Customheader";
  import { CONTEXT, strings } from "../../utils/string/strings";
  import {
    GILROY_MEDIUM,
    GILROY_REGULAR,
    GILROY_SEMIBOLD,
  } from "../../utils/fonts";
  import { user_frame } from "../../utils/images";
  import FastImage from "react-native-fast-image";
import ProductPackagingBottomSheet from "../../component/ProductPackagingBottomSheet";  
  const data = [
    {
      image: user_frame,
      title: "Hoodie Havana 1",
      name: "Johny Deep",
      qty: "Qty : 1",
    },
    {
      image: user_frame,
      title: "Hoodie Havana 1",
      name: "Johny Deep",
      qty: "Qty : 1",
    },
    {
      image: user_frame,
      title: "Hoodie Havana 1",
      name: "Johny Deep",
      qty: "Qty : 1",
    },
  ];
  
  const ProductPackaging = () => {
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const handleBottomSheet = () => {
      setShowBottomSheet(true);
    };
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <View style={styles.mainViewContainer}>
          <Customheader showBackIcon={true} title={CONTEXT.PRODUCT_PACKING} />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.listView}>
            <Text style={styles.titleManage}>{CONTEXT.LIST_OF_PRODUCT}</Text>
          </View>
          <View style={styles.manageView}>
            <Text style={styles.mangeText}>{CONTEXT.SCANNING_PRODUCT}</Text>
          </View>
  
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.viewContainer}>
                  <View style={styles.imageView}>
                    <FastImage source={item.image} style={styles.userImage} />
  
                    <View style={styles.titleCodeView}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.name}>{item.qty}</Text>
                    </View>
                  </View>
  
                  <View style={styles.containerBTN}>
                    <TouchableOpacity
                      style={styles.buttonViewScan}
                      onPress={handleBottomSheet}
                    >
                      <Text style={styles.textButtonScan}>{CONTEXT.SCAN}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
  
        {showBottomSheet && (
          <ProductPackagingBottomSheet
            hideMe={() => {
              setShowBottomSheet(false);
            }}
          />
        )}
      </SafeAreaView>
    );
  };
  
  export default ProductPackaging;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.grey98,
    },
    mainViewContainer: {
      width: "100%",
    },
    listView: {
      marginTop: 30,
    },
    mainContainer: {
      marginHorizontal: 15,
    },
    titleManage: {
      fontFamily: GILROY_SEMIBOLD,
      fontWeight: "600",
      fontSize: 24,
      color: Colors.blackColor,
      lineHeight: 30,
    },
    mangeText: {
      fontFamily: GILROY_REGULAR,
      fontWeight: "400",
      fontSize: 14,
      color: Colors.dimGray,
    },
    manageView: {
      marginTop: 15,
    },
    userImage: {
      height: 72,
      width: 72,
    },
    mainView: {
      marginTop: 20,
    },
    btnScan: {
      width: 81,
      height: 44,
      backgroundColor: Colors.skyBlueColor,
      borderRadius: 30,
      alignItems: "center",
    },
    viewContainer: {
      width: "100%",
      height: 96,
      backgroundColor: Colors.whiteColor,
      borderRadius: 12,
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      flexDirection: "row",
    },
    imageView: {
      flexDirection: "row",
      gap: 20,
      marginHorizontal: 15,
    },
    titleCodeView: {
      alignSelf: "center",
      gap: 5,
    },
    containerBTN: {
      marginHorizontal: 15,
    },
    buttonViewScan: {
      width: 81,
      height: 44,
      borderColor: Colors.skyBlueColor,
      paddingVertical: 13,
      borderRadius: 30,
      alignItems: "center",
      backgroundColor: Colors.skyBlueColor,
      flexDirection: "row",
      justifyContent: "center",
    },
    textButtonScan: {
      fontSize: 14,
      fontWeight: "500",
      fontFamily: GILROY_MEDIUM,
      color: Colors.whiteColor,
    },
    title: {
      fontFamily: GILROY_REGULAR,
      fontWeight: "600",
      fontSize: 16,
      color: Colors.midBlack,
    },
    name: {
      fontFamily: GILROY_MEDIUM,
      fontWeight: "500",
      fontSize: 14,
      color: Colors.lightBlack,
    },
  });