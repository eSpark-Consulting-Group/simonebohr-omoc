import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { neutralBlack, skyBlueColor } from "../../utils/colors";
import FastImage from "react-native-fast-image";
import { profile_pic2 } from "../../utils/images";
import ApiService from "../../services/api.service";
import { showMessage } from "react-native-flash-message";

const FollowingBox = ({ data,  handlePostFollow, handleUnfollow }) => {

  const handleFollow = (id)=>{
    // console.log('Unfollow id ----->',data.isFollowing)
    if(!data.isFollowing ){
      handlePostFollow(id)
    }else{
      handleUnfollow(id)
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: "center" }}>
        <FastImage
          source={!data?.profileImg ? profile_pic2 : { uri: data.profileImg }}
          style={styles.profileImg}
        />
      </View>
      <Text style={styles.nameText}>{data?.name}</Text>
      <TouchableOpacity
        onPress={() => handleFollow(data?.id)}
        style={[
          styles.BtnContainer,
          { backgroundColor: !data.isFollowing ? "#0094FF" : "#fff" },
        ]}
      >
        <Text style={{ color: !data.isFollowing ? "#fff" : "#0094FF" }}>
          {!data.isFollowing ? "Follow" : "Following"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FollowingBox;

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    width: 115,
    paddingTop: 12,
    paddingHorizontal: 4,
    paddingBottom: 4,
    height: 118,
    borderRadius: 16,
    gap: 8,
    marginRight: 7,
    marginTop: 20,
    borderColor: "#EDEDED",
  },
  profileImg: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    borderRadius: 25,
  },
  nameText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14.2,
    color: neutralBlack,
  },
  btn: {
    width: 50,
  },
  BtnContainer: {
    borderWidth: 1,
    // width: (screenWidth * buttonWidthPercentage) / 80,
    height: 25,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#AADBFF",
  },
});
