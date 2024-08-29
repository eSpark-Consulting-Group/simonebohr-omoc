import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Customheader from "../../component/Customheader";
import { CONTEXT } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import VectorImage from "react-native-vector-image";
import {
  a_letter_icon,
  arrow_down,
  diamond_icon,
  gallery_icon,
  link_icon,
  redo_icon,
  undo_icon,
} from "../../utils/images";

const ManageNewsLetters = () => {
  const _editor = React.createRef();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Customheader
        title={CONTEXT.NEWSLETTERS}
        showBackIcon={true}
        Containerstyle={{
          width: "93%",
          alignSelf: "center",
        }}
      />
      <View style={styles.mainContainerView}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.viewNews}>
            <Text style={styles.newsLetters}>{CONTEXT.NEWSLETTERS}</Text>
            <Text style={styles.manageShop}>{CONTEXT.MANAGE_SHOP}</Text>
          </View>

          <View style={styles.titleView}>
            <View style={styles.viewTitle}>
              <Text style={styles.title}>{CONTEXT.TITLE}</Text>
              <TextInput
                style={styles.input}
                placeholder={CONTEXT.WRITE_YOUR_NEWSLETTER_TITLE}
                placeholderTextColor={Colors.neutral80}
              />
            </View>
            <View style={styles.viewDesc}>
              <Text style={styles.title}>{CONTEXT.DESCRIPTION}</Text>
              <View style={styles.viewinputDescription}>
                <TextInput
                  style={styles.inputDescription}
                  placeholder={CONTEXT.WRITE_A_PERSONALIZED_MESSAGE}
                  placeholderTextColor={Colors.neutral80}
                  multiline={true}
                />
              </View>
            </View>
            <View style={styles.mainViewTemplate}>
              <View style={styles.galleryView}>
                <TouchableOpacity style={styles.diamondView}>
                  <VectorImage
                    source={a_letter_icon}
                    style={styles.galleryIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.diamondView}>
                  <VectorImage source={link_icon} style={styles.galleryIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.diamondView}>
                  <VectorImage
                    source={diamond_icon}
                    style={styles.galleryIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.diamondView}>
                  <VectorImage
                    source={gallery_icon}
                    style={styles.galleryIcon}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.editTemp}>
                <Text style={styles.tempText}>{CONTEXT.EDIT_TEMPLATE}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewIcon}>
              <TouchableOpacity>
                <VectorImage source={undo_icon} style={styles.undoicon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <VectorImage source={redo_icon} style={styles.undoicon} />
              </TouchableOpacity>
              <Text style={styles.times}>Times New Roman</Text>
              <TouchableOpacity>
                <VectorImage source={arrow_down} style={styles.arrowDown} />
              </TouchableOpacity>
            </View>
            <QuillEditor style={styles.editor} ref={_editor} />
            <View style={styles.viewQuiltoolBar}>
              <QuillToolbar
                styles={{
                  toolbar: {
                    provider: (provided) => ({
                      ...provided,
                      borderTopWidth: 0,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      marginHorizontal: 12,
                    }),
                    root: (provided) => ({
                      ...provided,
                      backgroundColor: Colors.whiteColor,
                      width: 370,
                    }),
                  },
                }}
                editor={_editor}
                options="full"
                theme="light"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.btnText}>{CONTEXT.PUBLISH_NEWSLETTER}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ManageNewsLetters;

const styles = StyleSheet.create({
  mainContainerView: {
    marginHorizontal: 15,
  },
  newsLetters: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    color: Colors.blackColor,
  },
  manageShop: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.blackColor,
  },
  viewNews: {
    marginTop: 30,
    gap: 20,
  },
  titleView: {
    width: "100%",
    height: 506,
    backgroundColor: Colors.whiteColor,
    marginTop: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.grey,
  },
  input: {
    width: "98%",
    height: 49,
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: Colors.gray91,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.neutral80,
    alignSelf: "center",
    justifyContent: "center",
  },
  viewinputDescription: {
    width: "98%",
    height: 183,
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: Colors.gray91,

    alignSelf: "center",
  },
  inputDescription: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.neutral80,
  },
  galleryView: {
    backgroundColor: Colors.whiteColor,
    width: 164,
    height: 32,
    gap: 12,
    flexDirection: "row",
  },
  diamondView: {
    height: 32,
    width: 32,
    backgroundColor: Colors.lightGrey,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  galleryIcon: {
    height: 16,
    width: 16,
  },
  editTemp: {
    width: 101,
    height: 28,
    backgroundColor: Colors.whiteColor,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 10,
    borderColor: Colors.skyBlueColor,
  },
  tempText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 10,
    color: Colors.skyBlueColor,
  },
  mainViewTemplate: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 10,
  },
  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginHorizontal: 10,
    marginTop: "27%",
    alignSelf: "center",
    width: "100%",
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  viewDesc: {
    marginTop: 30,
    gap: 10,
    marginHorizontal: 10,
  },
  viewTitle: {
    marginTop: 10,
    gap: 10,
    marginHorizontal: 10,
  },
  editor: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.dangerRed,
  },
  toolbar: {
    width: 32,
    backgroundColor: "red",
  },
  times: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.blackColor,
  },
  news: {
    marginTop: 20,
  },
  scrollview: {
    marginBottom: 70,
  },
  viewIcon: {
    flexDirection: "row",
    gap: 20,
    marginTop: 30,
    marginHorizontal: 15,
  },
  undoicon: {
    height: 20,
    width: 20,
  },
  arrowDown: {
    height: 14,
    width: 14,
    right: 15,
  },
  viewQuiltoolBar: {
    width: 370,
  },
});
