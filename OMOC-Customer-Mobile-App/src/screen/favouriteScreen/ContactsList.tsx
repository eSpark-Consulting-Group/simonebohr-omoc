import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomFollowButton from "../../components/CustomFollowButton";
import profilePic from "../../assets/Image/profile_pic.png";
import FastImage from "react-native-fast-image";

const ContactsList = ({ data }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: "center" }}>
        <FastImage source={profilePic} style={styles.profileImg} />
      </View>
      <Text style={styles.nameText}>{data.givenName}</Text>
      <CustomFollowButton />
    </View>
  );
};

export default ContactsList;

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
  },
  nameText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14.2,
  },
  btn: {
    backgroundColor: "red",
    width: 50,
  },
});
