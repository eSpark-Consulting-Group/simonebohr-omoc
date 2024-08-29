import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";
import ApiService from "../services/api.service";
import { GILROY_MEDIUM } from "../utils/fonts";
import { gray88 } from "../utils/colors";
import { SCREEN_WIDTH } from "../utils";
import CircleSkeleton from "../skeleton/CircleSkeleton";

const ClothingCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await ApiService.getHomeCategory();
      setCategories(response?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryPress = (data) => {
    navigation.navigate("CategoryList", { headerName: data });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleCategoryPress(item)}
            style={styles.categoryContainer}
          >
            <FastImage
              source={{ uri: item?.image }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>{item?.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => {
          return <CircleSkeleton />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
  },
  categoryContainer: {
    marginRight: 12,
    alignItems: "center",
  },
  categoryImage: {
    width: SCREEN_WIDTH / 5.8,
    height: SCREEN_WIDTH / 5.8,
    borderRadius: 999,
    borderColor: gray88,
    borderWidth: 0.3,
  },
  categoryName: {
    marginTop: 5,
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    textAlign: "center",
  },
});

export default ClothingCategoryList;
