import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import VectorImage from "react-native-vector-image";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { midGray, neutralBlack, whiteColor } from "../../utils/colors";
import { next_icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";

const dataActivity = [
  { title: "Post you recently like" },
  { title: "Recently comments" },
  { title: "Setup shared category " },
  { title: "Setup Viewers" },
];

const YourActivity = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.YOUR_ACTIVITY}
          navigation={navigation}
        />
      </View>

      <View style={styles.mainContainer}>
        <FlatList
          data={dataActivity}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.container}>
                <Text style={styles.textStyle}>{item.title}</Text>
                <View style={styles.rightContainer}>
                  <VectorImage style={styles.iconStyle} source={next_icon} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default YourActivity;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  mainContainer: {
    justifyContent: "center",
    marginTop: 20,
    flex:1
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderBottomColor: midGray,
    width:'92%',
    alignSelf:'center',
    marginTop:10,
    paddingHorizontal:8
  },
  textStyle: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    color:neutralBlack
  },
  iconStyle: {
    width: 4,
    height: 9,
  },
  rightContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
