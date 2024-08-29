import { StyleSheet, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../../utils/fonts";
import { blackColor, grey } from "../../../utils/colors";
import { SCREEN_WIDTH } from "../../../utils";
import { placeholder_image } from "../../../utils/images";

const ProductsListComponent = ({ data }) => {
  return (
    <View style={styles.viewCart}>
      <FastImage
        source={{ uri: data?.images[0]?.url }}
        style={styles.imageStyle}
        resizeMode="cover"
        defaultSource={placeholder_image}
      />
      <Text style={styles.productName}>{data?.name}</Text>
      <View style={styles.priceView}>
        <Text style={styles.priceName}>${data?.price}</Text>
        <Text
          style={[styles.discountText, { textDecorationLine: "line-through" }]}
        >
          {` '$'${data.originalPrice}`}
        </Text>
        <Text style={[styles.discountText, { color: blackColor }]}> -15%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewCart: {
    marginVertical: 15,
    gap: 10,
    width: "45.5%",
    marginLeft: SCREEN_WIDTH * 0.03,
  },
  imageStyle: {
    width: "100%",
    height: SCREEN_WIDTH * 0.5,
    justifyContent: "center",
    borderRadius: 8,
  },

  productName: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: blackColor,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  priceView: {
    width: 150,
    flexDirection: "row",
    marginVertical: 4,
    marginBottom: 5,
    alignSelf: "flex-start",
    alignItems: "center",
  },
  priceName: {
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    color: blackColor,
  },
  discountText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: grey,
  },
});

export default ProductsListComponent;
