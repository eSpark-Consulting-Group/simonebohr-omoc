import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import VectorImage from "react-native-vector-image";
import { arrow_down, plus } from "../utils/images";
import { CONTEXT } from "../utils/string/strings";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR, GILROY_SEMIBOLD } from "../utils/fonts";

const ManagementProductComponent = () => {
  const [showMangementProduct, setShowMangementProduct] = useState(false);
  const [switchOne, setSwitchOne] = useState(true);

  return (
    <View style={styles.productView}>
      <View style={styles.productCompoView}>
        <View style={styles.mainViewProduct}>
          <View style={styles.viewManagement}>
            <View style={styles.manageProductView}>
              <Text style={styles.textManagement}>
                {CONTEXT.MANAGEMENT_PRODUCT}
              </Text>
              <TouchableOpacity
                style={[
                  showMangementProduct === true
                    ? styles.dropIconOpened
                    : styles.dropIcon,
                ]}
                onPress={() => setShowMangementProduct(!showMangementProduct)}
              >
                <VectorImage source={arrow_down} />
              </TouchableOpacity>
            </View>

            {showMangementProduct && (
              <View>
                <View style={styles.enableView}>
                  <View style={styles.viewProductStatus}>
                    <Text style={styles.textProductStatus}>
                      {CONTEXT.PRODUCT_STATUS}
                    </Text>
                    <Text style={styles.assignTheGenerate}>
                      {CONTEXT.ASSIGN_THE_GENERATE}
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ true: "#0094FF" }}
                    value={switchOne}
                    onValueChange={() => {
                      setSwitchOne(!switchOne);
                    }}
                    style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                  />
                </View>
                <View style={styles.viewProductName}>
                  <Text style={styles.textProductName}>
                    {CONTEXT.STOCK_PRODUCT}
                  </Text>
                  <Text style={styles.oops}>{CONTEXT.OOPS_THE_BENEFIT}</Text>

                  <TouchableOpacity style={styles.ChooseCategories}>
                    <Text style={styles.textChoose}>
                      {CONTEXT.SELECT_WAREHOUSE}
                    </Text>
                    <VectorImage source={arrow_down} />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.ChooseCategories}
                    placeholder={CONTEXT.STOCK_TOTAL}
                  ></TextInput>
                </View>
                <View style={styles.viewProductName}>
                  <Text style={styles.textProductName}>
                    {CONTEXT.STOCK_KEEPING_UNIT}
                  </Text>
                  <Text style={styles.oops}>{CONTEXT.OOPS_THE_BENEFIT}</Text>
                  <TextInput
                    style={styles.ChooseCategories}
                    placeholder={CONTEXT.ID}
                  ></TextInput>
                </View>

                <View style={styles.viewProductName}>
                  <Text style={styles.textProductName}>
                    {CONTEXT.STOCK_PRODUCT}
                  </Text>
                  <Text style={styles.oops}>{CONTEXT.OOPS_THE_BENEFIT}</Text>

                  <TouchableOpacity style={styles.ChooseCategories}>
                    <Text style={styles.textChoose}>
                      {CONTEXT.SELECT_WAREHOUSE}
                    </Text>
                    <VectorImage source={arrow_down} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnAddRegions}>
                    <VectorImage source={plus} style={styles.plusIcon} />
                    <Text style={styles.addRegions}>
                      {CONTEXT.ADD_REGIONS_AND_COUNTRIES}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ManagementProductComponent;

const styles = StyleSheet.create({
  viewManagement: {
    marginTop: 15,
    gap: 10,
  },
  textManagement: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  dropIcon: {},
  dropIconOpened: {
    transform: [{ rotate: "180deg" }],
  },
  enableView: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  viewProductName: {
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
  viewProductStatus: { gap: 8 },
  textProductStatus: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 16,
    color: Colors.neutral100,
  },
  assignTheGenerate: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.grey,
  },
  productView: {
    backgroundColor: Colors.yellow,

    marginTop: 10,
    borderRadius: 12,
  },
  productCompoView: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    paddingBottom: 15,
  },
  mainViewProduct: {
    marginHorizontal: 10,
  },
  manageProductView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
