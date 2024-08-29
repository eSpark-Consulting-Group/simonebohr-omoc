import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_BOLD,
  GILROY_LIGHT,
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import { arrow_down, calendarBlack } from "../../utils/images";

const ProfileScreen = ({navigation}) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const handleSelector = (name) => {
    setSelectedStatus(name);
  };
  const requestData = [
    {
      name: "Hoodie Havana V1",
      code: "INV/CODE123123124124",
      date: "12 Jan 2023",
      price: "$999,000",
      amount: "999",
      Active: "Pending",
      Status: true,
    },
    {
      name: "Hoodie Havana V1",
      code: "INV/CODE123123124124",
      date: "12 Jan 2023",
      price: "$999,000",
      amount: "999",
      Active: "Success",
      Status: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Customheader title={CONTEXT.BALANCE} showBackIcon={true} />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>{CONTEXT.BALANCE}</Text>
          <Text style={styles.manageText}>
            {CONTEXT.MANAGE_YOUR_SHOP_ORDER}
          </Text>

          <TouchableOpacity style={styles.blueView} onPress={()=>navigation.navigate('PostAndStories')}>
            <Text style={styles.payText}>{CONTEXT.PAYOUT_NOW}</Text>
          </TouchableOpacity>
      

          <View style={styles.greyView}>
          <View style={styles.whiteView}>
            <Text style={[styles.smallText]}>{strings.PENDING}</Text>
            <Text style={[styles.bigText, { marginTop: 10 }]}>$ 100,000</Text>
          </View>
          <View style={styles.whiteView}>
            <Text style={[styles.smallText]}>{CONTEXT.REFUND}</Text>
            <Text style={[styles.bigText, { marginTop: 10 }]}>$ 1,000</Text>
          </View>
          <View style={styles.whiteView}>
            <Text style={[styles.smallText]}>{CONTEXT.READY_TO_PAYOUT}</Text>
            <Text style={[styles.bigText, { marginTop: 10 }]}>
              $ 11.100,000
            </Text>
          </View>
          </View>
          </View>
 


          <View style={styles.tabViewContiner}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1, marginTop: 10 }}
            >
              <TouchableOpacity
                style={[
                  selectedStatus == "All"
                    ? styles.selectTab
                    : styles.unSelectTab,
                ]}
                onPress={() => handleSelector("All")}
              >
                <Text
                  style={[
                    selectedStatus == "All"
                      ? styles.tabSelectTexT
                      : styles.tabUnSelectTexT,
                  ]}
                >
                  {CONTEXT.ALL_TRANSACTION}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  selectedStatus == "shop"
                    ? styles.selectTab
                    : styles.unSelectTab,
                ]}
                onPress={() => handleSelector("shop")}
              >
                <Text
                  style={[
                    selectedStatus == "shop"
                      ? styles.tabSelectTexT
                      : styles.tabUnSelectTexT,
                  ]}
                >
                  {CONTEXT.SHOP_TRANSCATION}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  selectedStatus == "Refund"
                    ? styles.selectTab
                    : styles.unSelectTab,
                ]}
                onPress={() => handleSelector("Refund")}
              >
                <Text
                  style={[
                    selectedStatus == "Refund"
                      ? styles.tabSelectTexT
                      : styles.tabUnSelectTexT,
                  ]}
                >
                  {CONTEXT.REFUND}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

