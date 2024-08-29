import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import VectorImage from "react-native-vector-image";
import { arrow_down, document_download, plus } from "../../utils/images";
import SearchTabBar from "../../component/SearchTabBar";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import ProductInventoryComponent from "../../component/ProductInventoryComponent";
import AddYourProductBottomSheet from "../../component/AddYourProductBottomSheet";
import NewProductBottomSheet from "../../component/NewProductBottomSheet";

const ProductInventory = () => {
  const [active, setactive] = useState(false);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [newBottomSheet, setNewBottomSheet] = useState(false);
  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };
  return (
    <MenuProvider>
      <SafeAreaView style={styles.safeContainer}>
        <View>
          <Customheader showBackIcon={true} title={strings.INVENTORY} />
        </View>
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.titleManage}>
              {strings.MANAGE_YOUR_INVENTORY}
            </Text>
          </View>
          <View style={styles.containerBTN}>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={handleBottomSheet}
            >
              <VectorImage source={plus} style={styles.plusIcon} />

              <Text style={styles.textButtonPreview}>
                {strings.ADD_YOUR_PRODUCT}
              </Text>
            </TouchableOpacity>

            <View style={styles.buttonViewLondon}>
              <Text style={styles.textLondon}>{strings.LONDAN_STORE}</Text>
              <Menu>
                <MenuTrigger>
                  <VectorImage source={arrow_down} style={styles.arrowDown} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.modalContent}>
                  <MenuOption
                    onSelect={() => Alert.alert(`Edit`)}
                    style={styles.viewRemove}
                  >
                    <Text style={styles.remove}>{strings.CHICAGO_STORE}</Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => Alert.alert(`Delete`)}
                    style={styles.viewBan}
                  >
                    <Text style={styles.banUser}>{strings.LONDAN_STORE}</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </View>
          <View>
            <SearchTabBar
              placeholder={strings.SEARCH}
              style={styles.searchBar}
            />
          </View>
          <View style={styles.mainviewBox}>
            <TouchableOpacity
              onPress={() => {
                setactive(true);
              }}
              style={styles.viewBox}
            >
              <VectorImage
                source={document_download}
                style={styles.documentIcon}
              />
              <VectorImage
                source={arrow_down}
                style={styles.arrowDownDocument}
              />
            </TouchableOpacity>

            {
              <Modal
                transparent={true}
                visible={active}
                onRequestClose={() => {
                  console.warn("closed");
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    setactive(false);
                  }}
                >
                  <View style={styles.container}>
                    <View style={styles.mainviewExcel}>
                      <View style={styles.viewExcel}>
                        <Text style={styles.excel}>{strings.EXCEL}</Text>
                      </View>
                      <View style={styles.viewXps}>
                        <Text style={styles.xps}>{strings.XPS_DOCUMENT}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            }

            <View style={styles.viewBoxSort}>
              <Text style={styles.textSort}>{strings.SORT}</Text>
              <TouchableOpacity>
                <VectorImage source={arrow_down} style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <ProductInventoryComponent />
        </View>
        {showBottomSheet && (
          <AddYourProductBottomSheet
            addProduct={() => {
              setNewBottomSheet(true);
              setShowBottomSheet(false);
            }}
            hideMe={() => {
              setShowBottomSheet(false);
            }}
          />
        )}
        {newBottomSheet && (
          <NewProductBottomSheet
            hideMe={() => {
              setNewBottomSheet(false);
            }}
          />
        )}
      </SafeAreaView>
    </MenuProvider>
  );
};

export default ProductInventory;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  mainContainer: {
    marginHorizontal: 15,
  },
  titleManage: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    color: Colors.blackColor,
    marginTop: 30,
  },
  containerBTN: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 30,
  },
  textButton: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  textButtonPreview: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_MEDIUM,
    marginTop: 5,
    color: Colors.whiteColor,
  },
  buttonView: {
    width: "49%",
    height: 51,
    borderColor: Colors.skyBlueColor,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonViewLondon: {
    width: "49%",
    height: 51,
    borderColor: Colors.neutralGrey,
    borderWidth: 0.6,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "center",
  },
  plusIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 5,
  },
  arrowDown: {
    left: 15,
    height: 20,
    width: 20,
    tintColor: Colors.gulfBlue,
  },
  textLondon: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    marginTop: 5,
    fontWeight: "400",
    color: Colors.mediumGrey,
  },
  searchBar: {
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.neutralGrey,
  },
  viewBox: {
    width: 96,
    height: 48,
    backgroundColor: Colors.whiteColor,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.gray91,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainviewBox: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },
  documentIcon: {
    height: 24,
    width: 24,
    resizeMode: "contain",
    marginLeft: 20,
    tintColor: Colors.lightBlack,
  },
  arrowIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 20,
    tintColor: Colors.lightBlack,
  },
  viewBoxSort: {
    width: 159,
    height: 49,
    backgroundColor: Colors.whiteColor,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.gray91,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textSort: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.lightBlack,
    marginLeft: 20,
  },
  banned: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 12,
    alignSelf: "center",
    color: Colors.dangerRed,
    marginTop: 10,
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
  viewNamePost: {
    width: "90%",
    flexDirection: "row",
  },
  modalContent: {
    marginLeft: 50,
    marginTop: "12%",
    width: "45%",
    zIndex: 4,
    alignSelf: "center",
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
  },
  arrowDownDocument: {
    right: 15,
    height: 20,
    width: 20,
    tintColor: Colors.gulfBlue,
  },
  modalContentExcel: {
    marginTop: "1%",
    width: "45%",
    zIndex: 4,
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.dangerRed,
    borderRadius: 10,
    left: 50,
  },

  container: {
    flex: 1,
    justifyContent: "center",
  },

  mainviewExcel: {
    marginLeft: "-50%",
    width: 186,
    height: 108,
    zIndex: 4,
    alignSelf: "center",
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    bottom: 50,
    shadowColor: "#00000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.32,
    elevation: 3,
  },
  viewExcel: {
    width: 162,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.aliceBlue,
  },
  excel: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.skyBlueColor,
    marginTop: 10,
    marginHorizontal: 10,
  },
  viewXps: {
    width: 162,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.whiteColor,
    marginTop: 10,
  },
  xps: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.blackColor,
    marginTop: 10,
    marginHorizontal: 10,
  },
});
