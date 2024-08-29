import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { whiteColor, neutralBlack } from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import VectorImage from "react-native-vector-image";
import { back_icon, searchbar_icon } from "../../utils/images";
import MediaComponent from "./media/MediaComponent";
import ApiService from "../../services/api.service";
import ExploreSearchSkeleton from "../../skeleton/ExploreSearchSkeleton";

const SearchScreen = ({ navigation }) => {
  const [groupedData, setGroupedData] = useState([]);
  const [postsList, setPostsList] = useState([]);
  const [isLoadingPost, setIsLoadingPost] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoadingPost(true);
        const response = await ApiService.getExplorSearchPostsApi();
        setPostsList(response?.data?.searchList);
      } catch (error) {
        console.log("search posts error", JSON.stringify(error));
      } finally {
        setIsLoadingPost(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setGroupedData((prev) => {
      const newData = [];
      for (let i = 0; i < postsList.length; i += 3) {
        newData.push({
          id: postsList[i].id,
          posts: [postsList[i], postsList[i + 1], postsList[i + 2]],
        });
      }

      return newData;
    });
  }, [postsList]);

  const onRenderItem = ({ item, index }) => {
    return (
      <View
        style={{
          ...styles.row,
          flexDirection: index % 2 === 0 ? "row" : "row-reverse",
        }}
      >
        <MediaComponent
          data={item?.posts[0]}
          onPress={() => {
            Alert.alert("hello");
          }}
          style={styles.largeImage}
        />
        <View style={styles.imageStack}>
          <MediaComponent
            data={item?.posts[1]}
            onPress={() => {
              Alert.alert("hello");
            }}
            style={styles.smallImage}
          />
          <MediaComponent
            data={item?.posts[2]}
            onPress={() => {
              Alert.alert("hello");
            }}
            style={styles.smallImage}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.Touchablecontainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
          >
            <VectorImage source={back_icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate("RecentSearchScreen")}
          >
            <VectorImage source={searchbar_icon} style={styles.icon} />
            <Text style={styles.searchInput}>{strings.SEARCH}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.flatlistView}>
        {!isLoadingPost && !!groupedData.length ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={groupedData}
            renderItem={onRenderItem}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ExploreSearchSkeleton />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};
export default SearchScreen;
const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  flatlistView: {
    flex: 1,
    marginTop: 20,
    alignSelf: "center",
  },
  mainContainer: {
    marginTop: 5,
    flexDirection: "row",
  },
  Touchablecontainer: {
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: 2,
    flexDirection: "row",
    marginHorizontal: 15,
  },
  searchBar: {
    marginHorizontal: 20,
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  imageView: {
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
    width: "95%",
    height: "50%",
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  row: {
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  largeImage: {
    width: Dimensions.get("window").width / 2 - 20,
    height: 360,
    borderRadius: 10,
  },
  imageStack: {
    width: Dimensions.get("window").width / 2 - 20,
    gap: 10,
  },
  smallImage: {
    width: "100%",
    height: 175,
    borderRadius: 10,
  },
  searchInput: {
    fontSize: 14,
    fontWeight: "400",
    color: neutralBlack,
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
