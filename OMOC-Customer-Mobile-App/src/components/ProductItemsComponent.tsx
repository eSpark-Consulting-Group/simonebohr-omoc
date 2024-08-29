import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { pdp_cover, product_image } from "../utils/images";
import FastImage from "react-native-fast-image";

const ProductItemsComponent = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.mainImageView}>
        <FastImage
          source={pdp_cover}
          style={styles.mainImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.subImageView}>
          <FastImage source={product_image} style={styles.storyImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.subImageView}>
          <FastImage source={product_image} style={styles.storyImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.subImageView}>
          <FastImage source={product_image} style={styles.storyImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.subImageView}>
          <FastImage source={product_image} style={styles.storyImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ProductItemsComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  storyImage: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  subContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "45%",
    height: "85%",
  },
  mainImageView: {
    alignItems: "center",
    justifyContent: "center",
    height: "75%",
    width: "50%",
  },
  subImageView: {
    width: "45%",
    height: "40%",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
