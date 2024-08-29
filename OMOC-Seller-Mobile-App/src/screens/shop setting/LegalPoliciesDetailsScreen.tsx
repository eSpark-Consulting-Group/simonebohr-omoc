import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { strings } from "../../utils/string/strings";
import { GILROY_REGULAR, GILROY_MEDIUM } from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import { edit_pencil_icon, trash_icon } from "../../utils/images";
import Customheader from "../../component/Customheader";

const LegalPoliciesDetailsScreen = () => {
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet consectetur. Hendrerit et sit neque nulla laoreet auctor Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur. Hendrerit et sit neque nulla laoreet auctor. "
  );
  return (
    <SafeAreaView style={styles.safeContainer}>
        <Customheader title={strings.LEGAL_POLICIES} showBackIcon={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.addtextHeaderView}>
        <Text style={styles.addtext}>{strings.ADD_DIFFERENT}</Text>
      </View>
      <View style={styles.viewBox}>
        <Text>{strings.SINGAPORE}</Text>
        <TouchableOpacity>
          <VectorImage source={edit_pencil_icon} style={styles.pencilIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.legalText}>{strings.LEGAL}</Text>
      <View style={styles.inputLegalPolicy}>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            value={text}
            onChange={setText}
            placeholder={strings.ENTER_LEGAL}
            multiline={true}
          />
        </View>
        <View style={styles.viewIcon}>
          <TouchableOpacity>
            <VectorImage
              source={edit_pencil_icon}
              style={styles.editPencilIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.legalText}>{strings.LANGUAGE}</Text>
      <View style={styles.inputLegalPolicy}>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.inputLanguage}
            value={text}
            onChange={setText}
            placeholder={`
            * Lorem ipsum dolor sit amet consectetur. Hendrerit et sit neque nulla laoreet auctor Lorem ipsum dolor sit
            * Hendrerit et sit neque nulla laoreet auctor.
            * Hendrerit et sit neque nulla laoreet auctor.
            * Hendrerit et sit neque nulla laoreet auctor.
            * Hendrerit et sit neque nulla laoreet auctor.
          `}
          
            multiline={true}
          />
        </View>
     
          <TouchableOpacity style={styles.viewPencil}>
            <VectorImage
              source={edit_pencil_icon}
              style={styles.editPencilIcon}
            />
          </TouchableOpacity>
     
      </View>
      <TouchableOpacity style={styles.continueButton}>
        <VectorImage source={trash_icon} style={styles.trashIcon} />
        <Text style={styles.btnText}>{strings.DELETE}</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LegalPoliciesDetailsScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex:1,
    backgroundColor: Colors.whiteColor,
  },
  header: {
    marginTop: 15,
    height: 30,
  },
  addtextHeaderView: {
    marginHorizontal: 10,
    marginTop: 25,
  },
  addtext: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.grey,
    lineHeight: 25.2,
  },
  viewBox: {
    width: "95%",
    height: 68,
    backgroundColor: Colors.whiteColor,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.8,
    elevation: 3,
    flexDirection: "row",
    marginHorizontal: 10,
    padding: 10,
  },
  inputLegalPolicy: {
    width: "95%",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    borderColor: Colors.gray88,
    marginTop: 15,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,

    elevation: 5,
  },
  legalText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    marginLeft: 12,
    marginTop: 20,
    color: Colors.grey,
  },
  input: {
    width: "92%",
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.neutral80,
    lineHeight: 25.2,
  },
  inputLanguage: {
    width: "92%",
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.neutral80,
    lineHeight: 25.2,
  },
  editPencilIcon: {
    height: 24,
    width: 24,
  },
  pencilIcon: {
    height: 24,
    width: 24,
    marginRight: 5,
  },

  continueButton: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    alignSelf:'center',
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
     marginTop: "18%",
    borderWidth: 1,
    borderColor: Colors.dangerRed,
    flexDirection: "row",
    width:'95%',
  },
  btnText: {
    color: Colors.dangerRed,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  trashIcon: {
    marginRight: 10,
  },
  viewPencil: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  viewInput: {
    width: "90%",
  },
  viewIcon: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
