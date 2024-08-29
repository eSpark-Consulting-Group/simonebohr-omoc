import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  dangerRed,
  grey,
  lightGrey50,
  midBlack,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import { cross_icon, delete_icon, send_icon } from "../../utils/images";
import { strings } from "../../assets/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { EditData } from "../../sampleData/EditData";
import CustomCheckBox from "../../components/CustomCheckBox";

const EditScreen = ({ navigation }) => {
  const [numColumns, setNumColumns] = useState(2);
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.backBtnContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
        >
          <VectorImage source={cross_icon} />
        </TouchableOpacity>
        <Text style={styles.allProductText}>{strings.EDIT}</Text>
        <TouchableOpacity>
          <Text style={styles.selectAllText}>Select All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={EditData}
        numColumns={numColumns}
        contentContainerStyle={{ gap: 50 }}
        columnWrapperStyle={{ gap: 40 }}
        renderItem={({ item }) => {
          return (
            <View>
              <ImageBackground style={styles.cartImg} source={item.Image}>
                <View style={styles.checkBoxStyle}>
                  <CustomCheckBox
                    onFillColor={skyBlueColor}
                    boxType="square"
                    onCheckColor={whiteColor}
                    onSelect={()=>{}}
                  />
                </View>
              </ImageBackground>

              <Text style={styles.text}>{item.HeadingText}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.subText}>{item.SubText}</Text>
                <Text style={styles.lessText}>{item.Text}</Text>
                <Text style={styles.discountText}>{item.DiscountText}</Text>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.selectContainer}>
        <TouchableOpacity>
          <VectorImage source={delete_icon} style={styles.deleteIcon} />
        </TouchableOpacity>
        <Text style={styles.productSelectedText}>2 Product Selected</Text>
        <TouchableOpacity>
          <VectorImage source={send_icon} style={styles.sendMsgIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  backBtnContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 15,
  },
  allProductText: {
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    color: neutralBlack,
  },
  selectAllText: {
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    color: skyBlueColor,
  },
  cartImg: {
    width: "100%",
    height: "85%",
    backgroundColor: whiteColor,
    marginLeft: 16,
    top: 35,
    borderRadius: 12,
  },
  text: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 16,
    top: 45,
    marginLeft: 20,
    color: midBlack,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 18,
    fontWeight: "500",
    top: 48,
    left: 20,
  },
  lessText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    fontWeight: "400",
    top: 48,
    left: 25,
    color: grey,
    textDecorationLine: "line-through",
  },
  discountText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    fontWeight: "400",
    top: 48,
    left: 28,
    color: neutralBlack,
  },
  deleteIcon: {
    height: 24,
    width: 24,
    tintColor: dangerRed,
    left: 10,
  },
  sendMsgIcon: {
    height: 24,
    width: 24,
    tintColor: neutralBlack,
    right: 10,
  },
  checkBoxStyle: {
    position: "absolute",
    top: 10,
    left: 15,
  },
  selectContainer: {
    flexDirection: "row",
    position: "absolute",
    backgroundColor: whiteColor,
    height: 40,
    width: "60%",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 24,
    bottom: 50,
  },
  productSelectedText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 14,
    fontWeight: "500",
    color: lightGrey50,
  },
});
