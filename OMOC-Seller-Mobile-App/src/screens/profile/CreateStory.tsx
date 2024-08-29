import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_LIGHT,
  GILROY_MEDIUM,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import { crossCut, user_frame } from "../../utils/images";
import FastImage from "react-native-fast-image";
import CustomTwoButton from "../../component/CustomTwoButton";
import ScheduleBottom from "./ScheduleBottom";

const CreateStory = ({ navigation }) => {
  const [schedule, setSchedule]=useState(false)
  const postData = [{ id: 1, image: user_frame, status: "true" }];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Customheader title={CONTEXT.CREATE_STORY} showBackIcon={true} />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>{CONTEXT.STORIES}</Text>
          <Text style={styles.manageText}>
            {CONTEXT.MANAGE_YOUR_SHOP_ORDER}
          </Text>

          <Text style={styles.PhotoText}>{CONTEXT.PHOTO_VIDEO}</Text>
          <Text style={styles.smallText}>
            {CONTEXT.PRODUCT_AND_PICTURE_ADDED}
          </Text>

          <View style={styles.flatListView}>
            <FlatList
              data={postData}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View style={styles.mainView}>
                  <FastImage source={item.image} style={styles.image} />
                  <View style={styles.positionDot}>
                    <VectorImage
                      source={crossCut}
                      style={[
                        styles.pluseIcon,
                        { tintColor: Colors.blackColor },
                      ]}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.blueView}
                    onPress={() => navigation.navigate("TagProduct")}
                  >
                    <Text
                      style={[
                        styles.titleText,
                        { color: Colors.whiteColor, fontSize: 11.5 },
                      ]}
                    >
                      Tag Product
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          <View style={styles.captionView}>
            <TextInput
              placeholder="Caption..."
              placeholderTextColor={Colors.gray66}
              multiline
              style={styles.manageText}
            />
          </View>
          <Text style={[styles.countStyle, { alignSelf: "flex-end" }]}>
            0/100
          </Text>

          <View style={styles.buttonView}>
            <CustomTwoButton
              firstTitile={"Save as draft"}
              secondTitile={strings.CONTINUE}
              onPressFirst={()=>setSchedule(true)}
            />
          </View>

        </View>
      </ScrollView>
      {schedule &&
    <ScheduleBottom hideMe={() => setSchedule(false)} postCreate={()=>{setSchedule(false)}}/>}
    </SafeAreaView>
  );
};

export default CreateStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  mainContainer: {
    marginTop: "5%",
    marginHorizontal: 13,
    flex: 1,
  },
  titleText: {
    fontSize: 23,
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    marginTop: "6%",
  },
  manageText: {
    fontSize: 15,
    fontFamily: GILROY_LIGHT,
    color: Colors.blackColor,
    marginTop: "3%",
  },
  smallText: {
    fontSize: 11,
    fontFamily: GILROY_LIGHT,
    color: Colors.grey,
    marginTop: "3%",
  },
  PhotoText: {
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    marginTop: "8%",
  },
  flatListView: {
    flexGrow: 1,
    marginTop: 20,
  },
  mainView: {
    marginRight: 20,
    height: 155,
  },
  image: {
    width: 135,
    height: 150,
    resizeMode: "contain",
  },
  positionDot: {
    position: "absolute",
    top: 12,
    left: "73%",
  },
  blueView: {
    position: "absolute",
    bottom: 8,
    right: "33%",
    borderRadius: 12,
    padding: 8,
    width: "65%",
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
  },
  pluseIcon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    marginHorizontal: 7,
  },
  captionView: {
    borderColor: Colors.gray88,
    borderWidth: 1.5,
    borderRadius: 12,
    width: "100%",
    height: "30%",
    paddingHorizontal: 12,
    alignSelf: "center",
    marginTop: 15,
  },
  countStyle: {
    fontSize: 13,
    fontFamily: GILROY_LIGHT,
    color: Colors.blackColor,
    marginTop: "3%",
  },
  buttonView: {
    alignSelf: "center",
    marginTop: "50%",
    marginBottom: "20%",
    width: 380,
  },
});