<View style={{ backgroundColor: Colors.whiteColor, paddingHorizontal: 13,}}>
          <View style={styles.febView}>
            <VectorImage source={calendarBlack} style={styles.arroeIcon} />
            <Text style={[styles.tabUnSelectTexT, { marginHorizontal: 7 }]}>
              20 Febuary 2023 - 20 March 2023
            </Text>
            <VectorImage
              source={arrow_down}
              style={[styles.arroeIcon, { marginLeft: "20%" }]}
            />
          </View>

          <View style={styles.viewNamePost}>
            <Text style={[styles.title,{marginRight:25}]}>{CONTEXT.NAME_OF_PRODUCT}</Text>
            <Text style={styles.title}>{CONTEXT.PRICE}</Text>
            <Text style={styles.title}>{CONTEXT.AMOUNT}</Text>
            <Text style={styles.title}>{CONTEXT.STOCK}</Text>
          </View>

          <View style={styles.flatView}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={requestData}
              renderItem={({ item }) => {
                return (
                  <View style={styles.viewBox}>
                    <View style={styles.userView}>
                      <View>
                        <Text style={styles.titleUser}>{item.name}</Text>
                        <Text
                          numberOfLines={0}
                          style={[
                            styles.greyText,{marginVertical:3}
                          ]}
                        >
                          {item.code}
                        </Text>
                        <Text
                          numberOfLines={0}
                          style={[
                            styles.greyText,
                          ]}
                        >
                          {item.date}
                        </Text>
                      </View>
                      <Text style={styles.titleUser}>{item.price}</Text>
                      <Text style={styles.greyText}>{item.amount}</Text>
                      {item.Status === true ? (
                        <View
                        style={[
                          styles.activeView,
                          {
                            backgroundColor:
                              item.Active === "Active"
                                ? Colors.lightGreen
                                : item.Active === "Pending"
                                ? Colors.warningYellow
                                : item.Active === "Success"
                                ? Colors.lightSkyBlue 
                                : Colors.whiteColor  
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.activeText,
                            {
                              color:
                                item.Active === "Active"
                                  ? Colors.lightGreen
                                  : item.Active === "Pending"
                                  ? Colors.yellow
                                  : item.Active === "Success"
                                  ? Colors.skyBlueColor  
                                  : Colors.whiteColor  ,  
                            },
                          ]}
                        >
                          {item.Active}
                        </Text>
                      </View>
                      
                      ) : (
                        <View style={[styles.activeView]}></View>
                      )}
                    </View>
                  </View>
                );
              }}
            />
          </View>
          </View>
      
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.whiteColor,
  },
  mainContainer: {
    paddingHorizontal: 13,
    backgroundColor:Colors.whiteColor,
    flex: 1,
  },

  titleText: {
    fontSize: 23,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    marginTop: "6%",
  },
  manageText: {
    fontSize: 17,
    fontFamily: GILROY_LIGHT,
    color: Colors.blackColor,
    marginTop: "3%",
  },
  blueView: {
    marginVertical: 25,
    width: "35%",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
    backgroundColor: Colors.skyBlueColor,
    paddingVertical: 16,
  },
  payText: {
    fontSize: 15,
    fontFamily: GILROY_MEDIUM,
    color: Colors.whiteColor,
  },
  smallText: {
    fontSize: 13,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  bigText: {
    fontSize: 27,
    fontFamily: GILROY_BOLD,
    color: Colors.blackColor,
  },
  greyView:{
    backgroundColor: '#F7F7F7',
  },
  whiteView: {
    marginBottom: 13,
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.whiteColor,
  },
  viewNamePost: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "3%",
    alignSelf: "center",
    paddingVertical: 20,
    backgroundColor: Colors.ghostWhite,
    borderRadius: 15,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 14,
    color: Colors.charcoal,
  },
  tabViewContiner: {
    paddingHorizontal: 13,
    flexDirection: "row",
    width: "100%",
    alignSelf: "baseline",
    borderTopColor: Colors.neutralGrey,
    borderTopWidth: 1.5,
    backgroundColor: Colors.whiteColor,
  },
  selectTab: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomColor: Colors.skyBlueColor,
    borderBottomWidth: 0.7,
  },
  unSelectTab: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
  },
  tabSelectTexT: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.skyBlueColor,
    fontSize: 14,
  },
  tabUnSelectTexT: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.lightGrey50,
    fontSize: 14,
  },
  arroeIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  febView: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    padding: 10,
    borderColor: Colors.lightGrey50,
    borderWidth: 0.7,
    borderRadius: 20,
    marginVertical:8,
    backgroundColor: Colors.whiteColor,
  },
  viewBox: {
    width: "100%",
    paddingBottom: 15,
    backgroundColor: Colors.ghostWhite,
    alignSelf: "center",
  },
  userView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 13,
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    borderBottomColor: Colors.lightGrey50,
    borderBottomWidth: 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 0.09,
    shadowRadius: 0.1,
    elevation: 3,
  },
  titleUser: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 14,
    color: Colors.charcoal,
  },
  accessIcon: {
    height: 17,
    width: 17,
    resizeMode: "contain",
    marginHorizontal: -10,
  },
  activeView: {
    padding: 6,
    alignItems: "center",
    borderRadius: 15,
  },
  activeText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 10.5,
    color: Colors.green,
  },
  greyText:{ fontSize: 13, color: Colors.lightBlack, fontFamily: GILROY_MEDIUM, },
  flatView:{
    flex: 1, marginBottom: "15%" , backgroundColor: Colors.whiteColor,
  }
});
