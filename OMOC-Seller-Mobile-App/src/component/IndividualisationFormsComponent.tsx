import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import {
  arrow_down,
  blank_round_circle,
  blue_round_circle,
  cross_icon,
  plus,
} from "../utils/images";
import { CONTEXT, strings } from "../utils/string/strings";
import { Colors } from "../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";

const IndividualisationFormsComponent = () => {
  const [showIndividualisationForms, setShowIndividualisationForms] =
    useState(false);
  return (
    <View style={styles.productView}>
      <View style={styles.productCompoView}>
        <View style={styles.mainViewProduct}>
          <View style={styles.viewproductDescription}>
            <Text style={styles.productDescription}>
              {CONTEXT.INDIVIDUALISTATION_FORMS}
            </Text>
            <TouchableOpacity
              style={[
                showIndividualisationForms === true
                  ? styles.dropIconOpened
                  : styles.dropIcon,
              ]}
              onPress={() =>
                setShowIndividualisationForms(!showIndividualisationForms)
              }
            >
              <VectorImage source={arrow_down} />
            </TouchableOpacity>
          </View>
          {showIndividualisationForms && (
            <View style={styles.viewRecommendation}>
              <Text style={styles.recommendation}>
                {CONTEXT.SHIPPING_SERVICES}
              </Text>
              <Text style={styles.oops}>{strings.OOPS}</Text>
              <View style={styles.viewFashion}>
                <TouchableOpacity>
                  <VectorImage source={blank_round_circle} />
                </TouchableOpacity>
                <Text style={styles.display}>{CONTEXT.DISPLAYS_A_MESSAGE}</Text>
              </View>
              <View style={styles.viewFashion}>
                <TouchableOpacity>
                  <VectorImage source={blank_round_circle} />
                </TouchableOpacity>
                <Text style={styles.display}>{CONTEXT.DISPLAYS_A_SEVERAL}</Text>
              </View>
              <View style={styles.viewFashion}>
                <TouchableOpacity>
                  <VectorImage source={blue_round_circle} />
                </TouchableOpacity>
                <Text style={styles.display}>{CONTEXT.DISPLAYS_A_BUYER}</Text>
              </View>
              <View>
                <Text style={styles.configer}>
                  {CONTEXT.CONFIGURE_THE_BUYER}
                </Text>
                <TouchableOpacity style={styles.ChooseCategories}>
                  <Text style={styles.textQuestion}>
                    {CONTEXT.WRITE_QUESTION}
                  </Text>
                  <VectorImage source={arrow_down} />
                </TouchableOpacity>
              </View>
              <View style={styles.viewOption}>
                <View style={styles.viewOptionOne}>
                  <TouchableOpacity>
                    <VectorImage source={blue_round_circle} />
                  </TouchableOpacity>

                  <Text style={styles.optionOne}>{CONTEXT.OPTION_ONE}</Text>
                </View>
                <TouchableOpacity>
                  <VectorImage source={cross_icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.viewOption}>
                <View style={styles.viewOptionOne}>
                  <TouchableOpacity>
                    <VectorImage source={blank_round_circle} />
                  </TouchableOpacity>

                  <Text style={styles.optionOne}>{CONTEXT.OPTION_TWO}</Text>
                </View>
                <TouchableOpacity>
                  <VectorImage source={cross_icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.viewOption}>
                <View style={styles.viewOptionOne}>
                  <TouchableOpacity>
                    <VectorImage source={blank_round_circle} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.addNewOption}>
                      {CONTEXT.ADD_NEW_OPTION}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.btnAddRegions}>
                <VectorImage source={plus} style={styles.plusIcon} />
                <Text style={styles.addRegions}>
                  {CONTEXT.ADD_NEW_QUESTION}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default IndividualisationFormsComponent;

const styles = StyleSheet.create({
  productView: {
    backgroundColor: Colors.yellow,

    marginTop: 10,
    borderRadius: 12,
  },
  productDescription: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  viewproductDescription: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropIcon: {},
  dropIconOpened: {
    transform: [{ rotate: "180deg" }],
  },
  viewRecommendation: {
    width: "100%",
    marginTop: 15,
    gap: 16,
  },
  recommendation: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 16,
    color: Colors.neutral100,
  },
  oops: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.neutral80,
  },
  viewFashion: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  display: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.neutral100,
    width: "82%",
  },
  ChooseCategories: {
    width: "100%",
    height: 57,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: Colors.gray88,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textQuestion: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.grey,
  },

  viewOption: {
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewOptionOne: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  optionOne: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 14,
    color: Colors.neutral100,
  },
  addNewOption: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 14,
    color: Colors.skyBlueColor,
  },
  btnAddRegions: {
    width: "100%",
    height: 51,
    backgroundColor: Colors.whiteColor,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addRegions: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.skyBlueColor,
  },
  plusIcon: {
    tintColor: Colors.skyBlueColor,
  },
  configer: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.neutralBlack,
  },
  productCompoView: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    paddingBottom: 15,
  },
  mainViewProduct: {
    marginHorizontal: 10,
  },
});
