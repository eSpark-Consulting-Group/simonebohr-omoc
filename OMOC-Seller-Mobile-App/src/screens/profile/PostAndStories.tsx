import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { CONTEXT } from "../../utils/string/strings";
import {
  GILROY_LIGHT,
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import {
  arrow_down,
  calendarBlack,
  heartUnselect,
  imageFour,
  imageThree,
  imageTwo,
  imageone,
  messagesIcon,
  plus,
  salePostone,
  salePost,
  three_dots_icon,
  user_frame,
  deleteGrey,
  magicpen,
} from "../../utils/images";
import FastImage from "react-native-fast-image";
import BottomsheetCreatePost from "./BottomsheetCreatePost";

const PostAndStories = ({ navigation }) => {
  const [createPost, setCreatePost] = useState(false);
  const postData = [
    { id: 1, image: user_frame, like: "999k" },
    { id: 2, image: imageone, like: "999k" },
    { id: 3, image: imageTwo, like: "999k" },
    { id: 4, image: imageThree, like: "999k" },
    { id: 5, image: imageFour, like: "999k" },
    { id: 6, image: user_frame, like: "999k" },
  ];

  const [selectedStatus, setSelectedStatus] = useState("post");
  const [modalVisible, setModalVisible] = useState(false);
  const handleSelector = (name) => {
    setSelectedStatus(name);
  };

  const draftData = [
    { id: 1, image: salePostone, status: false },
    { id: 2, image: salePost, like: "HOT deals 2023 New...", status: true },
    { id: 3, image: salePostone, like: "HOT deals 2023 New...", status: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Customheader title={CONTEXT.POST_AND_STORIES} showBackIcon={true} />

      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>{CONTEXT.POST_AND_DASHBOARD}</Text>
        <Text style={styles.manageText}>{CONTEXT.MANAGE_YOUR_SHOP_ORDER}</Text>

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.blueView}
            onPress={() => setCreatePost(true)}
          >
            <VectorImage source={plus} style={[styles.pluseIcon]} />
            <Text style={styles.payText}>{CONTEXT.CREATE_POST}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortView}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={[styles.payText, { color: Colors.gray66 }]}>
              {CONTEXT.SORT_BY}
            </Text>
            <VectorImage source={arrow_down} style={styles.pluseIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabViewContiner}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flex: 1 }}
          >
            <TouchableOpacity
              style={[
                selectedStatus == "post"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => handleSelector("post")}
            >
              <Text
                style={[
                  selectedStatus == "post"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.POST}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedStatus == "story"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => handleSelector("story")}
            >
              <Text
                style={[
                  selectedStatus == "story"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.STORIES}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedStatus == "draft"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => handleSelector("draft")}
            >
              <Text
                style={[
                  selectedStatus == "draft"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.DRAFT}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                selectedStatus == "schedule"
                  ? styles.selectTab
                  : styles.unSelectTab,
              ]}
              onPress={() => handleSelector("schedule")}
            >
              <Text
                style={[
                  selectedStatus == "schedule"
                    ? styles.tabSelectTexT
                    : styles.tabUnSelectTexT,
                ]}
              >
                {CONTEXT.SCHEDULED}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {(selectedStatus === "post" ||
          selectedStatus === "story") && (
            <View style={styles.flatView}>
              <FlatList
                data={postData}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                renderItem={({ item }) => (
                  <View style={styles.viewFlat}>
                    <FastImage source={item.image} style={styles.userIcon} />
                    <View style={styles.positionDot}>
                      <VectorImage
                        source={three_dots_icon}
                        style={[
                          styles.pluseIcon,
                          { tintColor: Colors.blackColor },
                        ]}
                      />
                    </View>
                    <View style={styles.rowDirection}>
                      <VectorImage
                        source={heartUnselect}
                        style={[styles.pluseIcon, { marginHorizontal: 3 }]}
                      />
                      <Text style={[styles.smallText, { marginRight: 7 }]}>
                        {item.like}
                      </Text>
                      <VectorImage
                        source={messagesIcon}
                        style={styles.pluseIcon}
                      />
                      <Text style={styles.smallText}>123</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

        {selectedStatus == "draft" && (
          <View style={styles.flatView}>
            <FlatList
              data={draftData}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              renderItem={({ item }) => {
                return (
                  <View style={styles.viewFlat}>
                    <FastImage source={item.image} style={styles.userIcon} />
                    {item.status === false && (
                      <View style={styles.editView}>
                        <VectorImage
                          source={magicpen}
                          style={[styles.pluseIcon]}
                        />
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.darftEdit,
                            { color: Colors.skyBlueColor },
                          ]}
                        >
                          edit
                        </Text>
                      </View>
                    )}
                    {item.status === false && (
                      <View
                        style={[
                          styles.deleteView,
                          { backgroundColor: Colors.dangerRed },
                        ]}
                      >
                        <VectorImage
                          source={deleteGrey}
                          style={[
                            styles.pluseIcon,
                            { tintColor: Colors.whiteColor },
                          ]}
                        />
                        <Text numberOfLines={1} style={styles.darftEdit}>
                          {CONTEXT.DELETE}
                        </Text>
                      </View>
                    )}
                    <View style={styles.rowDirection}>
                      <Text numberOfLines={1} style={[styles.smallText]}>
                        {item.like}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}

        {selectedStatus == "schedule" && (
          <View style={styles.flatView}>
            <FlatList
              data={postData}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              renderItem={({ item }) => {
                return (
                  <View style={styles.viewFlat}>
                    <FastImage source={item.image} style={styles.userIcon} />
                    <View style={styles.positionDot}>
                      <VectorImage
                        source={three_dots_icon}
                        style={[
                          styles.pluseIcon,
                          { tintColor: Colors.blackColor },
                        ]}
                      />
                    </View>
                    <View style={styles.rowDirection}>
                      <VectorImage
                        source={calendarBlack}
                        style={[
                          styles.pluseIcon,
                          { marginHorizontal: 3, height: 14 },
                        ]}
                      />
                      <Text style={[styles.smallText]}>20 Feb 2023,</Text>

                      <Text
                        style={[
                          styles.smallText,
                          { fontFamily: GILROY_SEMIBOLD },
                        ]}
                      >
                        12.30
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}
      </View>

      {createPost && (
        <BottomsheetCreatePost
          hideMe={() => setCreatePost(false)}
          postCreate={() => {
            setCreatePost(false), navigation.navigate("CreatePost");
          }}
          storyCreate={() => {
            setCreatePost(false), navigation.navigate("CreateStory");
          }}
        />
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.viewRemove}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.remove}>{CONTEXT.NEWEST}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewBan}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.banUser}>{CONTEXT.OLDEST}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PostAndStories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  mainContainer: {
    marginTop: "5%",
    marginHorizontal: 13,
    flex: 1,
  },
  titleText: {
    fontSize: 23,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    marginTop: "6%",
  },
  manageText: {
    fontSize: 16,
    fontFamily: GILROY_LIGHT,
    color: Colors.blackColor,
    marginTop: "3%",
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  blueView: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: Colors.skyBlueColor,
    paddingVertical: 11.5,
  },
  payText: {
    fontSize: 15,
    fontFamily: GILROY_MEDIUM,
    color: Colors.whiteColor,
  },
  sortView: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 11.5,
    borderRadius: 25,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.lightGrey50,
    borderWidth: 0.7,
  },
  pluseIcon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    marginHorizontal: 7,
  },
  tabViewContiner: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "baseline",
    backgroundColor: Colors.whiteColor,
  },
  selectTab: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomColor: Colors.skyBlueColor,
    borderBottomWidth: 0.7,
  },
  unSelectTab: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
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
  modalContainer: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  modalContent: {
    marginTop: "60%",
    left: "23%",
    width: "40%",
    padding: 10,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.4,
    elevation: 5,
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
  banUser: {
    fontFamily: GILROY_MEDIUM,
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
  userIcon: {
    height: 110,
    width: 105,
    borderRadius: 8,
    resizeMode: "contain",
    backgroundColor: Colors.lightGrey,
  },
  draftImage: {
    height: 110,
    width: 105,
    borderRadius: 8,
    resizeMode: "contain",
  },
  positionDot: {
    position: "absolute",
    top: 18,
    left: "73%",
  },
  rowDirection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  smallText: {
    fontSize: 11,
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
  },
  darftEdit: {
    fontSize: 13,
    fontFamily: GILROY_REGULAR,
    color: Colors.whiteColor,
  },
  flatView: {
    flex: 1,
    marginBottom: "15%",
    marginTop: "3%",
  },
  viewFlat: {
    marginRight: "5%",
    width: "30%",
    paddingVertical: 12,
    alignSelf: "center",
    justifyContent: "center",
  },
  editView: {
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    top: "30%",
    flexDirection: "row",
    backgroundColor: Colors.whiteColor,
    borderRadius: 24,
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  deleteView: {
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: "35%",
    flexDirection: "row",
    backgroundColor: Colors.whiteColor,
    borderRadius: 24,
    paddingVertical: 7,
    paddingHorizontal: 8,
    alignItems: "center",
    marginTop: 20,
  },
});
