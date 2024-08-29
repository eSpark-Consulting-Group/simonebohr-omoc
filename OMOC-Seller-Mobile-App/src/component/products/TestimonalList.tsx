import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";
import { star, three_dots_icon } from "../../utils/images";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../utils/fonts";
import VectorImage from "react-native-vector-image";
import FastImage from "react-native-fast-image";

const TestimonalList = ({ item, navigation, onDeleteVoucher }) => { 

  return (
    <View style={styles.categoriesContainer}>
      <FastImage
        source={{ uri: item?.productDetails?.images[0].url }}
        style={styles.listImageStyles}
        resizeMode="contain"
      />
      <View>
        <View style={styles.hoodieView}>
          <Text style={styles.hoodieText}>
            {item?.productDetails?.productName}
          </Text>
          <View
            style={[
              styles.backViewStaus,
              {
                backgroundColor: item.status === "approved" ? Colors.neutralGreen :item.status === "pending"? Colors.lightBlue :item.status === "rejected" ? Colors.lightRed :Colors.neutralGreen
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color:item.status === "approved" ? Colors.green :item.status === "pending"? Colors.fillBlue :item.status === "rejected" ? Colors.dangerRed :Colors.green},
              ]}
            >
              {item.status}
            </Text>
          </View>
          <Menu>
            <MenuTrigger style={{marginLeft:item.status === "approved"? 20:25}}>
              <VectorImage source={three_dots_icon} style={styles.dotIcon} />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption style={styles.menuOptionView} onSelect={() => {}}>
                <Text style={styles.menuTextColor}>Response</Text>
              </MenuOption>
              <MenuOption style={styles.menuOptionView} onSelect={() => {}}>
                <Text style={styles.editAddressText}>Report</Text>
              </MenuOption>
              <MenuOption
                style={styles.menuOptionView}
                onSelect={() => onDeleteVoucher()}
              >
                <Text style={styles.menuDeleteTextColor}>Delete Voucher</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <Text style={styles.codeText}>{item?.productDetails?.productId}</Text>
        <Text style={styles.noteText}>Customer : {item.userDetails?.name}</Text>
        <Text style={styles.noteText}>
          Ratings : {' '}
          <VectorImage source={star} /> {item.rating}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginVertical: 8,
    padding: 12,
    backgroundColor: Colors.yellow,
    borderRadius: 12,
    gap: 8,
    paddingHorizontal: 12,
  },
  categoriesContainer: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
    marginVertical: 8,
    padding: 12,
    backgroundColor: Colors.whiteColor,
    width: "93%",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  hoodieText: {
    fontFamily: GILROY_REGULAR,
    color: Colors.blackColor,
    fontSize: 14,
    lineHeight: 17,
    width: "65%",
  },
  hoodieView: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
    },
  backViewStaus: {
    backgroundColor: Colors.neutralGreen,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 30,
  },
  listImageStyles: {
    height: 90,
    width: 85,
    borderRadius: 10,
    borderColor: Colors.gray88,
    borderWidth: 0.5,
  },
  statusText: {
    fontSize: 10,
    color: Colors.green,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 15,
  },
  codeText: {
    fontFamily: GILROY_REGULAR,
    color: Colors.grey,
    fontSize: 14,
    lineHeight: 19,
  },
  noteText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
    fontSize: 12,
    lineHeight: 17,
  },
  liveStreamView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    gap: 20,
  },
  dotView: {
    width: 1.5,
    height: 10.5,
  },
  dotIcon: {
    tintColor: "#9E9E9E",
    height: 13,
  },
  menuOptionView: {
    marginTop: 10,
  },
  menuTextColor: {
    color: "#0094FF",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    lineHeight: 14,
  },
  editAddressText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 13,
    color: Colors.neutralBlack,
  },

  menuDeleteTextColor: {
    color: "#C80000",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    lineHeight: 14,
  },
});

export default TestimonalList;
const optionsStyles = {
  optionsContainer: {
    backgroundColor: "transparent",
    paddingRight: 15,
  },
  optionsWrapper: {
    borderRadius: 12,
    backgroundColor: Colors.whiteColor,
    paddingLeft: 12,
    paddingVertical: 8,
    shadowColor: "#00000017",
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.01,
    shadowRadius: 1.4,
    elevation: 1,
  },
};
