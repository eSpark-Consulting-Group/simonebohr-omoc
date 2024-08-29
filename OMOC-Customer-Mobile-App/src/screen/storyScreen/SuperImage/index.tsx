import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
} from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../utils";

export interface SuperImageProps {
  disablePress?: boolean;
  fitSize?: boolean;
  showOnlyImage?: boolean;
  photo?: StoryProcessedImage;
}

export type StoryLabel = {
  type: "address" | "people" | "hashtag" | "emoji";
  address_id?: string;
  text: string;
  x: number;
  y: number;
  animX: Animated.Value;
  animY: Animated.Value;
  fontSize: number;
  width: number;
  height: number;
  ratio: number;
  animRatio: Animated.Value;
  zIndex: number;
};

export type StoryProcessedImage = {
  uri: string;
  url: string;
  extension: string;
  width: number;
  height: number;
  base64: string;
  ratio: number;
  translateX: number;
  translateY: number;
  rotateDeg: string;
  texts: StoryText[];
  labels: StoryLabel[];
};

type StoryText = {
  text: string;
  x: number;
  y: number;
  animX: Animated.Value;
  animY: Animated.Value;
  fontSize: number;
  width: number;
  height: number;
  textBg: boolean;
  textAlign: "flex-start" | "center" | "flex-end";
  color: string;
  ratio: number;
  animRatio: Animated.Value;
  zIndex: number;
};

const SuperImage = ({ fitSize, showOnlyImage, photo }: SuperImageProps) => {
  if (!photo) {
    return <View style={styles.backgroundContainer} />;
  } else {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: fitSize ? "100%" : SCREEN_WIDTH,
          height: fitSize ? "100%" : SCREEN_HEIGHT,
        }}
      >
        <ImageBackground
          style={{
            ...styles.backgroundContainer,
          }}
          source={{
            uri: photo.url,
            cache: "force-cache",
          }}
        >
          {!!!showOnlyImage &&
            photo.texts.map((txtLabel, labelIndex) => (
              <View
                key={labelIndex}
                style={{
                  zIndex: txtLabel.zIndex,
                  backgroundColor: txtLabel.textBg
                    ? txtLabel.color
                    : "rgba(0,0,0,0)",
                  padding: 5,
                  borderRadius: 5,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: [
                    {
                      translateX: txtLabel.x,
                    },
                    {
                      translateY: txtLabel.y,
                    },
                    {
                      scale: txtLabel.ratio,
                    },
                  ],
                }}
              >
                <Text
                  style={{
                    // width: txtLabel.width,
                    height: txtLabel.height + 5,
                    textAlign:
                      txtLabel.textAlign === "flex-start"
                        ? "left"
                        : txtLabel.textAlign === "flex-end"
                        ? "right"
                        : "center",
                    fontSize: txtLabel.fontSize,
                    color: txtLabel.textBg ? "#000" : txtLabel.color,
                  }}
                >
                  {txtLabel.text}
                </Text>
              </View>
            ))}
          {!!!showOnlyImage &&
            photo.labels.map((label, labelIndex) => (
              <View
                key={labelIndex}
                style={{
                  zIndex: label.zIndex,
                  backgroundColor:
                    label.type === "emoji" ? "rgba(0,0,0,0)" : "#fff",
                  borderRadius: 5,
                  position: "absolute",
                  width: label.width,
                  height: label.height,
                  justifyContent: "center",
                  alignItems: "center",
                  top: 0,
                  left: 0,
                  transform: [
                    {
                      translateX: label.x,
                    },
                    {
                      translateY: label.y,
                    },
                    {
                      scale: label.ratio,
                    },
                  ],
                }}
              >
                <Text
                  style={{
                    fontSize: label.fontSize,
                  }}
                >
                  {label.text}
                </Text>
              </View>
            ))}
        </ImageBackground>
      </View>
    );
  }
};

export default SuperImage;

const styles = StyleSheet.create({
  backgroundContainer: {
    overflow: "hidden",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
