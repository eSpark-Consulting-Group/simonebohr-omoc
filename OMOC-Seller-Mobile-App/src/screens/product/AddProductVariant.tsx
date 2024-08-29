import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Customheader from "../../component/Customheader";
import { arrow_down } from "../../utils/images";
import { CONTEXT } from "../../utils/string/strings";
import { Height, Width } from "../../utils/index";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import CustomButton from "../../component/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ApiService from "../../services/api.service";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import en from "../../utils/string/en";

const AddProductVariant = ({ navigation, route }) => {
  const { productDetails } = route.params;
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [stockTotal, setStockTotal] = useState("");
  const [stockKeepingUnit, setStockKeepingUnit] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState({});
  const [warehouseList, setWarehouseList] = useState([]);

  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);

  useEffect(() => {
    getYourCategories();
  }, []);
  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  const categories = ["warehouse 1", "warehouse 2", "warehouse 3"];
  const getYourCategories = async () => {
    try {
      const response = await ApiService.getAllWarehousesApi(currentShop?._id);
      if (response?.status) {
        setWarehouseList(response?.data?.reverse());
      } else {
        setWarehouseList([]);
      }
    } catch (error) {
      setWarehouseList([]);
      showMessage({
        message: error?.response?.data?.message || en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Customheader
        title={CONTEXT.ADD_PRODUCT}
        showBackIcon={true}
        Containerstyle={{ marginTop: 10, paddingBottom: 5 }}
      />
      <KeyboardAwareScrollView>
        <View style={[styles.productView, { marginTop: 35 }]}>
          <Text style={styles.productText}>{CONTEXT.ADD_PRODUCT_VARIANT}</Text>
          <Text style={[styles.productSamllText]}>
            Opps! your shop score is low, improve it and get the benefit.
          </Text>
          <View style={[styles.roundView]}>
            <Text style={styles.addVariant}>{CONTEXT.ADD_PRODUCT_VARIANT}</Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <View style={[styles.productView, { marginTop: Height * (3 / 100) }]}>
          <View style={styles.productSwitch}>
            <Text style={styles.productText}>{CONTEXT.PRODUCT_STATUS}</Text>
            <Switch
              trackColor={{ false: Colors.lightGrey50, true: "#81b0ff" }}
              thumbColor={isSwitchOn ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor={Colors.lightGrey50}
              onValueChange={toggleSwitch}
              value={isSwitchOn}
              style={{ transform: [{ scale: 0.8 }] }}
            />
          </View>
          <Text style={[styles.productSamllText]}>
            Opps! your shop score is low, improve it and get the benefit.
          </Text>
        </View>
        <View style={[styles.productView, { marginTop: Height * (2 / 100) }]}>
          <Text style={styles.productText}>{CONTEXT.STOCK_PRODUCT}*</Text>
          <Text style={[styles.productSamllText]}>
            Opps! your shop score is low, improve it and get the benefit{" "}
          </Text>
          <TouchableOpacity
            style={[styles.categoryTextView]}
            onPress={() => setShowCategories(!showCategories)}
          >
            <Text style={styles.textInput}>
              {selectedWarehouse?.name || "Select Warehouse"}
            </Text>
            <VectorImage source={arrow_down} style={styles.downIconStyle} />
          </TouchableOpacity>
        </View>
        {showCategories && (
          <View style={styles.pickerViewStyle}>
            <FlatList
              data={warehouseList}
              keyExtractor={(item) => item?._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    setSelectedWarehouse(item);
                    setShowCategories(false);
                  }}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <TextInput
          style={styles.squareView}
          placeholder="Stock total"
          onChangeText={(text) => {
            setStockTotal(text);
          }}
          placeholderTextColor={Colors.grey}
        />
        <View style={[styles.productView, { marginTop: Height * (2 / 100) }]}>
          <Text style={styles.productText}>{CONTEXT.STOCK_KEEPING_UNIT}</Text>
          <Text style={[styles.productSamllText]}>
            Opps! your shop score is low, improve it and get the benefit{" "}
          </Text>
        </View>
        <TextInput
          style={styles.squareView}
          value={stockKeepingUnit}
          onChangeText={(text) => {
            setStockKeepingUnit(text);
          }}
          placeholder="ID"
        />
      </KeyboardAwareScrollView>
      <View style={styles.saveButtonView}>
        <CustomButton
          text="Next"
          style={[styles.bottonStyle]}
          textstyle={{ color: Colors.whiteColor }}
          onPress={() =>
            navigation.navigate("AddProductWeight", {
              productDetails: {
                ...productDetails,
                stockTotal,
                stockKeepingUnit,
                isSwitchOn,
              },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default AddProductVariant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  productView: {
    width: "93%",
    alignSelf: "center",
  },
  productText: {
    fontSize: 16,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
  },
  productSamllText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: Colors.mediumGrey,
    marginVertical: Width * (1.6 / 100),
  },
  addVariant: {
    fontSize: Width * (4 / 100),
    fontFamily: GILROY_MEDIUM,
    color: Colors.skyBlueColor,
    textAlign: "center",
  },
  textInput: {
    fontSize: Width * (3.5 / 100),
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  roundView: {
    marginVertical: Height * (1.5 / 100),
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTextView: {
    flexDirection: "row",
    borderColor: Colors.neutralGrey,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  downIconStyle: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  productSwitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Width * (88 / 100),
    alignItems: "center",
  },
  squareView: {
    width: "93%",
    borderColor: Colors.neutralGrey,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 18,
    alignItems: "center",
    alignSelf: "center",
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottonStyle: {
    backgroundColor: Colors.skyBlueColor,
    // height:47
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginTop: 5,
    width: "93%",
    alignSelf: "center",
  },
  pickerViewStyle: {
    width: Width * (88 / 100),
    padding: Width * (2 / 100),
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    width: Width * (80 / 100),
    padding: Width * (2 / 100),
  },
  itemText: {
    textAlign: "center",
    fontSize: Width * (4 / 100),
  },
  saveButtonView: {
    backgroundColor: Colors.whiteColor,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderRadius:40
  },
});
