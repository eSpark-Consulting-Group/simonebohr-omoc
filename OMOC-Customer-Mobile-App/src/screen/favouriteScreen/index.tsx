import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { dangerRed, grey, neutralBlack, whiteColor } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import { bag_icon, check_circle_rounded } from "../../utils/images";
import FavouriteComponent from "../../components/FavouriteComponent";
import ApiService from "../../services/api.service";
import StoryPreviewList from "./StoryPreviewList";
import ReportBottomSheet from "../../components/ReportBottomSheet";
import FastImage from "react-native-fast-image";
import { strings } from "../../assets/string/strings";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import PostCommentsBottomSheet from "../../components/postComponent/PostCommentsBottomSheet";
import { useSelector } from "react-redux";

const Favourite = ({ navigation }) => {
  const [storiesList, setStoriesList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loadingStoryList, setLoadingStoryList] = useState<boolean>(true);
  const [showCommentsModal, setShowCommentsModal] = useState(null);
  const userData = useSelector((state) => state?.profile?.user);

  useEffect(() => {
    setHeader();
    getStoriesList();
    getPostList();
  }, []);

  function setHeader() {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity>
            <View style={styles.countView}>
              <Text style={styles.cartCount}>10</Text>
            </View>
            <VectorImage source={bag_icon} style={styles.cartIcon} />
          </TouchableOpacity>
        );
      },
      title: "Favorite",
    });
  }

  const getStoriesList = async () => {
    try {
      const response = await ApiService.GetAllUsersHavingStory();
      if (response.status) {
        const { data } = response;
        setLoadingStoryList(false);
        setStoriesList(data.storyList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const getPostList = async () => {
    try {
      setLoadingStoryList(true);
      const response = await ApiService.getFavPostlist();
      setLoadingStoryList(false);
      setPostList(response.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeClick = async (data) => {
    try {
      const response = await ApiService.postLikeAPI(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StoryPreviewList
          navigation={navigation}
          storyList={storiesList}
          loadingStoryList={loadingStoryList}
        />
        <View style={styles.favouriteListStyle}>
          <FlatList
            data={postList}
            renderItem={({ item }) => (
              <FavouriteComponent
                data={item}
                bottomSheet={(val: any) => {
                  handleBottomSheet(val);
                }}
                handleLikePress={(postData) => {
                  handleLikeClick(postData);
                }}
                onCommentPress={() => {
                  setShowCommentsModal(item);
                }}
              />
            )}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
          <Modal
            visible={showBottomSheet}
            transparent
            animationType="slide"
            onRequestClose={() => setShowBottomSheet(false)}
          >
            <ReportBottomSheet
              hideMe={() => {
                setShowBottomSheet(false);
              }}
              handleBottomSheet={() => {
                setShowBottomSheet(false);
                setVisible(true);
              }}
            />
          </Modal>
          <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => setVisible(false)}
          >
            <TouchableOpacity
              style={styles.containerModal}
              onPress={() => {
                setVisible(false);
              }}
            >
              <View style={styles.modal}>
                <FastImage
                  source={check_circle_rounded}
                  style={styles.circleRounded}
                />
                <Text style={styles.success}>{strings.SUCCESSFUL_REPORT}</Text>
                <Text style={styles.omocWill}>{strings.OMOC_WILL_FOLLOW}</Text>
              </View>
            </TouchableOpacity>
          </Modal>
          {!!showCommentsModal && (
            <Modal visible={!!showCommentsModal} transparent>
              <PostCommentsBottomSheet
                data={showCommentsModal}
                userData={userData}
                hideMe={() => {
                  setShowCommentsModal(null);
                }}
              />
            </Modal>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  countView: {
    position: "absolute",
    top: -1,
    right: -1,
    backgroundColor: dangerRed,
    width: 15,
    height: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCount: { color: whiteColor, fontSize: 8 },
  cartIcon: { width: 24, height: 24 },
  storyListStyle: {
    marginVertical: 20,
    marginLeft: 10,
  },
  favouriteListStyle: {
    marginTop: 0,
  },
  scrollView: { paddingTop: 20 },
  storiesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modal: {
    width: 273,
    height: 256,
    backgroundColor: whiteColor,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
    elevation: 5,
    alignItems: "center",
    marginTop: 10,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  success: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 20,
    color: neutralBlack,
  },
  omocWill: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: grey,
    textAlign: "center",
  },
  circleRounded: {
    height: 98,
    width: 98,
  },
});
