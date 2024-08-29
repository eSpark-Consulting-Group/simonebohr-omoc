import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import VectorImage from "react-native-vector-image";
import { Colors } from "../../utils/colors";
import { three_dots_icon } from "../../utils/images";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";

const CategoriesList = ({ item, navigation, onDeleteCategory }) => {
  return (
    <TouchableOpacity
      style={styles.categoriesContainer}
      onPress={() => {
        navigation.navigate("CategoryDetailScreen", { data: item });
      }}
    >
      <FastImage
        source={{ uri: item?.thumbnail }}
        style={styles.listImageStyles}
        resizeMode="contain"
      />
      <View style={styles.categoriesSubView}>
        <View style={styles.categoryDetailView}>
          <Text style={styles.hoodieText}>{item.title}</Text>
          <View style={styles.dotsIconView}>
            <Menu rendererProps={{ anchorStyle: styles.anchorStyle }}>
              <MenuTrigger style={styles.menuTriggerView}>
                <VectorImage source={three_dots_icon} style={styles.dotIcon} />
              </MenuTrigger>
              <MenuOptions customStyles={optionsStyles}>
                <MenuOption
                  style={styles.menuOptionView}
                  onSelect={() => {
                    navigation.navigate("AddCategory", {
                      categoryData: item,
                      isEdit: true,
                    });
                  }}
                >
                  <Text style={styles.menuTextColor}>Edit Categories</Text>
                </MenuOption>
                <MenuOption
                  style={styles.menuOptionView}
                  onSelect={() => {
                    navigation.navigate("EditAddress");
                  }}
                >
                  <Text style={styles.editAddressText}>Add Picture </Text>
                </MenuOption>
                <MenuOption
                  style={styles.menuOptionView}
                  onSelect={() => onDeleteCategory()}
                >
                  <Text style={styles.menuDeleteTextColor}>
                    Delete Categories
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <Text style={styles.noteText}>
          Total Product : {item.totalProducts}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hoodieText: {
    width: "90%",
    fontFamily: GILROY_SEMIBOLD,
    color: Colors.blackColor,
    fontSize: 14,
  },
  noteText: {
    fontFamily: GILROY_MEDIUM,
    color: Colors.grey,
    fontSize: 12,
  },
  dotIcon: {
    tintColor: "#9E9E9E",
    height: 13,
  },
  reportText: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: GILROY_MEDIUM,
    color: Colors.blackColor,
  },
  listImageStyles: {
    height: 70,
    width: 70,
    borderRadius: 10,
    borderColor: "#000000",
    borderWidth: 0.5,
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
  categoryDetailView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoriesSubView: { gap: 10, flex: 1, justifyContent: "space-evenly" },
  dotsIconView: {
    position: "absolute",
    right: 4,
    top: 0,
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
  menuDeleteTextColor: {
    color: "#C80000",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    lineHeight: 14,
  },
  editAddressText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 13,
    color: Colors.neutralBlack,
  },
  menuTriggerView: {
    paddingLeft: 25,
    paddingBottom: 20,
  },
});

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

export default CategoriesList;
