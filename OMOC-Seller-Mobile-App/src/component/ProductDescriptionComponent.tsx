import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import {
  arrow_down,
  blank_round_circle,
  blue_round_circle,
  cross_icon,
} from "../utils/images";
import { CONTEXT, strings } from "../utils/string/strings";
import { Colors } from "../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";

const ProductDescriptionComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={styles.productView}>
      <View style={styles.productCompoView}>
        <View style={styles.mainViewProduct}>
          <View style={styles.viewproductDescription}>
            <Text style={styles.productDescription}>
              {CONTEXT.PRODUCT_DESCRIPTION}
            </Text>
            <TouchableOpacity
              style={[
                showDropdown === true ? styles.dropIconOpened : styles.dropIcon,
              ]}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <VectorImage source={arrow_down} />
            </TouchableOpacity>
          </View>

          {showDropdown && (
            <>
              <View style={styles.viewProductName}>
                <Text style={styles.textProductName}>
                  {CONTEXT.PRODUCT_NAME}
                </Text>
                <Text style={styles.oops}>{strings.OOPS}</Text>
                <View>
                  <TextInput style={styles.inputBox} />
                  <View style={styles.toolView}>
                    <Text style={styles.tooltips}>{CONTEXT.TOOLTIPS}</Text>
                    <Text style={styles.tooltips}>0/70</Text>
                  </View>
                </View>
              </View>
              <View style={styles.viewRecommendation}>
                <Text style={styles.recommendation}>
                  {CONTEXT.RECOMMENDATION_CATEGORIE}
                </Text>
                <Text style={styles.oops}>{strings.OOPS}</Text>
                <View style={styles.viewFashion}>
                  <TouchableOpacity>
                    <VectorImage source={blank_round_circle} />
                  </TouchableOpacity>
                  <Text style={styles.fashion}>{CONTEXT.FASHION_WOMAN}</Text>
                </View>
                <View style={styles.viewFashion}>
                  <TouchableOpacity>
                    <VectorImage source={blank_round_circle} />
                  </TouchableOpacity>
                  <Text style={styles.fashion}>{CONTEXT.FASHION_MEN}</Text>
                </View>
                <View style={styles.viewFashion}>
                  <TouchableOpacity>
                    <VectorImage source={blank_round_circle} />
                  </TouchableOpacity>
                  <Text style={styles.fashion}>{CONTEXT.FASHION_CHILD}</Text>
                </View>
                <View style={styles.viewFashion}>
                  <TouchableOpacity>
                    <VectorImage source={blue_round_circle} />
                  </TouchableOpacity>
                  <Text style={styles.fashion}>{CONTEXT.FASHION_HEELS}</Text>
                </View>
              </View>
              <View style={styles.viewCategories}>
                <Text style={styles.recommendation}>{CONTEXT.CATEGORIES}</Text>
                <Text style={styles.oops}>{strings.OOPS}</Text>
              </View>
              <TouchableOpacity style={styles.ChooseCategories}>
                <Text style={styles.textChoose}>
                  {CONTEXT.CHOOSE_CATEGORIE}
                </Text>
                <VectorImage source={arrow_down} />
              </TouchableOpacity>
              <View style={styles.viewCategories}>
                <Text style={styles.recommendation}>
                  {CONTEXT.TAGS_PRODUCT}
                </Text>
                <Text style={styles.oops}>{strings.OOPS}</Text>
              </View>
              <View style={styles.viewAddTag}>
                <Text style={styles.textAddTags}>{CONTEXT.ADD_TAGS}</Text>
                <View style={styles.fashionJeansView}>
                  <View style={styles.fashionView}>
                    <Text style={styles.fashionText}>{CONTEXT.FASHION}</Text>
                    <TouchableOpacity>
                      <VectorImage source={cross_icon} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.fashionView}>
                    <Text style={styles.fashionText}>{CONTEXT.JEANS}</Text>
                    <TouchableOpacity>
                      <VectorImage source={cross_icon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductDescriptionComponent;

const styles = StyleSheet.create({
  productView: {
    marginTop: 20,
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
  viewProductName: {
    marginTop: 15,
    gap: 10,
  },
  viewManagement: {
    marginTop: 15,
    gap: 10,
  },
  textProductName: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 16,
    color: Colors.neutral100,
  },
  oops: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.neutral80,
  },
  inputBox: {
    width: "100%",
    height: 51,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: Colors.gray88,
    marginTop: 10,
  },
  toolView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tooltips: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.neutralBlack,
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
  setupOwn: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 16,
    color: Colors.neutral100,
    width: "82%",
  },
  fashion: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.neutral100,
  },
  viewCategories: {
    marginTop: 15,
    gap: 16,
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
  textChoose: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.neutralBlack,
  },
  textQuestion: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 16,
    color: Colors.grey,
  },
  viewAddTag: {
    height: 99,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray88,
    padding: 16,
    gap: 24,
  },
  textAddTags: {
    fontFamily: GILROY_REGULAR,
    fontSize: 16,
    color: Colors.midBlack,
  },
  fashionJeansView: {
    width: 197,
    height: 24,
    gap: 12,
    flexDirection: "row",
  },
  fashionView: {
    width: 98,
    height: 24,
    borderRadius: 7,
    paddingVertical: 4,
    paddingHorizontal: 10,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  fashionText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.neutralBlack,
  },
  viewFashion: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
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
