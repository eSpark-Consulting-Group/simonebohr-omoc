import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import { arrow_down } from "../utils/images";
import { CONTEXT } from "../utils/string/strings";
import { Colors } from "../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";

const ConfiguratorProductsComponent = () => {
  const [showConfigure, setShowConfigure] = useState(false);

  return (
    <View style={styles.productView}>
      <View style={styles.productCompoView}>
        <View style={styles.mainViewProduct}>
          <View style={styles.viewproductDescription}>
            <Text style={styles.productDescription}>
              {CONTEXT.CONFIGURATOR_PRODUCTS}
            </Text>
            <TouchableOpacity
              style={[
                showConfigure === true
                  ? styles.dropIconOpened
                  : styles.dropIcon,
              ]}
              onPress={() => setShowConfigure(!showConfigure)}
            >
              <VectorImage source={arrow_down} />
            </TouchableOpacity>
          </View>
          {showConfigure && (
            <View>
              <View style={styles.viewRecommendation}>
                <Text style={styles.setupOwn}>{CONTEXT.SETUP_YOUR_OWN}</Text>
                <Text style={styles.oopsLow}>
                  {CONTEXT.OOPS_YOUR_SHOP_SCORE_LOW}
                </Text>
              </View>
              <TouchableOpacity style={styles.ChooseCategories}>
                <Text style={styles.textChoose}>{CONTEXT.WHAT_COLOR}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ChooseCategories}>
                <Text style={styles.textChoose}>{CONTEXT.COLOR}</Text>
                <VectorImage source={arrow_down} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.ChooseCategories}>
                <Text style={styles.textChoose}>{CONTEXT.CHOOSE_THE_SIZE}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ChooseCategories}>
                <Text style={styles.textChoose}>{CONTEXT.SIZE_NUMBER}</Text>
                <VectorImage source={arrow_down} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.ChooseCategories}>
                <Text style={styles.textChoose}>{CONTEXT.THE_GENDER}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ChooseCategories}>
                <Text style={styles.textChoose}>{CONTEXT.BOY_GIRL}</Text>
                <VectorImage source={arrow_down} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ConfiguratorProductsComponent;

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
  setupOwn: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 16,
    color: Colors.neutral100,
    width: "82%",
  },
  oopsLow: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.neutral80,
    width: "90%",
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
  productCompoView: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    paddingBottom: 15,
  },
  mainViewProduct: {
    marginHorizontal: 10,
  },
});
