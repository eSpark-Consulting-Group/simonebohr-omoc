import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { perfume_pic } from "../utils/images";
import FastImage from "react-native-fast-image";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { blackColor, grey } from "../utils/colors";
import { AirbnbRating } from "react-native-ratings";
import { formattedDate } from "../utils";
import RatingShare from "./RatingShare";
const screenWidth = Dimensions.get("window").width;
const buttonWidthPercentage = 15;
const screenHeight = Dimensions.get("window").height;
const buttonHeightPercentage = 15;

const RatingsDetails = ({ data, onRate }) => {
  const onPressHandler = (orderId) => {
    onRate(orderId);
  };

  return (
    <View>
      <View style={styles.container}>
        <FastImage
          source={{ uri: data.item.images[0].url }}
          style={styles.perfumeImage}
        />
        <TouchableOpacity
          style={styles.productDetailView}
          onPress={() => {
            onPressHandler(data.item.orderId);
          }}
        >
          <Text style={styles.subText}>{data.item.productName}</Text>
          <View style={styles.subContainer}>
            <AirbnbRating
              count={5}
              reviews={[]}
              defaultRating={0}
              size={15}
              starContainerStyle={styles.ratingView}
            />
            <Text style={styles.dateText}>
              {formattedDate(data.item.orderedOn)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RatingsDetails;

const styles = StyleSheet.create({
  perfumeImage: {
    Height: (screenHeight * buttonHeightPercentage) / 100,
    width: (screenWidth * buttonWidthPercentage) / 100,
  },
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginTop: 30,
    borderColor: "#EDEDED",
    paddingLeft: 13,
    paddingRight: 20,
    gap: 15,
    marginHorizontal: 10,
    width: "92%",
    alignSelf: "center",
  },
  subText: {
    width: "80%",
    fontWeight: "400",
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
  dateText: {
    color: grey,
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    fontWeight: "400",
  },
  border: {
    borderBottomWidth: 1,
    marginTop: 15,
    borderColor: "#EDEDED",
  },
  starView: {},
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 5,
  },
  btn: {
    width: "33%",
    backgroundColor: blackColor,
    height: 37,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  ratingView: {
    marginTop: -33,
  },
  productDetailView: {
    gap: 20,
    justifyContent: "space-between",
    width: "82%",
  },
});
