import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // You may need to install this package
import { whiteColor, skyBlueColor, blackColor } from "../utils/colors";
import { GILROY_BOLD, GILROY_MEDIUM } from "../utils/fonts";
import { verifyBlue_icon, verifyWhite_icon } from "../utils/images";
import FastImage from "react-native-fast-image";
import { AirbnbRating } from "react-native-ratings";
import VectorImage from "react-native-vector-image";

const CompanyName = ({ logoSource, title, buttText,rating,Verify }) => {
  return (
    <View style={styles.container}>
      <FastImage source={logoSource} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text style={styles.title}>{title}</Text>
            <FastImage source={verifyWhite_icon} style={styles.imageBadge} />
          </View>
         {Verify && <VectorImage source={verifyBlue_icon} style={styles.imageVerfy} />}
          <View style={styles.buttonContent}>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>{buttText}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 15, marginTop: 3 }}>
            <AirbnbRating
              count={5}
              reviews={[]}
              defaultRating={rating}
              size={12}
              starContainerStyle={styles.ratingView}
              starStyle={styles.star}
            />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: "row",
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: "cover",
    marginBottom: 10,
    marginLeft: 10,
  },
  content: {
    flexDirection: "column",
    flex: 1,
  },
  ratingView: {
    marginTop: -27,
  },
  row: {
    flexDirection: "row",
    height: 20,
    marginTop: 2,
  },
  column: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    alignSelf: "center",
    marginLeft: 10,
    color: blackColor,
  },
  price: {
    fontSize: 14,
  },
  buttonContent: {
    marginRight: 20,
    flex: 1,
  },
  buyButton: {
    backgroundColor: whiteColor,
    padding: 10,
    borderRadius: 100,
    alignSelf: "flex-end",
    width: 75,
    height: 28,
    justifyContent: "center",
  },
  buyButtonText: {
    color: skyBlueColor,
    textAlign: "center",
    fontSize: 11,
    height: 13,
  },
  imageBadge: {
    width: 15,
    height: 15,
    resizeMode: "cover",
    marginLeft: 5,
    alignSelf: "center",
  },
  star: {
    margin: 0, 
  },
  imageVerfy: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 1,
    alignSelf: "center",
  },
});

export default CompanyName;
