import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import {
  grey,
  neutralBlack,
  skyBlueColor,
  whiteColor,
  dangerRed,
  midBlack,
  lightGrey50,
  gray88,
} from "../../utils/colors";
import { GILROY_MEDIUM, GILROY_SEMIBOLD } from "../../utils/fonts";
import { radio_check_icon, grey_radio_icon } from "../../utils/images";
import VectorImage from "react-native-vector-image";
import CustomButton from "../../components/CustomButton";
import CustomCheckBox from "../../components/CustomCheckBox";

const colorData = [
  { color: "White", isSelected: false },
  { color: "Red", isSelected: false },
  { color: "Blue", isSelected: false },
];
const CustomProductScreen = ({ navigation }) => {
  const [indexShow, setIndexShow] = useState(0);
  const [selectedColor, setSelectedColor] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {}, [selectedColor]);

  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const hadleIndex = () => {
    setIndexShow(indexShow + 1);
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerView}>
        <CustomHeaderShown
          title={strings.CUSTOM_PRODUCT}
          navigation={navigation}
        />
      </View>
      <View style={styles.checkBoxView}>
        <VectorImage source={radio_check_icon} style={styles.boxOne} />
        <View
          style={[
            styles.dotedView,
            {
              borderColor: indexShow >= 1 ? skyBlueColor : grey,
            },
          ]}
        />
        <VectorImage
          source={grey_radio_icon}
          style={{ tintColor: indexShow >= 1 ? skyBlueColor : grey }}
        />
        <View
          style={[
            styles.dotedView,
            {
              borderColor: indexShow >= 2 ? skyBlueColor : grey,
            },
          ]}
        />
        <VectorImage
          source={grey_radio_icon}
          style={{ tintColor: indexShow === 2 ? skyBlueColor : grey }}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.colorText}>{strings.COLOR}</Text>
        <Text
          style={[
            styles.sizeText,
            {
              color: indexShow >= 1 ? skyBlueColor : grey,
            },
          ]}
        >
          {strings.SIZE}
        </Text>
        <Text
          style={[
            styles.noteText,
            {
              color: indexShow === 2 ? skyBlueColor : grey,
            },
          ]}
        >
          {strings.NOTE}
        </Text>
      </View>
      {indexShow === 0 && (
        <>
          <View style={styles.viewWhatColor}>
            <Text style={styles.textWhatColor}>{strings.WHAT_COLOR}</Text>
            <Text style={styles.textYouCan}>{strings.YOU_CAN_SELECT_ONE}</Text>
          </View>
          <FlatList
            data={colorData}
            renderItem={({ item, index }) => {
              const found = selectedColor.some(
                (val) => item.color === val?.color
              );
              return (
                <View style={styles.boxView}>
                  <CustomCheckBox
                    boxType="round"
                    onFillColor={skyBlueColor}
                    onCheckColor={whiteColor}
                    onSelect={(value) => {
                      if (value) {
                        let selColor = [...selectedColor]; // make a separate copy of the array
                        selColor.push(item);
                        setSelectedColor(selColor);
                      } else {
                        let array = [...selectedColor]; // make a separate copy of the array
                        array.slice(0, index);
                        setSelectedColor(array);
                      }
                    }}
                  />

                  <Text style={styles.whiteText}>{item.color}</Text>
                </View>
              );
            }}
          />
        </>
      )}
      {indexShow === 1 && (
        <>
          <View style={styles.viewWhatColor}>
            <Text style={styles.textWhatColor}>{strings.CHOOSE_THE_SIZE}</Text>
            <Text style={styles.textYouCan}>
              {strings.YOU_CAN_SELECT_MORE_THEN_ONE}
            </Text>
          </View>
          <View style={styles.viewOne}>
            <View style={styles.boxTwoView}>
              <CustomCheckBox
                boxType="square"
                onFillColor={skyBlueColor}
                onCheckColor={whiteColor}
                style={styles.radioIcon}
                onSelect={() => {}}
              />
              <Text style={styles.text42}>42</Text>
            </View>
          </View>
          <View style={styles.boxTwoView}>
            <CustomCheckBox
              onFillColor={skyBlueColor}
              onCheckColor={whiteColor}
              boxType="square"
              style={styles.radioIcon}
              onSelect={() => {}}
            />
            <Text style={styles.text32}>32</Text>
          </View>
          <View style={styles.boxTwoView}>
            <CustomCheckBox
              onFillColor={skyBlueColor}
              onCheckColor={whiteColor}
              boxType="square"
              style={styles.radioIcon}
              onSelect={() => {}}
            />
            <Text style={styles.text22}>22</Text>
          </View>
        </>
      )}

      {indexShow === 2 && (
        <>
          <View style={styles.viewWhatColor}>
            <Text style={styles.textWhatColor}>{strings.WRITE_NOTE}</Text>
            <Text style={styles.textYouCan}>{strings.YOU_CAN}</Text>
          </View>
          <View>
            <TextInput
              multiline={true}
              numberOfLines={10}
              placeholderTextColor={grey}
              style={styles.textInput}
              placeholder="Enter Text"
            />
          </View>
        </>
      )}

      {indexShow <= 1 && (
        <View style={styles.btnContainer}>
          <CustomButton
            textstyle={[
              styles.btnText,
              {
                color: selectedColor.length == 0 ? lightGrey50 : whiteColor,
              },
            ]}
            style={[
              styles.btn,
              {
                backgroundColor:
                  selectedColor.length == 0 ? gray88 : skyBlueColor,
              },
            ]}
            text={strings.NEXT_STEP}
            onPress={hadleIndex}
            disable={selectedColor.length == 0}
          />
        </View>
      )}
      {indexShow === 2 && (
        <View style={styles.btnContainer}>
          <CustomButton
            textstyle={styles.btnText}
            style={styles.btn}
            text={strings.ADD_TO_CART}
            onPress={() => {}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CustomProductScreen;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  headerView: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  checkBoxView: {
    marginTop: 50,
    flexDirection: "row",
    alignSelf: "center",
  },

  boxOne: {
    height: 24,
    width: 24,
    marginLeft: 5,
  },
  viewOne: {
    marginTop: 15,
  },
  textView: {
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: 75,
  },
  colorText: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22.4,
    color: skyBlueColor,
    marginHorizontal: 30,
    marginLeft: 5,
  },
  sizeText: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22.4,
    color: grey,
    marginHorizontal: 22,
    paddingLeft: 25,
  },
  noteText: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22.4,
    color: grey,
    marginHorizontal: 20,
    paddingLeft: 30,
  },
  viewWhatColor: {
    marginTop: 70,
    left: 23,
    gap: 24,
  },
  checkBoxBlue: {
    marginTop: 15,
  },
  checkBoxRed: {
    marginTop: 8,
  },
  textWhatColor: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 21.47,
    color: neutralBlack,
  },
  textYouCan: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 10,
    color: dangerRed,
  },
  boxView: {
    marginTop: 25,
    borderRadius: 12,
    backgroundColor: whiteColor,
    borderWidth: 1,
    marginHorizontal: 20,
    gap: 12,
    height: 56,
    width: "90%",
    paddingLeft: 20,
    borderColor: grey,
    flexDirection: "row",
    alignItems: "center",
  },
  boxTwoView: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: whiteColor,
    borderWidth: 1,
    marginHorizontal: 20,
    gap: 12,
    height: 56,
    width: "90%",
    paddingLeft: 20,
    borderColor: grey,
    flexDirection: "row",
    alignItems: "center",
  },
  boxThreeView: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: whiteColor,
    borderWidth: 1,
    marginHorizontal: 20,
    gap: 12,
    height: 56,
    width: "90%",
    paddingLeft: 20,
    borderColor: grey,
    flexDirection: "row",
  },
  radioIcon: {
    marginTop: 5,
  },
  radioIconRed: {
    marginTop: 6,
  },
  whiteText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19.09,
    color: midBlack,
    left: 10,
  },
  redText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19.09,
    color: midBlack,
    marginTop: 8,
    left: 10,
  },
  text42: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19.09,
    color: midBlack,
    marginHorizontal: 10,
    marginTop: 5,
  },
  text32: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19.09,
    color: midBlack,
    marginHorizontal: 10,
    marginTop: 5,
  },
  text22: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19.09,
    color: midBlack,
    marginHorizontal: 10,
    marginTop: 5,
  },
  btn: {
    backgroundColor: skyBlueColor,
    position: "absolute",
    bottom: 10,
  },
  btnText: {
    color: whiteColor,
  },
  btnContainer: {
    flex: 1,
  },
  dotedView: {
    borderWidth: 1,
    height: 1,
    width: 80,
    borderStyle: "dashed",
    borderColor: grey,
    alignSelf: "center",
  },
  textInput: {
    width: "95%",
    height: 120,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 24,
    padding: 15,
    borderColor: gray88,
  },
});
