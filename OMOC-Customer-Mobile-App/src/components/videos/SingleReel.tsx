import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Video from "react-native-video";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import {
  bag_icon,
  chats_icon,
  heart_icon,
  like_icon,
  profile_pic1,
  search_icon,
  verifyBlue_icon,
} from "../../utils/images";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { dangerRed, whiteColor } from "../../utils/colors";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const SingleReel = ({ item, index, currentIndex }) => {
  const videoRef = useRef(null);

  const onBuffer = (buffer) => {
    // console.log("buffring", buffer);
  };
  const onError = (error) => {
    // console.log("error", error);
  };

  const [mute, setMute] = useState(false);

  const [like, setLike] = useState(item.isLike);

  return (
    <View style={styles.safeArea}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMute(!mute)}
        style={styles.subContainer}
      >
        <Video
          videoRef={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          repeat={true}
          resizeMode="cover"
          paused={currentIndex == index ? false : true}
          source={{ uri: item?.files[0].url }}
          muted={mute}
          style={styles.videoPlayerStyle}
        />
      </TouchableOpacity>
      <View style={styles.topTab}>
        <View style={styles.videoHeaderOptions}>
          <TouchableOpacity style={styles.optionsTab}>
            <Text style={styles.videoHeaderOptionsText}>Livestream</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.optionsTab, borderBottomColor: whiteColor }}
          >
            <Text style={styles.videoHeaderOptionsText}>For You</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionsTab}>
            <Text style={{ ...styles.videoHeaderOptionsText }}>Following</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchIconView} onPress={() => {}}>
          <VectorImage source={search_icon} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomTab}>
        <View style={styles.detailsView}>
          <View style={styles.profileView}>
            <FastImage
              source={{uri:item?.createdBy?.profileImgUrl}}
              style={styles.profileImage}
              defaultSource={profile_pic1}
              resizeMode="stretch"
            />
            <Text style={styles.userName}>{item.createdBy.name}</Text>
            <VectorImage source={verifyBlue_icon} style={styles.verifyIcon} />
          </View>
          <View style={styles.actionView}>
            <TouchableOpacity
              style={styles.iconBox}
              onPress={() => setLike(!like)}
            >
              <VectorImage
                source={like ? like_icon : heart_icon}
                style={like ? styles.likedIcon : styles.actionIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox} onPress={() => {}}>
              <VectorImage source={chats_icon} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBox} onPress={() => {}}>
              <VectorImage source={bag_icon} style={styles.actionIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.captionsText}>{item.description}</Text>
      </View>
    </View>
  );
};

export default SingleReel;

export const styles = StyleSheet.create({
  safeArea: {
    width: windowWidth,
    height: windowHeight - 100,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  topTab: {
    width: "95%",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    zIndex: 3,
    top: 90,
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
  verifyIcon: { width: 13.3, height: 13.3, tintColor: whiteColor },
  detailsView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
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
  videoPlayerStyle: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  subContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  videoHeaderOptions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    alignSelf: "center",
  },
  videoHeaderView: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  searchIconView: {
    width: 44,
    height: 44,
    position: "absolute",
    right: 10,
    top: 0,
  },
  videoHeaderOptionsText: {
    color: whiteColor,
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 17,
  },
  optionsTab: {
    borderBottomWidth: 1,
    padding: 2,
    borderBottomColor: "transparent",
  },
});
