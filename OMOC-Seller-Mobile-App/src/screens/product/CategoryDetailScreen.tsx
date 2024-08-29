import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Customheader from "../../component/Customheader";
import { three_dots_icon } from "../../utils/images";
import { Height, Width } from "../../utils";
import { Colors } from "../../utils/colors";
import { GILROY_MEDIUM, GILROY_SEMIBOLD } from "../../utils/fonts";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import { showMessage } from "react-native-flash-message";
import en from "../../utils/string/en";
import ApiService from "../../services/api.service";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const CategoryDetailScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const [productList, setproductList] = useState(null);
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);
  const isFacused = useIsFocused();

  useEffect(() => {
    getYCategoriesDetails();
  }, [isFacused]);

  const getYCategoriesDetails = async () => {
    try {
      setproductList(null);
      const shopId = currentShop?._id;
      console.log(JSON.stringify(shopId));
      const response = await ApiService.getCategoryDetailApi({
        shopId,
        categoryId: data?.id,
      });
      if (response?.status) {
        setproductList(response?.data?.productIds.reverse());
      } else {
        setproductList(null);
      }
    } catch (e) {
      console.log("error", e);
      setproductList(null);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ backgroundColor: Colors.defaultGrey }}>
        <View style={styles.dataContainer}>
          <FastImage
            source={{ uri: item?.images[0]?.url }}
            style={styles.frameIcon}
          />
          <View style={styles.listDetailView}>
            <View style={styles.hoodieView}>
              <Text style={styles.hoodieText}>{item.name}</Text>
              <TouchableOpacity style={styles.dotView} onPress={() => {}}>
                <VectorImage source={three_dots_icon} style={styles.dotIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.detailsView}>
              <Text style={styles.codeText}>{item._id}</Text>
              <Text style={styles.codeText}>Price : ${item.price}</Text>
              <Text style={styles.noteText}>sold Count : {item.soldCount}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Customheader
        showBackIcon={true}
        title={data?.title}
        onPress={() => {}}
        Containerstyle={{ marginTop: 10, paddingBottom: 10 }}
      />
      <View style={styles.listsMainView}>
        <FlatList
          data={productList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: Height * 0.35 }}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  dataContainer: {
    alignSelf: "center",
    marginVertical: Height * 0.01,
    padding: Width * 0.02,
    backgroundColor: Colors.whiteColor,
    width: Width * 0.93,
    borderRadius: Width * 0.03,
    flexDirection: "row",
    gap: 10,
  },
  frameIcon: {
    height: Height * 0.12,
    width: Width * 0.25,
    marginTop: Height * 0.01,
    marginHorizontal: Width * 0.01,
    resizeMode: "contain",
  },
  hoodieText: {
    width: Width * 0.37,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    fontSize: 14,
  },
  hoodieView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Height * 0.01,
    paddingEnd: 10,
  },
  codeText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
    fontSize: 14,
    marginVertical: 0.15,
  },
  noteText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
    fontSize: 12,
    marginVertical: Width * 0.005,
  },

  dotIcon: {
    tintColor: "#9E9E9E",
    height: 13,
  },
  dotView: {
    width: Width * 0.08,
    alignItems: "flex-end",
  },
  listsMainView: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: Colors.lightGrey,
    marginTop: 5,
    paddingTop: 10,
  },
  listDetailView: { flex: 1, gap: 10 },
  detailsView: { gap: 10 },
});
