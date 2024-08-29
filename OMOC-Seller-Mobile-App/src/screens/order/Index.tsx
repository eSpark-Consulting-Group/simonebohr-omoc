import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONTEXT } from "../../utils/string/strings";
import { Height, Width, formattedDate } from "../../utils";
import { Colors } from "../../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { notification_CTA, printer } from "../../utils/images";
import SearchTabBar from "../../component/SearchTabBar";
import VectorImage from "react-native-vector-image";
import Customheader from "../../component/Customheader";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import en from "../../utils/string/en";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "../../component/Spinner";
import AddShippingAgentBottomSheet from "../../component/AddShippingAgentBottomSheet";

const Order = ({ navigation }) => {
  const [searchText, setsearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("fulfilled");
  const [orderStatus, setOrderStatus] = useState("FullFill ");
  const [ordersListData, setOrdersListData] = useState(null);
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);
  const [fetching, setFetching] = useState(false);
  const isFacused = useIsFocused();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };

  useEffect(() => {
    getYourProducts();
  }, [currentShop, isFacused, selectedStatus]);

  const getYourProducts = async () => {
    setFetching(true);
    try {
      setOrdersListData(null);
      const response = await ApiService.getAllOrdersList({
        shopId: currentShop?._id,
        status: selectedStatus,
      });
      setFetching(false);
      if (response?.data?.status) {
        setOrdersListData(response?.data?.data?.reverse());
      } else {
        setOrdersListData(null);
      }
    } catch (e) {
      setFetching(false);
      setOrdersListData(null);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };

  const onStatusBtn = async (orderId) => {
    handleBottomSheet();
    try {
      const data = {
        orderId: orderId,
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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.dataContainer}
        onPress={() =>
          navigation.navigate("OrderDetailScreen", { selectedStatus, item })
        }
      >
        <View style={styles.imageClothView}>
          <Image
            source={{
              uri: item?.productDetails?.images[0]?.url,
            }}
            style={styles.frameIcon}
          />
          <View>
            <View style={styles.hoodieView}>
              <Text style={styles.hoodieText}>{item.productDetails.name}</Text>
              {selectedStatus !== "delivered" && (
                <View style={styles.backViewStaus}>
                  <Text style={styles.statusText}>New Order</Text>
                </View>
              )}
            </View>
            <Text style={styles.codeText}>{"xcxcxcxcxccx"}</Text>
            <Text
              style={styles.codeText}
            >{`$${item.productDetails.originalPrice}`}</Text>
            <Text style={styles.noteText}>
              Note: add sticker fragile please thanks
            </Text>
          </View>
        </View>
        <View style={styles.invStyle}>
          <Text
            style={styles.noteText}
          >{`ONR/CODE123123124124 / ${formattedDate(
            item.orderDetails.orderDate
          )} / ${item.userName}`}</Text>
        </View>
        <View
          style={[styles.imageClothView, { justifyContent: "space-between" }]}
        >
          <View style={styles.imageClothView}>
            <VectorImage source={printer} style={styles.searchIcon} />
            <Text style={[styles.codeText, { marginLeft: Width * (1 / 100) }]}>
              Print label
            </Text>
          </View>
          <View style={styles.imageClothView}>
            <VectorImage source={notification_CTA} style={styles.searchIcon} />
            <TouchableOpacity
              style={styles.blueViewStaus}
              onPress={() => onStatusBtn(item?.orderDetails?.orderId)}
            >
              <Text style={styles.fullFillText}>
                {[
                  selectedStatus == "initiated"
                    ? item.orderDetails.orderStatus
                    : selectedStatus == "fulfilled"
                    ? item.orderDetails.orderStatus
                    : "Track Order",
                ]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSelector = (name) => {
    setSelectedStatus(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Customheader title={CONTEXT.ORDER} Containerstyle={{ marginTop: 15 }} />
      <SearchTabBar
        placeholder={CONTEXT.SEARCH}
        onChange={(text) => setsearchText(text)}
        value={searchText}
      />
      <View style={styles.tabViewContiner}>
        <TouchableOpacity
          style={[
            selectedStatus == "initiated"
              ? styles.selectTab
              : styles.unSelectTab,
          ]}
          onPress={() => handleSelector("initiated")}
        >
          <Text
            style={[
              selectedStatus == "initiated"
                ? styles.tabSelectTexT
                : styles.tabUnSelectTexT,
            ]}
          >
            {CONTEXT.NEW_ORDER}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            selectedStatus == "fulfilled"
              ? styles.selectTab
              : styles.unSelectTab,
          ]}
          onPress={() => handleSelector("fulfilled")}
        >
          <Text
            style={[
              selectedStatus == "fulfilled"
                ? styles.tabSelectTexT
                : styles.tabUnSelectTexT,
            ]}
          >
            {CONTEXT.READY_DELIVERY}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            selectedStatus == "delivered"
              ? styles.selectTab
              : styles.unSelectTab,
          ]}
          onPress={() => handleSelector("delivered")}
        >
          <Text
            style={[
              selectedStatus == "delivered"
                ? styles.tabSelectTexT
                : styles.tabUnSelectTexT,
            ]}
          >
            {CONTEXT.DELIVERED}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            selectedStatus == "completedd"
              ? styles.selectTab
              : styles.unSelectTab,
          ]}
          onPress={() => handleSelector("completed")}
        >
          <Text
            style={[
              selectedStatus == "completed"
                ? styles.tabSelectTexT
                : styles.tabUnSelectTexT,
            ]}
          >
            {CONTEXT.COMPLETE}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemsList}>
        <FlatList
          data={ordersListData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          keyExtractor={(item) => item.productDetails._id}
          ListEmptyComponent={
            !fetching && (
              <Text style={styles.noDataLabel}>
                {[
                  selectedStatus == "initiated"
                    ? "No Orders available"
                    : selectedStatus == "fulfilled"
                    ? "No Delivery orders available"
                    : selectedStatus == "delivered"
                    ? "No Delivered orders available"
                    : "No orders available",
                ]}
              </Text>
            )
          }
        />
      </View>
      {fetching && <Spinner animating={fetching} />}

      {showBottomSheet && (
        <AddShippingAgentBottomSheet
          hideMe={() => {
            setShowBottomSheet(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  tab: {
    borderWidth: 0.5,
    borderColor: Colors.skyBlueColor,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  headerStyle: { marginTop: -14 },
  searchIcon: {
    height: Height * (3 / 100),
    width: Width * (7 / 100),
    resizeMode: "contain",
  },
  renderTextInput: {
    width: Width * (67 / 100),
    marginLeft: Width * (2 / 100),
    color: Colors.grey,
  },
  tabViewContiner: {
    marginTop: Height * 0.02,
    flexDirection: "row",
    width: Width * (95 / 100),
    paddingHorizontal: Width * (2 / 100),
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  selectTab: {
    marginVertical: Width * (2 / 100),
    paddingVertical: Width * (2 / 100),
    borderBottomColor: Colors.skyBlueColor,
    borderBottomWidth: Width * (0.5 / 100),
  },
  unSelectTab: {
    marginVertical: Width * (2 / 100),
    paddingVertical: Width * (2 / 100),
  },
  tabSelectTexT: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.skyBlueColor,
    fontSize: Width * (3.6 / 100),
  },
  tabUnSelectTexT: {
    fontFamily: GILROY_REGULAR,
    color: Colors.mediumGrey,
    fontSize: Width * (3.6 / 100),
  },
  flatView: {
    backgroundColor: Colors.defaultBackground,
    width: "100%",
  },
  dataContainer: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: Height * (1.5 / 100),
    marginHorizontal: Width * (2 / 100),
    paddingVertical: 12,
    backgroundColor: Colors.whiteColor,
    width: Width * (93 / 100),
    borderRadius: Width * (2 / 100),
  },
  frameIcon: {
    height: Height * (13.5 / 100),
    width: Width * (23 / 100),
    marginHorizontal: Width * (2 / 100),
    marginRight: Width * (5 / 100),
    resizeMode: "contain",
    borderWidth: 0.8,
    borderColor: Colors.gray88,
    borderRadius: 8,
  },
  hoodieText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    fontSize: Width * (4 / 100),
  },
  imageClothView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  invStyle: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: Width * (4 / 100),
  },
  hoodieView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Width * (60 / 100),
  },
  backViewStaus: {
    backgroundColor: "#22C55E1A",
    padding: Width * (1.5 / 100),
    borderRadius: Width * (3 / 100),
  },
  statusText: {
    fontSize: Width * (2.7 / 100),
    color: Colors.green,
    fontFamily: GILROY_MEDIUM,
  },
  codeText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
    fontSize: Width * (3.6 / 100),
    marginVertical: Width * (1.5 / 100),
  },
  noteText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
    fontSize: Width * (3.4 / 100),
  },
  smallText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
    fontSize: Width * (3.5 / 100),
  },
  blueViewStaus: {
    marginLeft: Width * (2 / 100),
    backgroundColor: Colors.skyBlueColor,
    paddingHorizontal: Width * (3 / 100),
    paddingVertical: Width * (2 / 100),
    borderRadius: Width * (4 / 100),
  },
  fullFillText: {
    fontSize: Width * (2.8 / 100),
    color: Colors.whiteColor,
    fontFamily: GILROY_MEDIUM,
  },
  itemsList: { flex: 1, marginBottom: "15%" },
  noDataLabel: {
    color: "red",
    paddingVertical: 20,
    marginHorizontal: 20,
  },
});
