import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";
import { slider_horizontal, video_play } from "../../../utils/images";

const MediaComponent = ({ onPress, data, style }) => {
  return (
    <TouchableOpacity style={{ ...style }} onPress={onPress}>
      {data?.type === "posts" ? (
        <FastImage
          source={{ uri: data?.files[0]?.url }}
          style={styles.medaiSrcStyle}
          resizeMode="cover"
        />
      ) : (
        <Video
          repeat={true}
          resizeMode="cover"
          muted={true}
          source={{ uri: data?.files[0]?.url }}
          style={styles.medaiSrcStyle}
        />
      )}
      {data?.files.length > 1 && data?.type === "posts" && (
        <View style={styles.iconContainer}>
          <FastImage source={slider_horizontal} style={styles.icon} />
        </View>
      )}
      {data?.type === "videos" && (
        <View style={styles.iconContainer}>
          <FastImage source={video_play} style={styles.icon} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MediaComponent;
export const styles = StyleSheet.create({
  medaiSrcStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  icon: {
    height: 24,
    width: 24,
  },
});
