import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  blackColor,
  fillBlue,
  lightGrey,
  whiteColor,
} from "../../utils/colors";
import CustomCheckBox from "../../components/CustomCheckBox";
import CustomQuantity from "../../components/CustomQuantity";
import FastImage from "react-native-fast-image";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import { delete_icon, edit_icon } from "../../utils/images";

const EditcartItems = ({
  data,
  status,
  handleCheckBoxChange,
  updateQuantity,
  singleDelete,
  selectedProductFound,
}) => {
  const [quantity, setQuantity] = useState(data.quantity);
  const [showCheckBox, setShowCheckBox] = useState(false);

  useEffect(() => {
    setShowCheckBox(status.showCheckBox);
  }, [status]);

  useEffect(() => {
    updateQuantity(data, quantity);
  }, [quantity]);

  const renderCheckBox = () => (
    <CustomCheckBox
      boxType="square"
      style={styles.CheckBox}
      onFillColor={fillBlue}
      onCheckColor={"white"}
      onSelect={() => handleCheckBoxChange()}
      checkboxValue={selectedProductFound}
    />
  );

  const selectId = () => {
    var arr = Object.keys(data).map((key) => [key, data[key]]);
    let result = arr.reduce((r, a) => r.concat(a), []);
    const extractId = (jsonArray: any) => {
      for (let i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i] === "_id") {
          return jsonArray[i + 1];
        }
      }
    };
    const res = extractId(result);
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.checkBoxContainer}
        onPress={() => selectId()}
      >
        {renderCheckBox()}
      </TouchableOpacity>
      <View style={styles.itemCard}>
        <View style={styles.imgView}>
          <FastImage
            source={{ uri: data.images[0].url }}
            style={styles.imgShow}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.rowDirectView}>
            <Text numberOfLines={1} style={styles.mainHeading}>
              {data.name}
            </Text>
            {showCheckBox !== false && (
              <TouchableOpacity onPress={() => singleDelete()} style={{}}>
                <VectorImage
                  source={delete_icon}
                  style={[styles.CheckBox, { tintColor: "red" }]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeading}>{data.decreption}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              {"\u0024"}
              {data.price}
            </Text>
          </View>
          <View style={styles.editStyle}>
            <TouchableOpacity style={styles.editContainer}>
              <VectorImage source={edit_icon} style={styles.editIcon} />
            </TouchableOpacity>
            <View style={styles.quantityBtn}>
              <CustomQuantity
                count={quantity}
                onIncrement={() => setQuantity(quantity + 1)}
                onDecrement={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditcartItems;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    gap: 15,
    marginVertical: 8,
    borderBottomWidth: 5,
    paddingBottom: 8,
    borderColor: lightGrey,
  },
  mainHeading: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: blackColor,
    width: "72%",
  },
  subHeadingContainer: {
    width: "50%",
    height: 22,
    backgroundColor: lightGrey,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  subHeading: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
  },
  priceContainer: {
    justifyContent: "flex-end",
  },
  quantityBtn: {
    width: "50%",
  },
  container: {
    gap: 10,
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
  imgShow: {
    width: 108,
    height: 108,
  },
  editContainer: {
    width: 28,
    height: 28,
    borderRadius: 12,
    borderColor: lightGrey,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    justifyContent: "center",
  },
  editStyle: {
    flexDirection: "row",
    marginLeft: "24%",
    gap: 10,
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: whiteColor,
    padding: 10,
    borderRadius: 20,
    width: "90%",
  },
  imgView: {
    backgroundColor: lightGrey,
    marginRight: 8,
    borderRadius: 16,
  },
  rowDirectView: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:'space-between'
  },
});
