import { useIsFocused } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  FlatList,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { GILROY_MEDIUM } from "../../utils/fonts";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import VectorImage from "react-native-vector-image";
import { radio_check_icon, un_check_icon } from "../../utils/images";
import ImagePicker, { launchImageLibrary } from "react-native-image-picker";
// import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import ApiService from "../../services/api.service";
import { strings } from "../../assets/string/strings";

export const STATUS_BAR_HEIGHT: number = getStatusBarHeight();
export const SCREEN_HEIGHT: number = Math.round(
  Dimensions.get("window").height
);
export const SCREEN_WIDTH: number = Math.round(Dimensions.get("window").width);

const StoryTaker = ({ route, navigation }) => {
  const { sendToDirect, username, type } = route?.params || {};
  const focused = useIsFocused();
  const [page, setPage] = useState<number>(1);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [front, setFront] = useState<boolean>(true);
  const [flash, setFlash] = useState<boolean>(false);
  const [groups, setGroups] = useState<string[]>([]);
  const [multiple, setMultiple] = useState<boolean>(false);
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [photos, setPhotos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(-1);
  const _cameraRef = useRef(null);
  const _galleryOffsetY = React.useMemo(() => new Animated.Value(0), []);
  const _groupsOffsetX = React.useMemo(() => new Animated.Value(0), []);
  const _hScrollRef = useRef<ScrollView>(null);
  const ref = useRef<{
    preGalleryOffsetY: number;
    showGroups: boolean;
  }>({
    preGalleryOffsetY: 0,
    showGroups: false,
  });
  useEffect(() => {
    if (focused) {
      Animated.timing(_galleryOffsetY, {
        duration: 200,
        toValue: -SCREEN_HEIGHT + 170,
        useNativeDriver: true,
      }).start(() => {
        if (!showGallery) setShowGallery(true);
      });
      ref.current.preGalleryOffsetY = -SCREEN_HEIGHT + 170;
      CameraRoll.getPhotos({
        assetType: type === "Video" ? "Videos" : "Photos",
        first: 1000,
      }).then((result) => {
        const photos = result.edges;
        const groupList = Array.from(
          new Set(photos.map((photo) => photo.node.group_name))
        );
        setGroups(groupList);
        if (groupList.length > 0) setSelectedGroupIndex(0);
      });
    }
    return () => {};
  }, [focused]);
  useEffect(() => {
    if (selectedGroupIndex > -1) {
      CameraRoll.getPhotos({
        assetType: type === "Video" ? "Videos" : "Photos",
        first: 9 * page,
        groupName: groups[selectedGroupIndex],
      }).then((result) => {
        const photos = result.edges;
        setPhotos(photos);
        if (photos.length > 0 && selectedIndex < 0) setSelectedIndex(0);
      });
    }
  }, [selectedGroupIndex, page]);
  const _onTakePhoto = async () => {
    const photo = await _cameraRef.current?.takePictureAsync({
      width: 100,
      quality: 1,
    });
    const images = [];
    images.push({
      width: photo?.width as number,
      height: photo?.height as number,
      uri: photo?.uri as string,
      base64: photo?.base64 || "",
      extension: (photo?.uri || "").split(".").pop() || "jpg",
    });
    // navigation('StoryProcessor', {
    //     images,
    //     sendToDirect,
    //     username
    // })
  };
  const _onGestureEvent = ({
    nativeEvent: { translationY },
  }: PanGestureHandlerGestureEvent) => {
    if (
      ref.current.preGalleryOffsetY + translationY < -SCREEN_HEIGHT + 170 ||
      ref.current.preGalleryOffsetY + translationY > 0
    )
      return;
    _galleryOffsetY.setValue(ref.current.preGalleryOffsetY + translationY);
  };
  const _onStateChange = ({
    nativeEvent: { translationY, state },
  }: PanGestureHandlerGestureEvent) => {
    if (state === State.END) {
      if (
        ref.current.preGalleryOffsetY + translationY <
        (-SCREEN_HEIGHT + 170) / 2
      ) {
        Animated.timing(_galleryOffsetY, {
          duration: 200,
          toValue: -SCREEN_HEIGHT + 170,
          useNativeDriver: true,
        }).start(() => {
          if (!showGallery) setShowGallery(true);
        });
        ref.current.preGalleryOffsetY = -SCREEN_HEIGHT + 170;
      } else {
        Animated.timing(_galleryOffsetY, {
          duration: 200,
          toValue: 0,
          useNativeDriver: true,
        }).start(() => {
          if (showGallery) setShowGallery(false);
        });
        ref.current.preGalleryOffsetY = 0;
      }
    }
  };
  const _onLoadmore = () => {
    setPage(page + 1);
  };
  const _onSelectImage = (index: number) => {
    if (multiple) {
      const position = selectedPhotos.indexOf(index);
      if (position > -1) {
        const temp = [...selectedPhotos];
        temp.splice(position, 1);
        setSelectedPhotos(temp);
      } else {
        const temp = [...selectedPhotos];
        temp.push(index);
        setSelectedPhotos(temp);
      }
    } else {
      const images = [];
      images.push({
        width: photos[index].node.image.width,
        height: photos[index].node.image.height,
        uri: photos[index].node.image.uri,
        base64: "",
        extension: photos[index].node.image.filename.split(".").pop() || "jpg",
        filename: photos[index].node.image.filename,
        type: photos[index].node.type,
      });

      if (type === "Story") {
        navigation.navigate("StoryProcessor", {
          images,
          sendToDirect,
          username,
        });
      } else if (type === "Video") {
        navigation.navigate("VideoProcessor", {
          images,
          sendToDirect,
          username,
        });
      } else {
        navigation.navigate("PostProcessor", {
          images,
          sendToDirect,
          username,
        });
      }
    }
  };
  const _onShowGroups = () => {
    if (ref.current.showGroups) {
      Animated.timing(_groupsOffsetX, {
        duration: 150,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(_groupsOffsetX, {
        toValue: 150,
        useNativeDriver: true,
      }).start();
    }
    ref.current.showGroups = !ref.current.showGroups;
  };
  const _onShowGallery = () => {
    Animated.timing(_galleryOffsetY, {
      duration: 200,
      toValue: -SCREEN_HEIGHT + 170,
      useNativeDriver: true,
    }).start(() => {
      if (!showGallery) setShowGallery(true);
    });
    ref.current.preGalleryOffsetY = -SCREEN_HEIGHT + 170;
  };
  const _onHideGallery = () => {
    Animated.timing(_galleryOffsetY, {
      duration: 200,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      if (showGallery) setShowGallery(false);
    });
    ref.current.preGalleryOffsetY = 0;
  };
  const _onSelectGroup = (index: number) => {
    setSelectedGroupIndex(index);
    Animated.timing(_groupsOffsetX, {
      duration: 150,
      toValue: 0,
      useNativeDriver: true,
    }).start();
    ref.current.showGroups = !ref.current.showGroups;
  };
  const _onDoneMultiSelect = () => {
    const images = [...selectedPhotos].map((photoIndex) => ({
      width: photos[photoIndex].node.image.width,
      height: photos[photoIndex].node.image.height,
      uri: photos[photoIndex].node.image.uri,
      base64: "",
      extension:
        photos[photoIndex].node.image.filename.split(".").pop() || "jpg",
      filename: photos[photoIndex].node.image.filename,
      type: photos[photoIndex].node.type,
    }));
    if (type === "Story") {
      navigation.navigate("StoryProcessor", {
        images,
        sendToDirect,
        username,
      });
    } else if (type === "Video") {
      navigation.navigate("VideoProcessor", {
        images,
        sendToDirect,
        username,
      });
    } else {
      navigation.navigate("PostProcessor", {
        images,
        sendToDirect,
        username,
        type:'Post'
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {focused && (
        <View style={{ display: "none" }}>
          {/*<RNCamera
            ratio="16:9"
            pictureSize="3840x2160"
            captureAudio={false}
            ref={_cameraRef}
            style={styles.cameraContainer}
            type={front ? "front" : "back"}
            flashMode={flash ? "on" : "off"}
      />*/}
        </View>
      )}
      <Animated.View
        style={{
          ...styles.bottomOptions,
          transform: [
            {
              translateY: _galleryOffsetY,
            },
          ],
          zIndex: showGallery ? 0 : 2,
          opacity: _galleryOffsetY.interpolate({
            inputRange: [-SCREEN_HEIGHT + 170, 0],
            outputRange: [0, 1],
          }),
          display: "none",
        }}
      >
        <TouchableOpacity
          onPress={_onShowGallery}
          activeOpacity={0.8}
          style={styles.btnLastPhoto}
        >
          <Image
            style={styles.lastPhoto}
            source={{
              uri: [...photos][0]?.node.image.uri,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_onTakePhoto}
          activeOpacity={0.7}
          style={styles.btnTakePhoto}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 70,
              backgroundColor: "#fff",
              borderColor: "#000",
              borderWidth: 4,
            }}
          />
          {sendToDirect && username && (
            <View style={styles.sendTo}>
              <Text
                style={{
                  color: "#fff",
                }}
              >
                Message{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {username}
                </Text>
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={setFront.bind(null, !front)}
        >
          <Icon name="camera-retake" size={40} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.galleryInfo}>
        <CustomHeaderShown title={`Create ${type}`} navigation={navigation} />
        <View style={styles.galleryOptionsWrapper}>
          <TouchableOpacity
            onPress={_onShowGroups}
            activeOpacity={0.8}
            style={styles.btnGalleryOption}
          >
            <Text
              style={{
                color: "#242424",
                fontFamily: GILROY_MEDIUM,
              }}
            >
              Gallery
            </Text>
            <AntDesign name="down" size={16} color={"#242424"} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={setMultiple.bind(null, !multiple)}
            style={styles.btnGalleryOption}
          >
            {multiple ? (
              <VectorImage source={radio_check_icon} tintColor="#A0A0A0" />
            ) : (
              <VectorImage source={un_check_icon} tintColor="#A0A0A0" />
            )}
            <Text
              style={{
                fontWeight: "600",
                color: "#242424",
                fontSize: 14,
                fontFamily: GILROY_MEDIUM,
              }}
            >
              Select Multipe
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            position: "absolute",
            top: 170,
            left: -150,
            width: 150,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#ddd",
            borderLeftWidth: 0,
            transform: [
              {
                translateX: _groupsOffsetX,
              },
            ],
          }}
        >
          <FlatList
            data={groups}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={_onSelectGroup.bind(null, index)}
                style={styles.btnGroup}
              >
                <Text
                  style={{
                    fontWeight: index === selectedGroupIndex ? "600" : "500",
                    color: index === selectedGroupIndex ? "#000" : "#666",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => `${index}`}
          />
        </Animated.View>
      </View>
      <View
        style={{
          ...styles.imageGalleryWrapper,
          marginBottom: multiple ? 70 : 0,
        }}
      >
        <FlatList
          onEndReached={_onLoadmore}
          style={{
            ...styles.galleryList,
          }}
          data={photos}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={_onSelectImage.bind(null, index)}
              activeOpacity={0.8}
              style={{
                ...styles.imageWrapper,
                marginHorizontal: (index - 1) % 3 === 0 ? 2.5 : 0,
              }}
            >
              {multiple && (
                <View
                  style={{
                    position: "absolute",
                    right: 7.5,
                    top: 7.5,
                    height: 24,
                    width: 24,
                    borderRadius: 24,
                    borderColor: "#fff",
                    borderWidth: selectedPhotos.indexOf(index) > -1 ? 0 : 1,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                    backgroundColor:
                      selectedPhotos.indexOf(index) > -1
                        ? "transparent"
                        : "rgba(0,0,0,0.3)",
                  }}
                >
                  {selectedPhotos.indexOf(index) > -1 && (
                    <VectorImage
                      source={radio_check_icon}
                      tintColor={"#FFFFFF"}
                    />
                  )}
                </View>
              )}
              <Image
                source={{
                  uri: item.node.image.uri,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </TouchableOpacity>
          )}
          numColumns={3}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={flash}
        />
      </View>
      {multiple && (
        <View
          style={{
            ...styles.selectedImageWrapper,
          }}
        >
          <ScrollView
            ref={_hScrollRef}
            onContentSizeChange={() => {
              _hScrollRef.current?.scrollToEnd();
            }}
            style={{
              maxWidth: SCREEN_WIDTH - 100,
            }}
            bounces={false}
            horizontal={true}
            showsHorizontalScrollIndicator={flash}
          >
            {selectedPhotos
              .slice(0, 3)
              .map((photoIndex: number, index: number) => (
                <ImageBackground
                  key={index}
                  source={{
                    uri: photos[photoIndex].node.image.uri,
                  }}
                  style={styles.previewMultiImage}
                  imageStyle={{ borderRadius: 5 }}
                >
                  {selectedPhotos.length > 3 && index === 2 && (
                    <View style={styles.moreView}>
                      <Text style={{ color: "#ffffff", fontSize: 16 }}>
                        {selectedPhotos.length - 3}+
                      </Text>
                    </View>
                  )}
                </ImageBackground>
              ))}
          </ScrollView>
          <TouchableOpacity
            disabled={selectedPhotos.length < 1}
            onPress={_onDoneMultiSelect}
            activeOpacity={0.8}
            style={styles.btnNext}
          >
            <Text
              style={{
                fontWeight: "600",
                color: "#FFFFFF",
              }}
            >
              {`${strings.NEXT} (${selectedPhotos.length})`}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
export default StoryTaker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  cameraContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  takeOptionsWrapper: {
    top: 0,
    left: 0,
    zIndex: 999,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  topOptions: {
    top: STATUS_BAR_HEIGHT,
    left: 0,
    height: 60,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  btnTopOptions: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomOptions: {
    height: 80,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255,255,255,0.2)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  galleryInfo: {
    width: "93%",
    alignSelf: "center",
    backgroundColor: "#fff",
  },
  btnLastPhoto: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 2,
  },
  lastPhoto: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  btnTakePhoto: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: "#fff",
    transform: [
      {
        translateY: -90,
      },
    ],
  },
  sendTo: {
    position: "absolute",
    bottom: 90,
    width: 200,
    left: (70 - 200) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageGalleryWrapper: {
    backgroundColor: "#fff",
    flex: 1,
  },
  galleryList: {
    marginVertical: 1.25,
    maxHeight: SCREEN_HEIGHT - 170 - 2.5,
  },
  imageWrapper: {
    width: (SCREEN_WIDTH - 5) / 3,
    height: 200,
    marginVertical: 1.25,
  },
  galleryHeader: {
    marginTop: STATUS_BAR_HEIGHT,
  },
  galleryOptionsWrapper: {
    marginTop: 30,
    marginBottom: 20,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  btnGalleryOption: {
    paddingHorizontal: 15,
    flexDirection: "row",
    borderColor: "#999",
    backgroundColor: "rgb(250,250,250)",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  btnGroup: {
    height: 44,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  selectedImageWrapper: {
    paddingHorizontal: 10,
    bottom: 0,
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    paddingTop: 12,
    paddingBottom: SCREEN_HEIGHT * 0.04,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  previewMultiImage: {
    height: 47,
    width: 43,
    resizeMode: "cover",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  btnNext: {
    marginRight: 10,
    paddingHorizontal: 34,
    height: 44,
    backgroundColor: "#0094FF",
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  moreView: {
    height: "100%",
    width: "100%",
    backgroundColor: "#00000080",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
