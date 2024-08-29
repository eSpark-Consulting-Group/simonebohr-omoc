import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils";
import { grey, red, skyBlueColor, whiteColor } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import {
  camera_icon,
  gallery_icon,
  location_icon,
  profile_add_icon,
  setting_icon,
} from "../../utils/images";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import RNFetchBlob from "rn-fetch-blob";
import ApiService from "../../services/api.service";
import Spinner from "../../components/Spinner";
import { showMessage } from "react-native-flash-message";
import { next_icon } from "../../utils/images";
import { palceholders } from "../../assets/string/strings";
import CustomHeaderShown from "../../components/CustomHeaderShown";

const PostProcessor = ({ route, navigation }) => {
  const { images, type } = route.params;
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [postSettings, setPostSettings] = useState({
    hideLikeViewCount: false,
    isCommentingOff: false,
    isSensitiveContent: false,
  });
  const [imagePath, setImagePath] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoader] = useState(false);

  const AddPostOptions = [
    {
      id: "1",
      name: "Photo/Video",
      icon: gallery_icon,
      onPress: () => {
        Alert.alert("1");
      },
    },
    {
      id: "2",
      name: "Camera",
      icon: camera_icon,
      onPress: () => {
        Alert.alert(2);
      },
    },
    {
      id: "3",
      name: "Tag People",
      icon: profile_add_icon,
      onPress: () => {
        navigation.navigate("TagFriendsScreen", {
          preSelectedFriends: selectedFriends,
          onPressDone: (val) => {
            setSelectedFriends(val);
          },
        });
      },
    },
    {
      id: "4",
      name: "Add Location",
      icon: location_icon,
      onPress: () => {
        navigation.navigate("SelectLocationScreen", {
          onSelectLocation: (val) => {
            setSelectedLocation(val);
          },
        });
      },
    },
    {
      id: "5",
      name: "Advanced Setting",
      icon: setting_icon,
      onPress: () => {
        navigation.navigate("AdvancedSettingsScreen", {
          preSettings: postSettings,
          onReturnCallback: (val) => {
            setPostSettings(val);
            console.log(JSON.stringify(val));
          },
        });
      },
    },
  ];

  const ref = useRef({
    processImages: [...images].map((img) => {
      return {
        filename: img.filename,
        type: img.type,
        base64: img.base64,
        extension: img.extension,
        uri: img.uri,
        width: img.width,
        height: img.height,
        ratio: SCREEN_WIDTH / img.width,
        translateX: 0,
        translateY: 0,
        rotateDeg: 0,
        texts: [],
        labels: [],
      };
    }),
    textWidth: 0,
    textHeight: 0,
    trashCanX: (SCREEN_WIDTH - 44) / 2,
    trashCanY: SCREEN_HEIGHT - 62,
    zoomTrashCan: false,
    labelContainerY: 0,
  });

  const _onNext = async () => {
    const formDataParam = new FormData();
    for (var i = 0; i < images.length; i++) {
      formDataParam.append("file", {
        uri: images[i].uri,
        type: `${images[i].type}/${images[i].extension}`,
        name: images[i].filename,
        filename: images[i].filename,
      });
    }

    setLoader(true);
    ApiService.uploadMultipleImages(formDataParam)
      .then((res) => {
        if (type === "Video") {
          upLoadVideo(res)
        } else {
          upLoadPost(res);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("image Upload error", err.response);
      });
  };

  const upLoadPost = (imageData) => {
    const postParamsData = {
      files: imageData.data || [],
      tags: selectedFriends,
      location: selectedLocation,
      hideLikeViewCount: postSettings.hideLikeViewCount,
      isCommentingOff: postSettings.isCommentingOff,
      isSensitiveContent: postSettings.isSensitiveContent,
      ...(caption && { caption }),
    };
    ApiService.createPost(postParamsData)
      .then((res) => {
        setLoader(false);
        navigation.navigate("TabNavigator", { screen: "ProfileStack" });
        showMessage({
          message: res?.message,
          type: "warning",
          backgroundColor: skyBlueColor,
        });
      })
      .catch((err) => {
        setLoader(false);
        console.log("create Post error", JSON.stringify(err?.response));
      });
  };
  const upLoadVideo = (VideoData) => {
    const postParamsData = {
      files: VideoData.data || [],
      tags: selectedFriends,
      location: selectedLocation,
      hideLikeViewCount: postSettings.hideLikeViewCount,
      isCommentingOff: postSettings.isCommentingOff,
      isSensitiveContent: postSettings.isSensitiveContent,
      ...(caption && { caption }),
    };
    ApiService.createVideo(postParamsData,type)
      .then((res) => {
        setLoader(false);
        navigation.navigate("TabNavigator", { screen: "ProfileStack" });
        showMessage({
          message: res?.message,
          type: "warning",
          backgroundColor: skyBlueColor,
        });
      })
      .catch((err) => {
        setLoader(false);
        console.log("create Post error", JSON.stringify(err?.response));
      });
  };

  useEffect(() => {
    return () => {
      if (imagePath) {
        RNFetchBlob.fs.unlink(imagePath);
      }
    };
  }, [imagePath]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.container} onPress={() => item.onPress()}>
        <View style={styles.mainContainer}>
          <VectorImage style={styles.optionsIconStyle} source={item.icon} />
          <Text style={styles.textStyle}>{item.name}</Text>
        </View>
        <View style={styles.rightContainer}>
          {!!selectedFriends.length && item.name === "Tag People" && (
            <Text>{selectedFriends.length}</Text>
          )}
          <VectorImage style={styles.iconStyle} source={next_icon} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: whiteColor }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        <View style={styles.headerContainer}>
          <CustomHeaderShown title={"New Post"} navigation={navigation} />
        </View>
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            width: "90%",
            alignSelf: "center",
            marginBottom: 20,
            borderRadius: 100,
          }}
        >
          {ref.current.processImages.length > 1 ? (
            <FlatList
              scrollEnabled={false}
              data={ref.current.processImages.slice(0, 4)}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{ width: "48%", margin: 3, alignSelf: "center" }}
                  >
                    <Image
                      source={{
                        uri: item.uri,
                      }}
                      style={{ width: "100%", height: 160 }}
                    />
                    {ref.current.processImages.length > 4 && index === 3 && (
                      <View style={styles.moreView}>
                        <Text style={{ color: "#ffffff", fontSize: 20 }}>
                          {ref.current.processImages.length - 4}+
                        </Text>
                      </View>
                    )}
                  </View>
                );
              }}
            />
          ) : (
            <Image
              source={{
                uri: ref.current?.processImages[0]?.uri,
              }}
              style={{ width: "100%", height: 300, borderRadius: 30 }}
            />
          )}
        </View>
        <View style={styles.textAreaContainer}>
          <TextInput
            value={caption}
            onChangeText={setCaption}
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder={palceholders.write_something_about_this_photo}
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View>
        <FlatList
          data={AddPostOptions}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={{ marginBottom: 40 }}
        />
      </ScrollView>
      <View style={{ bottom: 0, position: "absolute", width: "100%" }}>
        <View style={styles.bottomOptionContainer}>
          <TouchableOpacity
            onPress={_onNext}
            activeOpacity={0.8}
            style={[styles.btnNext, { backgroundColor: "#9039FF" }]}
          >
            <FontAwesome5 name="user-friends" size={18} color={"#FFFFFF"} />
            <Text style={styles.frndsButtonText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_onNext}
            activeOpacity={0.8}
            style={styles.btnNext}
          >
            <FontAwesome5 name="globe" size={18} color={"#FFFFFF"} />
            <Text style={styles.publicButtonText}>Public</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading && (
        <Spinner animating={loading} text={"Uploading..."} textStyle={{}} />
      )}
    </SafeAreaView>
  );
};

export default PostProcessor;

const styles = StyleSheet.create({
  btnNext: {
    width: "45%",
    height: 44,
    backgroundColor: skyBlueColor,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  headerContainer: {
    marginHorizontal: 20,
  },
  frndsButtonText: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: "#FFFFFF",
  },
  publicButtonText: {
    fontWeight: "600",
    color: "#FFFFFF",
  },
  bottomOptionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingBottom: SCREEN_HEIGHT * 0.05,
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
  backIconView: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    left: 0,
  },
  backIcon: { width: 6, height: 14, tintColor: "#000000" },
  addSongButtontext: {
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    color: "#000000",
  },
  mainContainer: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderBottomColor: "#EDEDED",
    paddingHorizontal: 5,
    marginTop: 8,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: "#242424",
    lineHeight: 22,
  },
  iconStyle: {
    width: 5,
    height: 9,
  },
  update: {
    height: 10,
    width: 10,
    backgroundColor: red,
    borderRadius: 20,
  },
  rightContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  textAreaContainer: {
    borderColor: grey,
    padding: 5,
    width: "93%",
    alignSelf: "center",
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
  optionsIconStyle: {
    width: 20,
    height: 20,
    tintColor: "#242424",
  },
  moreView: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.7)",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
