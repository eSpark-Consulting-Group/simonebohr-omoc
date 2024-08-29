import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { GILROY_MEDIUM, GILROY_REGULAR } from "../../../utils/fonts";
import { profile_pic1 } from "../../../utils/images";

const ShopsListComponent = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <View style={styles.itemDetailContainer}>
        <FastImage
          source={profile_pic1}
          style={styles.userImageStyle}
          defaultSource={profile_pic1}
        />
        <View style={{ gap: 5 }}>
          <Text style={styles.nameTextStyle}>{item.name}</Text>
          <Text style={styles.userNameTextStyle}>
            {`123 Following | 123 Following`}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.rightContainer}>
        <Text style={styles.followingText}>Following</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "93%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  itemDetailContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  nameTextStyle: {
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    color: "#242424",
    lineHeight: 19,
  },
  userNameTextStyle: {
    fontSize: 12,
    fontFamily: GILROY_REGULAR,
    color: "#4B4B4B",
    lineHeight: 13,
  },
  followingText: {
    fontSize: 10,
    fontFamily: GILROY_MEDIUM,
    color: "#4B4B4B",
    lineHeight: 13,
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
  rightContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  userImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
});

export default ShopsListComponent;
