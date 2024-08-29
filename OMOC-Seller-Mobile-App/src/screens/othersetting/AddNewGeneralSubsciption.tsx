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
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import { add_icon, arrow_down, calendar_icon } from "../../utils/images";

const AddNewGeneralSubsciption = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Customheader
          title={strings.ADD_NEW}
          showBackIcon={true}
          optionImage={undefined}
          onPress={undefined}
          Containerstyle={undefined}
          rihgtIconStyle={undefined}
        />
      </View>
      <View style={styles.mainContainerView}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{CONTEXT.GENERAL_SUBSCRIPTION}</Text>
          <Text style={styles.manageText}>{CONTEXT.TAG_THE_PRODUCT}</Text>
        </View>
        <ScrollView style={styles.ViewScroll}>
          <View style={styles.SubView}>
            <Text style={styles.textSubDet}>
              {strings.SUBSCRIPTION_DETAILS}
            </Text>
            <View style={styles.productView}>
              <Text style={styles.textProduct}>{CONTEXT.PRODUCT}</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder={CONTEXT.CHOOSE_PRODUCT}
                />

                <TouchableOpacity>
                  <VectorImage source={arrow_down} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productView}>
              <Text style={styles.textProduct}>{CONTEXT.PRODUCT_TYPE}</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder={CONTEXT.CHOOSE_PRODUCT}
                />

                <TouchableOpacity>
                  <VectorImage source={arrow_down} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productView}>
              <Text style={styles.textProduct}>{strings.PRODUCT_PRICE}</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.inputPrice}
                  placeholder={strings.WRITE_THE_NUMBER}
                />

                <TouchableOpacity>
                  <VectorImage source={arrow_down} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productView}>
              <Text style={styles.textProduct}>{CONTEXT.FREQUENCY}</Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.input}
                  placeholder={CONTEXT.CHOOSE_PRODUCT}
                />

                <TouchableOpacity>
                  <VectorImage source={arrow_down} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.calenderMainView}>
            <View style={styles.calenderView}>
              <Text style={styles.nextBill}>{CONTEXT.NEXT_BILL_DATE}</Text>
              <View style={styles.dateView}>
                <TextInput
                  style={styles.inputDate}
                  placeholder={CONTEXT.CHOOSE_A_DATE}
                />

                <TouchableOpacity>
                  <VectorImage source={calendar_icon} style={styles.calIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.calenderView}>
              <Text style={styles.nextBill}>{CONTEXT.SUBSCRIPTION_STATUS}</Text>
              <View style={styles.dateView}>
                <Text style={styles.active}>{CONTEXT.ACTIVE}</Text>

                <TouchableOpacity>
                  <VectorImage source={arrow_down} style={styles.arrowDown} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.shipView}>
            <Text style={styles.textSubDet}>
              {CONTEXT.SHIPPING_INFORMATION}
            </Text>
            <View style={styles.shippingNumberMainView}>
              <View style={styles.shippingNumberView}>
                <Text style={styles.nextBill}>{CONTEXT.SHIPPING_NUMBER}</Text>
                <View style={styles.dateView}>
                  <TextInput
                    style={styles.inputDate}
                    placeholder={CONTEXT.CHOOSE_A_DATE}
                  />
                </View>
              </View>
              <View style={styles.calenderView}>
                <Text style={styles.nextBill}>{CONTEXT.SHIPPING_COST}</Text>
                <View style={styles.dateView}>
                  <TextInput
                    style={styles.inputDate}
                    placeholder={CONTEXT.CHOOSE_A_DATE}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.productView}>
            <Text style={styles.textProduct}>{CONTEXT.SHIPPING_METHOD}</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder={CONTEXT.CHOOSE_PRODUCT}
              />

              <TouchableOpacity>
                <VectorImage source={arrow_down} style={styles.arrow} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.subOffView}>
            <Text style={styles.textSubDet}>{CONTEXT.SUBSCRIPTION_OFFERS}</Text>
            <TouchableOpacity>
              <VectorImage source={arrow_down} style={styles.arrowUp} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.toucableAddSub}>
            <VectorImage source={add_icon} style={styles.addIcon} />
            <Text style={styles.textAddSub}>
              {CONTEXT.ADD_SUBSCRIPTION_OFFERS}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonViewAllType}>
            <Text style={styles.textButtonAllType}>{CONTEXT.CONFIRM}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddNewGeneralSubsciption;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 15,
  },
  mainContainerView: {
    marginHorizontal: 15,
  },
  calIcon: {
    tintColor: Colors.grey,
    height: 24,
    width: 24,
  },
  ViewScroll: {
    marginTop: 20,
    paddingBottom: 40,
  },
  titleView: {
    marginTop: 20,
  },
  arrowDown: {
    tintColor: Colors.codgray,
    height: 24,
    width: 24,
    right: 5,
  },
  arrowUp: {
    transform: [{ rotateZ: "180deg" }],
    tintColor: Colors.codgray,
    height: 24,
    width: 24,
    right: 12,
  },
  titleText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 33.6,
    color: Colors.blackColor,
  },
  arrow: {
    tintColor: Colors.blackColor,
    height: 24,
    width: 24,
  },
  manageText: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19.6,
    color: Colors.blackColor,
  },
  SubView: {
    marginTop: 25,
  },
  textSubDet: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 20,
    color: Colors.neutralBlack,
  },
  productView: {
    height: 90,
    gap: 12,
    marginTop: 20,
  },
  textProduct: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.neutralBlack,
  },
  input: {
    width: "90%",
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.grey,
  },
  active: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.neutralBlack,
  },
  inputPrice: {
    width: "90%",
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.grey,
  },
  inputView: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderColor: Colors.gray88,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calenderView: {
    width: "49%",
    height: 91,
    marginTop: 10,
  },
  shippingNumberView: {
    width: "49%",
    height: 91,
    marginTop: 10,
  },
  dateView: {
    height: 57,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderColor: Colors.neutralGrey,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addIcon: {
    height: 20,
    width: 20,
    tintColor: Colors.skyBlueColor,
  },
  calenderMainView: {
    flexDirection: "row",
    gap: 10,
  },
  shippingNumberMainView: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  nextBill: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.neutralBlack,
  },
  inputDate: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    color: Colors.grey,
  },
  shipView: {
    marginTop: 25,
  },
  subOffView: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textAddSub: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    color: Colors.skyBlueColor,
  },
  toucableAddSub: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    gap: 10,
  },
  buttonViewAllType: {
    width: "100%",
    height: 49,
    borderColor: Colors.skyBlueColor,
    borderWidth: 1,
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: Colors.skyBlueColor,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 130,
  },
  textButtonAllType: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: Colors.whiteColor,
  },
});
