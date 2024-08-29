import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import {
  whiteColor,
  lightGrey,
  grey,
  neutralBlack,
  midGray,
} from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import {
  back_icon,
  camera_icon,
  delete_icon,
  profileImg,
  verifyBlue_icon,
} from "../../utils/images";
import { palceholders } from "../../assets/string/strings";
import { GILROY_REGULAR } from "../../utils/fonts";
import FastImage from "react-native-fast-image";
import { newGroupData } from "../../sampleData/NewGroupData";
const NewGroupScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.backBtn}>
        <CustomHeaderShown
          navigation={navigation}
          title={strings.NEW_GROUP}
          rightheadertext={strings.CREATE}
          onRightHeaderPress={()=>navigation.navigate("OmocOfficialScreen")}
        />
      </View>
      <View style={styles.cameraIconView}>
        <VectorImage style={styles.cameraIcon} source={camera_icon} />
      </View>
      <View style={styles.placeholderView}>
        <TextInput placeholder={palceholders.GROUP_NAME} />
      </View>
      <Text style={styles.participantText}>{strings.PARTICIPANT}</Text>
      <View>
        <FlatList
          data={newGroupData}
          renderItem={({ item }) => {
            return (
              <View style={styles.profileContainer}>
                <View style={styles.container}>
                  <FastImage source={item.Image} style={styles.profileImage} />
                  <Text style={styles.profileText}>{item.Heading}</Text>
                </View>
                <TouchableOpacity>
                  <VectorImage style={styles.removeIcon} source={delete_icon} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewGroupScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  backBtn: {
    marginHorizontal: 15,
  },
  cameraIconView: {
    backgroundColor: lightGrey,
    height: "12%",
    width: "23%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "15%",
  },
  cameraIcon: {
    height: 36,
    width: 36,
  },
  placeholderView: {
    backgroundColor: lightGrey,
    height: 44,
    width: "92%",
    marginHorizontal: 15,
    borderRadius: 16,
    padding: 15,
    marginTop: 25,
  },
  participantText: {
    color: grey,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    marginTop: 20,
    marginHorizontal: 15,
  },
  profileImage: {
    width: 32,
    height: 32,
  },
  profileText: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: neutralBlack,
    marginLeft: 15,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    paddingBottom: 12,
  },
  removeIcon: {
    width: 16,
    height: 16,
    tintColor: neutralBlack,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
