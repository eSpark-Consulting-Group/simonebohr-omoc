import {
  Alert,
  Modal,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomCartHeading from "../../components/CustomCartHeading";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import CustomItemCard from "../../components/CustomItemCard";
import {
  blackColor,
  blue,
  fillBlue,
  lightGrey,
  opacityBlack,
  red,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import CustomTotalCost from "../../components/CustomTotalCost";
import { strings } from "../../assets/string/strings";
import EditcartItems from "./EditcartItems";
import VectorImage from "react-native-vector-image";
import { bag_icon, delete_icon, shopping_icon } from "../../utils/images";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import AddNoteBottomSheet from "../../components/cartComponent/AddNoteBottomSheet";
import CheckoutBottomSheet from "../../components/cartComponent/CheckoutBottomSheet";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import en from "../../assets/string/en";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import CustomCheckBox from "../../components/CustomCheckBox";
import { setSelectedAddress } from "../../redux/slice/dashboard/AddressSlice";
import Spinner from "../../components/Spinner";
import CustomerTourSetup from "../../components/CustomerTourSetup";

const CartItemCard = ({ navigation, route }) => {
  const [viewProducts, setViewProducts] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [isModalShow, setIsModalshow] = useState(false);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [showAddNoteSheet, setShowAddNoteSheet] = useState(false);
  const [showCheckOutSheet, setShowCheckOutSheet] = useState(false);
  const [editSelect, setEditSelect] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isVisiBaleModal: false,
    products: [],
  });
  const [selectAll, setSelectAll] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [allCartList, setAllCartList] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [showTourBox, setShowTourBox] = useState(false);
  const [rightHeaderText, setRightHeaderText] = useState(strings.EDIT);
  const { shopClick, data } = route.params || {};
  const dispatch = useDispatch();

  const selectedAddress = useSelector((state) => state.AddressSlice);
  const isFacused = useIsFocused();

  useEffect(() => {
    getCartLists();
  }, [isFacused]);

  useEffect(() => {
    getYourAddress();
  }, []);

  const getCartLists = async () => {
    try {
      setFetching(true);
      const response = await ApiService.getCartList();
      if (response?.status) {
        const data = response?.data?.cartProducts;
        setCartData(response?.data);
        setShowTourBox(response?.data?.isTourCompleted);
        console.log("showTourBox--->", response?.data?.isTourCompleted);
        let listArray: { productId: any; quantity: any }[] = [];
        response?.data?.cartList.map((val) => {
          const obj = {
            productId: val?.productId?._id,
            quantity: val?.quantity,
            shopId: val?.shopId,
          };
          listArray.push(obj);
        });
        setAllCartList(listArray);
        setCartProducts(data);
      } else {
        setCartProducts([]);
      }
    } catch (e) {
      setCartProducts([]);
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    } finally {
      setFetching(false);
    }
  };

  const removeProductFromCart = async () => {
    try {
      const removeParams = {
        productIds: deleteModal.products || [],
      };
      const response = await ApiService.deleteCartItem(removeParams);
      setShowCheckBox(false);
      getCartLists();
    } catch (error) {
      console.error("Error:", JSON.stringify(error.response.data));
    }
  };

  const editApi = async () => {
    try {
      const data = { productIds };
      const response = await ApiService.editCartItem(data);
      getCartLists();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  let totalPrice = 0;
  cartProducts.forEach((shop) => {
    shop.data.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
  });

  const onPlaceOrder = async () => {
    try {
      const productArray = allCartList.map((item) => {
        const { shopId, ...rest } = item;
        return rest;
      });

      const params = {
        products: productArray || [],
        addressId: selectedAddress._id,
        paymentType: "cod",
      };

      const response = await ApiService.placeNewOrder(params);

      if (response?.status) {
        showMessage({
          message: response.message,
          duration: 3000,
          backgroundColor: skyBlueColor,
          type: "danger",
        });
        setShowCheckOutSheet(false);
        navigation.navigate("OrderDetails", { cartData });
      }
    } catch (e) {
      showMessage({
        message: e?.response?.data?.message || en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    } finally {
      setShowCheckOutSheet(false);
    }
  };

  const selctedAllIds = (allIds: string) => {
    const found = allData.some((val) => val?.productId === allIds?._id);
    const Id = allIds._id;

    if (!found) {
      const newProduct = {
        productId: Id,
        quantity: allIds?.quantity,
      };
      setAllData((prev) => [...prev, newProduct]);
      return;
    } else {
      setAllData((prevArr) => prevArr.filter((val) => val.productId !== Id));
      return;
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const Id = productId._id;
    const existingIndex = productIds.findIndex((item) => item.id === Id);
    if (existingIndex !== -1) {
      setProductIds((prev) => {
        const updatedProductIds = [...prev];
        updatedProductIds[existingIndex] = { id: Id, quantity: newQuantity };
        return updatedProductIds;
      });
    } else {
      setProductIds((prev) => [...prev, { id: Id, quantity: newQuantity }]);
    }
  };

  const handleModalShow = () => {
    if (!showTourBox) {
      setShowTourBox(true);
    } else {
      setShowAddNoteSheet(true);
    }
  };
  const handleShowCheckout = () => {
    setShowCheckOutSheet(true);
  };

  const CustomSelectData = (data) => {
    setIsModalshow(true);
    setViewProducts(data);
  };

  const handleNew = () => {
    if (!isShowSelect) {
      setRightHeaderText(strings.SELECT_ALL);
      setIsShowSelect(true);
      setEditSelect(true);
    } else if (showCheckBox) {
      setRightHeaderText(strings.EDIT);
      setShowCheckBox(false);
      setIsShowSelect(false);
    } else {
      setRightHeaderText(strings.DONE);
      setShowCheckBox(true);
      setEditSelect(false);
    }
  };

  const getYourAddress = async () => {
    try {
      const response = await ApiService.GetAllAddresses(true);
      if (response?.status) {
        dispatch(setSelectedAddress(response.data[0]));
      }
    } catch (e) {
      showMessage({
        message: e?.response?.data?.message || en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.MY_CART}
          navigation={navigation}
          rightheadertext={rightHeaderText}
          onRightHeaderPress={() => {
            handleNew();
          }}
        />
      </View>
      {showCheckBox && !!cartProducts.length ? (
        <View style={styles.selectView}>
          <View style={{ flexDirection: "row" }}>
            <CustomCheckBox
              checkboxValue={selectAll}
              boxType="square"
              style={styles.CheckBox}
              onFillColor={fillBlue}
              onCheckColor={"white"}
              onSelect={() => {
                setSelectAll(!selectAll);
                if (!selectAll) {
                  const newArray = [];
                  allCartList.map((val) => {
                    newArray.push(val);
                  });
                  setAllData(newArray);
                } else {
                  setAllData([]);
                }
              }}
            />
            <Text>{strings.SELECT_ALL}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              const data = {
                productIds: allData
                  .map((item) => item.productId)
                  .filter((id) => id !== undefined),
              };
              setDeleteModal({
                isVisiBaleModal: true,
                products: data.productIds || [],
              });
            }}
          >
            <VectorImage
              source={delete_icon}
              style={[styles.CheckBox, { tintColor: "red" }]}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={cartProducts}
        renderSectionHeader={({ section }) => {
          const shopName = section?.shopName;
          const firstProduct = section?.data[0];
          const productId = firstProduct?._id;
          const shopId = section?.shopId;

          return (
            <CustomCartHeading
              data={{ shopName, productId }}
              color={skyBlueColor}
              status={selectAll}
              checkStatus={showCheckBox ? true : false}
              title={editSelect ? strings.EDIT : ""}
              OnEditPress={() => setEditModal(true)}
              onShopSelect={() => {
                allCartList.map((val) => {
                  if (val?.shopId === shopId) {
                    setAllData((prev) => [...prev, val]);
                  }
                });
              }}
            />
          );
        }}
        renderItem={({ item }) => {
          const selectedProductFound = allData.some(
            (val) => val?.productId === item?._id
          );
          return (
            <>
              {!isShowSelect ? (
                <CustomItemCard
                  data={item}
                  selectedData={CustomSelectData}
                  status={selectAll}
                />
              ) : (
                <EditcartItems
                  data={item}
                  status={{ showCheckBox, selectAll, shopClick, data }}
                  handleCheckBoxChange={() => {
                    selctedAllIds(item);
                  }}
                  updateQuantity={updateQuantity}
                  singleDelete={() =>
                    setDeleteModal({
                      isVisiBaleModal: true,
                      products: [item?._id],
                    })
                  }
                  selectedProductFound={selectedProductFound}
                />
              )}
            </>
          );
        }}
        style={styles.list}
        ListEmptyComponent={() => {
          return (
            <>
              {!fetching ? (
                <View style={styles.emptyCartContainer}>
                  <VectorImage source={bag_icon} style={styles.cartIcon} />
                  <Text style={styles.emptyCartText}>Your cart is empty</Text>
                </View>
              ) : null}
            </>
          );
        }}
      />

      {editModal && (
        <Modal
          visible={editModal}
          transparent={true}
          style={styles.modalMainContainer}
          animationType="slide"
        >
          <TouchableOpacity
            onPress={() => {
              setEditModal(false);
            }}
            style={styles.modalContainer}
          >
            <View style={styles.modalEditView}>
              <Text style={styles.headingText}>{strings.EDIT_CART}</Text>
              <Text style={styles.subText}>{strings.ARE_SURE_MESSAGE}</Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[styles.Cart, styles.btnBorder]}
                  onPress={() => {
                    setEditModal(false);
                    editApi();
                  }}
                >
                  <Text style={styles.btnCart}>{strings.YES}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.Cart}
                  onPress={() => {
                    setEditModal(false);
                  }}
                >
                  <Text style={styles.btnContinue}>{strings.NO}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {!!deleteModal.isVisiBaleModal && (
        <Modal
          visible={true}
          transparent={true}
          style={styles.modalMainContainer}
          animationType="slide"
        >
          <TouchableOpacity
            onPress={() => {
              setDeleteModal({
                isVisiBaleModal: false,
                products: [],
              });
            }}
            style={styles.modalContainer}
          >
            <View style={styles.modalEditView}>
              <Text style={styles.headingText}>{strings.DELETE_CART}</Text>
              <Text style={styles.subText}>
                {strings.ARE_SURE_MESSAGE_DELETE}
              </Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[styles.Cart, styles.btnBorder]}
                  onPress={() => {
                    setDeleteModal({
                      isVisiBaleModal: false,
                      products: [],
                    });
                    removeProductFromCart();
                  }}
                >
                  <Text style={styles.btnCart}>{strings.YES}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.Cart}
                  onPress={() => {
                    setDeleteModal({
                      isVisiBaleModal: false,
                      products: [],
                    });
                  }}
                >
                  <Text style={styles.btnContinue}>{strings.NO}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {isModalShow && (
        <Modal
          transparent={true}
          style={styles.modalMainContainer}
          animationType="slide"
        >
          <TouchableOpacity
            onPress={() => {
              setIsModalshow(false);
            }}
            style={styles.modalContainer}
          >
            <View style={styles.modalView}>
              <View style={styles.shoppinContainer}>
                <VectorImage
                  source={shopping_icon}
                  style={styles.shoppingImg}
                />
              </View>
              <Text style={styles.boldText}>{strings.ITEMS_IN_YOUR_CART}</Text>
              <Text style={styles.subText}>
                {strings.YOU_LEFT_SOME_ITEMS_IN_YOUR_CART}
              </Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[styles.Cart, styles.btnBorder]}
                  onPress={() => {
                    navigation.navigate(
                      "ProductDetailScreen",
                      { data: viewProducts },
                      setIsModalshow(false)
                    );
                  }}
                >
                  <Text style={styles.btnCart}>{strings.VIEW_CART}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.Cart}
                  onPress={() => {
                    setIsModalshow(false);
                    navigation.navigate("PaymentScreen");
                  }}
                >
                  <Text style={styles.btnContinue}>
                    {strings.CONTINUE_SHOPPING}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
      {!showCheckBox && (
        <View style={styles.totalPrice}>
          <CustomTotalCost
            price={totalPrice || 0}
            isDelete={isShowSelect}
            onPress={handleModalShow}
            cartData={cartProducts}
          />
        </View>
      )}

      {!showTourBox && (
        <Modal visible={showTourBox} transparent>
          <CustomerTourSetup
            hideMe={() => {
              setShowTourBox(false);
            }}
            onConfirmPayment={() => {
              setShowTourBox(false);
              navigation.navigate("DeliveryScreen");
            }}
          />
        </Modal>
      )}
      {showAddNoteSheet && (
        <Modal visible={showAddNoteSheet} transparent>
          <AddNoteBottomSheet
            hideMe={() => {
              setShowAddNoteSheet(false);
            }}
            onConfirmPayment={() => {
              setShowAddNoteSheet(false);
              setShowCheckOutSheet(true);
            }}
          />
        </Modal>
      )}
      {showCheckOutSheet && (
        <Modal visible={showCheckOutSheet} transparent>
          <CheckoutBottomSheet
            cartData={cartData}
            hideMe={() => {
              setShowCheckOutSheet(false);
            }}
            onConfirmPayment={() => {
              onPlaceOrder();
            }}
            onPressPayment={() => {
              navigation.navigate("PaymentScreen");
              setShowCheckOutSheet(false);
            }}
            onPressVoucher={() => {
              navigation.navigate("VoucherScreen");
              setShowCheckOutSheet(false);
            }}
            onPressDelivery={() => {
              navigation.navigate("DeliveryScreen");
              setShowCheckOutSheet(false);
            }}
          />
        </Modal>
      )}
      {fetching && <Spinner animating={fetching} />}
    </SafeAreaView>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: lightGrey,
  },
  list: {
    marginHorizontal: 15,
    marginBottom: "33%",
  },
  header: {
    marginHorizontal: 15,
    marginTop: 3,
    marginBottom: 13,
  },
  headingText: {
    marginTop: 25,
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    color: blackColor,
  },
  modalMainContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: opacityBlack,
  },
  modalView: {
    width: "90%",
    height: "30%",
    backgroundColor: whiteColor,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  modalEditView: {
    width: "90%",
    height: "18%",
    backgroundColor: whiteColor,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  shoppinContainer: {
    width: "22%",
    height: "30%",
    backgroundColor: lightGrey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    marginTop: 30,
  },
  shoppingImg: {
    width: 36,
    height: 36,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: GILROY_REGULAR,
  },
  subText: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
  btnContainer: {
    borderTopWidth: 1,
    borderColor: lightGrey,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  Cart: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnBorder: {
    borderRightWidth: 1,
    borderColor: lightGrey,
    height: "100%",
  },
  btnCart: {
    fontSize: 16,
    color: blue,
    fontWeight: "400",
    textAlign: "center",
  },
  btnContinue: {
    fontSize: 16,
    color: red,
    textAlign: "center",
  },
  omocStyle: {
    marginTop: 7,
    marginLeft: 8,
  },
  selectView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
    marginHorizontal: 15,
    marginTop: 15,
  },
  CheckBox: {
    height: 18,
    width: 18,
    marginRight: 14,
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 100,
    gap: 10,
  },
  cartIcon: { width: 50, height: 50, tintColor: skyBlueColor },
  emptyCartText: {
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    color: skyBlueColor,
  },
});
