import {
  Alert,
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
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { Colors } from "../../utils/colors";
import VectorImage from "react-native-vector-image";
import { arrow_down, calendar_icon } from "../../utils/images";

const AddNewOfferForm = () => {
  return (
    <MenuProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Customheader
            title={strings.ADD_NEW_OFFER_FORM}
            showBackIcon={true}
            optionImage={undefined}
            onPress={undefined}
            Containerstyle={undefined}
            rihgtIconStyle={undefined}
          />
        </View>
        <View style={styles.mainContainerView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>
              {CONTEXT.CUSTOMERS_AND_SUBSCRIBE}
            </Text>
            <Text style={styles.manageText}>{CONTEXT.TAG_THE_PRODUCT}</Text>
          </View>
          <ScrollView style={styles.ViewScroll}>
            <View style={styles.SubView}>
              <Text style={styles.textSubDet}>{CONTEXT.OFFER_DETAILS}</Text>
              <View style={styles.productView}>
                <Text style={styles.textProduct}>{CONTEXT.OFFER_NAME}</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder={CONTEXT.CHOOSE_PRODUCT}
                  />

                  <Menu>
                    <MenuTrigger>
                      <VectorImage source={arrow_down} style={styles.arrow} />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={styles.modalContent}>
                      <MenuOption style={styles.viewRemove}>
                        <Text style={styles.remove}>{CONTEXT.PERCENTAGE}</Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => Alert.alert(`Delete`)}
                        style={styles.viewBan}
                      >
                        <Text style={styles.banUser}>
                          {CONTEXT.FIXED_AMOUNT}
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>
              <View style={styles.productView}>
                <Text style={styles.textProduct}>{CONTEXT.DISCOUNT_TYPE}</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder={CONTEXT.CHOOSE_PRODUCT}
                  />

                  <Menu>
                    <MenuTrigger>
                      <VectorImage source={arrow_down} style={styles.arrow} />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={styles.modalContent}>
                      <MenuOption style={styles.viewRemove}>
                        <Text style={styles.remove}>{CONTEXT.PERCENTAGE}</Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => Alert.alert(`Delete`)}
                        style={styles.viewBan}
                      >
                        <Text style={styles.banUser}>
                          {CONTEXT.FIXED_AMOUNT}
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>
              <View style={styles.productView}>
                <Text style={styles.textProduct}>{CONTEXT.DISCOUNT_VALUE}</Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputPrice}
                    placeholder={strings.WRITE_THE_NUMBER}
                  />
                </View>
              </View>
              <View style={styles.productView}>
                <Text style={styles.textProduct}>
                  {CONTEXT.MINIMUM_SUBSCRIBE}
                </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    placeholder={strings.WRITE_THE_NUMBER}
                  />
                </View>
              </View>
            </View>
            <View style={styles.calenderMainView}>
              <View style={styles.calenderView}>
                <Text style={styles.nextBill}>{CONTEXT.START_DATE}</Text>
                <View style={styles.dateView}>
                  <TextInput
                    style={styles.inputDate}
                    placeholder={CONTEXT.CHOOSE_A_DATE}
                  />

                  <TouchableOpacity>
                    <VectorImage
                      source={calendar_icon}
                      style={styles.calIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.calenderView}>
                <Text style={styles.nextBill}>{CONTEXT.END_DATE}</Text>
                <View style={styles.dateView}>
                  <TextInput
                    style={styles.inputDate}
                    placeholder={CONTEXT.CHOOSE_A_DATE}
                  />

                  <TouchableOpacity>
                    <VectorImage
                      source={calendar_icon}
                      style={styles.calIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.buttonViewAllType}>
              <Text style={styles.textButtonAllType}>{CONTEXT.ADD}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </MenuProvider>
  );
};

export default AddNewOfferForm;

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

  calenderMainView: {
    flexDirection: "row",
    gap: 10,
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
    marginTop: "15%",
    marginBottom: 130,
  },
  textButtonAllType: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color: Colors.whiteColor,
  },
  modalContent: {
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
  },
  viewRemove: {
    width: 162,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.aliceBlue,
  },
  remove: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.skyBlueColor,
  },
  banUser: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.blackColor,
  },
  viewBan: {
    width: 162,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.whiteColor,
    marginTop: 15,
  },

  Reason: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 12,
    fontWeight: "700",
    color: Colors.charcoal,
  },
});
