import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import Customheader from "../../component/Customheader";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_SEMIBOLD,
  GILROY_LIGHT,
  GILROY_MEDIUM,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import { crossCut, photoGallery, user_frame } from "../../utils/images";
import FastImage from "react-native-fast-image";
import CustomTwoButton from "../../component/CustomTwoButton";
import VectorImage from "react-native-vector-image";
import TagProductBottom from "./TagProductBottom";
import ScheduleBottom from "./ScheduleBottom";
import CustomImagePickerModal from "../../component/CustomImagePickerModal";
import ImagePicker from "react-native-image-crop-picker";
import ApiService from "../../services/api.service";

const CreatePost = ({ navigation }) => {
  const [schedule, setSchedule] = useState(false);
  const [tagPost, setTagPost] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [photosArray, setPhotosArray] = useState([]);
  const [caption, setCaption] = useState(" ");

  const postData = [
    { id: 1, image: user_frame, status: "true" },
    { id: 2, status: "false" },
    { id: 3, status: "false" },
    { id: 4, status: "false" },
    { id: 5, status: "false" },
  ];

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      maxFiles: 3,
    })
      .then((image) => {
        setModalImage(false);
        onSelectUrl(image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      maxFiles: 3,
    })
      .then((image) => {
        onSelectUrl(image);
        setModalImage(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSelectUrl = async (image) => {
    try {
      if (image && image.path) {
        const ratingFormData = new FormData();
        ratingFormData.append("isThumbnail", false);
        ratingFormData.append("product", {
          uri: image.path,
          type: image.mime,
          name: image.filename,
          filename: image.filename,
        });
        const ratingResponse = await ApiService.imageUpload(ratingFormData);
        const ratingUrlData = ratingResponse.data;
        const ratingUrl = ratingUrlData.url;
        setPhotosArray((prevPhotos) => [...prevPhotos, ratingUrl]);
      } else {
        console.log("Selected image is undefined or does not have 'path'.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };


  const onSend = async () => {
    try {
      const property = {
        files: photosArray,
        tags: ["65d60f4a36cd981d289d5ea5"],
        hideLikeViewCount: true,
        isCommentingOff: false,
        isSensitiveContent: true,
        caption: caption,
        productIds: ["66266433bb59f725172bc462", "663761061fdfd97e4f861351"],
        location: {
          name: "United States",
          fullAddress: "United States",
          lat: 37.09024,
          lng: -95.712891,
        },
        isPublished: true,
        isPrePurchased: true,
        cartText: "buy now",
        availableQuantity: 5,
        availableDate: "2024-05-15T10:44:06.304+00:00",
        discountType: "fixed",
        discountPercentage: 50,
        scheduledAt: "2024-05-06T10:44:06.304+00:00",
        sharedWith: "friends",
      };
      const postRatingResponse = await ApiService.createPostApi(property);
      console.log("postRatingResponse--->",postRatingResponse.message);
    } catch (error) {
      console.log("Error:", JSON.stringify(error));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Customheader title={CONTEXT.CREATE_POST} showBackIcon={true} />

      <CustomImagePickerModal
        isVisible={modalImage}
        handleOpenCamera={() => openCamera()}
        handleOpenGallery={() => openGallery()}
        handleClose={() => setModalImage(false)}
      />
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>{CONTEXT.POST}</Text>
          <Text style={styles.manageText}>
            {CONTEXT.MANAGE_YOUR_SHOP_ORDER}
          </Text>

          <Text style={styles.PhotoText}>{CONTEXT.PHOTO}</Text>
          <Text style={styles.smallText}>
            {CONTEXT.PRODUCT_AND_PICTURE_ADDED}
          </Text>

          <View style={styles.flatListView}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {photosArray.length !== 0 &&
                photosArray.map((item, index) => (
                  <View key={index} style={styles.mainView}>
                    <FastImage source={{ uri: item }} style={styles.image} />
                    <View style={styles.positionDot}>
                      <VectorImage
                        source={crossCut}
                        style={[styles.pluseIcon, { tintColor: "black" }]}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.blueView}
                      onPress={() => setTagPost(true)}
                    >
                      <Text
                        style={[
                          styles.titleText,
                          { color: "white", fontSize: 12 },
                        ]}
                      >
                        Tag Product
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              <TouchableOpacity
                style={[styles.borderContain, { marginLeft: 10 }]}
                onPress={() => setModalImage(true)}
              >
                <FastImage source={photoGallery} style={styles.imageAdd} />
                <Text>Photo</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={styles.captionView}>
            <TextInput
              placeholder="Caption..."
              placeholderTextColor={Colors.gray66}
              multiline
              style={styles.manageText}
              value={caption}
              onChangeText={(text) => setCaption(text)}
            />
          </View>
          <Text style={[styles.countStyle, { alignSelf: "flex-end" }]}>
            0/100
          </Text>

          <Text style={styles.PhotoText}>
            {CONTEXT.CUSTOM_AND_ORDER_SETTING}
          </Text>
          <Text style={styles.smallText}>
            {CONTEXT.PRODUCT_AND_PICTURE_ADDED}
          </Text>

          <TouchableOpacity
            style={styles.borderBlue}
            onPress={() => navigation.navigate("OrderSetting")}
          >
            <Text style={[styles.manageText, { color: Colors.skyBlueColor }]}>
              {CONTEXT.ORDER_SETTING}
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonView}>
            <CustomTwoButton
              firstTitile={"Save as draft"}
              secondTitile={strings.CONTINUE}
              onPressFirst={()=>onSend}
            />
          </View>
        </View>
      </ScrollView>
      {tagPost && (
        <TagProductBottom
          hideMe={() => setTagPost(false)}
          onCLICK={() => {
            setTagPost(false), setSchedule(true);
          }}
        />
      )}
      {schedule && <ScheduleBottom hideMe={() => setSchedule(false)} />}
    </SafeAreaView>
  );
};

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
  image: {
    width: 125,
    height: 140,
    resizeMode: "contain",
  },
  mainView: {
    marginRight: 20,
    height: 150,
  },
  imageAdd: {
    width: 40,
    height: 40,
    borderRadius: 7,
    resizeMode: "contain",
  },
  borderContain: {
    borderStyle: "dashed",
    borderColor: Colors.grey,
    borderWidth: 1.5,
    borderRadius: 7,
    paddingVertical: 15,
    width: 135,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  flatListView: {
    flexGrow: 1,
    marginTop: 18,
    flexDirection: "row",
    marginBottom: 5,
  },
  captionView: {
    borderColor: Colors.gray88,
    borderWidth: 1.5,
    borderRadius: 8,
    width: "100%",
    height: "20%",
    paddingHorizontal: 12,
    alignSelf: "center",
    marginTop: 4,
  },
  countStyle: {
    fontSize: 13,
    fontFamily: GILROY_LIGHT,
    color: Colors.blackColor,
    marginTop: "3%",
  },
  PhotoText: {
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
    marginTop: "6%",
  },
  borderBlue: {
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 8,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "6%",
  },
  buttonView: {
    alignSelf: "center",
    marginTop: "30%",
    marginBottom: "20%",
    width: 380,
  },
  pluseIcon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    marginHorizontal: 7,
  },
  positionDot: {
    position: "absolute",
    top: 12,
    left: "73%",
  },
  blueView: {
    position: "absolute",
    bottom: 5,
    right: "30%",
    borderRadius: 12,
    padding: 8,
    width: "70%",
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
  },
});

export default CreatePost;
