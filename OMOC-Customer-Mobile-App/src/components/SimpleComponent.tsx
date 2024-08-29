import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { neutralBlack } from "../utils/colors";
import VectorImage from "react-native-vector-image";
import {
  brandIcon,
  chats_icon,
  like_icon,
  new_man_image,
  product_image,
  save_icon,
  send_icon,
  three_dot_Icon,
  verifyBlue_icon,
} from "../utils/images";
import FastImage from "react-native-fast-image";
import {
  GILROY_BLACK_ITALIC,
  GILROY_MEDIUM,
  GILROY_REGULAR,
} from "../utils/fonts";
import { strings } from "../assets/string/strings";

const SimpleComponent = ({ data, onPress, onProfileClick }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.headerProfileView}
          onPress={onProfileClick}
        >
          <FastImage source={brandIcon} style={styles.userProfile} />
          <Text style={styles.itemText}>{data?.title}</Text>
          <VectorImage source={verifyBlue_icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <VectorImage source={three_dot_Icon} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FastImage
          source={new_man_image}
          style={styles.mainImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.checkText}>{strings.CHECK_TEXT}</Text>
      <View style={styles.itemFooterView}>
        <TouchableOpacity onPress={onPress} style={styles.itemLikeView}>
          <View style={styles.likedByImages}>
            {data?.likes?.slice(0, 3).map((user, index) => (
              <FastImage
                key={index}
                source={index % 2 === 0 ? product_image : brandIcon}
                style={styles.likedByImage}
              />
            ))}
          </View>
          <Text style={styles.likesText}>
            Liked by <Text style={styles.likedByText}>{strings.OMOC} </Text>
            {strings.AND}
            <Text style={styles.likedByText}> 27 others</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.actionsView}>
          <TouchableOpacity>
            <VectorImage source={save_icon} style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <VectorImage source={like_icon} style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <VectorImage source={chats_icon} style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <VectorImage source={send_icon} style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SimpleComponent;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 282,
    alignSelf: "center",
    marginBottom: 30,
    padding: 0,
  },
  itemFooterView: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionsView: {
    flexDirection: "row",
    gap: 10,
    marginRight: 10,
  },
  likedByImages: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginLeft: 10,
  },
  likedByImage: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginRight: -7,
    borderWidth: 0.1,
  },
  actionIcon: {
    width: 20,
    height: 20,
  },
  itemLikeView: {
    flexDirection: "row",
    width: "40%",
    gap: 5,
  },
  likesText: {
    fontFamily: GILROY_BLACK_ITALIC,
    fontWeight: "400",
    fontSize: 10,
    color: neutralBlack,
    width: 120,
  },
  likedByText: {
    fontFamily: GILROY_BLACK_ITALIC,
    fontWeight: "500",
    fontSize: 10,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  headerProfileView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  userProfile: {
    width: 32,
    height: 32,
  },
  itemText: {
    color: neutralBlack,
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  checkText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 13.92,
    color: neutralBlack,
    left: 10,
    marginTop: 10,
  },
});
