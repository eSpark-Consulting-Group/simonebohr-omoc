import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { palceholders, strings } from "../../assets/string/strings";
import {
  whiteColor,
  lightGrey50,
  skyBlueColor,
  blackColor,
  red,
  grey,
} from "../../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { WishlistSrcData } from "../../sampleData/WishlistSrcData";
import WishlistsDetails from "../../components/WishlistsDetails";
import VectorImage from "react-native-vector-image";
import { add_icon, dots_icon } from "../../utils/images";
import WishlistsComponents from "../../components/WishlistsComponent";
import { favouriteData } from "../../sampleData/HelpFavouriteData";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import AddWhishcart from "../../components/AddWhishcart";
import Spinner from "../../components/Spinner";
import en from "../../assets/string/en";

const screenHeight = Dimensions.get("window").height;
const percentageHeight = 20;

const WishlistsScreen = ({ navigation,route }) => {
  const { selectedProduct } = route.params;
  const [loder, setLoader] = useState(false);
  const [wishCartData, setWishCartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [switches, setSwitches] = useState(false);
  const [wishListModal, setWishListModal] = useState(false);

  useEffect(() => {
    getCartLists();
  }, []);

  const getCartLists = async () => {
    try {
      setLoader(true);
      const response = await ApiService.getWishlist();
      setWishCartData(response.data);
      setLoader(false);
    } catch (e) {
      showMessage({
        message: "Internal Server Error",
        duration: 3000,
        backgroundColor: "skyblue",
        type: "danger",
      });
    }
  };

 const newData = [
    ...wishCartData,
    {
      count: 0,
      id: "new collection",
      name: "new collection",
      thumbnail: "",
    },
  ];

// ------- create wishlist --------
  const onAddBtn = async (text) => {
    try {
      const obj = {
        name: text,
      };
      const response = await ApiService.addWishlist(obj);
      getCartLists();
      if (response.status === true){
        showMessage({
          message:response.message,
          duration: 3000,
          backgroundColor: "skyblue",
          type:'success',
        });
      }
    } catch (e) {
      showMessage({
        message: "Internal Server Error",
        duration: 3000,
        backgroundColor: "skyblue",
        type: "danger",
      });
    }
  };


  // -------- Product added to wishlist--------
  const handleSelectedData = async(item: WishItem) => {
    try {
      const Id = [];
      const productIds = selectedProduct.map((item) => item._id);
      Id.push(...productIds);
      const data = {
        wishListId:item.id,
        productIds:Id
      }
      const response = await ApiService.addWishlistProduct(data);
      navigation.navigate("AllWishlist", {
        headerName: item,
      });
      showMessage({
        message: en.addToCart,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    } catch (e) {
      showMessage({
        message: en.InternalServerError,
        duration: 3000,
        backgroundColor: skyBlueColor,
        type: "danger",
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.backBtn}>
        <CustomHeaderShown navigation={navigation} title={strings.WISHLISTS} />
      </View>
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={newData}
          renderItem={({ item }) => {
            return (
              <View>
                {item.name === "new collection" ? (
                <View style={styles.borderContainer}>
                <TouchableOpacity style={styles.newWishlistContainer}
                onPress={()=>setWishListModal(true)}
                >
                  <VectorImage source={add_icon} style={styles.addIcon} />
                  <Text style={styles.newWishlistText}>{strings.NEW_WISHLIST}</Text>
                </TouchableOpacity>
              </View>
                ) : (
                  <TouchableOpacity style={styles.mainContainer} 
                  onPress={()=>handleSelectedData(item)}
                  >
                    {item?.thumbnail ? (
                      <ImageBackground
                        style={styles.bgImg}
                        imageStyle={styles.imageStyle}
                        source={{
                          uri:
                            item?.thumbnail ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl20Tuf0ZhpbNa24X1Kaw3NgZ1Rhy2bdbkGw&usqp=CAU",
                        }}
                      >
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                          <Menu>
                            <MenuTrigger>
                              <VectorImage
                                style={styles.dotsIcon}
                                source={dots_icon}
                              />
                            </MenuTrigger>
                            <MenuOptions customStyles={optionsStyles}>
                              <MenuOption style={styles.privateView}>
                                <Text style={styles.reportText}>
                                  {palceholders.PRIVATE_WISHLIST}
                                </Text>
                                <Switch
                                  value={switches}
                                  onValueChange={() => setSwitches(true)}
                                  trackColor={{
                                    true: "#0094FF",
                                    false: "grey",
                                  }}
                                  style={{
                                    transform: [
                                      { scaleX: 0.7 },
                                      { scaleY: 0.7 },
                                    ],
                                    marginTop: 18,
                                  }}
                                />
                              </MenuOption>
                              <MenuOption>
                                <Text style={styles.shareText}>
                                  {palceholders.SHARE_WISHLIST}
                                </Text>
                              </MenuOption>
                              <MenuOption
                                onSelect={() => {
                                  setShowModal(false);
                                }}
                              >
                                <Text style={styles.copyLinkText}>
                                  {palceholders.DELETE_WISHLIST}
                                </Text>
                              </MenuOption>
                            </MenuOptions>
                          </Menu>
                        </TouchableOpacity>

                        <View style={styles.bgText}>
                          <Text style={styles.headingText}>{item?.name}</Text>
                          <Text style={styles.subText}>24 Product</Text>
                        </View>
                      </ImageBackground>
                    ) : (
                      <View style={styles.bgImg}>
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                          <Menu>
                            <MenuTrigger>
                              <VectorImage
                                style={styles.dotsIcon}
                                source={dots_icon}
                              />
                            </MenuTrigger>
                            <MenuOptions customStyles={optionsStyles}>
                              <MenuOption style={styles.privateView}>
                                <Text style={styles.reportText}>
                                  {palceholders.PRIVATE_WISHLIST}
                                </Text>
                                <Switch
                                  value={switches}
                                  onValueChange={() => setSwitches(true)}
                                  trackColor={{
                                    true: "#0094FF",
                                    false: "grey",
                                  }}
                                  style={{
                                    transform: [
                                      { scaleX: 0.7 },
                                      { scaleY: 0.7 },
                                    ],
                                    marginTop: 18,
                                  }}
                                />
                              </MenuOption>
                              <MenuOption>
                                <Text style={styles.shareText}>
                                  {palceholders.SHARE_WISHLIST}
                                </Text>
                              </MenuOption>
                              <MenuOption
                                onSelect={() => {
                                  setShowModal(false);
                                }}
                              >
                                <Text style={styles.copyLinkText}>
                                  {palceholders.DELETE_WISHLIST}
                                </Text>
                              </MenuOption>
                            </MenuOptions>
                          </Menu>
                        </TouchableOpacity>

                        <View style={styles.bgText}>
                          <Text style={styles.headingText}>{item?.name}</Text>
                          <Text style={styles.subText}>24 Product</Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.wishList}
          columnWrapperStyle={{ gap: 12 }}
        />
      </View>



      <View style={styles.recomendationView}>
        <Text style={styles.recomendationText}>
          {strings.RECOMENDATION_FOR_YOU}
        </Text>
      </View>
      <FlatList
        data={favouriteData}
        renderItem={({ item }) => {
          return (
            <WishlistsComponents
              data={item}
              onPress={() => {
                setLikePerson(true);
              }}
              onProfileClick={() => {
                // navigation.navigate("OtherProfile");
              }}
            />
          );
        }}
        // showsHorizontalScrollIndicator={false}
        // showsVerticalScrollIndicator={false}
        style={styles.dataStyle}
      />
       {loder && <Spinner animating={loder} />}
      <Modal visible={wishListModal} animationType="slide" transparent>
        <AddWhishcart
          hideMe={() => setWishListModal(false)}
          ontext={() => {
            setWishListModal(false);
          }}
          onAdded={(data) => {
            onAddBtn(data);
            setWishListModal(false);
          }}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default WishlistsScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  backBtn: {
    marginHorizontal: 15,
  },
  maskImg: {
    height: "50%",
    width: "50%",
  },
  maskText: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 15,
  },
  headingText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    marginTop: 20,
  },
  subText: {
    color: lightGrey50,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 30,
  },
  wishList: {
    width: "95%",
    marginTop: 10,
    alignSelf: "center",
  },
  borderContainer: {
    borderColor: skyBlueColor,
    borderStyle: "dashed",
    borderWidth: 1.8,
    borderRadius: 13,
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    margin: 10,
    alignSelf: "center",
  },
  container: {
    marginTop: 20,
    height:'50%'
  },
  addIcon: {
    tintColor: skyBlueColor,
    height: 24,
    width: 24,
  },
  newWishlistText: {
    color: skyBlueColor,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  newWishlistContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  recomendationText: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 18,
  },
  recomendationView: {
    marginLeft: 15,
    marginVertical: 10,
  },
  dataStyle: {
    height: "42%",
  },
  mainContainer: {
    backgroundColor: grey,
    // width: "95%",
    marginHorizontal: 8,
    // height: (screenHeight * percentageHeight) / 100,
    opacity: 0.9,
    borderRadius: 20,
    marginBottom: 10,
  },
  bgImg: {
    width: 165,
    height: 167,
    borderRadius: 15,
    alignSelf:"center",
  },
  imageStyle: {
    width: 165,
    height: 167,
    resizeMode:'cover',
    borderRadius: 15,
    alignSelf:"center",
  },
  bgText: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 15,
  },
  headingText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    marginTop: 20,
  },
  subText: {
    color: lightGrey50,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    marginBottom: 10,
  },
  dotsIcon: {
    height: 15,
    width: 15,
    marginTop: 15,
    marginRight: 6,
    tintColor: whiteColor,
    alignSelf: "flex-end",
  },
  reportText: {
    color: blackColor,
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    marginTop: 18,
  },
  shareText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    color: blackColor,
  },
  copyLinkText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    color: red,
    marginVertical: 10,
  },
  privateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "transparent",
    paddingRight: 24,
    marginTop: 10,
  },
  optionsWrapper: {
    borderRadius: 15,
    backgroundColor:whiteColor,
    paddingLeft: 12,
    // width: "120%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.4,
    elevation: 3,
  },
};
