import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { gray88 } from "../utils/colors";
import { WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import SquareSkeleton from "../skeleton/SquareSkeleton";

const ImageList = ({ navigation, listData }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate("ProductDetailScreen", {
            data: item,
          });
        }}
      >
        <FastImage
          source={{
            uri: item.images[0]?.url,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        horizontal={true}
        ListEmptyComponent={() => {
          return <SquareSkeleton />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 15,
  },
  item: {
    resizeMode: "contain",
    marginRight: 13,
  },
  image: {
    width: WINDOW_WIDTH / 3 - 20,
    height: 120,
    resizeMode: "contain",
    borderRadius: 15,
    borderColor: gray88,
    borderWidth: 0.5,
  },
});

export default ImageList;
