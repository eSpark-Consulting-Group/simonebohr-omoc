import { StyleSheet, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

export const ProgressBar = ({ userStories, progresses }) => (
  <View style={styles.progressContainer}>
    {userStories.map((_, index) => (
      <Progress.Bar
        key={index}
        progress={progresses ? progresses[index] : 0}
        width={
          userStories.length > 0
            ? (360 - (userStories.length - 1) * 5) / userStories.length
            : 1
        }
        color="rgba(230, 230, 230, 0.948)"
        unfilledColor="rgba(255, 255, 255, 0.5)"
        borderWidth={0}
        borderRadius={2}
        style={styles.progressBar}
      />
    ))}
  </View>
);

export const styles = StyleSheet.create({
  progressBar: {
    margin: 5,
    height: 2,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 5,
  },
});
