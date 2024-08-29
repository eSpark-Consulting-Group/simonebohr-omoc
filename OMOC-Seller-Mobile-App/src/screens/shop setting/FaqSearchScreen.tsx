import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { Colors } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import {
  arrowleft_icon,
  cross_icon,
  search,
  user_frame,
} from "../../utils/images";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { strings } from "../../utils/string/strings";
import FastImage from "react-native-fast-image";

const data = [
  {
    image: user_frame,
    title: "Hoodie Havana V1",
    text: "On General FAQ",
    icon: cross_icon,
  },

  {
    searchIcon: search,
    title: "When will my order ship?",
    text: "On General FAQ",
    icon: cross_icon,
  },
  {
    searchIcon: search,
    title: "Do you offer free shipping?",
    text: "On General FAQ",
    icon: cross_icon,
  },
];

const FaqSearchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.containItem}
          onPress={() => navigation.goBack()}
        >
          <VectorImage source={arrowleft_icon} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.searchtabView}>
          <TouchableOpacity>
            <VectorImage source={search} style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput style={styles.input} 
          placeholder="When will my order ship?"
          placeholderTextColor={Colors.blackColor}/>
        </View>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.recentText}>{strings.RECENT_SEARCH}</Text>
        <TouchableOpacity>
          <Text style={styles.clearText}>{strings.CLEAR_ALL}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.headerView}>
              <View style={styles.viewContainer}>
                {item.image && (
                  <FastImage
                    source={item.image}
                    style={styles.imageUserFrame}
                  />
                )}
                {item.searchIcon && (
                  <View style={styles.searchIconView}>
                    <VectorImage source={item.searchIcon} style={styles.icon} />
                  </View>
                )}

                <View style={styles.titleText}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.text}>{item.text}</Text>
                </View>
              </View>

              <TouchableOpacity>
                <VectorImage source={item.icon} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default FaqSearchScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex:1,
    backgroundColor: Colors.whiteColor,
  },
  header: {
    marginTop: 15,
    flexDirection: "row",
  },
  containItem: {
    width: 30,
    position: "absolute",
    left: 0,
    zIndex: 0,
    paddingHorizontal: 10,
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: "#242424",
    transform: [{ rotateZ: "180deg" }],
    marginTop: 10,
  },
  searchtabView: {
    width: "85%",
   padding:10,
    backgroundColor: Colors.whiteColor,
    borderRadius: 14,
    borderWidth: 3,
    marginLeft: 50,
    borderColor: Colors.brightBlue,
    flexDirection: "row",
    alignItems:'center',
  },
  searchIcon: {
    height:20,
    width:20,
    resizeMode:'contain',
    marginHorizontal:8
  },
  input: {
    fontFamily: GILROY_REGULAR,
    width: "85%",
    fontSize: 14,
    color: Colors.neutralBlack,
    marginLeft: 10,
  },
  titleView: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  recentText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    color: Colors.neutralBlack,
  },
  clearText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.skyBlueColor,
  },
  headerView: {
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    gap: 4,
    marginLeft: 20,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode:"contain",
    left: 10,
  },
  imageView: {},
  title: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: Colors.neutralBlack,
  },
  text: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.grey,
  },
  imageUserFrame: {
    height: 48,
    width: 48,
    resizeMode:"contain",
    borderRadius:20
  },
  searchIconView: {
    height: 48,
    width: 48,
  },
  viewContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});
