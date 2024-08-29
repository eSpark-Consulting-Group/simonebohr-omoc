import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React,{useState} from "react";
import CustomQuantity from "./CustomQuantity";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { lightGrey, whiteColor } from "../utils/colors";
import FastImage from "react-native-fast-image";

const CustomItemCard = ({ data, selectedData,status }) => {
  const [quantity, setQuantity] = useState(data.quantity);
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        selectedData(data);
      }}
    >
      <View style={styles.productImg}>
        <FastImage
          source={{ uri: data.images[0].url }}
          style={styles.imgShow}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.mainHeading}>{data.name}</Text>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>{data.decreption}</Text>
          </View>
        </View>
        <View style={styles.quantityBtn}>
        <CustomQuantity
                count={quantity}
                onIncrement={() => setQuantity(quantity + 1)}
                onDecrement={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
              />
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              {"\u0024"}
              {data.price}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomItemCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 4,
    borderBottomWidth: 5,
    paddingBottom: 10,
    borderColor: lightGrey,
    backgroundColor: whiteColor,
    borderRadius: 20,
    paddingVertical: 10,
  },
  mainHeading: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    marginTop: 10,
  },
  subHeadingContainer: {
    backgroundColor: lightGrey,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  subHeading: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
  priceContainer: {
    marginRight: 30,
  },
  quantityBtn: {
    marginTop: 22,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    gap: 10,
    flex: 1,
  },
  priceText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    fontWeight: "500",
  },
  CheckBox: {
    height: 18,
    width: 18,
  },
  checkBoxContainer: {
    justifyContent: "center",
    marginLeft: 2,
  },
  productImg: {
    width: "31%",
    backgroundColor: lightGrey,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  imgShow: {
    width: "100%",
    height: 100,
    borderRadius: 16,
  },
  subContainer: {
    gap: 10,
  },
});
