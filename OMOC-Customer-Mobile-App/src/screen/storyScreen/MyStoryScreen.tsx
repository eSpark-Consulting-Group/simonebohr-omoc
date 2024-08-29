import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { ProgressBar } from "./ProgressBar/ProgressBar";
import VectorImage from "react-native-vector-image";
import {
  chats_icon,
  three_dot_Icon,
  users_group_image,
} from "../../utils/images";
import FastImage from "react-native-fast-image";
import { blackColor, neutralBlack, whiteColor } from "../../utils/colors";
import StoryViewsBottomSheet from "../../components/storyComponent/StoryViewsBottomSheet";
import StoryMoreBottomSheet from "../../components/storyComponent/StoryMoreBottomSheet";
import StoryCommentsBottomSheet from "../../components/storyComponent/StoryCommentsBottomSheet";
import SuperImage from "./SuperImage";
import { useMyStoryScreen } from "./useMyStoryScreen";

export const MyStoryScreen = ({ navigation }) => {
  const { userStories, progresses, stories, currentIndex, goBack, goForward } =
    useMyStoryScreen({ navigation });
  const [showStoryView, setShowStoryView] = useState(false);
  const [showStoryMore, setShowStoryMore] = useState(false);
  const [showStoryComments, setShowStoryComments] = useState(false);

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
        <View style={styles.actionView}>
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => setShowStoryComments(true)}
          >
            <VectorImage source={chats_icon} style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => setShowStoryView(true)}
          >
            <FastImage source={users_group_image} style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => setShowStoryMore(true)}
          >
            <VectorImage source={three_dot_Icon} style={styles.moreIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {showStoryView && (
        <Modal visible={showStoryView} transparent>
          <StoryViewsBottomSheet
            hideMe={() => {
              setShowStoryView(false);
            }}
            data = {stories[currentIndex]}
          />
        </Modal>
      )}
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
  userName: {
    fontSize: 16,
    color: whiteColor,
    fontWeight: "bold",
    shadowColor: blackColor,
    textShadowRadius: 4,
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
    justifyContent: "flex-end",
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
    backgroundColor: "white",
    opacity: 0.9,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    width: 26,
    height: 26,
    tintColor: blackColor,
    opacity: 2,
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
});
