import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, Text } from "react-native";
import { useStoryScreen } from "./useStoryScreen";
import { ProgressBar } from "./ProgressBar/ProgressBar";
import VectorImage from "react-native-vector-image";
import {
  bag_icon,
  chats_icon,
  heart_icon,
  like_icon,
  profile_pic1,
  verifyBlue_icon,
} from "../../utils/images";
import FastImage from "react-native-fast-image";
import { blackColor, dangerRed, neutralBlack, whiteColor } from "../../utils/colors";
import StoryMoreBottomSheet from "../../components/storyComponent/StoryMoreBottomSheet";
import StoryCommentsBottomSheet from "../../components/storyComponent/StoryCommentsBottomSheet";
import SuperImage from "./SuperImage";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";

export const StoryScreen = ({ route, navigation }) => {
  const {
    userStories,
    progresses,
    stories,
    currentIndex,
    goBack,
    goForward,
    setLiked,
    liked,
  } = useStoryScreen({ route, navigation });
  const [showStoryMore, setShowStoryMore] = useState(false);
  const [showStoryComments, setShowStoryComments] = useState(false);
  const { currentStoryIndex, storieUsers } = route.params;

  return (
    <View style={styles.safeArea}>
      <View style={styles.storyContainer}>
        <ProgressBar userStories={userStories} progresses={progresses} />
      </View>
      <SuperImage
        photo={stories[currentIndex]}
        showOnlyImage={false}
        fitSize={false}
      />
      <TouchableOpacity style={styles.backButton} onPress={goBack} />
      <TouchableOpacity style={styles.forwardButton} onPress={goForward} />
      <View style={styles.bottomTab}>
        <View style={styles.detailsView}>
          <View style={styles.profileView}>
            <FastImage
              source={{ uri: storieUsers[currentStoryIndex].profileImg }}
              style={styles.profileImage}
              defaultSource={profile_pic1}
            />
            <Text style={styles.userName}>
              {storieUsers[currentStoryIndex].name}
            </Text>
            <VectorImage source={verifyBlue_icon} style={styles.verifyIcon} />
          </View>
          <View style={styles.actionView}>
            <TouchableOpacity
              style={styles.iconBox}
              onPress={() => setLiked(true)}
            >
              <VectorImage
                source={liked ? like_icon : heart_icon}
                style={liked ? styles.likedIcon : styles.actionIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBox}
              onPress={() => setShowStoryComments(true)}
            >
              <VectorImage source={chats_icon} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBox}
              onPress={() => setShowStoryMore(true)}
            >
              <VectorImage source={bag_icon} style={styles.actionIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.captionsText}>
          Lorem ipsum dolor sit amet consectetur. Sapien ac sollicitudin egestas
          id eget pellentesque.Lorem ipsum dolor sit Read More
        </Text>
      </View>
      {showStoryMore && (
        <Modal visible={showStoryMore} transparent>
          <StoryMoreBottomSheet
            hideMe={() => {
              setShowStoryMore(false);
            }}
          />
        </Modal>
      )}
      {showStoryComments && (
        <Modal visible={showStoryComments} transparent>
          <StoryCommentsBottomSheet
            hideMe={() => {
              setShowStoryComments(false);
            }}
            data={stories[currentIndex]}
          />
        </Modal>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: neutralBlack },
  image: {
    flex: 1,
    aspectRatio: 0.5625,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 8,
    zIndex: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#FFF",
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 2,
    aspectRatio: 0.28125,
    height: "75%",
    top: 100,
    backgroundColor: "transparent",
    width: "49%",
  },
  forwardButton: {
    position: "absolute",
    right: 0,
    zIndex: 2,
    aspectRatio: 0.28125,
    height: "75%",
    top: 100,
    width: "49%",
    backgroundColor: "transparent",
  },
  bottomTab: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
    position: "absolute",
    bottom: 40,
    zIndex: 3,
  },
  messageBox: {
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "gray",
    width: "80%",
    padding: 10,
  },
  storyContainer: {
    position: "absolute",
    zIndex: 2,
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingTop: 50,
  },
  iconBox: {
    borderRadius: 30,
    backgroundColor: "#00000096",
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: whiteColor,
  },
  likedIcon: {
    width: 24,
    height: 24,
    tintColor: dangerRed,
  },
  profileImage: {
    width: 32,
    height: 32,
    tintColor: whiteColor,
    borderRadius: 999,
  },
  actionView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  moreIcon: {
    tintColor: blackColor,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 20,
  },
  verifyIcon: { width: 13.3, height: 13.3, tintColor: whiteColor },
  detailsView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    bottom: 40,
  },
  profileView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userName: {
    color: whiteColor,
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
  },
  captionsText: {
    color: whiteColor,
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
  },
});
