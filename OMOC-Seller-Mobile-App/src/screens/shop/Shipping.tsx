import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  arrowleft_icon,
  checkbox,
  close_square,
  three_dots_icon,
} from "../../utils/images";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import SearchTabBar from "../../component/SearchTabBar";
import AddShippingRegion from "../../component/AddShippingRegion";
import CustomButton from "../../component/CustomButton";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import ApiService from "../../services/api.service";
import { useSelector } from "react-redux";
import Spinner from "../../component/Spinner";
import EditShippingRegion from "../../component/EditShippingRegion";
import { showMessage } from "react-native-flash-message";

const Shipping = ({ navigation }) => {
  const [selectedStatus, setSelectedStatus] = useState("Shipping Rates");
  const [showAddShip, setShowAddShip] = useState(false);
  const [showEditShip, setShowEditShip] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [shippingData, setShippingData] = useState([]);
  const [selectedShipData, setSelectedShipData] = useState([]);
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);

  const handleSelector = (name) => {
    setSelectedStatus(name);
  };

  const requestData = [
    { name: "Region Name", Tax: "$20", buyer: "Jhone Kennny" },
    { name: "Region Name", Tax: "$20", buyer: "Albert Thomas" },
    { name: "Region Name", Tax: "$20", buyer: "Jhone Kennny" },
    { name: "Region Name", Tax: "$20", buyer: "Herry William" },
  ];

  const handleBottomSheet = () => {
    setShowAddShip(true);
  };

  useEffect(() => {
    getShipData();
  }, [currentShop]);

  const getShipData = async () => {
    try {
      setFetching(true);
      const response = await ApiService.getShipping(currentShop?._id);
      const data = response.data.shippings;
      setFetching(false);
      setShippingData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onEditClick = async (data, Id) => {
    try {
      setShowEditShip(false);
      const response = await ApiService.editShipping(
        Id.id,
        currentShop?._id,
        data
      );
      if (response.status === true && response.statusCode === 200) {
        const editedIndex = shippingData.findIndex(
          (item) => item._id === Id.id
        );
        console.log("ye data he", JSON.stringify(data)); 

        const str = data.shippingRange;
        const values = str.split("-");
        data.minShippingTime = values[0]
        data.maxShippingTime = values[1].replace("days",'')

        if (editedIndex !== -1) {
          const updatedShippingData = [...shippingData];
          updatedShippingData[editedIndex] = data;
          setShippingData(updatedShippingData);
        }
      }
      showMessage({
        message: response.message,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const onAddshipClick = async (data) => {
    try {
      setShowAddShip(false);
      const response = await ApiService.addShipping(currentShop?._id, data);
      if (response.status === true && response.statusCode === 200) {
        const updatedData = [...shippingData, response.data];
        setShippingData(updatedData);
      }
      showMessage({
        message: response.message,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const OnDeleteClick = async (Id) => {
    try {
      const response = await ApiService.deleteShipping(Id, currentShop?._id);
      const updatedShippingData = shippingData.filter((item) => item.id !== Id);
      setShippingData(updatedShippingData);
      showMessage({
        message: response.message,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <MenuProvider>
      <SafeAreaView style={styles.container}>
        <View style={[styles.headerView]}>
          <TouchableOpacity onPress={() => navigation.goBack("")}>
            <VectorImage source={arrowleft_icon} style={styles.leftIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{CONTEXT.SHIPPING}</Text>
          <View>
            {/* <Text style={styles.addShipText}>{CONTEXT.ADD_SHIPPING}</Text> */}
          </View>
        </View>
        <View style={[styles.tabView]}>
          <TouchableOpacity
            style={[
              styles.selectView,
              {
                backgroundColor:
                  selectedStatus === "Shipping Rates"
                    ? Colors.skyBlueColor
                    : Colors.lightGrey,
              },
            ]}
            onPress={() => handleSelector("Shipping Rates")}
          >
            <Text
              style={[
                styles.selectText,
                {
                  color:
                    selectedStatus === "Shipping Rates"
                      ? Colors.whiteColor
                      : Colors.blackColor,
                },
              ]}
            >
              {CONTEXT.SHIPPING_RATE}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectView,
              {
                backgroundColor:
                  selectedStatus === "Request Free"
                    ? Colors.skyBlueColor
                    : Colors.lightGrey,
              },
            ]}
            onPress={() => handleSelector("Request Free")}
          >
            <Text
              style={[
                styles.selectText,
                {
                  color:
                    selectedStatus === "Request Free"
                      ? Colors.whiteColor
                      : Colors.blackColor,
                },
              ]}
            >
              {CONTEXT.REQUEST_SHIPPING}
            </Text>
          </TouchableOpacity>
        </View>
        <SearchTabBar placeholder={CONTEXT.SEARCH} style={styles.searching} />
        <Text style={styles.Heading}>{CONTEXT.SHOP_SHIPPING}</Text>
        <View style={styles.manageView}>
          <Text style={styles.manageText}>{CONTEXT.MANAGE_SHOP}</Text>
          <TouchableOpacity
            style={styles.shippingReg}
            onPress={handleBottomSheet}
          >
            <Text style={styles.regionText}>{CONTEXT.ADD_SHIPPING_REGION}</Text>
          </TouchableOpacity>
        </View>

        {selectedStatus === "Shipping Rates" && (
          <>
            <View style={styles.viewNamePost}>
              <Text style={styles.title}>{CONTEXT.REGION}</Text>
              <Text style={[styles.title]}>{CONTEXT.TAX}</Text>
              <Text style={styles.title}>{CONTEXT.TIME}</Text>
              <Text style={[styles.title, { marginRight: "6%" }]}>
                {CONTEXT.MIN_PRICE}
              </Text>
            </View>

            {shippingData.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={shippingData}
                contentContainerStyle={{ marginBottom: 30 }}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.viewBox}>
                      <Text
                        style={[
                          styles.title,
                          { marginLeft: "4%", width: "20%" },
                        ]}
                      >
                        {item?.region}
                      </Text>
                      <Text style={[styles.title]}>${item?.tax}</Text>
                      <Text
                        style={[
                          styles.title,
                          { width: "20%", marginLeft: "3%" },
                        ]}
                      >
                        {item?.minShippingTime} - {item?.maxShippingTime} days
                      </Text>
                      <Text style={[styles.title, { marginLeft: "4%" }]}>
                        ${item?.minPrince}
                      </Text>
                      <Menu>
                        <MenuTrigger>
                          <VectorImage
                            source={three_dots_icon}
                            style={styles.vectorIcon}
                          />
                        </MenuTrigger>
                        <MenuOptions
                          optionsContainerStyle={styles.modalContent}
                        >
                          <MenuOption
                            onSelect={() => {
                              setShowEditShip(true), setSelectedShipData(item);
                            }}
                            style={styles.viewRemove}
                          >
                            <Text style={styles.remove}>{strings.EDIT}</Text>
                          </MenuOption>
                          <MenuOption
                            onSelect={() => OnDeleteClick(item?._id)}
                            style={styles.viewBan}
                          >
                            <Text style={styles.banUser}>
                              {strings.DELETE_REGION}
                            </Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    </View>
                  );
                }}
              />
            ) : (
              <Text
                style={[styles.banUser, { alignSelf: "center", marginTop: 20 }]}
              >
                No data found
              </Text>
            )}
          </>
        )}

        {/* ----------- Request Free shipping ----- */}
        {selectedStatus === "Request Free" && (
          <>
            <View style={styles.viewNamePost}>
              <Text style={styles.title}>{CONTEXT.BUYER_NAME}</Text>
              <Text style={[styles.title]}>{CONTEXT.TOTAL}</Text>
              <Text style={[styles.title, { marginRight: 25 }]}>
                {CONTEXT.REGION}
              </Text>
              <Text style={styles.title}>{CONTEXT.ACTION}</Text>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={requestData}
              contentContainerStyle={{ marginBottom: "80%" }}
              renderItem={({ item }) => {
                return (
                  <View style={styles.viewBox}>
                    <Text style={[styles.title, { marginLeft: "2%" }]}>
                      {item.buyer}
                    </Text>
                    <Text style={[styles.title]}>{item.Tax}</Text>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={[styles.actionBtn]}>
                      <TouchableOpacity>
                        <VectorImage
                          source={checkbox}
                          style={styles.vectorImg}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <VectorImage
                          source={close_square}
                          style={styles.vectorImg}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
            <CustomButton
              text={strings.SAVE}
              style={styles.button}
              textstyle={styles.btnName}
            />
          </>
        )}
        {showAddShip && (
          <AddShippingRegion
            hideMe={() => setShowAddShip(false)}
            onAddSave={onAddshipClick}
          />
        )}
        {showEditShip && (
          <EditShippingRegion
            data={selectedShipData}
            hideMe={() => setShowEditShip(false)}
            onSave={onEditClick}
          />
        )}
        {fetching && <Spinner animating={fetching} />}
      </SafeAreaView>
    </MenuProvider>
  );
};

export default Shipping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  headerText: {
    fontSize: 20,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  leftIcon: {
    height: 20,
    width: 25,
    resizeMode: "contain",
    tintColor: "black",
    transform: [{ rotateZ: "180deg" }],
  },
  searching: {
    borderRadius: 30,
    borderColor: "#EDEDED",
    borderWidth: 1,
    paddingVertical: 5,
    width: "93%",
    marginTop: 20,
  },
  addShipText: {
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
    color: Colors.skyBlueColor,
  },
  tabView: {
    flexDirection: "row",
    width: "93%",
    alignSelf: "center",
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
    marginBottom: 6,
    borderRadius: 30,
    marginTop: 30,
  },
  headerView: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    marginTop: 20,
    backgroundColor: Colors.whiteColor,
  },
  selectView: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 7,
    borderRadius: 25,
  },
  selectText: {
    fontSize: 13,
    fontFamily: GILROY_REGULAR,
  },
  manageText: {
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
    fontSize: 14,
  },
  regionText: {
    fontFamily: GILROY_REGULAR,
    color: Colors.skyBlueColor,
    fontSize: 12,
  },
  Heading: {
    fontSize: 22,
    fontFamily: GILROY_SEMIBOLD,
    marginTop: 25,
    marginHorizontal: 18,
  },
  shippingReg: {
    width: "45%",
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 23,
    alignItems: "center",
  },
  manageView: {
    flexDirection: "row",
    marginTop: "3%",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  viewNamePost: {
    width: "90%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "8%",
    paddingVertical: 20,
    backgroundColor: Colors.ghostWhite,
    borderRadius: 15,
    marginLeft: 15,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 13,
    color: Colors.charcoal,
    alignItems: "center",
    zIndex: 0,
  },
  viewBox: {
    flexDirection: "row",
    width: "90%",
    paddingVertical: 18,
    alignSelf: "center",
    borderBottomColor: Colors.lightBlack,
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  toucableThreeDot: {
    alignSelf: "flex-end",
    left: 8,
  },
  vectorIcon: {
    tintColor: "black",
    height: 14,
    width: 4,
    marginHorizontal: 15,
  },
  remove: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 14,
    lineHeight: 17,
    color: Colors.skyBlueColor,
  },
  viewRemove: {
    width: 162,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.aliceBlue,
  },
  banUser: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 14,
    lineHeight: 17,
    color: Colors.blackColor,
  },
  actionBtn: {
    width: 47,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginRight: "4%",
  },
  viewBan: {
    width: "100%",
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.whiteColor,
  },
  modalContent: {
    width: "45%",
    zIndex: 4,
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
  },
  button: {
    backgroundColor: Colors.skyBlueColor,
    position: "absolute",
    bottom: 10,
    zIndex: 9,
  },
  btnName: {
    color: Colors.whiteColor,
  },
  vectorImg: {
    height: 18,
    width: 20,
    resizeMode: "contain",
  },
  listMenuView: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1000,
  },
});
