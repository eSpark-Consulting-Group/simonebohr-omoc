import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { dots_icon } from "../utils/images";
import {
  grey,
  lightGrey50,
  whiteColor,
  dangerRed,
  red,
  blackColor,
} from "../utils/colors";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../utils/fonts";
import VectorImage from "react-native-vector-image";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { palceholders } from "../assets/string/strings";

const screenHeight = Dimensions.get("window").height;
const percentageHeight = 20;

const WishlistsDetails = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [switches, setSwitches] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const allData = Array.isArray(data)
  ? [
      ...data,
      {
        count: 0,
        id: "new collection",
        name: "new collection",
        thumbnail: "",
      },
    ]
  : [];

  return (
    <View>
      {allData.map((item, index) =>
        item.name === "new collection" ? (
          <TouchableOpacity
            style={styles.CollectionView}
            onPress={() => setWishListModal(true)}
          >
            <Text style={[styles.blueText, { fontSize: 24 }]}> + </Text>
            <Text style={styles.blueText}>New Collection</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.mainContainer}>
            {item?.thumbnail ? (
              <ImageBackground
                style={styles.bgImg}
                imageStyle={styles.imageStyle}
                source={{
                  uri:
                    item?.thumbnail ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl20Tuf0ZhpbNa24X1Kaw3NgZ1Rhy2bdbkGw&usqp=CAU",
                }}
              >
                <TouchableOpacity onPress={handleShowModal}>
                  <Menu style={styles.dotImage}>
                    <MenuTrigger>
                      <VectorImage style={styles.dotsIcon} source={dots_icon} />
                    </MenuTrigger>
                    <MenuOptions customStyles={optionsStyles}>
                      <MenuOption style={styles.privateView}>
                        <Text style={styles.reportText}>
                          {palceholders.PRIVATE_WISHLIST}
                        </Text>
                        <Switch
                          value={switches}
                          onValueChange={() => setSwitches(true)}
                          trackColor={{ true: "#0094FF", false: "grey" }}
                          style={{
                            transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                            marginTop: 18,
                          }}
                        />
                      </MenuOption>
                      <MenuOption>
                        <Text style={styles.shareText}>
                          {palceholders.SHARE_WISHLIST}
                        </Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => {
                          setShowModal(false);
                        }}
                      >
                        <Text style={styles.copyLinkText}>
                          {palceholders.DELETE_WISHLIST}
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </TouchableOpacity>

                <View style={styles.bgText}>
                  <Text style={styles.headingText}>{data.description}</Text>
                  <Text style={styles.subText}>24 Product</Text>
                </View>
              </ImageBackground>
            ) : (
              <View style={styles.bgImg}>
                <TouchableOpacity onPress={handleShowModal}>
                  <Menu style={styles.dotImage}>
                    <MenuTrigger>
                      <VectorImage style={styles.dotsIcon} source={dots_icon} />
                    </MenuTrigger>
                    <MenuOptions customStyles={optionsStyles}>
                      <MenuOption style={styles.privateView}>
                        <Text style={styles.reportText}>
                          {palceholders.PRIVATE_WISHLIST}
                        </Text>
                        <Switch
                          value={switches}
                          onValueChange={() => setSwitches(true)}
                          trackColor={{ true: "#0094FF", false: "grey" }}
                          style={{
                            transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                            marginTop: 18,
                          }}
                        />
                      </MenuOption>
                      <MenuOption>
                        <Text style={styles.shareText}>
                          {palceholders.SHARE_WISHLIST}
                        </Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => {
                          setShowModal(false);
                        }}
                      >
                        <Text style={styles.copyLinkText}>
                          {palceholders.DELETE_WISHLIST}
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </TouchableOpacity>

                <View style={styles.bgText}>
                  <Text style={styles.headingText}>{data.description}</Text>
                  <Text style={styles.subText}>24 Product</Text>
                </View>
              </View>
            )}
          </View>
        )
      )}
    </View>
  );
};

export default WishlistsDetails;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: grey,
    width: "95%",
    marginHorizontal: 8,
    height: (screenHeight * percentageHeight) / 100,
    opacity: 0.9,
    borderRadius: 20,
    marginBottom: 10,
  },
  bgImg: {
    width: "95%",
    height: "100%",
    borderRadius: 15,
  },
  bgText: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 15,
  },
  dotImage: {
    alignSelf: "flex-end",
    marginLeft: 19,
  },
  headingText: {
    color: whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
    marginTop: 20,
  },
  subText: {
    color: lightGrey50,
    fontSize: 12,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    marginBottom: 10,
  },
  dotsIcon: {
    height: 15,
    width: 15,
    marginTop: 10,
    tintColor: whiteColor,
  },
  reportText: {
    color: blackColor,
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    marginTop: 18,
  },
  shareText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    color: blackColor,
  },
  copyLinkText: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    color: red,
    marginVertical: 10,
  },
  imageStyle: {
    width: "90%",
    height: "100%",
    borderRadius: 15,
  },
  privateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "transparent",
    paddingRight: 43,
    marginTop: -18,
  },
  optionsWrapper: {
    borderRadius: 15,
    backgroundColor: whiteColor,
    paddingLeft: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.4,
    elevation: 3,
  },
};
