import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import FollowingBox from "../favouriteScreen/FollowingBox";
import { FollowerData } from "../../sampleData/FollowerData";
import { whiteColor } from "../../utils/colors";

const PopularPeopleScreen = ({ navigation }) => {
  const horizontalLimit = 3;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <CustomHeaderShown
          navigation={navigation}
          title="Popular People"
          rightheadertext="Skip"
          onRightHeaderPress={() => {
            navigation.replace("TabNavigator");
          }}
        />
        <FlatList
          numColumns={horizontalLimit}
          style={{ flexDirection: "row" }}
          data={FollowerData}
          renderItem={({ item }) => <FollowingBox data={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default PopularPeopleScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  subContainer: {
    paddingHorizontal: 15,
  },
});
