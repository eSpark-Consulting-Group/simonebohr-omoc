import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState } from "react";
import { strings } from "../../utils/string/strings";
import Customheader from "../../component/Customheader";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import {
  arrow_down,
  calendar_icon,
  search,
  three_dots_icon,
  tick_circle_icon,
} from "../../utils/images";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import BillingBottomSheet from "../../component/BillingBottomSheet";
import PaymentBottomSheet from "../../component/PaymentBottomSheet";
const data = [
  {
    invoice: "INV/9048102",
    number: "8123133",
    Date: "23/02/23",
    doller: "$999",
    status: "Hold",
    iconthree_dots: three_dots_icon,
  },
  {
    invoice: "INV/9048102",
    number: "8123133",
    Date: "23/02/23",
    doller: "$999",
    status: "Success",
    iconthree_dots: three_dots_icon,
  },
];

const BillingScreen = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [showEnterPaymentDetails, setshowEnterPaymentDetails] = useState(false);

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <SafeAreaView style={styles.container}>
        <Customheader title={strings.BILLING} showBackIcon={true} />
      <View style={styles.searchInput}>
          <VectorImage source={search} style={styles.icon} />
        <TextInput placeholder={strings.SEARCH_INVOICE} style={styles.input} />
      </View>
      <View style={styles.viewBilling}>
        <Text style={styles.setup}>{strings.SETUP_BILLING}</Text>
        <View style={styles.viewManage}>
          <Text style={styles.manageYourShop}>{strings.MANAGE_YOUR_SHOP}</Text>
          <TouchableOpacity onPress={handleBottomSheet} style={styles.addPaymentView}>
              <Text style={styles.addPayment}>
                {strings.ADD_PAYMENT_METHOD}
              </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewPaypal}>
          <Text style={styles.paypal}>{strings.PAYPAL}</Text>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.inputStyle}
              placeholder={strings.HELLO_OMOC}
            />
            <VectorImage
              source={tick_circle_icon}
              style={styles.calenderIcon}
            />
          </View>
        </View>
      </View>
      <View style={styles.viewCurrency}>
        <Text style={styles.billingCurrency}>{strings.BILLING_CURRENCY}</Text>
        <Text style={styles.manageYourShopText}>
          {strings.MANAGE_YOUR_SHOP}
        </Text>
      </View>
      <View style={styles.viewBox}>
        <VectorImage source={calendar_icon} style={styles.calenderIcon} />
        <Text style={styles.date}>20 Febuary 2023 - 20 March 2023</Text>
        <TouchableOpacity>
          <VectorImage source={arrow_down} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.maintitleView}>
        <Text style={styles.title}>{strings.INVOICE_NUMBER}</Text>
        <Text style={styles.title}>{strings.DATE}</Text>
        <Text style={styles.title}>{strings.TOTAL_INVOICE}</Text>
        <Text style={styles.title}>{strings.STATUS}</Text>
      </View>
      <FlatList
        style={styles.flatlist}
        data={data}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.viewName}>
                <View style={styles.titleNumberView}>
                  <Text style={styles.textinvoice}>{item.invoice}</Text>
                  <Text style={styles.textnumber}>{item.number}</Text>
                </View>

                <Text style={styles.textDate}>{item.Date}</Text>
                <Text style={styles.textDoller}>{item.doller}</Text>

                <View
                  style={[
                    styles.viewStatus,
                    {
                      backgroundColor:
                        item.status === "Hold"
                          ? Colors.newyellow
                          : Colors.lightBlue,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.status,
                      {
                        color:
                          item.status === "Hold"
                            ? Colors.yellow
                            : Colors.skyBlueColor,
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setmodalVisible(true)}
                  style={styles.toucableThreeDot}
                >
                  <VectorImage
                    source={item.iconthree_dots}
                    style={styles.vectorIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}
      >
        <TouchableNativeFeedback
          onPress={() => setmodalVisible(false)}
          style={styles.toucableFeedback}
        >
          <View style={styles.toucableFeedback}>
            <View style={styles.textBoxView}>
              <View style={styles.viewDownload}>
                <TouchableOpacity  onPress={() => setmodalVisible(false)}>
                  <Text style={styles.remove}>{strings.DOWNLOAD}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewBan}>
                <TouchableOpacity  onPress={() => setmodalVisible(false)}>
                  <Text style={styles.banUser}>{strings.DELETE}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      </Modal>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.btnText}>{strings.DOWNLOAD_INVOICE}</Text>
      </TouchableOpacity>
      {showBottomSheet && (
        <BillingBottomSheet
          hideMe={() => {
            setShowBottomSheet(false);
          }}
          onAddCard={() => {
            setShowBottomSheet(false);
            setshowEnterPaymentDetails(true);
          }}
        />
      )}
      {showEnterPaymentDetails && (
        <PaymentBottomSheet
          hideMe={() => {
            setshowEnterPaymentDetails(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default BillingScreen;

const styles = StyleSheet.create({
  container:{
flex:1,
backgroundColor:Colors.whiteColor,
  },
  searchInput: {
    width: "95%",
    borderColor: Colors.neutralGrey,
    left: 16,
    marginTop: 25,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 12,
    flexDirection: "row",
  },
  arrowIcon: {
     height: 24,
    width: 24,
    resizeMode:'contain',
     marginLeft:'40%',
  },
  viewPaypal: {
    marginTop: 20,
  },
  calenderIcon: {
    height: 24,
    width: 24,
  },
  inputStyle: {
    width: "94%",
  },
  viewManage: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent:'space-between',
    alignItems:"center"
  },
  viewmodal: {
    backgroundColor: "red",
    width: 186,
    height: 108,
  },
  icon: {
    height:18,
    width:18,
    resizeMode:'contain'
  },
  input: {
    width: "92%",
  },
  header: {
    marginTop: 15,
  },
  viewBilling: {
    height: 181,
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderColor: Colors.gray88,
  },
  setup: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 24,
    fontWeight: "600",
    color: Colors.blackColor,
    marginTop: 10,
  },
  addPaymentView: {
    width: 141,
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderColor: Colors.skyBlueColor,
  },
  manageYourShop: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.dimGray,
  },
  addPayment: {
    fontFamily: GILROY_REGULAR,
    fontSize: 10,
    textAlign: "right",
    color: Colors.skyBlueColor,
  },
  paypal: {
    fontFamily: GILROY_REGULAR,
    fontSize: 13,
    color: Colors.gray66,
  },
  viewInput: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
    borderColor: Colors.gray91,
    alignSelf: "center",
    flexDirection: "row",
  },
  viewCurrency: {
    marginTop: 20,
    marginLeft: 10,
  },
  billingCurrency: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 24,
    fontWeight: "600",
    color: Colors.blackColor,
    lineHeight: 33,
    marginTop: 10,
  },
  manageYourShopText: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    marginTop: 10,
    color: Colors.dimGray,
  },
  viewBox: {
    width: "95%",
    flexDirection: "row",
    backgroundColor: Colors.whiteColor,
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
    shadowOpacity: 1.01,
    shadowRadius: 0.5,
    elevation: 3,
  },
  date: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    textAlign: "center",
    marginLeft: 10,
  },

  maintitleView: {
    width: "95%",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.ghostWhite,
    marginTop: 20,
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
    gap: 23,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontSize: 12.5,
    color: Colors.charcoal,
    marginTop: 5,
  },
  viewName: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray88,
    backgroundColor: Colors.whiteColor,
    marginTop: 7,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  textinvoice: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.lightBlack,
  },
  textJhon: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    textAlign: "center",
    color: Colors.lightBlack,
  },
  textDate: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 13,
    color: Colors.lightBlack,
  },
  textnumber: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.lightBlack,
  },
  textDoller: {
    fontFamily: GILROY_REGULAR,
    fontSize: 12,
    color: Colors.charcoal,
  },
  viewStatus: {
    backgroundColor: Colors.newyellow,
    borderRadius: 22,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  crossIcon: {
    alignSelf: "center",
    marginHorizontal: 10,
  },
  circleRightIcon: {
    alignSelf: "center",
  },
  iconRight: {
    tintColor: Colors.green,
    height: 19,
    width: 19,
  },
  toucableThreeDot: {
    alignSelf:"flex-end",
    alignItems:"center"
  },
  vectorIcon: {
    tintColor: "black",
    height: 14,
  },
  titleNumberView: {
    gap: 4,
    alignSelf: "center",
  },
  flatlist: {
    backgroundColor: Colors.whiteColor,
    marginTop: 10,
    paddingBottom: 10,
  },
  status: {
    fontFamily: GILROY_REGULAR,
    fontSize: 11,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginTop: 70,
    marginHorizontal: 10,
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
  textBoxView: {
    backgroundColor: Colors.whiteColor,
    bottom: "20%",
    marginLeft: 8,
    position: "absolute",
    marginTop: 100,
    height: 108,
    width: 186,
    left: "40%",
    borderRadius: 16,
    padding: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.1,
    elevation: 3,
    justifyContent: "center",
  },
  viewDownload: {
    width: 162,
    height: 36,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.aliceBlue,
  },
  remove: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 14,
    lineHeight: 17,
    color: Colors.skyBlueColor,
  },
  viewBan: {
    width: 162,
    height: 36,
    borderRadius: 8,
    padding: 10,
    gap: 10,
    backgroundColor: Colors.whiteColor,
    marginTop: 10,
  },
  banUser: {
    fontFamily: GILROY_REGULAR,
    fontSize: 14,
    color: Colors.dangerRed,
  },
  toucableFeedback: {
    flex: 1,
  },
});
