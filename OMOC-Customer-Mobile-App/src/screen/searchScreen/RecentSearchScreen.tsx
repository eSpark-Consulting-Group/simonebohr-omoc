import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  whiteColor,
  neutralBlack,
  skyBlueColor,
  grey,
} from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import SearchTabBar from "../searchScreen/SearchTabBar";
import VectorImage from "react-native-vector-image";
import {
  back_icon,
  cross_icon,
  search_icon,
  profile_pic,
  placeholder_image,
} from "../../utils/images";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import FastImage from "react-native-fast-image";
import ApiService from "../../services/api.service";
import SearchSkeleton from "../../skeleton/SearchSkeleton";
import CustomTabBar from "../../components/CustomTabBar";
import { SCREEN_WIDTH } from "../../utils";
import ShopsListComponent from "./searchTabBarComponents/ShopsListComponent";
import ProductsListComponent from "./searchTabBarComponents/ProductsListComponent";
import UsersListComponent from "./searchTabBarComponents/UsersListComponent";
import Video from "react-native-video";

const RecentSearchScreen = ({ navigation }) => {
  const [recentData, setRecentData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [openTabBar, setOpenTabBar] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [trendingsData, setTrendingsData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [shopData, setshopData] = useState([]);
  const [usersData, setusersData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [hastagsData, setHastagsData] = useState([]);
  const [isFacused, setIsFacused] = useState(false);
  const textInputRef = useRef();
  const player = useRef(null);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const response = await ApiService.getRecentSearchList();
        setRecentData(response?.data?.history);
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    };
    getSearchHistory();
  }, []);

  const getType = () => {
    if (selectedTabIndex === 1) {
      return "videos";
    } else if (selectedTabIndex === 2) {
      return "posts";
    } else if (selectedTabIndex === 3) {
      return "shop";
    } else if (selectedTabIndex === 4) {
      return "users";
    } else if (selectedTabIndex === 5) {
      return "products";
    } else {
      return null;
    }
  };
  useEffect(() => {
    const fetchSearchExplore = async () => {
      try {
        const param = {
          type: getType(),
          search: searchText,
        };
        if (!!selectedTabIndex) {
          const response = await ApiService.getExploreApi(param);
          if (selectedTabIndex == 1) {
            setVideoData(response.data.list);
          } else if (selectedTabIndex === 2) {
            setPostData(response.data.list);
          } else if (selectedTabIndex === 3) {
            setshopData(response.data.list);
          } else if (selectedTabIndex === 4) {
            setusersData(response.data.list);
          } else if (selectedTabIndex === 5) {
            setProductData(response.data.list);
          }
        }
      } catch (error) {
        console.log(
          "getExploreApi post api error",
          JSON.stringify(error?.response)
        );
      }
    };
    fetchSearchExplore();
  }, [selectedTabIndex,searchText]);

  useEffect(() => {
    const getTrendingData = async () => {
      try {
        const response = await ApiService.getTrendingDataApi(searchText);
        setTrendingsData(response?.data || []);
      } catch (error) {
        console.log(
          "get trending data Api error",
          JSON.stringify(error?.response)
        );
      }
    };
    getTrendingData();
  }, [searchText]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSearchSuggests(searchText);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const getSearchSuggests = async (text) => {
    try {
      setLoading(true);
      const response = await ApiService.getUserSuggestions(text);
      setSearchData(response.data);
    } catch (error) {
      console.log(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const onSearchItemPress = async (item) => {
    try {
      if (item.type === "users") {
        const response = await ApiService.getUsersProfile(item?.id);
      } else if (item.type === "products") {
        const response = await ApiService.getProductDetail({
          productId: item?.id,
          isSearched: true,
        });
        navigation.navigate("ProductDetailScreen", { data: response.data });
      } else {
      }
    } catch (error) {
      return [];
    } finally {
    }
  };

  const onRemoveRecentSearch = async (id) => {
    try {
      const response = await ApiService.removeRecentSearch(id);
      setRecentData((prev) =>
        !!id ? prev.filter((val) => val.historyId !== id) : []
      );
    } catch (error) {
    } finally {
    }
  };

  const onPressFollow = async (item) => {
    try {
      let response;
      if (!item.isFollowing) {
        response = await ApiService.postUserFollow({ userId: item?.id });
      } else {
        response = await ApiService.postUserUnfollow({
          userId: item?.id,
        });
      }
      setusersData((prev) => {
        const newUserList = [];
        prev.map((val) => {
          if (item?.id === val?.id) {
            const obj = {
              ...val,
              isFollowing: !val.isFollowing,
            };
            newUserList.push(obj);
          } else {
            newUserList.push(val);
          }
        });
        return newUserList;
      });
    } catch (error) {
      return [];
    } finally {
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.Touchablecontainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={styles.backIconView}
        >
          <VectorImage source={back_icon} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <SearchTabBar
            ref={textInputRef}
            value={searchText}
            style={styles.tab}
            placeholder={strings.SEARCH}
            onChangeText={setSearchText}
            onFocus={() => {
              setOpenTabBar(false);
              setSelectedTabIndex(0);
            }}
          />
        </View>
      </View>
      {!openTabBar ? (
        <>
          {!!searchText.length && !isLoading && (
            <>
              <FlatList
                data={searchData}
                ListHeaderComponent={() => {
                  return (
                    <TouchableOpacity
                      style={styles.viewtextimage}
                      onPress={() => {
                        textInputRef?.current?.blur();
                        setOpenTabBar(true);
                      }}
                    >
                      <View style={styles.viewimg}>
                        <View style={styles.profileScr}>
                          <VectorImage source={search_icon} />
                        </View>
                        <View>
                          <Text style={styles.textJorden}>{searchText}</Text>
                        </View>
                      </View>
                      <View style={{ transform: [{ rotate: "180deg" }] }}>
                        <VectorImage source={back_icon} />
                      </View>
                    </TouchableOpacity>
                  );
                }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.viewtextimage}
                      onPress={() => onSearchItemPress(item)}
                    >
                      <View style={styles.viewimg}>
                        <View style={styles.profileScr}>
                          {item?.image ? (
                            <FastImage
                              source={{ uri: item?.image }}
                              style={styles.image}
                            />
                          ) : (
                            <VectorImage source={search_icon} />
                          )}
                        </View>
                        <View>
                          <Text style={styles.textJorden}>{item?.name}</Text>
                          <Text style={styles.textUsers}>On {item?.type}</Text>
                        </View>
                      </View>
                      <View style={{ transform: [{ rotate: "180deg" }] }}>
                        <VectorImage source={back_icon} />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </>
          )}
          {!!recentData.length &&
            !searchData.length &&
            !isLoading &&
            !searchText.length && (
              <>
                <View style={styles.textView}>
                  <Text style={styles.recentSearch}>
                    {strings.RECENT_SEARCH}
                  </Text>
                  <TouchableOpacity onPress={() => onRemoveRecentSearch(null)}>
                    <Text style={styles.clearAll}>{strings.CLEAR_ALL}</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={recentData}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={styles.viewtextimage}
                        onPress={() => onSearchItemPress(item)}
                      >
                        <View style={styles.viewimg}>
                          <FastImage
                            source={{ uri: item.image }}
                            style={styles.image}
                            defaultSource={profile_pic}
                          />
                          <View>
                            <Text style={styles.textJorden}> {item.name}</Text>
                            <Text style={styles.textUsers}>On {item.type}</Text>
                          </View>
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              onRemoveRecentSearch(item?.historyId)
                            }
                          >
                            <VectorImage source={cross_icon} />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </>
            )}
          {isLoading && <SearchSkeleton />}
        </>
      ) : (
        <View style={{ flex: 1 }}>
          <CustomTabBar
            tabs={[
              "Trending",
              "Videos",
              "Post",
              "Shop",
              "Users",
              "Product",
              "Hastags",
            ]}
            selectedTabIndex={selectedTabIndex}
            onTabChangeAction={(index) => {
              setSelectedTabIndex(index);
            }}
            scrollEnabled={true}
          />
          {!selectedTabIndex && (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                {trendingsData[1]?.list?.length >= 1 && (
                  <>
                    <View style={styles.textView}>
                      <Text style={styles.recentSearch}>Video</Text>
                      <TouchableOpacity
                        onPress={() => onRemoveRecentSearch(null)}
                      >
                        <Text style={styles.clearAll}>{strings.SEE_ALL}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                      <FlatList
                        data={trendingsData[1].list}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                          return (
                            <View style={styles.trendingItemContainer}>
                              <Video
                                source={{
                                  uri: item?.files[0]?.url,
                                }}
                                ref={player}
                                paused={true}
                                style={styles.trendingSrc}
                                onLoad={() => {
                                  player.current.seek(10);
                                }}
                              />
                              <View style={styles.userDetailView}>
                                <FastImage
                                  source={{
                                    uri: item?.createdBy?.profileImgUrl,
                                  }}
                                  defaultSource={profile_pic}
                                  style={styles.userImage}
                                />
                                <Text style={styles.userNameText}>
                                  {item?.createdBy?.name}
                                </Text>
                              </View>
                              <Text
                                numberOfLines={2}
                                style={{
                                  color: "#9E9E9E",
                                  fontFamily: GILROY_REGULAR,
                                  fontSize: 10,
                                }}
                              >
                                Lorem ipsum dolor sit amet consectetur. Sapien
                                ac sollicitudin egestas id eget
                                pellentesque.Lorem ipsum dolor sit Read More5
                              </Text>
                            </View>
                          );
                        }}
                      />
                    </View>
                  </>
                )}

                {trendingsData[0]?.list?.length >= 1 && (
                  <>
                    <View style={styles.textView}>
                      <Text style={styles.recentSearch}>Post</Text>
                      <TouchableOpacity
                        onPress={() => onRemoveRecentSearch(null)}
                      >
                        <Text style={styles.clearAll}>{strings.SEE_ALL}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                      <FlatList
                        data={trendingsData[0].list}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                          return (
                            <View style={styles.trendingItemContainer}>
                              <FastImage
                                source={{
                                  uri: item?.files[0]?.url,
                                }}
                                style={styles.trendingSrc}
                                defaultSource={placeholder_image}
                              />
                              <View style={styles.userDetailView}>
                                <FastImage
                                  source={{
                                    uri: item?.createdBy?.profileImgUrl,
                                  }}
                                  defaultSource={profile_pic}
                                  style={styles.userImage}
                                />
                                <Text style={styles.userNameText}>
                                  {item?.createdBy?.name}
                                </Text>
                              </View>
                              <Text
                                numberOfLines={2}
                                style={{
                                  color: "#9E9E9E",
                                  fontFamily: GILROY_REGULAR,
                                  fontSize: 10,
                                }}
                              >
                                {item?.createdBy?.name}
                              </Text>
                            </View>
                          );
                        }}
                      />
                    </View>
                  </>
                )}
              </ScrollView>
            </>
          )}
          {selectedTabIndex === 1 && (
            <>
              <View style={{ flex: 1 }}>
                <FlatList
                  data={videoData}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.trendingItemContainer}>
                        <Video
                          source={{
                            uri: item?.files[0]?.url,
                          }}
                          ref={player}
                          paused={true}
                          style={styles.trendingSrc}
                          onLoad={() => {
                            player.current.seek(10);
                          }}
                        />
                        <View style={styles.userDetailView}>
                          <FastImage
                            source={{ uri: item?.createdBy?.profileImgUrl }}
                            defaultSource={profile_pic}
                            style={styles.userImage}
                          />
                          <Text style={styles.userNameText}>
                            {item?.createdBy?.name}
                          </Text>
                        </View>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: "#9E9E9E",
                            fontFamily: GILROY_REGULAR,
                            fontSize: 10,
                          }}
                        >
                          Lorem ipsum dolor sit amet consectetur. Sapien ac
                          sollicitudin egestas id eget pellentesque.Lorem ipsum
                          dolor sit Read More5
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </>
          )}
          {selectedTabIndex === 2 && (
            <View style={{ flex: 1 }}>
              <FlatList
                data={postData}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.trendingItemContainer}>
                      <FastImage
                        source={{
                          uri: item?.files[0]?.url,
                        }}
                        style={styles.trendingSrc}
                        defaultSource={placeholder_image}
                      />
                      <View style={styles.userDetailView}>
                        <FastImage
                          source={{ uri: item?.createdBy?.profileImgUrl }}
                          defaultSource={profile_pic}
                          style={styles.userImage}
                        />
                        <Text style={styles.userNameText}>
                          {item?.createdBy?.name}
                        </Text>
                      </View>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: "#9E9E9E",
                          fontFamily: GILROY_REGULAR,
                          fontSize: 10,
                        }}
                      >
                        Lorem ipsum dolor sit amet consectetur. Sapien ac
                        sollicitudin egestas id eget pellentesque.Lorem ipsum
                        dolor sit Read More5
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          )}
          {selectedTabIndex === 3 && (
            <View style={styles.faltlistConatiner}>
              <FlatList
                data={shopData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ShopsListComponent item={item} />}
              />
            </View>
          )}
          {selectedTabIndex === 4 && (
            <View style={styles.faltlistConatiner}>
              <FlatList
                data={usersData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <UsersListComponent
                    item={item}
                    onPressFollow={onPressFollow}
                  />
                )}
              />
            </View>
          )}
          {selectedTabIndex === 5 && (
            <View style={styles.faltlistConatiner}>
              <FlatList
                numColumns={2}
                data={productData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ProductsListComponent data={item} />}
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default RecentSearchScreen;

const styles = StyleSheet.create({
  backIconView: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  faltlistConatiner: {
    flex: 1,
    marginTop: 20,
  },
  userNameText: {
    color: neutralBlack,
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
  },
  userImage: {
    width: 16,
    height: 16,
    borderRadius: 999,
  },
  userDetailView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  trendingSrc: {
    width: "100%",
    height: SCREEN_WIDTH * 0.5,
    justifyContent: "center",
    borderRadius: 8,
  },
  trendingItemContainer: {
    marginVertical: 15,
    gap: 10,
    width: "46%",
    marginLeft: SCREEN_WIDTH * 0.025,
  },
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  flatlistView: {
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: "18%",
  },
  mainContainer: {
    marginTop: 5,
    flexDirection: "row",
  },
  tab: {
    borderWidth: 0.5,
    borderColor: skyBlueColor,
  },
  Touchablecontainer: {
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
    marginHorizontal: 15,
  },
  searchBar: {
    width: "90%",
  },
  recentSearch: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    color: neutralBlack,
  },
  clearAll: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    marginTop: 5,
    color: skyBlueColor,
  },
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginHorizontal: 20,
  },
  textJorden: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18.83,
    color: neutralBlack,
  },
  textUsers: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: grey,
  },
  viewtextimage: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
  },
  viewimg: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileScr: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 48,
    width: 48,
    borderRadius: 999,
    backgroundColor: "#F5F5F5",
  },
  image: { height: 48, width: 48, borderRadius: 999 },

  imageSkeleton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  textSkeleton: {
    width: 120,
    height: 20,
    borderRadius: 4,
    marginTop: 6,
  },
  subtextSkeleton: {
    width: 80,
    height: 20,
    borderRadius: 4,
    marginTop: 6,
  },
  iconSkeleton: {
    width: 30,
    height: 30,
  },
  container: {
    width: "93%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
  viewCart: {
    marginVertical: 15,
    gap: 10,
    width: "45%",
    marginLeft: SCREEN_WIDTH * 0.03,
  },
  imageStyle: {
    width: "100%",
    height: SCREEN_WIDTH * 0.5,
    justifyContent: "center",
    borderRadius: 8,
  },
});
