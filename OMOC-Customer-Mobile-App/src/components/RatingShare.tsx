import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import {
  blackColor,
  grey,
  lightGrey,
  midGray,
  skyBlueColor,
  whiteColor,
} from "../utils/colors";
import { AirbnbRating } from "react-native-ratings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import { add_photo, girls_image } from "../utils/images";
import ImagePicker from "react-native-image-crop-picker";
import CustomButton from "./CustomButton";
import ApiService from "../services/api.service";
import CustomImagePickerModal from "./CustomImagePickerModal";
import { showMessage } from "react-native-flash-message";

const RatingShare = ({ hideMe, id }) => {
  const [ratingData, setRatingData] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [modalImage, setModalImage] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["57%", "77%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      hideMe();
    }
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={2}
        opacity={1}
      />
    ),
    []
  );

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

  const ratingCompleted = (rating) => {
    setRatingData(rating);
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
        setPhotos((prevPhotos) => [...prevPhotos, ratingUrl]);
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
        orderId: id,
        rating: ratingData.toString(),
        comment: description,
        files: photos,
      };
      const postRatingResponse = await ApiService.postRating(property);
      console.log(postRatingResponse.message);

      bottomSheetRef.current?.close();
    } catch (error) {
      console.log("Error:", error);
    }
  };

const limitedImages = photos.slice(0, 3);
if (limitedImages.length === 3) {
  showMessage({
    message: "You can only add up to 3 images",
    type: "warning",
    backgroundColor:skyBlueColor
  });
}

  return (
    <BottomSheet
      backdropComponent={renderBackdrop}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={1}
      handleIndicatorStyle={styles.bottomSheetStyle}
      onChange={handleSheetChanges}
    >
      <View style={styles.mainView}>
        <Text style={styles.rateHead}>What is your rate?</Text>
        <AirbnbRating
          count={5}
          reviews={[]}
          defaultRating={0}
          size={28}
          showRating
          onFinishRating={ratingCompleted}
          starContainerStyle={styles.ratingView}
        />
        <Text style={styles.shareText}>
          Share your feedback about the product
        </Text>
        <CustomImagePickerModal
          isVisible={modalImage}
          handleOpenCamera={() => openCamera()}
          handleOpenGallery={() => openGallery()}
          handleClose={() => setModalImage(false)}
        />

        <View style={styles.describeView}>
          <BottomSheetTextInput
            placeholder="Your review"
            placeholderTextColor={grey}
            multiline={true}
            value={description}
            onChangeText={(e) => setDescription(e)}
          />
        </View>

        <View style={styles.oneRow}>
          {photos.length !== 0 && (
            <ScrollView
            style={styles.scrollList}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {limitedImages.map((photo, index) => (
              <Image
                key={index}
                source={{ uri: photo }}
                style={styles.addPhoto}
              />
            ))}
          </ScrollView>
          )}
          <TouchableOpacity onPress={() => setModalImage(true)}>
            <View style={styles.addPhotoView}>
              <Image source={add_photo} style={styles.photo} />
              <Text style={styles.textBlue}>Add Photo</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <CustomButton
            textstyle={styles.textStyle}
            style={styles.btn}
            text={"Send Feedback"}
            onPress={() => onSend()}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default RatingShare;

const styles = StyleSheet.create({
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomSheetStyle: {
    backgroundColor: midGray,
    width: 61,
    height: 4,
  },
  mainView: {
    flex: 1,
    marginHorizontal: 15,
    alignSelf: "center",
    alignItems: "center",
  },
  ratingView: {
    justifyContent: "space-between",
  },
  rateHead: {
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    color: blackColor,
    marginTop: 20,
  },
  shareText: {
    width: 198,
    textAlign: "center",
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    color: blackColor,
    marginVertical: 28,
  },
  describeView: {
    width: 330,
    height: 150,
    borderRadius: 10,
    backgroundColor: lightGrey,
    padding: 10,
  },
  photo: {
    width: 35,
    height: 35,
    margin: 8,
  },
  addPhotoView: {
    width: 90,
    height: 90,
    borderRadius: 15,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: skyBlueColor,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  textBlue: {
    fontSize: 14,
    color: skyBlueColor,
    fontFamily: GILROY_MEDIUM,
  },
  addPhoto: {
    width: 90,
    height: 90,
    marginRight: 5,
    borderRadius: 15,
    resizeMode: "contain",
  },
  oneRow: {
    width: 330,
    paddingHorizontal: 6,
    marginTop: 18,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btn: {
    backgroundColor: skyBlueColor,
  },
  textStyle: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
  },
  btnContainer: {
    width: 360,
    marginTop: "23%",
    marginBottom: 2,
  },
  scrollList: {
    marginRight: 6,
  },
});
