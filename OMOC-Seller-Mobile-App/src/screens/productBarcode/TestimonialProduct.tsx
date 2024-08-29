import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_BOLD,
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { star, three_dots_icon } from "../../utils/images";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import SearchTabBar from "../../component/SearchTabBar";
import AddNewProductModel from "./barcodeModals/AddNewProductModel";

const TestimonialProduct = ({navigation}) => {
  const [selectedStatus, setSelectedStatus] = useState("test");
  const [modalVisible, setModalVisible] = useState(false);
  const [productModel, setProductModel] = useState(false);

  const handleSelector = (name) => {
    setSelectedStatus(name);
  };

  const Listproduct = [
    {
      id: 1,
      name: "Bomber Jocket...",
      code: "123CODE24124",
      rate: 4,
      john: "John Dope",
      status: "Active",
    },
    {
      id: 2,
      name: "Bomber Jocket...",
      code: "123CODE24124",
      rate: 4,
      john: "John Dope",
      status: "Pending",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Customheader
        title={CONTEXT.INVENTORY}
        showBackIcon={true}
        Containerstyle={styles.customHeaderStyle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Text style={styles.returnText}>{CONTEXT.TESTIMONIALS}</Text>
          <Text style={styles.greyColor}>{CONTEXT.MANAGE_YOUR_PRODUCT}</Text>

          <View style={styles.starContain}>
            <VectorImage source={star} style={styles.starStyle} />
            <Text style={styles.ratestyle}>
              {" "}
              4.6 <Text style={styles.fivestyle}>/ 5</Text>
            </Text>
          </View>

          <Text style={[styles.smallStyle, { width: "35%" }]}>
            {CONTEXT.YOUR_SHOP_AVERAGE_RATE}
          </Text>

          <View style={styles.tabViewContiner}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1 }}
            >
              <TouchableOpacity
                style={[
                  selectedStatus == "test"
                    ? styles.selectTab
                    : styles.unSelectTab,
                ]}
                onPress={() => handleSelector("test")}
              >
                <Text
                  style={[
                    selectedStatus == "test"
                      ? styles.tabSelectTexT
                      : styles.tabUnSelectTexT,
                  ]}
                >
                  {CONTEXT.ALL_TESTIMONIAL}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  selectedStatus == "action"
                    ? styles.selectTab
                    : styles.unSelectTab,
                ]}
                onPress={() => handleSelector("action")}
              >
                <Text
                  style={[
                    selectedStatus == "action"
                      ? styles.tabSelectTexT
                      : styles.tabUnSelectTexT,
                  ]}
                >
                  {CONTEXT.NEED_TO_ACTION}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  selectedStatus == "approved"
                    ? styles.selectTab
                    : styles.unSelectTab,
                ]}
                onPress={() => handleSelector("approved")}
              >
                <Text
                  style={[
                    selectedStatus == "approved"
                      ? styles.tabSelectTexT
                      : styles.tabUnSelectTexT,
                  ]}
                >
                  {CONTEXT.APPROVED_TESTIMONIAL}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <SearchTabBar
            placeholder={CONTEXT.SEARCH}
            style={styles.viewSearch}
          />

          <View>
            <FlatList
              data={Listproduct}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.containerFlat}
              renderItem={({ item }) => {
                return (
                  <View style={styles.listViewContiner}>
                    <View>
                      <Text>{item.name}</Text>
                      <Text style={styles.blackText}>{item.code}</Text>
                    </View>
                    <Text style={styles.blackText}>{item.john}</Text>
                    <View style={styles.starView}>
                      <VectorImage source={star} style={styles.smallStar} />
                      <Text> 4</Text>
                    </View>
                    <View
                      style={[
                        styles.activeView,
                        {
                          backgroundColor:
                            item.status === "Active"
                              ? Colors.lightGreen
                              : Colors.warningYellow,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color:
                              item.status === "Active"
                                ? Colors.green
                                : Colors.yellow,
                          },
                        ]}
                      >
                        {item.status}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <VectorImage
                      source={three_dots_icon}
                      style={[styles.smallStar, { tintColor: "black" }]}
                    />
                    </TouchableOpacity>
                    
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.viewRemove}
              onPress={() => {setModalVisible(false),setProductModel(true)}}
            >
              <Text style={styles.remove}>{CONTEXT.RESPONSE}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewBan}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.banUser}>{CONTEXT.REPORT}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {productModel && <AddNewProductModel hideMe={()=>setProductModel(false)}/>}

    </SafeAreaView>
  );
};

export default TestimonialProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 15,
    marginTop: "8%",
  },
  returnText: {
    fontSize: 23,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
  },
  ratestyle: {
    fontSize: 25,
    fontFamily: GILROY_BOLD,
    color: Colors.blackColor,
  },
  smallStyle: {
    fontSize: 13,
    fontFamily: GILROY_REGULAR,
    color: Colors.dimGray,
    marginTop: 15,
  },
  customHeaderStyle: {
    marginTop: 15,
    paddingBottom: 5,
  },
  greyColor: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: Colors.dimGray,
    marginTop: 12,
  },
  fivestyle: {
    fontSize: 19,
    fontFamily: GILROY_REGULAR,
    color: Colors.dimGray,
    marginTop: 12,
  },
  starStyle: {
    height: 28,
    width: 28,
    resizeMode: "contain",
    marginRight: 6,
  },
  starContain: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tabViewContiner: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 7,
    alignSelf: "center",
  },
  selectTab: {
    marginHorizontal: 6,
    marginVertical: 6,
    paddingVertical: 8,
    borderBottomColor: Colors.skyBlueColor,
    borderBottomWidth: 1.8,
  },
  unSelectTab: {
    marginHorizontal: 6,
    marginVertical: 6,
    paddingVertical: 8,
  },
  tabSelectTexT: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.skyBlueColor,
    fontSize: 15,
  },
  tabUnSelectTexT: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.lightGrey50,
    fontSize: 15,
  },
  viewSearch: {
    paddingVertical: 6,
    width: "100%",
    borderRadius: 25,
  },
  listViewContiner: {
    marginVertical: 6,
    paddingVertical: 13,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 9,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
  },
  blackText: {
    fontFamily: GILROY_REGULAR,
    color: Colors.lightBlack,
    fontSize: 13,
  },
  smallStar: {
    height: 17,
    width: 17,
    resizeMode: "contain",
  },
  starView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activeView: {
    width: "20%",
    alignItems: "center",
    padding: 6,
    borderRadius: 15,
  },
  statusText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 11,
  },
  containerFlat:{marginTop:8},
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  modalContent: {
    marginTop: "70%",
    left: "13%",
    width: "44%",
    padding: 10,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.4,
    elevation: 5,
  },
  button: {
    backgroundColor: Colors.skyBlueColor,
    position: "absolute",
    bottom: 30,
  },
  btnName: {
    color: Colors.whiteColor,
  },
  remove: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.skyBlueColor,
  },
  viewRemove: {
    width: 162,
    height: 36,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.aliceBlue,
  },
  banUser: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.blackColor,
  },
  viewBan: {
    width: 162,
    height: 36,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.whiteColor,
  },
});
