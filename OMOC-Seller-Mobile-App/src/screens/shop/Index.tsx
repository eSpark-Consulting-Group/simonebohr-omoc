import React, { useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View ,SafeAreaView, Modal, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ShopHeader from "../../component/ShopHeader";
import VectorImage from "react-native-vector-image";
import FastImage from "react-native-fast-image";
import HeaderTabBar from "../../component/HeaderTabBar";
import FavoriteItemsComponent from "./FavoriteItemsComponent";
import { Colors } from "../../utils/colors";
import { GILROY_MEDIUM } from "../../utils/fonts";
import { salePost, verifyBlue_icon } from "../../utils/images";
import { strings } from "../../utils/string/strings";
import UploadBottomSheet from "../../component/UploadBottomSheet";


export const favouriteData = [
  {
    id: 1,
    title: "OmocOfficial",
    likes: [
      { name: "omoc" },
      { name: "omoc2" },
      { name: "omoc3" },
      { name: "omoc4" },
    ],
    liked: true,
  },
  {
    id: 2,
    title: "OmocOfficial2",
    likes: [
      { name: "omoc" },
      { name: "omoc2" },
      { name: "omoc3" },
      { name: "omoc4" },
    ],
    liked: true,
  },
  {
    id: 3,
    title: "OmocOfficial3",
    likes: [
      { name: "omoc" },
      { name: "omoc2" },
      { name: "omoc3" },
      { name: "omoc4" },
    ],
    liked: true,
  },
  {
    id: 4,
    title: "OmocOfficial4",
    likes: [
      { name: "omoc" },
      { name: "omoc2" },
      { name: "omoc3" },
      { name: "omoc4" },
    ],
    liked: true,
  },
];

const Shop = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bottomSheetShow, setBottomSheetShow] = useState(false);
  const [likePerson, setLikePerson] = useState(false);

  const buttonTab = [
    {
      label: strings.POSTS,
    },
    {
      label: strings.DRAFT,
    },
  ];

  const handleUploadStoryPress = () => {
    navigation.navigate("CreatePost");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <ShopHeader
        title={"My Shop"}
        onAddPress={()=>setBottomSheetShow(true)}
        onSettingPress={() => navigation.navigate("ShopSettingScreen")}
        mainStyle={{marginTop:10}}
      />
       
      <View style={styles.subContainer}>
        <FastImage
          style={styles.profileImg}
          source={salePost}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.imgContainer}>
          <Text style={styles.headingText}>userData?.name</Text>
          {<VectorImage source={verifyBlue_icon} />}
        </View>
        <View style={styles.follower}>
          <Text style={[styles.subText]}>123 {strings.FOLLOWING}</Text>
          <View style={styles.border}></View>
          <Text style={styles.subText}>123 {strings.FOLLOWERS}</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
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
            bgColor="#9039FF"
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
                      // setLikePerson(true);
                    }}
                    onProfileClick={() => {
                      // navigation.navigate("OtherProfile");
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
         null
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

    </SafeAreaView>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.blackColor,
  },
  leftIcon: {
    width: 48,
    height: 48,
    backgroundColor: Colors.midBlack,
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
    tintColor: "#FFFFFF",
  },
  backIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    tintColor: "#FFFFFF",
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius:999,
  },
  headingText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  subText: {
    fontSize: 12,
    color: Colors.grey,
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
    backgroundColor: Colors.grey,
  },
  imgContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  itemContainer: {
    backgroundColor: Colors.whiteColor,
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
    color: Colors.skyBlueColor,
  },
  blackText: {
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
  },
  wishContent: {
    justifyContent: "center",
    paddingBottom: "35%",
    alignContent: "center",
  },
  wishStyle: { alignContent: "center", alignSelf: "center" },
});
