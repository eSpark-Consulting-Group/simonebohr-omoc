import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import { lightGrey50, whiteColor } from "../../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import { TouchableOpacity } from "react-native";

const screenHeight = Dimensions.get("window").height;
const percentageHeight = 20;

const WishList = ({ data, navigation }) => {
  return (
    <View style={styles.viewStyle}>
      {data.length !== 0 ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AllWishlist", { headerName: data })
          }
        >
          {data?.thumbnail ? (
            <ImageBackground
              imageStyle={{ borderRadius: 16 }}
              style={styles.viewCart}
              source={{
                uri:
                  data?.thumbnail ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl20Tuf0ZhpbNa24X1Kaw3NgZ1Rhy2bdbkGw&usqp=CAU",
              }}
            >
              <View style={styles.bgText}>
                <Text style={styles.headingText}>{data.name}</Text>
                <Text style={styles.subText}>12 Product</Text>
              </View>
            </ImageBackground>
          ) : (
            <View style={styles.viewCart}>
              <View style={styles.bgText}>
                <Text style={styles.headingText}>{data.name}</Text>
                <Text style={styles.subText}>12 Product</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  viewStyle: {
    marginBottom: 15,
    marginLeft: 10,
  },
  bgImg: {
    width: "100%",
    height: "100%",
  },
  bgText: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 15,
  },
  headingText: {
    color: whiteColor,
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    marginTop: 20,
  },
  subText: {
    color: whiteColor,
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    marginBottom: 10,
  },
  viewCart: {
    width: 170,
    height: (screenHeight * percentageHeight) / 100,
    backgroundColor: lightGrey50,
    borderRadius: 16,
  },
});
