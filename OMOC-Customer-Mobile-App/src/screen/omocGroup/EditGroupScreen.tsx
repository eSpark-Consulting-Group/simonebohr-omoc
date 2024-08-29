import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import {
  grey,
  midGray,
  neutralBlack,
  skyBlueColor,
  whiteColor,
} from "../../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import FastImage from "react-native-fast-image";
import {  trash_icon, camera_icon,brandIcon } from "../../utils/images";
import { editgroupData } from "../../sampleData/EditGroupData";
import { TouchableOpacity } from "react-native-gesture-handler";

const EditGroupScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.backBtn}>
      <View style={styles.btnView}>
        <CustomHeaderShown
          title={strings.EDIT_GROUP}
          style={styles.btn}
          navigation={navigation}
          rightheadertext={strings.DONE}
        />
      </View>
      <View style={styles.mainViewContainer}>
        <View style={styles.imageView}>
          <FastImage style={styles.omocImage} source={brandIcon} />
          <TouchableOpacity>
            <View style={styles.cameraIcon}>
              <VectorImage style={styles.victorIcon} source={camera_icon} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder={strings.OMOC_GROUP}
            placeholderTextColor={neutralBlack}
          />
        </View>
        <View>
          <Text style={styles.textParticipant}>{strings.PARTICIPANT}</Text>
        </View>
        <View style={styles.viewFlat}>
          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={editgroupData}
            contentContainerStyle={{
              paddingBottom: 150,
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.flatlistView}>
                  <View style={styles.viewFastImage}>
                    <FastImage style={styles.directImage} source={item.image} />
                  </View>
                  <View style={styles.viewText}>
                    <Text style={styles.textYeete}>{item.name}</Text>
                  </View>
                  <View>
                    <TouchableOpacity>
                      <VectorImage
                        style={styles.trashIcon}
                        source={trash_icon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditGroupScreen;

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  mainViewContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  btnView: {
    marginHorizontal: 18,
    marginTop: 15,
  },
  btn: {
    width: "45%",
    height: 49,
    backgroundColor: skyBlueColor,
    borderRadius: 24,
    marginLeft: 2,
  },
  imageView: {
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  omocImage: {
    height: 100,
    width: 100,
    alignSelf: "center",
    position: "absolute",
  },

  input: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: neutralBlack,
    width: "90%",
    height: 50,
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 16,
    borderWidth: 0.8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 10,
    borderColor: grey,
  },
  textParticipant: {
    marginTop: 30,
    left: 19,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: grey,
  },

  viewAddParticipant: {
    flexDirection: "row",
    borderRadius: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 12,
    height: 57,
    width: "90%",
    left: 15,
    marginTop: 10,
  },
  addText: {
    marginTop: 4,
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22.4,
    color: neutralBlack,
  },

  flatlistView: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderColor: midGray,
    width: "99%",
    alignSelf: "center",
    flexDirection: "row",
  },
  textYeete: {
    marginTop: 20,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: neutralBlack,
  },

  viewText: {
    height: 60,
    width: "70%",
    gap: 4,
    marginHorizontal: 10,
  },
  viewFastImage: {
    marginTop: 15,
    marginHorizontal: 12,
  },
  directImage: {
    height: 32,
    width: 32,
  },

  flatList: {
    marginBottom: 20,
  },
  viewFlat: {
    marginBottom: 150,
  },
  victorImage: {
    height: 30,
    width: 30,
  },
  trashIcon: {
    height: 16,
    width: 16,
    marginTop: 22,
  },
  cameraIcon: {
    backgroundColor: skyBlueColor,
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    marginLeft: 60,
  },
  victorIcon: {
    tintColor: whiteColor,
  },
});
