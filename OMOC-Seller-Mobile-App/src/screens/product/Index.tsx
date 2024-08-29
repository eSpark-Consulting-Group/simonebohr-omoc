import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Customheader from "../../component/Customheader";
import { dot_option, star, three_dots_icon } from "../../utils/images";
import { CONTEXT } from "../../utils/string/strings";
import SearchTabBar from "../../component/SearchTabBar";
import { Height, Width } from "../../utils";
import { Colors } from "../../utils/colors";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import { showMessage } from "react-native-flash-message";
import en from "../../utils/string/en";
import ApiService from "../../services/api.service";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import CategoriesList from "../../component/products/CategoriesList";
import Spinner from "../../component/Spinner";
import VouchersList from "../../component/products/VouchersList";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import TestimonalList from "../../component/products/TestimonalList";

const Product = ({ navigation }) => {
  const [searchText, setsearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("list");
  const [visibleModel, setModalVisible] = useState(false);
  const [listModel, setListModel] = useState(false);
  const [listModelId, setListModelId] = useState(null);
  const [deleteModel, setDeleteModel] = useState(false);
  const [productList, setproductList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [vouchersList, setVouchersList] = useState([]);
  const [testimonialList, setTestimonialList] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const currentShop = useSelector((state) => state?.ShopSlice?.currentShop);
  const isFacused = useIsFocused();

  useEffect(() => {
    getYourProducts();
  }, [currentShop, isFacused]);

  useEffect(() => {
    if (selectedStatus === "Category") {
      getYourCategories();
    } else if (selectedStatus === "Voucher") {
      getYourVouchers();
    } else if (selectedStatus === "Test") {
      getYourTestimonial();
    }
  }, [selectedStatus, isFacused]);

  const getYourProducts = async () => {
    setFetching(true);
    try {
      setproductList([]);
      const response = await ApiService.getProductsByShopId({
        shopId: currentShop?._id,
      });
      if (response?.data?.status) {
        setFetching(false);
        setproductList(response?.data?.data?.products.reverse());
      } else {
        setFetching(false);
        setproductList([]);
      }
    } catch (e) {
      setproductList([]);
      setFetching(false);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };
  const getYourCategories = async () => {
    setFetching(true);
    try {
      const response = await ApiService.getAllCategoriesByShopId({
        shopId: currentShop?._id,
      });
      setFetching(false);
      if (response?.status) {
        setCategoriesList(response?.data?.reverse());
      } else {
        setCategoriesList([]);
      }
    } catch (e) {
      setFetching(false);
      setCategoriesList([]);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };
  const getYourVouchers = async () => {
    setFetching(true);
    try {
      const response = await ApiService.getAllVouchersApi({
        shopId: currentShop?._id,
      });
      setFetching(false);
      if (response?.status) {
        setVouchersList(response?.data?.vouchers?.reverse());
      } else {
        setVouchersList([]);
      }
    } catch (e) {
      setFetching(false);
      setCategoriesList([]);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };

  const getYourTestimonial = async () => {
    setFetching(true);
    try {
      const response = await ApiService.getTestimonialList({
        shopId: currentShop?._id,
      });
      const {reviews} = await response?.data?.data;
      setTestimonialList(reviews);
      setFetching(false);
    } catch (e) {
      setFetching(false);
      console.log("Error:", e);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };

  const handleSelector = (name) => {
    setSelectedStatus(name);
    setListModel(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ backgroundColor: Colors.defaultGrey }}>
        <View style={styles.dataContainer}>
          <FastImage
            source={{ uri: item?.images[0]?.url }}
            style={styles.frameIcon}
          />
          <View>
            <View style={styles.hoodieView}>
              <Text style={styles.hoodieText}>{item.name}</Text>
              {selectedStatus !== "Category" &&
              selectedStatus !== "Voucher" &&
              selectedStatus !== "Test" ? (
                <View style={styles.backViewStaus}>
                  <Text style={styles.statusText}>Active</Text>
                </View>
              ) : selectedStatus !== "Category" &&
                selectedStatus !== "Voucher" &&
                selectedStatus === "Test" ? (
                <View style={styles.backViewStaus}>
                  <Text style={styles.statusText}>Approve</Text>
                </View>
              ) : (
                <View style={{ width: 47 }} />
              )}
              <Menu rendererProps={{ anchorStyle: styles.anchorStyle }}>
                <MenuTrigger style={styles.menuTriggerView}>
                  <VectorImage
                    source={three_dots_icon}
                    style={styles.dotIcon}
                  />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  <MenuOption style={styles.menuOptionView} onSelect={() => {}}>
                    <Text style={styles.menuTextColor}>Add product</Text>
                  </MenuOption>

                  <MenuOption
                    style={styles.menuOptionView}
                    onSelect={() => {
                      setDeleteModel(true);
                      setSelectedProductId(item);
                    }}
                  >
                    <Text style={styles.menuDeleteTextColor}>
                      Delete Product
                    </Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
            <View>
              {selectedStatus === "Voucher" && (
                <View style={styles.liveStreamView}>
                  <View
                    style={[
                      styles.backViewStaus,
                      { backgroundColor: Colors.lightSkyBlue },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: Colors.skyBlueColor },
                      ]}
                    >
                      Livestream
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.backViewStaus,
                      { backgroundColor: Colors.neutralGreen },
                    ]}
                  >
                    <Text style={[styles.statusText, { color: Colors.green }]}>
                      Active
                    </Text>
                  </View>
                </View>
              )}
              {selectedStatus === "list" ||
              selectedStatus === "Voucher" ||
              selectedStatus === "Invent" ||
              selectedStatus === "Test" ? (
                <Text style={styles.codeText}>{item._id}</Text>
              ) : null}
              {(selectedStatus === "list" || selectedStatus === "Invent") && (
                <Text style={styles.codeText}>Price : ${item.price}</Text>
              )}
              {(selectedStatus === "list" || selectedStatus === "Invent") && (
                <Text style={styles.noteText}>Stock : {item.quantity}</Text>
              )}
              {selectedStatus === "Category" && (
                <Text
                  style={[styles.noteText, { marginTop: Height * (1.5 / 100) }]}
                >
                  Total Product : {item.product}
                </Text>
              )}
              {selectedStatus === "Voucher" && (
                <Text style={styles.noteText}>
                  Total Vouher : {item.product}
                </Text>
              )}
              {selectedStatus === "Test" && (
                <Text style={styles.noteText}>Customer : {item.customer}</Text>
              )}
              {selectedStatus === "Test" && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.noteText}>Rating :</Text>
                  <VectorImage source={star} style={styles.starIcon} />
                  <Text
                    style={[
                      styles.noteText,
                      { marginTop: Height * (0.7 / 100) },
                    ]}
                  >
                    {item.rate}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {listModel && listModelId == item._id && (
          <View style={styles.listMenuView}>
            <RenderModelListproduct />
          </View>
        )}
      </View>
    );
  };

  function RenderModelproduct() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={visibleModel}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={[styles.centeredView]}>
            <TouchableOpacity
              style={[styles.modelAddproduct]}
              onPress={() => {
                setModalVisible(false), navigation.navigate("AddProduct");
              }}
            >
              <Text style={[styles.reportText, { color: Colors.skyBlueColor }]}>
                {CONTEXT.ADD_PRODUCT}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modelContainer}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("AddCategory", { isEdit: false });
              }}
            >
              <Text style={styles.reportText}>{CONTEXT.ADD_CATEGORIES}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modelContainer}
              onPress={() => {
                setModalVisible(false), navigation.navigate("AddVoucher");
              }}
            >
              <Text style={styles.reportText}>{CONTEXT.ADD_VAUCHERS}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  function RenderModelListproduct() {
    return (
      <View style={[styles.modalListView]}>
        {selectedStatus == "Invent" && (
          <TouchableOpacity
            style={styles.modelAddproduct}
            onPress={() => {
              navigation.navigate("BarcodeScreen");
              setListModel(false);
            }}
          >
            <Text style={[styles.reportText, { color: Colors.skyBlueColor }]}>
              {CONTEXT.ADD_PRODUCT_ID}
            </Text>
          </TouchableOpacity>
        )}
        {selectedStatus == "Category" && (
          <TouchableOpacity
            style={styles.modelAddproduct}
            onPress={() => setListModel(false)}
          >
            <Text style={[styles.reportText, { color: Colors.skyBlueColor }]}>
              {CONTEXT.EDIT_CATEGORIES}
            </Text>
          </TouchableOpacity>
        )}
        {selectedStatus == "Voucher" && (
          <TouchableOpacity
            style={styles.modelAddproduct}
            onPress={() => setListModel(false)}
          >
            <Text style={[styles.reportText, { color: Colors.skyBlueColor }]}>
              {CONTEXT.PREVIEW}
            </Text>
          </TouchableOpacity>
        )}
        {selectedStatus == "list" && (
          <TouchableOpacity
            style={[styles.modelAddproduct]}
            onPress={() => setListModel(false)}
          >
            <Text style={[styles.reportText, { color: Colors.skyBlueColor }]}>
              {CONTEXT.ADD_PRODUCT}
            </Text>
          </TouchableOpacity>
        )}
        {selectedStatus == "Test" && (
          <TouchableOpacity
            style={styles.modelAddproduct}
            onPress={() => {
              navigation.navigate("TestimonialProduct"), setListModel(false);
            }}
          >
            <Text style={[styles.reportText, { color: Colors.skyBlueColor }]}>
              {CONTEXT.RESPONSE}
            </Text>
          </TouchableOpacity>
        )}
        {selectedStatus == "Test" && (
          <TouchableOpacity
            style={styles.modelContainer}
            onPress={() => setListModel(false)}
          >
            <Text style={styles.reportText}>{CONTEXT.REPORT}</Text>
          </TouchableOpacity>
        )}
        {selectedStatus == "Category" && (
          <TouchableOpacity
            style={styles.modelContainer}
            onPress={() => setListModel(false)}
          >
            <Text style={styles.reportText}>{CONTEXT.ADD_PICTURE}</Text>
          </TouchableOpacity>
        )}
        {selectedStatus == "Voucher" && (
          <TouchableOpacity
            style={styles.modelContainer}
            onPress={() => setListModel(false)}
          >
            <Text style={styles.reportText}>{CONTEXT.EDIT_VOUCHER}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.modelContainer]}
          onPress={() => {
            setListModel(false);
            setDeleteModel(true);
          }}
        >
          <Text style={styles.canceltText}>{CONTEXT.DELETE_PRODUCT}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function RenderModelDeleteproduct({ isVsible }) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVsible}
        onRequestClose={() => {
          setDeleteModel(false);
        }}
      >
        <View style={styles.modelViewcontainer}>
          <View style={[styles.modalDeleteView]}>
            <Text
              style={[styles.headingModel, { marginTop: Width * (4 / 100) }]}
            >
              {CONTEXT.DELETE_PRODUCT}
            </Text>

            <Text style={styles.youWillText}>
              You Will Delete Forever This Product
            </Text>

            <View style={styles.cancelModal}>
              <TouchableOpacity
                style={styles.modelContainer}
                onPress={() => setDeleteModel(false)}
              >
                <Text
                  style={[styles.headingModel, { color: Colors.skyBlueColor }]}
                >
                  {CONTEXT.CANCEL}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modelContainer}
                onPress={() => onDeleteProduct()}
              >
                <Text
                  style={[styles.headingModel, { color: Colors.dangerRed }]}
                >
                  {CONTEXT.DELETE}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  const onDeleteCategory = async (item) => {
    try {
      const response = await ApiService.deleteCategoryDetailApi({
        shopId: currentShop?._id,
        categoryId: item?.id,
      });
      if (response?.status) {
        setCategoriesList((prev) =>
          categoriesList.filter((val) => val?.id !== item?.id)
        );
        showMessage({
          message: `'${item.title}' Category deleted succesfully!`,
          duration: 3000,
          backgroundColor: Colors.skyBlueColor,
          type: "danger",
        });
      }
    } catch (e) {
      console.log("error", e);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };

  const onDeleteVoucher = async (item) => {
    try {
      const response = await ApiService.deleteVoucherApi({
        shopId: currentShop?._id,
        voucherId: item?._id,
      });
      if (response?.status) {
        setVouchersList((prev) =>
          vouchersList.filter((val) => val?._id !== item?._id)
        );
        showMessage({
          message: `Voucher deleted succesfully!`,
          duration: 3000,
          backgroundColor: Colors.skyBlueColor,
          type: "danger",
        });
      }
    } catch (e) {
      console.log("error", e);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };
  const onDeleteProduct = async () => {
    try {
      const response = await ApiService.deleteProductApi({
        shopId: currentShop?._id,
        productId: selectedProductId?._id,
      });
      if (response?.status) {
        setproductList((prev) =>
          productList.filter((val) => val?._id !== selectedProductId?._id)
        );
        setDeleteModel(false);
        showMessage({
          message: `Product deleted succesfully!`,
          duration: 3000,
          backgroundColor: Colors.skyBlueColor,
          type: "danger",
        });
      }
    } catch (e) {
      console.log("error", e);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: Colors.skyBlueColor,
        type: "danger",
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Customheader
        showBackIcon={true}
        optionImage={three_dots_icon}
        title={CONTEXT.PRODUCT}
        onPress={() => setModalVisible(true)}
        Containerstyle={{ marginTop: 10 }}
        rightIconStyle={styles.headerRightIconStyle}
      />
      <SearchTabBar
        placeholder={CONTEXT.SEARCH}
        onChange={(text) => setsearchText(text)}
        value={searchText}
      />
      <View style={styles.tabViewContiner}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            style={[
              selectedStatus == "list" ? styles.selectTab : styles.unSelectTab,
            ]}
            onPress={() => handleSelector("list")}
          >
            <Text
              style={[
                selectedStatus == "list"
                  ? styles.tabSelectTexT
                  : styles.tabUnSelectTexT,
              ]}
            >
              {CONTEXT.LIST_PRODUCT}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              selectedStatus == "Invent"
                ? styles.selectTab
                : styles.unSelectTab,
            ]}
            onPress={() => handleSelector("Invent")}
          >
            <Text
              style={[
                selectedStatus == "Invent"
                  ? styles.tabSelectTexT
                  : styles.tabUnSelectTexT,
              ]}
            >
              {CONTEXT.INVENTORY}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              selectedStatus == "Category"
                ? styles.selectTab
                : styles.unSelectTab,
            ]}
            onPress={() => handleSelector("Category")}
          >
            <Text
              style={[
                selectedStatus == "Category"
                  ? styles.tabSelectTexT
                  : styles.tabUnSelectTexT,
              ]}
            >
              {CONTEXT.CATEGORIES}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              selectedStatus == "Voucher"
                ? styles.selectTab
                : styles.unSelectTab,
            ]}
            onPress={() => handleSelector("Voucher")}
          >
            <Text
              style={[
                selectedStatus == "Voucher"
                  ? styles.tabSelectTexT
                  : styles.tabUnSelectTexT,
              ]}
            >
              {CONTEXT.VOUCHERS}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              selectedStatus == "Test" ? styles.selectTab : styles.unSelectTab,
            ]}
            onPress={() => handleSelector("Test")}
          >
            <Text
              style={[
                selectedStatus == "Test"
                  ? styles.tabSelectTexT
                  : styles.tabUnSelectTexT,
              ]}
            >
              {CONTEXT.TESTIMONIAL}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.listsMainView}>
        {selectedStatus === "list" ? (
          <FlatList
            data={productList}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: Height * 0.35 }}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
              !fetching && (
                <Text style={styles.noDataLabel}>No products found</Text>
              )
            }
          />
        ) : null}
        {selectedStatus === "Category" ? (
          <FlatList
            data={categoriesList}
            renderItem={({ item }) => (
              <CategoriesList
                item={item}
                navigation={navigation}
                onDeleteCategory={() => onDeleteCategory(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: Height * 0.2 }}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
              !fetching && (
                <Text style={styles.noDataLabel}>No Category Data</Text>
              )
            }
          />
        ) : null}
        {selectedStatus === "Voucher" ? (
          <FlatList
            data={vouchersList}
            renderItem={({ item }) => (
              <VouchersList
                item={item}
                navigation={navigation}
                onDeleteVoucher={() => onDeleteVoucher(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: Height * 0.2 }}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
              !fetching && (
                <Text style={styles.noDataLabel}>No Vouchers available</Text>
              )
            }
          />
        ) : null}
        {selectedStatus === "Invent" ? (
          <FlatList
            data={[]}
            renderItem={({ item }) => (
              <VouchersList item={item} navigation={navigation} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: Height * 0.2 }}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
              !fetching && (
                <Text style={styles.noDataLabel}>No Inventory available</Text>
              )
            }
          />
        ) : null}
        {selectedStatus === "Test" ? (
          <FlatList
            data={testimonialList}
            renderItem={({ item }) => (
              <TestimonalList item={item} navigation={navigation} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginBottom: Height * 0.2 }}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
              !fetching && (
                <Text style={styles.noDataLabel}>No Testimonial available</Text>
              )
            }
          />
        ) : null}
      </View>
      {visibleModel ? <RenderModelproduct /> : null}
      {<RenderModelDeleteproduct isVsible={deleteModel} />}
      {fetching && <Spinner animating={fetching} />}
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  tabViewContiner: {
    marginTop: Height * 0.02,
    flexDirection: "row",
    width: Width * (100 / 100),
    paddingHorizontal: Width * (3 / 100),
    alignSelf: "baseline",
  },
  selectTab: {
    marginHorizontal: Width * (2 / 100),
    marginVertical: Width * (2 / 100),
    paddingVertical: Width * (2 / 100),
    borderBottomColor: Colors.skyBlueColor,
    borderBottomWidth: Width * (0.6 / 100),
  },
  unSelectTab: {
    marginHorizontal: Width * (2 / 100),
    marginVertical: Width * (2 / 100),
    paddingVertical: Width * (2 / 100),
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

  searchIcon: {
    height: Height * (3 / 100),
    width: Width * (7 / 100),
    resizeMode: "contain",
  },
  dataContainer: {
    alignSelf: "center",
    marginVertical: 8,
    padding: Width * (2 / 100),
    backgroundColor: Colors.whiteColor,
    width: Width * (93 / 100),
    borderRadius: Width * (3 / 100),
    flexDirection: "row",
    gap: 10,
  },
  frameIcon: {
    height: Height * (12 / 100),
    width: Width * (25 / 100),
    marginTop: Height * (1 / 100),
    marginHorizontal: Width * (1 / 100),
    resizeMode: "contain",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grey,
  },
  hoodieText: {
    width: Width * (37 / 100),
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    fontSize: 14,
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
    marginTop: Height * (1 / 100),
  },
  backViewStaus: {
    backgroundColor: Colors.neutralGreen,
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
  youWillText: {
    fontFamily: GILROY_REGULAR,
    fontSize: Width * (3.5 / 100),
    color: Colors.blackColor,
    marginVertical: Height * (3 / 100),
  },
  noteText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
    fontSize: 12,
    marginVertical: Width * (0.5 / 100),
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
  starIcon: {
    height: Height * (4 / 100),
    width: Width * (3 / 100),
    resizeMode: "contain",
    marginHorizontal: Width * (1 / 100),
  },
  modelContainer: {
    marginVertical: Width * (3 / 100),
  },
  modelAddproduct: {
    marginVertical: Width * (2 / 100),
    backgroundColor: "#E8F5FF",
    borderRadius: 6,
    paddingHorizontal: 3,
    paddingVertical: 6,
  },
  centeredView: {
    width: Width * (40 / 100),
    borderRadius: 9,
    position: "absolute",
    top: Height * 0.06,
    right: 40,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Width * (3 / 100),
    paddingVertical: Width * (2 / 100),
    paddingLeft: Width * (5 / 100),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  modalListView: {
    width: Width * (40 / 100),
    borderRadius: 9,
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Width * (3 / 100),
    paddingVertical: Width * (2 / 100),
    paddingLeft: Width * (5 / 100),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  modelViewcontainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalDeleteView: {
    width: Width * (70 / 100),
    borderRadius: 15,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    top: Height * (40 / 100),
    paddingHorizontal: Width * (3 / 100),
    paddingVertical: Width * (1 / 100),
    paddingLeft: Width * (5 / 100),
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
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    color: Colors.dangerRed,
    marginLeft: 8,
  },
  reportText: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
  },
  liveStreamView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Width * (30 / 100),
    marginVertical: Width * (2 / 100),
  },
  dotView: {
    width: Width * (8 / 100),
    alignItems: "flex-end",
  },
  headingModel: {
    fontSize: Width * (4.5 / 100),
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
  },
  cancelModal: {
    borderTopColor: Colors.lightGrey,
    borderTopWidth: Width * (0.6 / 100),
    flexDirection: "row",
    justifyContent: "space-between",
    width: Width * (50 / 100),
  },
  listMenuView: { position: "absolute", right: 50, top: 30 },
  listImageStyles: {
    height: 70,
    width: 70,
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 0.5,
  },
  categoriesContainer: {
    alignSelf: "center",
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: Colors.whiteColor,
    width: "93%",
    borderRadius: 12,
    flexDirection: "row",
    gap: 20,
  },
  categoryDetailView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoriesSubView: { gap: 10, flex: 1, justifyContent: "space-evenly" },
  listsMainView: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: Colors.lightGrey,
  },
  headerRightIconStyle: {
    width: 10,
    height: 14,
    tintColor: "#000000",
  },
  noDataLabel: {
    color: "red",
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  dotIcon: {
    tintColor: "#9E9E9E",
    height: 13,
  },
  menuOptionView: {
    marginTop: 10,
  },
  menuTextColor: {
    color: "#0094FF",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    lineHeight: 14,
  },
  editAddressText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 13,
    color: Colors.neutralBlack,
  },
  menuTriggerView: {
    paddingLeft: 25,
  },
  menuDeleteTextColor: {
    color: "#C80000",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    lineHeight: 14,
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "transparent",
    paddingRight: 15,
  },
  optionsWrapper: {
    borderRadius: 12,
    backgroundColor: Colors.whiteColor,
    paddingLeft: 12,
    paddingVertical: 8,
    shadowColor: "#00000017",
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.01,
    shadowRadius: 1.4,
    elevation: 1,
  },
};
