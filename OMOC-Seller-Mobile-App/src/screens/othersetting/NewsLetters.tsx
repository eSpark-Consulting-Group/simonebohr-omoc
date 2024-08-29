import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { CONTEXT, strings } from "../../utils/string/strings";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import Customheader from "../../component/Customheader";
import SearchTabBar from "../../component/SearchTabBar";
import { three_dots_icon } from "../../utils/images";
import VectorImage from "react-native-vector-image";

const data = [
  {
    title: "Flash Sale 2023",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting ",
    icon: three_dots_icon,
  },
  {
    title: "Flash Sale 2023",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting ",
    icon: three_dots_icon,
  },
  {
    title: "Flash Sale 2023",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting ",
    icon: three_dots_icon,
  },
  {
    title: "Flash Sale 2023",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting ",
    icon: three_dots_icon,
  },
  {
    title: "Flash Sale 2023",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting ",
    icon: three_dots_icon,
  },
  {
    title: "Flash Sale 2023",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting ",
    icon: three_dots_icon,
  },
];
const Newsletters = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Customheader
        title={CONTEXT.NEWSLETTERS}
        showBackIcon={true}
        Containerstyle={{
          marginHorizontal: 15,
          backgroundcolor: "red",
        }}
      />
      <View style={styles.mainContainerView}>
        <View style={styles.searchView}>
          <SearchTabBar
            placeholder={strings.SEARCH_INVOICE}
            style={styles.searchBar}
          />
        </View>
        <View style={styles.titleTextView}>
          <View style={styles.titleBoxView}>
            <Text style={styles.title}>{strings.TITLE}</Text>
            <Text style={styles.title}>{strings.DESCRIPTION}</Text>
          </View>
        </View>
        <View>
          <FlatList
            data={data}
            style={styles.flatlist}
            renderItem={({ item }) => {
              return (
                <View style={styles.viewContainer}>
                  <Text style={styles.flash}>{item.title}</Text>
                  <View style={styles.text}>
                    <Text style={styles.flash}>{item.text}</Text>
                  </View>
                  <Menu>
                    <MenuTrigger>
                      <VectorImage
                        source={item.icon}
                        style={styles.threeDots}
                      />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={styles.modalContent}>
                      <MenuOption style={styles.viewRemove}>
                        <Text style={styles.remove}>
                          {CONTEXT.EDIT_NEWSLETTER}
                        </Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => Alert.alert(`Delete`)}
                        style={styles.viewBan}
                      >
                        <Text style={styles.delete}>{strings.DELETE}</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              );
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={()=>navigation.navigate('ManageNewsLetters')}>
        <Text style={styles.btnText}>{CONTEXT.CREATE_NEWSLETTER}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Newsletters;

const styles = StyleSheet.create({
  mainContainerView: {
    marginHorizontal: 15,
  },
 
  titleView: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 33.6,
    color: Colors.blackColor,
  },
  searchBar: {
    width: "100%",
    borderRadius: 24,
    height: 48,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.neutralGrey,
  },
  searchView: {
    marginTop: 10,
  },
  titleTextView: {
    width: "100%",
    height: 57,
    backgroundColor: Colors.ghostWhite,
    borderRadius: 12,
    marginTop: "6%",
    justifyContent: "center",
  },
  titleBoxView: {
    flexDirection: "row",
    justifyContent: "space-around",
    right: 40,
  },
  title: {
    fontFamily: GILROY_SEMIBOLD,
    fontWeight: "700",
    fontSize: 12,
    color: Colors.charcoal,
  },
  viewContainer: {
    width: "100%",
    height: 44,
    backgroundColor: Colors.whiteColor,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    borderColor: Colors.gray88,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  flash: {
    fontFamily: GILROY_MEDIUM,
    fontSize: 12,
    fontWeight: "500",
    color: Colors.charcoal,
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
  delete: {
    fontFamily: GILROY_REGULAR,
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.dangerRed,
  },
  viewBan: {
    width: 162,
    borderRadius: 8,
    padding: 10,
    backgroundColor: Colors.whiteColor,
    marginTop: 15,
  },
  threeDots: {
    height: 18,
    width: 6,
    tintColor: Colors.neutralBlack,
  },
  continueButton: {
    backgroundColor: Colors.skyBlueColor,
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    borderRadius: 24,
    marginHorizontal: 10,
    position: "absolute",
    alignSelf: "center",
    width: "95%",
    bottom: 30,
  },
  btnText: {
    color: Colors.whiteColor,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: GILROY_MEDIUM,
  },
  flatlist: {
    marginBottom: 550,
  },
  text: {
    width: "51%",
  },
});
