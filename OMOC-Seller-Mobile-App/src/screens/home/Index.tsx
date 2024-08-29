import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  GILROY_BOLD,
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { shopList } from "../../utils/mockData";
import VectorImage from "react-native-vector-image";
import {
  arrowleft_icon,
  edit_icon,
  message_icon,
  omoc_image,
  play_icon,
  shirt_Image,
  three_dots_icon,
} from "../../utils/images";
import { Colors } from "../../utils/colors";
import FastImage from "react-native-fast-image";
import { strings } from "../../utils/string/strings";
import { Height, Width } from "../../utils";
import { fetchOrders } from "../../redux/slice/dashboard/OrdersSlice";
import { useDispatch, useSelector } from "react-redux";
import StorageService from "../../services/storage.service";
import ShopsBottomsheet from "./ShopsBottomsheet";
import { changeShop } from "../../redux/slice/dashboard/ShopSlice";
import { useIsFocused } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Spinner from "../../component/Spinner";
interface User {
  _id: string;
  email: string;
}

interface ShopDetails {
  _id: string;
  userId: string;
  name: string;
  categories: string;
  country: string;
  email: string;
  isVerified: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface UserToken {
  user: User;
  token: string;
  role: string;
  isShopExists: boolean;
  shopDetails?: ShopDetails;
}

const Home = ({ navigation }) => {
  const dispatch = useDispatch<any>();
  const OrdersData = useSelector((state) => state?.OrdersSlice?.data);
  const { isLoader, data } = useSelector((state) => state?.OrdersSlice);
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);
  const [openChangeShopModal, setOpenChangeShopModal] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [shopeName, setShopeName] = useState(false);
  const isFacused = useIsFocused();

  useEffect(() => {
    dispatch(fetchOrders(currentShop?._id));
  }, [currentShop]);

  const ordersList = [
    {
      id: 1,
      type: "New Orders",
      quantity: OrdersData.dashboardData?.newOrders || 0,
    },
    {
      id: 2,
      type: "New Chat",
      quantity: OrdersData.dashboardData?.newChat || 0,
    },
    {
      id: 3,
      type: "Ready to Delivery",
      quantity: OrdersData.dashboardData?.shippedProducts || 0,
    },
    {
      id: 4,
      type: "Delivered",
      quantity: OrdersData.dashboardData?.delivered || 0,
    },
    {
      id: 5,
      type: "Product Discussions",
      quantity: OrdersData.dashboardData?.productDiscussions || 0,
    },
    {
      id: 6,
      type: "Customer Reviews",
      quantity: OrdersData.dashboardData?.customerReviews || 0,
    },
  ];

  useEffect(() => {
    setHeader();
    getOrdersList();
  }, []);

  useEffect(() => {
    setShopeName(currentShop?.name);
  }, [currentShop]);

  const getOrdersList = async () => {
    const data = await StorageService.getUser();
    const user = JSON.parse(data);
    dispatch(changeShop(user.shopDetails));
  };

  function setHeader() {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={styles.leftHeaderView}>
            <Text>{shopeName}</Text>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View style={styles.rightHeaderView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Chats");
              }}
            >
              <VectorImage source={message_icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOpenChangeShopModal(true);
              }}
            >
              <FastImage style={styles.shopLogo} source={omoc_image} />
            </TouchableOpacity>
          </View>
        );
      },
      title: "",
    });
  }

  const renderOrdersList = ({ item }) => {
    return (
      <TouchableOpacity style={styles.ordersListContainer}>
        <Text style={styles.typeText}>{item.type}</Text>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <View style={styles.seeAllView}>
          <Text style={styles.seeAllText}>{strings.SEE_DETAIL}</Text>
          <VectorImage source={arrowleft_icon} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderShopPage = ({ item }) => {
    return (
      <TouchableOpacity style={styles.shopListContainer}>
        <FastImage source={shirt_Image} style={styles.shopProductImage} />
        <View style={styles.subShopListContainer}>
          <View style={styles.shopContentView}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => {}}>
              <VectorImage source={three_dots_icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.shopEditView}>
            <TouchableOpacity onPress={() => {}}>
              <VectorImage source={edit_icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <VectorImage source={play_icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.statusView}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.orderContainer}>
          <FlatList
            data={ordersList}
            renderItem={renderOrdersList}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.shopContainer}>
          <View style={styles.shopHeaderView}>
            <Text style={styles.shopHeaderText}>{strings.SHOP_PAGE}</Text>
            <Text style={styles.createPageText}>{strings.CREATE_NEW_PAGE}</Text>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={shopList}
            contentContainerStyle={{ marginBottom: Height * 0.1 }}
            renderItem={renderShopPage}
          />
        </View>
      </ScrollView>
      {openChangeShopModal && (
        <ShopsBottomsheet
          hideMe={() => {
            setOpenChangeShopModal(false);
          }}
          onCreateNewShop={() => {
            navigation.navigate("CreateNewShop");
            setOpenChangeShopModal(false);
          }}
          data={OrdersData.shopsList || []}
        />
      )}
      {fetching && <Spinner animating={fetching} />}
    </SafeAreaView>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backView: {
    transform: [{ rotateY: "180deg" }],
    paddingLeft: 5,
  },
  leftHeaderView: {
    alignItems: "center",
    flexDirection: "row",
  },
  cartIcon: { width: 24, height: 24 },
  text: {
    fontFamily: GILROY_REGULAR,
    fontSize: 20,
  },
  orderContainer: {
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
  },
  ordersListContainer: {
    borderRadius: 12,
    backgroundColor: Colors.whiteColor,
    marginHorizontal: 5,
    marginTop: 10,
    width: Width / 2 - 22,
    shadowColor: "#0000000F",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    gap: 10,
    paddingLeft: 10,
    paddingVertical: 15,
  },
  seeAllView: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  typeText: {
    color: Colors.neutralBlack,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  quantityText: {
    color: Colors.neutralBlack,
    fontSize: 32,
    fontWeight: "700",
    fontFamily: GILROY_BOLD,
  },
  seeAllText: {
    color: Colors.skyBlueColor,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  shopHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 15,
  },
  shopHeaderText: {
    color: Colors.neutralBlack,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: GILROY_SEMIBOLD,
  },
  createPageText: {
    color: Colors.skyBlueColor,
    fontSize: 13,
    fontWeight: "500",
    fontFamily: GILROY_REGULAR,
  },
  shopContainer: { width: "90%", alignSelf: "center", flex: 1 },
  shopListContainer: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: Colors.whiteColor,
    marginEnd: 10,
    marginTop: 10,
    shadowColor: "#0000000F",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    gap: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
  },
  subShopListContainer: {
    flex: 1,
    gap: 10,
  },
  shopContentView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shopEditView: {
    flexDirection: "row",
    gap: 20,
  },
  shopProductImage: { width: 150, height: 100, borderRadius: 12 },
  statusView: {
    width: 75,
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 12,
    paddingVertical: 5,
    backgroundColor: Colors.neutralGreen,
  },
  statusText: {
    color: Colors.green,
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
  },
  rightHeaderView: { flexDirection: "row", gap: 15, alignItems: "center" },
  shopLogo: {
    width: 28,
    height: 28,
  },
});
