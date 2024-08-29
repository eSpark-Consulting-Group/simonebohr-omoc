import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SCREEN_WIDTH } from "../utils";

const CircleSkeleton = ({}) =>
  Array.from({ length: 5 }).map((_, index) => (
    <View key={index} style={{marginHorizontal: 12 }}>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item
          width= {SCREEN_WIDTH / 5.8}
          height={SCREEN_WIDTH / 5.8}
          borderRadius={100}
          alignSelf="center"
          position="relative"
        />
      </SkeletonPlaceholder>
    </View>
  ));

CircleSkeleton.propTypes = {};
CircleSkeleton.defaultProps = {};

export default CircleSkeleton;
