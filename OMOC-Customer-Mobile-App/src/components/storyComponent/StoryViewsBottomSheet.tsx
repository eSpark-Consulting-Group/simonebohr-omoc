import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import VectorImage from "react-native-vector-image";
import { neutralBlack, whiteColor } from "../../utils/colors";
import FastImage from "react-native-fast-image";
import {
  delete_icon,
  directbox_icon,
  eye_view,
  heart_icon,
  like_icon,
  three_dot_Icon,
  verifyBlue_icon,
} from "../../utils/images";
import { GILROY_BOLD, GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";

const StoryViewsBottomSheet = ({ hideMe, data }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => {
    return [80, "60%"];
  }, []);

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
  const renderEmptyCommentsList = () => {
    return (
      <>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyContainerText}>No Views yet</Text>
        </View>
      </>
    );
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundComponent={() => (
        <View style={[styles.backContainer, { backgroundColor: whiteColor }]} />
      )}
    >
      <View style={styles.container}>
        <View style={styles.itemSubContainer}>
          <View style={styles.userConatiner}>
            <VectorImage source={eye_view} style={styles.likeIcon} />
            <Text style={styles.userNameText}>{data?.viewsCount}</Text>
          </View>
          <View style={styles.userConatiner}>
            <VectorImage source={heart_icon} style={styles.likeIcon} />
            <Text style={styles.userNameText}>{data?.likesCount}</Text>
          </View>
        </View>
        <View style={styles.rightView}>
          <TouchableOpacity>
            <VectorImage source={directbox_icon} style={styles.directBoxIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <VectorImage source={delete_icon} style={styles.directBoxIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        {!!data?.views?.length ? (
          <BottomSheetFlatList
            data={data?.views}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={styles.itemContainer}>
                  <View style={styles.userConatiner}>
                    <FastImage source={item.image} style={styles.userImage} />
                    {item.isAccountVerified && (
                      <VectorImage
                        source={verifyBlue_icon}
                        style={styles.verifyImage}
                      />
                    )}
                    <Text style={styles.userNameText}>{item.name}</Text>
                  </View>
                  <View style={styles.rightView}>
                    {item.liked && (
                      <TouchableOpacity>
                        <VectorImage
                          source={like_icon}
                          style={styles.likeIcon}
                        />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity>
                      <VectorImage source={three_dot_Icon} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          renderEmptyCommentsList()
        )}
      </View>
    </BottomSheet>
  );
};

export default StoryViewsBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
  },
  container: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  backContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  userImage: { width: 32, height: 32 },
  itemContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },

  userConatiner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  verifyImage: {
    width: 22,
    height: 22,
  },
  userNameText: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  rightView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  likeIcon: {
    width: 16,
    height: 16,
  },
  headerView: {},
  itemSubContainer: {
    flexDirection: "row",
    gap: 20,
  },
  directBoxIcon: {
    width: 24,
    height: 24,
    tintColor: neutralBlack,
  },
  emptyContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  emptyContainerText: {
    fontSize: 24,
    fontFamily: GILROY_BOLD,
    color: "#000000",
    textAlign: "center",
  },
  emptySubText: {
    color: "#808080",
    margin: 5,
    fontSize: 14,
    fontFamily: GILROY_REGULAR,
    textAlign: "center",
  },
});
