import React from "react";
import { StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const SquareSkeleton = ({}) =>
  Array.from({ length: 5 }).map((_, index) => {
    return (
      <SkeletonPlaceholder>
        <View style={styles.viewtextimage}>
          <View style={styles.viewimg}>
            <View style={styles.imageSkeleton} />
            <View style={{ marginLeft: 12 }}>
              <View style={styles.textSkeleton} />
              <View style={styles.subtextSkeleton} />
            </View>
          </View>
          <View style={styles.iconSkeleton} />
        </View>
      </SkeletonPlaceholder>
    );
  });

export default SquareSkeleton;

const styles = StyleSheet.create({
  imageSkeleton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textSkeleton: {
    width: 120,
    height: 20,
    borderRadius: 4,
    marginTop: 6,
  },
  subtextSkeleton: {
    width: 80,
    height: 20,
    borderRadius: 4,
    marginTop: 6,
  },
  iconSkeleton: {
    width: 30,
    height: 30,
  },
  viewtextimage: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
  },
  viewimg: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
