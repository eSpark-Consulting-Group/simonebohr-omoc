import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { profileImg } from "../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import ApiService from "../../../services/api.service";
import {
  myStoriesFailure,
  myStoriesRequest,
  myStoriesSuccess,
} from "../../../redux/slice/getMyStoriesSlice";

interface UserDetails {
  _id: string;
  bio: string;
  email: string;
  interests: UserInterests;
  language: string;
  name: string;
  phone: string;
  profileImg: string;
  userName: string;
}

interface UserInterests {
  otherCategories: any[];
  selected: any[];
}

const StoryAdderItem = ({ navigation }) => {
  const userData = useSelector((state) => state?.profile?.user);
  const myStories = useSelector((state) => state.myStory.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        dispatch(myStoriesRequest());
        const response = await ApiService.getMyStories();
        dispatch(myStoriesSuccess(response?.data?.stories));
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(myStoriesFailure(error?.response?.data));
      }
    };
    fetchStories();
  }, []);

  const onPressStory = () => {
    if (!!myStories.length) {
      navigation.navigate("MyStoryScreen");
    } else {
      navigation.navigate("StoryTaker");
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onPressStory()}
      activeOpacity={0.8}
      style={styles.container}
    >
      <FastImage
        style={styles.avatar}
        source={{
          uri: userData?.profileImg,
        }}
        defaultSource={profileImg}
      />
      <View style={styles.btnAdd}>
        <Icons name="plus" size={12} color="#000000" />
      </View>
    </TouchableOpacity>
  );
};

export default StoryAdderItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    position: "relative",
  },
  username: {
    maxWidth: 64,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    borderRadius: 64,
    height: 64,
    width: 64,
  },
  btnAdd: {
    position: "absolute",
    top: 0,
    right: -5,
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
});
