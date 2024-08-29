import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import VectorImage from "react-native-vector-image";
import { SCREEN_WIDTH, randomImage } from "../../../utils";
import { search_icon, video_circle_icon } from "../../../utils/images";
import { neutralBlack, offwhite, skyBlueColor } from "../../../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../../utils/fonts";
import { FlatList } from "react-native";
import FastImage from "react-native-fast-image";

const forYouSongsList = [
  { id: 1, title: "song 1", artist: "BoyWithUke", uri: randomImage },
  { id: 2, title: "song 2", artist: "BoyWithUke", uri: randomImage },
  { id: 3, title: "song 3", artist: "BoyWithUke", uri: randomImage },
  { id: 4, title: "song 4", artist: "BoyWithUke", uri: randomImage },
  { id: 5, title: "song 5", artist: "BoyWithUke", uri: randomImage },
  { id: 6, title: "song 6", artist: "BoyWithUke", uri: randomImage },
  { id: 7, title: "song 7", artist: "BoyWithUke", uri: randomImage },
  { id: 8, title: "song 8", artist: "BoyWithUke", uri: randomImage },
];

const SongsListBottomSheet = ({ hideMe, emojiList, _onSelectSong }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [10, "70%"], []);
  const [tabIndex, setTabIndex] = useState(false);
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

  const SongsListComponent = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.songsItemContainer}>
        <View style={styles.itemSubView}>
          <FastImage source={{ uri: item.uri }} style={styles.songsImage} />
          <View style={styles.songDetailView}>
            <Text style={styles.songsTitleText}>{item.title}</Text>
            <Text style={styles.songsArtistText}>{item.artist}</Text>
          </View>
        </View>
        <FastImage source={video_circle_icon} style={styles.videoIcon} />
      </TouchableOpacity>
    );
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.bottomSheetStyle}
    >
      <View style={styles.labelOptionsTitleWrapper}>
        <View style={styles.dragBar} />
        <View style={styles.labelOptionsSearchWrapper}>
          <View style={styles.searchIcon}>
            <VectorImage source={search_icon} />
          </View>
          <TextInput
            style={styles.labelOptionsSearch}
            placeholder="Search music or artist..."
            placeholderTextColor={neutralBlack}
          />
        </View>
      </View>
      <View style={styles.tabStyle}>
        <TouchableOpacity
          style={[
            styles.tabButtonView,
            {
              borderBottomColor: !tabIndex ? skyBlueColor : offwhite,
            },
          ]}
          onPress={() => setTabIndex(false)}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: !tabIndex ? skyBlueColor : "#AEAEAE",
              },
            ]}
          >
            For You
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButtonView,
            {
              borderBottomColor: !!tabIndex ? skyBlueColor : offwhite,
            },
          ]}
          onPress={() => setTabIndex(true)}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: !!tabIndex ? skyBlueColor : "#AEAEAE",
              },
            ]}
          >
            Browse
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.songsListForYou}>
        <FlatList
          data={forYouSongsList}
          renderItem={({ item }) => {
            return <SongsListComponent item={item} />;
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </BottomSheet>
  );
};

export default SongsListBottomSheet;

const styles = StyleSheet.create({
  dragBar: {
    marginTop: 15,
    width: 50,
    height: 3,
    borderRadius: 1,
    backgroundColor: "#fff",
  },
  labelOptionsSearchWrapper: {
    height: 44,
    flexDirection: "row",
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#F8F8F8",
    width: "95%",
  },
  labelOptionsSearch: {
    fontSize: 14,
    color: "#000000",
    width: "95%",
    fontFamily: GILROY_REGULAR,
  },
  searchIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  labelItemWrapper: {
    width: SCREEN_WIDTH / 3,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  labelOptionsTitleWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetStyle: { backgroundColor: "#D9D9D9", width: 45 },
  tabStyle: {
    flexDirection: "row",
    width: "93%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  tabButtonView: {
    borderBottomWidth: 4,
    paddingBottom: 15,
    width: "50%",
    alignItems: "center",
  },
  tabText: { fontSize: 16, fontFamily: GILROY_MEDIUM },
  songsListForYou: { width: "90%", alignSelf: "center", flex: 1 },
  songsItemContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  songsImage: { width: 64, height: 64, borderRadius: 999 },
  videoIcon: { width: 24, height: 24 },
  songsArtistText: {
    fontSize: 12,
    color: "#AEAEAE",
    fontFamily: GILROY_REGULAR,
  },
  songsTitleText: {
    fontSize: 16,
    color: neutralBlack,
    fontFamily: GILROY_MEDIUM,
  },
  songDetailView: { gap: 8 },
  itemSubView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
});
