import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { GILROY_REGULAR } from "../utils/fonts";
import { grey, midGray, neutralBlack, opacityBlack, whiteColor } from "../utils/colors";
import FastImage from "react-native-fast-image";
import { cross_icon, perfume_pic } from "../utils/images";
import { AirbnbRating } from "react-native-ratings";
import { formattedDate } from "../utils";
import VectorImage from "react-native-vector-image";

const Historydetails = ({ data }) => {
  const photos = data?.item?.review?.files;
  const rate = data?.item?.review?.rating;
  const [modelShow, setModelShow] = useState(false);

const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

const handleImageClick = (index) => {
  setSelectedPhotoIndex(index);
  setModelShow(true);
};

  return (
    <View style={styles.container}>
      <View style={styles.productDetail}>
        <Text style={styles.heading}>{data.item.productName}</Text>
        <Text style={styles.subText}>Variant : Men</Text>
      </View>
      {photos !== null && (
        <View style={styles.imageView}>
          {photos.map((photo, index) => (
            <TouchableOpacity key={index} onPress={() => handleImageClick(index)}>
            <FastImage
              key={index}
              source={{ uri: photo }}
              style={styles.perfumeImage}
            />
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Text style={styles.feedbackText}>{data.item.review.comment}</Text>
      <View style={styles.starView}>
        <AirbnbRating
          count={5}
          reviews={[]}
          defaultRating={rate}
          size={15}
          starContainerStyle={styles.ratingView}
        />
        <Text style={styles.dateText}>{formattedDate(data.item.review.createdAt)}</Text>
      </View>

      <View>
        <Modal
        visible={modelShow}
         transparent={true}
         style={styles.modalMainContainer}
         animationType="slide">
          <View style={styles.modalContainer}>
          <TouchableOpacity onPress={()=>setModelShow(false)} style={styles.crossStyle}>
              <VectorImage source={cross_icon} style={styles.crossImage}/>
            </TouchableOpacity>
            {selectedPhotoIndex !== null && (
            <FastImage
              source={{ uri: photos[selectedPhotoIndex] }}
              style={styles.bigImage}
            />
          )}
        
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Historydetails;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    gap: 15,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: "#EDEDED",
    width: "92%",
    alignSelf: "center",
  },
  heading: {
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
    fontWeight: "400",
    color: neutralBlack,
  },
  subText: {
    color: grey,
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    fontWeight: "400",
  },
  perfumeImage: {
    height: 44,
    width: 44,
    resizeMode:'contain'
  },
  crossImage: {
    height: 35,
    width: 35,
    resizeMode:'contain',
    tintColor:whiteColor
  },
  bigImage: {
    height: '80%',
    width: '95%',
    resizeMode:'contain',
  },
  imageView: {
    flexDirection: "row",
    marginLeft: 10,
    gap: 10,
  },
  feedbackText: {
    color: neutralBlack,
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    fontWeight: "400",
  },
  starView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    color: grey,
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    fontWeight: "400",
  },
  border: {
    borderBottomWidth: 1,
    marginTop: 15,
    borderColor: midGray,
  },
  ratingView: {
    marginTop: -30,
  },
  productDetail: { gap: 8 },

  modalMainContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: opacityBlack,
  },
  crossStyle: {
    alignSelf:'flex-end',
    alignItems:'center',
    // backgroundColor:'red',
    // borderRadius: 20,
  },
});
