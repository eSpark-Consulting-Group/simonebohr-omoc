import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { add_icon, arrowleft_icon, user_frame } from "../utils/images";
import { Colors } from "../utils/colors";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import { strings } from "../utils/string/strings";
import { GILROY_MEDIUM } from "../utils/fonts";
import { Container } from "native-base";

const productData = [
  {
    image: user_frame,
    title: "Hoodie Havana V1",
    icon: arrowleft_icon,
  },

  {
    image: user_frame,
    title: "Black Hoodie Ackerman",
    icon: arrowleft_icon,
  },
  {
    image: user_frame,
    title: "Nike Airmax",
    icon: arrowleft_icon,
  },
  {
    image: user_frame,
    title: "Rumbling Jacket",
    icon: arrowleft_icon,
  },
];

const ProductFaqComponent = ({ navigation }) => {
  return (
 
      <View style={styles.container}>
        <FlatList
          data={productData}
          renderItem={({ item }) => {
            return (
              <View style={styles.viewContainer}>
                <View style={styles.viewImageTitle}>
                  <FastImage source={user_frame} style={styles.image} />
                  <Text style={styles.titleText}>{item.title}</Text>
                </View>
                <TouchableOpacity>
                  <VectorImage source={item.icon} style={styles.leftIcon} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
  );
};

export default ProductFaqComponent;

const styles = StyleSheet.create({
  container: { 
    height:'83%',
    marginTop: 20,
    backgroundColor: Colors.creamColor,
  },
  viewContainer: {
    width: "95%",
    marginBottom: 15,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    justifyContent: "space-between",
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
  },
  titleText: {
    fontSize: 14,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    marginLeft: 15,
  },
  viewImageTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    height: 24,
    width: 24,
    tintColor: Colors.neutralBlack,
  },

  image: {
    height: 60,
    width: 60,
  },
  
});
