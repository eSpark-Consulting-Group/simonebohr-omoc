import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import VectorImage from "react-native-vector-image";
import FastImage from "react-native-fast-image";
import {
  blackColor,
  grey,
  midBlack,
  purple,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import {
  add_icon,
  back_icon,
  orderList_icon,
  profile_pic1,
  setting_icon,
  verifyBlue_icon,
} from "../../utils/images";
import { strings } from "../../assets/string/strings";
import HeaderTabBar from "../../components/HeaderTabBar";
import { favouriteData } from "../../sampleData/HelpFavouriteData";
import FavoriteItemsComponent from "../../components/FavoriteItemsComponent";
import WishList from "./WishList";
import UploadBottomSheet from "../../components/UploadBottomSheet";
import LikeBottomSheet from "../../components/LikeBottomSheet";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";
import { GILROY_MEDIUM } from "../../utils/fonts";
import AddWhishcart from "../../components/AddWhishcart";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

const MyProfile = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const [likePerson, setLikePerson] = useState(false);
  const [wishListModal, setWishListModal] = useState(false);
  const [wishCartData, setWishCartData] = useState(null);
  const cart = useSelector((state: any) => state.CartSlice);
  const [loder, setLoader] = useState(false);
  const userData = useSelector((state) => state?.profile?.user);

  const buttonTab = [
    {
      label: strings.POSTS,
    },
    {
      label: strings.WISHLIST,
    },
  ];

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

  const onAddBtn = async (text) => {
    try {
      const obj = {
        name: text,
      };
      const response = await ApiService.addWishlist(obj);
      if (response.status === true) {
        const data = {
          id: response?.data?._id,
          name: text,
          count: 0,
          thumbnail: "",
        };
        setWishCartData((prve) => [...prve, data]);
        showMessage({
          message: response.message,
          duration: 3000,
          backgroundColor: "skyblue",
          type: "success",
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

  const handleUploadStoryPress = (val) => {
    navigation.navigate("StoryTaker", { type: val });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => navigation.goBack("")}
        >
          <VectorImage style={styles.backIcon} source={back_icon} />
        </TouchableOpacity>
        <View style={styles.rightIconContainer}>
          <TouchableOpacity
            style={styles.leftIcon}
            onPress={() => {
              setBottomSheetShow(true);
            }}
          >
            <VectorImage style={styles.rightIcon} source={add_icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.leftIcon}
            onPress={() => navigation.navigate("AllOrderList")}
          >
            <VectorImage style={styles.rightIcon} source={orderList_icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.leftIcon}
            onPress={() => navigation.navigate("SettingScreen")}
          >
            <VectorImage
              style={[styles.icon, styles.rightIcon]}
              source={setting_icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainer}>
        <FastImage
          style={styles.profileImg}
          source={{
            uri: userData?.profileImg,
            priority: FastImage.priority.high,
          }}
          defaultSource={profile_pic1}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.imgContainer}>
          <Text style={styles.headingText}>{userData?.name}</Text>
          {<VectorImage source={verifyBlue_icon} />}
        </View>
        <View style={styles.follower}>
          <Text style={[styles.subText]}>123 {strings.FOLLOWING}</Text>
          <View style={styles.border}></View>
          <Text style={styles.subText}>123 {strings.FOLLOWER}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View
          style={[
            styles.flatStyle,
            { marginTop: selectedIndex === 0 ? "20%" : "5%" },
          ]}
        >
          <HeaderTabBar
            selectedIndex={selectedIndex}
            buttonTab={buttonTab}
            fullWidth={true}
            onChangeTab={(index) => {
              setSelectedIndex(index);
            }}
            bgColor={purple}
          />
        </View>
        {selectedIndex === 0 ? (
          <View style={styles.post}>
            <FlatList
              data={favouriteData}
              renderItem={({ item }) => {
                return (
                  <FavoriteItemsComponent
                    data={item}
                    onPress={() => {
                      setLikePerson(true);
                    }}
                    onProfileClick={() => {
                      navigation.navigate("OtherProfile");
                    }}
                  />
                );
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.wishContent}
            />
          </View>
        ) : (
          <View style={styles.post}>
            <TouchableOpacity
              onPress={() => setWishListModal(true)}
              style={styles.textWishView}
            >
              <Text style={styles.blackText}>Your Wishlist</Text>
              <Text style={styles.blueText}>Edit wishlist</Text>
            </TouchableOpacity>
            <FlatList
              key={(data) => data.description}
              numColumns={2}
              data={wishCartData}
              renderItem={({ item }) => {
                return <WishList navigation={navigation} data={item} />;
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={styles.wishStyle}
              contentContainerStyle={styles.wishContent}
            />
          </View>
        )}
      </View>

      {bottomSheetShow && (
        <Modal visible={bottomSheetShow} transparent>
          <UploadBottomSheet
            hideMe={() => setBottomSheetShow(false)}
            onPressUpload={handleUploadStoryPress}
          />
        </Modal>
      )}
      {!!likePerson && (
        <Modal visible={likePerson} transparent>
          <LikeBottomSheet hideMe={() => setLikePerson(false)} />
        </Modal>
      )}

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
      {loder && <Spinner animating={loder} />}
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: blackColor,
  },
  leftIcon: {
    width: 48,
    height: 48,
    backgroundColor: midBlack,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 373,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  rightIconContainer: {
    flexDirection: "row",
    gap: 15,
  },
  rightIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: whiteColor,
  },
  backIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    tintColor: whiteColor,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius:999,
  },
  headingText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
  },
  subText: {
    fontSize: 12,
    color: grey,
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 15,
  },
  follower: {
    flexDirection: "row",
    gap: 5,
  },
  border: {
    width: 1,
    height: 18,
    backgroundColor: grey,
  },
  imgContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  container: {
    backgroundColor: whiteColor,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 28,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  flatStyle: {
    width: "92%",
    alignSelf: "center",
    justifyContent: "center",
  },
  post: {
    paddingBottom: "60%",
    marginTop: 15,
  },
  textWishView: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
    marginBottom: 15,
  },
  blueText: {
    fontSize: 15,
    fontFamily: GILROY_MEDIUM,
    color: skyBlueColor,
  },
  blackText: {
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    color: blackColor,
  },
  wishContent: {
    justifyContent: "center",
    paddingBottom: "35%",
    alignContent: "center",
  },
  wishStyle: { alignContent: "center", alignSelf: "center" },
});
