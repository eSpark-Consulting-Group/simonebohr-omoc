import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import VectorImage from "react-native-vector-image";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { grey, midGray, neutralBlack, successGreen, whiteColor } from "../../utils/colors";
import { strings } from "../../assets/string/strings";
import { three_dot_Icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";

const BrandedContent = ({ navigation }) => {
  const brandData = [
    {
      heading: "ZARA",
      status: "ALLOWED",
    },
    {
      heading: "ZARA",
      status: "ALLOWED",
    },
  ];
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.BRAND_CONTENT}
          navigation={navigation}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={brandData}
          renderItem={(item) => {
            return (
              <View style={styles.mainContainer}>
                <View style={{gap:4}}>
                  <Text style={styles.heading}>{item.item.heading}</Text>
                  <View style={styles.subContainer}>
                    <Text style={styles.status}>Status :</Text>
                    <Text style={styles.allowedText}>ALLOWED</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <VectorImage
                    style={{ width: 3, height: 16 }}
                    source={three_dot_Icon}
                  />
                </TouchableOpacity>
                {/* <Modal transparent={true}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <Text>{strings.RESEND_REQUEST}</Text>
                  <Text>{strings.CHAT_THE_BRAND}</Text>
                  <Text>{strings.DELETE_PERMISSION}</Text>
                </View>
              </TouchableWithoutFeedback>
            </Modal> */}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default BrandedContent;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderBottomColor: midGray,
    paddingHorizontal: 7,
    marginTop: 20,
    width:"92%",
    alignSelf:'center'
  },
  container: {
    marginVertical: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color:neutralBlack
  },
  subContainer: {
    flexDirection: "row",
    gap:5
  },
  status: {
    fontSize: 12,
    color: grey,
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
  },
  allowedText: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    fontWeight: "500",
    color: successGreen,
  },
  modalContainer: {
    flex: 1,
    backfaceVisibility: "visible",
    alignItems: "flex-end",
    marginTop: 100,
    right: 20,
  },
});
