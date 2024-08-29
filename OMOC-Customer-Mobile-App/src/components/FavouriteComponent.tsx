import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  dangerRed,
  lightBlack,
  neutralBlack,
  purple,
  whiteColor,
} from "../utils/colors";
import VectorImage from "react-native-vector-image";
import {
  brandIcon,
  chats_icon,
  dislike_icon,
  like_icon,
  product_image,
  profile_pic,
  save_icon,
  send_icon,
  three_dot_Icon,
  verifyBlue_icon,
} from "../utils/images";
import FastImage from "react-native-fast-image";
import {
  GILROY_BOLD,
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../utils/fonts";
import { strings } from "../assets/string/strings";
import { Dimensions } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Swiper from "react-native-swiper";

const width = Dimensions.get("window").width;
const cardHeight = Dimensions.get("window").height;
const cardHeightPercentage = 49;

const FavouriteComponent = ({
  data,
  onPress,
  onProfileClick,
  bottomSheet,
  handleLikePress,
  onCommentPress,
}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [likesCount, setLikesCount] = useState(data.likesCount);
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(
    data.isLikedByCurrentUser
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let intervalId = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === data?.files.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  const handleBottomSheet = () => {
    bottomSheet(true);
    setShowBottomSheet(true);
  };

  const handlePressLike = (postId) => {
    setIsLikedByCurrentUser(!isLikedByCurrentUser);
    setLikesCount((prevLikesCount) =>
      isLikedByCurrentUser ? prevLikesCount - 1 : prevLikesCount + 1
    );
    const likeData = {
      postId: postId,
      isLiked: !isLikedByCurrentUser,
    };
    handleLikePress(likeData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.headerProfileView}
          onPress={onProfileClick}
        >
          <FastImage
            source={{ uri: data?.createdBy?.profileImgUrl }}
            style={styles.userProfile}
            defaultSource={profile_pic}
          />
          <Text style={styles.itemText}>{data?.createdBy?.userName}</Text>
          <VectorImage source={verifyBlue_icon} />
        </TouchableOpacity>
        <Menu>
          <MenuTrigger>
            <VectorImage source={three_dot_Icon} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.modalContent}>
            <MenuOption onSelect={handleBottomSheet} style={styles.viewRemove}>
              <Text style={styles.remove}>{strings.REPORT_POST}</Text>
            </MenuOption>
            <MenuOption style={styles.viewBan}>
              <Text style={styles.banUser}>{strings.COPY_LINK}</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => Alert.alert(`Delete`)}
              style={styles.viewBan}
            ></MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={{ flex: 1 }}>
        {data?.files && data.files.length > 1 ? (
          <>
            <Swiper
              index={0}
              activeDotColor={purple}
              dotColor="#9039FF80"
              style={styles.wrSliderer}
              showsPagination={true}
              loop={false}
            >
              {data.files &&
                data.files.map((item, index) => {
                  return (
                    <View style={styles.slide} key={index.toString()}>
                      <FastImage
                        source={{ uri: item?.url }}
                        style={styles.multipleImagePhoto}
                      />
                    </View>
                  );
                })}
            </Swiper>
          </>
        ) : (
          <View style={styles.slide}>
            <FastImage
              source={{ uri: data?.files[0]?.url }}
              style={styles.mainImage}
              resizeMode="cover"
            />
          </View>
        )}
      </View>
      <Text style={styles.checkText}>{strings.CHECK_TEXT}</Text>
      <View style={styles.itemFooterView}>
        <TouchableOpacity onPress={onPress} style={styles.itemLikeView}>
          <View style={styles.likedByImages}>
            {data?.likes?.slice(0, 3).map((user, index) => (
              <FastImage
                key={index}
                source={index % 2 === 0 ? product_image : brandIcon}
                style={styles.likedByImage}
              />
            ))}
          </View>
          {!!data.likes.length ? (
            <Text style={styles.likesText}>
              Liked by
              <Text style={styles.likedByText}> {data.likes[0]?.name} </Text>
              {likesCount >= 2 ? (
                <Text style={styles.likedByText}>
                  {strings.AND} {likesCount - 1} others
                </Text>
              ) : null}
            </Text>
          ) : null}
        </TouchableOpacity>
        <View style={styles.actionsView}>
          <TouchableOpacity>
            <VectorImage source={save_icon} style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePressLike(data?._id)}>
            <VectorImage
              source={isLikedByCurrentUser ? like_icon : dislike_icon}
              style={
                isLikedByCurrentUser ? styles.actionIcon : styles.dislikeIcon
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onCommentPress}>
            <VectorImage source={chats_icon} style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <VectorImage source={send_icon} style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default FavouriteComponent;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  container: {
    width: "95%",
    height: (cardHeight * cardHeightPercentage) / 100,
    borderRadius: 10,
    paddingVertical: 10,
    alignSelf: "center",
    marginBottom: 15,
    padding: 0,
    backgroundColor: whiteColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,

    elevation: 2,
  },
  itemFooterView: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionsView: {
    flexDirection: "row",
    gap: 10,
    marginRight: 10,
  },
  likedByImages: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginLeft: 10,
  },
  likedByImage: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginRight: -7,
    borderWidth: 0.1,
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  dislikeIcon: {
    width: 20,
    height: 20,
    tintColor: "black",
    resizeMode: "contain",
  },
  itemLikeView: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    gap: 5,
  },
  likesText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 10,
    color: neutralBlack,
    width: 120,
  },
  likedByText: {
    fontFamily: GILROY_BOLD,
    fontSize: 10,
    color: neutralBlack,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },
  headerProfileView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  userProfile: {
    width: 32,
    height: 32,
    borderRadius: 999,
  },
  itemText: {
    color: neutralBlack,
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    marginTop: 15,
  },
  checkText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: neutralBlack,
    marginLeft: 10,
  },
  modalContent: {
    marginRight: 20,
    marginTop: "5%",
    width: 115,
    height: 80,
    alignSelf: "center",
    padding: 8,
    alignItems: "center",
    backgroundColor: whiteColor,
    borderRadius: 12,
  },
  banUser: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 17,
    color: neutralBlack,
  },
  viewBan: {
    borderRadius: 8,
    padding: 10,
    gap: 10,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 12,
  },
  code: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: lightBlack,
    lineHeight: 18,
  },
  remove: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 12,
    color: dangerRed,
  },
  viewRemove: {
    borderRadius: 8,
    padding: 10,
    gap: 10,
  },
  multipleImagePhoto: {
    height: "100%",
    width: "100%",
    marginTop: 15,
  },
  wrSliderer: {},
  slide: {
    flex: 0.9,
  },
  paginationStyle: {
    backgroundColor: "#000000",
    paddingVertical: 4,
    borderRadius: 10,
    paddingHorizontal: 15,
    position: "absolute",
    top: 20,
    right: 20,
  },
  paginationText: {
    color: "#fcfcfa",
    fontSize: 14,
  },
  dotView: {
    backgroundColor: "#bcbec2",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 5,
  },
  activeDotView: {
    backgroundColor: "#000000",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 5,
  },
  dotContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
