import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import { whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { GILROY_BOLD, GILROY_REGULAR } from "../../utils/fonts";
import { neutralBlack, grey } from "../../utils/colors";
import { radio_check_icon } from "../../utils/images";
import { un_check_icon } from "../../utils/images";

const SensitiveContentScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.SENSITIVE_CONTENT}
          navigation={navigation}
        />
      </View>
      <View style={styles.mainView}>
        <View style={styles.loremView}>
          <Text style={styles.loremText}>{strings.LOREM_TEXT}</Text>
        </View>
        <View style={styles.viewChooseText}>
          <View style={styles.textOne}>
            <Text style={styles.chooseText}>{strings.CHOOSE}</Text>
          </View>
          <View style={styles.textTwo}>
            <View>
              <View style={styles.standardTextView}>
                <Text style={styles.headText}>{strings.STANDARD}</Text>
              </View>
              <View style={styles.loremipsumText}>
                <Text style={styles.consecteturText}>
                  {strings.CONSECTETUR}
                </Text>
              </View>
            </View>

            <VectorImage style={styles.icon} source={radio_check_icon} />
          </View>
          <View style={styles.textTwo}>
            <View style={styles.viewStandardNew}>
              <View style={styles.standardTextView}>
                <Text style={styles.headText}>{strings.LESS}</Text>
              </View>
              <View style={styles.loremipsumText}>
                <Text style={styles.consecteturText}>
                  {strings.CONSECTETUR}
                </Text>
              </View>
            </View>
            <VectorImage style={styles.iconTwo} source={un_check_icon} />
          </View>
          <View style={styles.viewStandardNew}>
            <View style={styles.loremipsumTextNew}>
              <Text style={styles.consecteturText}>{strings.THIS}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SensitiveContentScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex:1
  },
  header: {
    marginHorizontal: 15,
  },
  mainView: {
    marginTop: 30,
    gap: 24,
    width:'98%',
    alignSelf:'center'
  },
  loremView: {
    marginHorizontal: 15,
  },
  loremText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 21.6,
    color: grey,
  },
  viewChooseText: {
    gap: 16,
  },
  textOne: {
    marginHorizontal: 15,
  },
  chooseText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 28.8,
    color: neutralBlack,
  },
  viewStandard: {
    backgroundColor: "red",
    width: "95%",
    height: "60%",
  },
  textTwo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  standardTextView: {
    height: 30,
  },
  headText: {
    fontFamily: GILROY_BOLD,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22.4,
  },
  loremipsumText: {
    width: "80%",
    height: 14,
  },
  consecteturText: {
    fontFamily: GILROY_BOLD,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 13.92,
    color: grey,
  },
  icon: {
    height: 20,
    width: 20,
  },
  iconTwo: {
    height: 20,
    width: 20,
  },
  viewStandardNew: {
    marginTop: 20,
  },
  loremipsumTextNew: {
    marginHorizontal: 15,
  },
});
