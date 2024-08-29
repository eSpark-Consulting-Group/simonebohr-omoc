import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import FastImage from "react-native-fast-image";
import {
  blackColor,
  grey,
  midBlack,
  purple,
  red,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import {
  back_icon,
  office_pic,
  profileImg,
  profile_add_icon,
  profile_add_icon_blue,
  three_dot_Icon,
  verifyBlue_icon,
} from "../../utils/images";
import { palceholders, strings } from "../../assets/string/strings";
import HeaderTabBar from "../../components/HeaderTabBar";
import { favouriteData } from "../../sampleData/HelpFavouriteData";
import FavoriteItemsComponent from "../../components/FavoriteItemsComponent";
import WishList from "./WishList";
import { WishListData } from "../../sampleData/WishListData";
import UploadBottomSheet from "../../components/UploadBottomSheet";
import LikeBottomSheet from "../../components/LikeBottomSheet";
import CustomFollowButton from "../../components/CustomFollowButton";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";

const OtherProfile = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const [likePerson, setLikePerson] = useState(false);
  const [moreOpteion, setMoreOption] = useState(false);
  const [suggestOption, setSuggestOption] = useState(false);
  const buttonTab = [
    {
      label: strings.POSTS,
    },
    {
      label: strings.WISHLIST,
    },
  ];
  const listUser = [
    { follow: "Following", stat: 1, name: "James Monmon" },
    { follow: "Follow", stat: 0, name: "James Monmon" },
    { follow: "Follow", stat: 0, name: "James Monmon" },
    { follow: "Follow", stat: 0, name: "James Monmon" },
    { follow: "Following", stat: 1, name: "James Monmon" },
    { follow: "Follow", stat: 0, name: "James Monmon" },
  ];
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <VectorImage style={styles.icon} source={back_icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => {
            setMoreOption(true);
          }}
        >
          <VectorImage style={[styles.rightIcon]} source={three_dot_Icon} />
        </TouchableOpacity>
      </View>
      {moreOpteion && (
        <Modal transparent={true}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalStyle}>
              <TouchableOpacity>
                <Text style={styles.modalText}>{strings.SHARE_PROFILE}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.modalTextColor}>{strings.REPORT_USER}</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      )}
      <View style={styles.subContainer}>
        <FastImage style={styles.profileImg} source={profileImg} />

        <View style={styles.imgContainer}>
          <Text style={styles.headingText}>{strings.DICKY_OMRON}</Text>
          <VectorImage source={verifyBlue_icon} />
        </View>
        <View style={styles.follower}>
          <Text style={[styles.subText]}>123 {strings.FOLLOWING}</Text>
          <View style={styles.border}></View>
          <Text style={styles.subText}>123 {strings.FOLLOWER}</Text>
        </View>
        <View style={styles.rightIconContainer}>
          <CustomFollowButton style={styles.followbtn} />
          <TouchableOpacity
            style={styles.iconAddProfile}
            onPress={() => setSuggestOption(!suggestOption)}
          >
            <VectorImage
              source={suggestOption ? profile_add_icon : profile_add_icon_blue}
            />
          </TouchableOpacity>
        </View>
      </View>

      {suggestOption && (
        <>
          <View style={styles.iconContainer}>
            <Text style={styles.suggestText}>
              {palceholders.SUGGESTION_FRIENDS}
            </Text>
            <Text style={styles.seeAllText}>{strings.SEE_ALL}</Text>
          </View>

          <View>
            <FlatList
              horizontal
              data={listUser}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.suggestMainStyle}>
                  <FastImage style={styles.profileImg} source={profileImg} />
                  <Text style={[styles.subText, styles.userName]}>
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={[styles.subText, { marginVertical: 10 }]}
                  >
                    Followed by andi,{"\n"}ando, +5
                  </Text>
                  <View
                    style={[
                      styles.followStyleBtn,
                      {
                        backgroundColor:
                          item.stat == 1 ? whiteColor : skyBlueColor,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.suggestText,
                        { color: item.stat == 1 ? skyBlueColor : whiteColor },
                      ]}
                    >
                      {item.follow}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </>
      )}

      <View style={[styles.container, { marginTop: suggestOption ? 0 : 20 }]}>
        <View style={styles.flatStyle}>
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
                  />
                );
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={styles.dataStyle}
              contentContainerStyle={styles.wishContent}
            />
          </View>
        ) : selectedIndex === 1 ? (
          <FlatList
            key={(data) => data.description}
            numColumns={2}
            data={WishListData}
            renderItem={({ item }) => {
              return <WishList data={item} navigation={navigation} />;
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.wishStyle}
            contentContainerStyle={styles.wishContent}
          />
        ) : null}
      </View>

      {bottomSheetShow && (
        <Modal visible={bottomSheetShow} transparent>
          <UploadBottomSheet
            hideMe={() => setBottomSheetShow(false)}
            onPressUpload={() => {}}
          />
        </Modal>
      )}
      {likePerson && (
        <Modal visible={likePerson} transparent>
          <LikeBottomSheet hideMe={() => setLikePerson(false)} />
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default OtherProfile;

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
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
  rightIconContainer: {
    flexDirection: "row",
    gap: 8,
  },
  icon: {
    tintColor: whiteColor,
  },
  rightIcon: {
    tintColor: whiteColor,
    height: 20,
    width: 4,
  },
  profileImg: {
    width: 60,
    height: 60,
  },
  headingText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
  },
  subText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: grey,
    textAlign: "center",
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
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
    height: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
  },
  dataStyle: {
    marginTop: 15,
  },
  flatStyle: {
    marginTop: 15,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
  },
  post: {
    paddingBottom: "60%",
  },
  wishList: {
    width: "100%",
    marginTop: 10,
    marginHorizontal: 12,
    marginBottom: "47%",
  },
  followbtn: {
    width: 149,
    height: 36,
    borderColor: skyBlueColor,
  },
  iconAddProfile: {
    backgroundColor: whiteColor,
    width: 36,
    height: 36,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  modalStyle: {
    backgroundColor: whiteColor,
    width: "33%",
    height: "33%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    gap: 15,
  },
  modalText: {
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    color: blackColor,
  },
  modalTextColor: {
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    color: red,
  },
  modalContainer: {
    alignItems: "flex-end",
    marginRight: 50,
    marginTop: "20%",
  },
  suggestMainStyle: {
    width: 110,
    alignItems: "center",
    backgroundColor: whiteColor,
    margin: 8,
    borderRadius: 20,
    padding: 6,
  },
  suggestText: {
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
    color: whiteColor,
  },
  seeAllText: {
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    color: skyBlueColor,
  },
  followStyleBtn: {
    paddingVertical: 5,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    borderColor: skyBlueColor,
    borderWidth: 1,
  },
  userName: {
    color: blackColor,
    marginTop: 7,
  },
  wishContent: {
    justifyContent: "center",
    paddingBottom: "35%",
    alignContent: "center",
  },
  wishStyle: { alignContent: "center", alignSelf: "center", marginTop: 10 },
});
