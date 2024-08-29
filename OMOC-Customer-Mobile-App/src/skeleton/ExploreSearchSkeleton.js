import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const ExploreSearchSkeleton = ({}) =>
  Array.from({ length: 2 }).map((_, index) => {
    return (
      <SkeletonPlaceholder>
        <View
          style={{
            ...styles.row,
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
          }}
        >
          <View style={styles.largeImage} />
          <View style={styles.imageStack}>
            <View style={styles.smallImage} />
            <View style={styles.smallImage} />
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  });

export default ExploreSearchSkeleton;

const styles = StyleSheet.create({
  row: {
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  largeImage: {
    width: Dimensions.get("window").width / 2 - 20,
    height: 360,
    resizeMode: "cover",
    borderRadius:10
  },
  imageStack: {
    width: Dimensions.get("window").width / 2 - 20,
    gap: 10,
  },
  smallImage: {
    width: "100%",
    height: 175,
    borderRadius:10
  },
});
