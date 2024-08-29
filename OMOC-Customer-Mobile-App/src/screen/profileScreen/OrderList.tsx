import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  blackColor,
  gray88,
  grey,
  lightBlue,
  midGray,
  skyBlueColor,
  successGreen,
  whiteColor,
} from "../../utils/colors";

import { AirbnbRating } from "react-native-ratings";
import { formattedDate } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import { verifyBlue_icon } from "../../utils/images";
import VectorImage from "react-native-vector-image";

const OrderList = ({ data ,onPress}) => {
  console.log('dattttttttt--->>',data)
  const navigation = useNavigation();

  return (
    <View style={styles.orderCard}>
      {data.length !== 0  ?<>
      <View style={styles.flexStyle}>
        <Image
          source={{ uri: data.productId.images[0].url }}
          style={styles.userImg}
        />
        <View>
        <View style={styles.flexStyle}>
          <Text style={[styles.headingText, { color: blackColor }]}>
            OmocOfficial
          </Text>
          <VectorImage source={verifyBlue_icon}style={styles.vertifyIcon}/>
     
          </View>
          <Text style={[styles.subText, { marginVertical: 5 }]}>
            {formattedDate(data.productId.createdAt)} - Delivered
          </Text>
          <Text style={styles.hoodiText}>{data.productId.name}</Text>
          <View style={styles.rowSpaceBtwn}>
            <Text
              numberOfLines={1}
              style={[styles.hoodiText, { width: "55%" }]}
            >
              {data.productId.category}
            </Text>
            <Text style={styles.blueText}>${data.productId.originalPrice}</Text>
          </View>
        </View>
      </View>
      <View style={styles.verticalLine} />
      <View style={[styles.rowSpaceBtwn, { width: 326 }]}>
        <AirbnbRating
          count={5}
          reviews={[]}
          defaultRating={3}
          size={15}
          starContainerStyle={{ marginTop: -30 }}
        />

        <TouchableOpacity
          style={styles.blueView}
          onPress={onPress}
        >
          <Text style={[styles.subText, { color: whiteColor }]}>Buy Again</Text>
        </TouchableOpacity>
      </View>
      </>
      :<View>
         <Text style={[styles.headingText, { color: blackColor }]}>
            Order not found
          </Text>
        </View>
        }
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
    flexStyle:{
     width: "97%",
     flexDirection: "row",
    },
  orderCard: {
    width: "100%",
    marginBottom: "5%",
    backgroundColor:whiteColor,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.4,

    elevation: 5,
  },
  userImg: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginRight: 14,
    borderRadius: 10,
  },
  rowSpaceBtwn: {
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  blueText: {
    fontSize: 15,
    fontWeight: "400",
    color: skyBlueColor,
  },
  blueView: {
    width: "30%",
    padding: 6,
    backgroundColor: skyBlueColor,
    alignItems: "center",
    borderRadius: 20,
  },
  verticalLine: {
    width: "95%",
    borderColor: midGray,
    borderWidth: 0.5,
    marginVertical: 10,
  },
  hoodiText: {
    color: blackColor,
    fontSize: 14,
    fontWeight: "300",
  },
  subText: {
    fontSize: 12,
    fontWeight: "400",
    color: grey,
  },
  headingText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
  },
  vertifyIcon:{
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 5,
  },
  greenView: {
    width: "30%",
    padding: 6,
    backgroundColor: successGreen,
    alignItems: "center",
    borderRadius: 20,
    marginLeft:30
  },
});
