import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import SingleReel from "../../components/videos/SingleReel";
import ApiService from "../../services/api.service";
import { useDispatch, useSelector } from "react-redux";
import { videoFailure, videoRequest, videoSuccess } from "../../redux/slice/getVideosSlice";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const VideoScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videosList = useSelector((state)=> state?.getVideosSlice?.data)

  // const [videosList, setVideosList] = useState([]);
  const dispatch = useDispatch();

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  useEffect(() => {

    const fetchVideoData = async () => {
      try {
        dispatch(videoRequest());
        const response = await ApiService.getAllVideos();
       
        dispatch(videoSuccess(response.data.videos));
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(videoFailure(error?.response?.data?.message));
      }
    };
    fetchVideoData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: "black",
      }}
    >
      <SwiperFlatList
        vertical={true}
        onChangeIndex={handleChangeIndexValue}
        data={videosList}
        renderItem={({ item, index }) => (
          <SingleReel item={item} index={index} currentIndex={currentIndex} />
        )}
      />
    </View>
  );
};

export default VideoScreen;
