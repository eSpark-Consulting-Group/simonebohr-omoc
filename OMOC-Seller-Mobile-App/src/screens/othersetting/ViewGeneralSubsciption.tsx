import {
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Customheader from "../../component/Customheader";
import { CONTEXT } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";

const DATA = [
  {
    heading: "Subsciption Details",
    data: [
      { titletext: "Subscription ID", name: "0001" },
      { titletext: "Product Name", name: "Black Hoodie RazorSI" },
      { titletext: "Frequency", name: "Monthly" },

      { titletext: "Product Type", name: "Physical" },
      { titletext: "Product Price", name: "$250" },

      { titletext: "Next Billing Date", name: "30/05/2023" },
      { titletext: "Subscription Status", name: "Active" },
      { titletext: "Delivery Address", name: "St, riverside, united kingdom" },
    ],
  },
  {
    heading: "Shipping Details",
    data: [
      { titletext: "Subscription ID", name: "Express" },
      { titletext: "Product Name", name: "091230" },
      { titletext: "Frequency", name: "$5" },
    ],
  },
  {
    heading: "Subscription Offers ",
    data: [
      {
        titletext: "Current Offer",
        name: "Subscribe 3 months in a row and get a 5% discount on your next month",
      },
    ],
  },
];
const ViewGeneralSubsciption = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Customheader
          title={CONTEXT.VIEW}
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
          <Text style={styles.manageText}>{CONTEXT.SELL_NUMEROUS}</Text>
        </View>
        <ScrollView style={styles.ViewScroll}>
          <View style={styles.SubView}>
            <SectionList
              sections={DATA}
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section: { heading } }) => (
                <View style={styles.heading}>
                  <Text style={styles.title}>{heading}</Text>
                </View>
              )}
              renderItem={({ item }) => (
                <View style={styles.textTitleView}>
                  <Text style={styles.titleSubcription}>{item.titletext}</Text>
                  <Text style={styles.description}>{item.name}</Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ViewGeneralSubsciption;

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
  },
  titleView: {
    marginTop: 20,
  },
  heading: {
    marginTop: 15,
  },

  titleText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 33.6,
    color: Colors.blackColor,
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
    paddingBottom: "30%",
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 20,
    color: Colors.blackColor,
  },
  textTitleView: {
    width: "100%",
    height: 67,
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderColor: Colors.neutralGrey,
    marginTop: 10,
    gap: 8,
    paddingBottom: 30,
  },
  titleSubcription: {
    fontFamily: GILROY_MEDIUM,
    fontWeight: "500",
    fontSize: 16,
    color: Colors.neutralBlack,
  },
  description: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 12,
    color: Colors.grey,
    width: "90%",
  },
});
