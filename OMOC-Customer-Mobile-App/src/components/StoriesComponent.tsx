import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { skyBlueColor, whiteColor } from "../utils/colors";

const StoriesComponent = ({ user, userIndex, openStory }) => {
  return (
    <View key={user._id}>
      <LinearGradient
        colors={[skyBlueColor, skyBlueColor, skyBlueColor]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0.05, y: 0 }}
        style={styles.gradientBorder}
      >
        <Pressable
          style={styles.storyButton}
          onPress={() => openStory(userIndex,user)}
        >
          <Image
            source={{
              uri: user.profileImg,
            }}
            style={styles.image}
          />
        </Pressable>
      </LinearGradient>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{user.user}</Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  name: {
    fontSize: 12,
    color: "white",
  },

  storyButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: whiteColor,
    margin: 2,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: skyBlueColor,
    padding: 2,
  },
  gradientBorder: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    width: 82,
    height: 82,
    borderRadius: 43,
    padding: 1,
    left: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 1000,
  },
  nameContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 5,
  },
});

export default StoriesComponent;
