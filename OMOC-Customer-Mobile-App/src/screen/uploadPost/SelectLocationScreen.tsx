import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SCREEN_HEIGHT } from "../../utils";
import { skyBlueColor, whiteColor } from "../../utils/colors";
import {
  GILROY_MEDIUM,
  GILROY_REGULAR,
  GILROY_SEMIBOLD,
} from "../../utils/fonts";
import Spinner from "../../components/Spinner";
import SearchTabBar from "../searchScreen/SearchTabBar";
import { palceholders, strings } from "../../assets/string/strings";
import LocationsListComponent from "../../components/LocationsListComponent";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import ApiService from "../../services/api.service";

const SelectLocationScreen = ({ route, navigation }) => {
  const { onSelectLocation } = route.params;
  const [loading, setLoader] = useState(false);
  const [locationsList, setLocationsList] = useState([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getLocationsSuggests();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const getLocationsSuggests = async () => {
    setLoader(true);

    try {
      const response = await ApiService.getLocationsListApi(searchText);
      if (response) {
        setLoader(false);
        setSearchResult(response.data);
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      return [];
    } finally {
      setLoader(false);
    }
  };

  const _onPressItem = (item) => {
    onSelectLocation(item);
    navigation.goBack();
  };

  const renderLocationsList = ({ item }) => {
    return (
      <LocationsListComponent item={item} onSelect={() => _onPressItem(item)} />
    );
  };

  const renderEmptyLocationsList = () => {
    return (
      <>
        {!loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyContainerText}>Locations not found</Text>
          </View>
        ) : null}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeaderShown
          title={strings.SELECT_LOCATION}
          navigation={navigation}
        />
      </View>
      <SearchTabBar
        onChangeText={setSearchText}
        placeholder={palceholders.SEARCH_FOR_LOCATION}
        style={styles.searchBar}
      />
      <View style={styles.subContainer}>
        <Text style={styles.suggestionText}>{strings.SUGGESTION}</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={searchResult}
          renderItem={renderLocationsList}
          ListEmptyComponent={renderEmptyLocationsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {loading && <Spinner animating={loading} textStyle={{}} />}
    </SafeAreaView>
  );
};

export default SelectLocationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: whiteColor },
  headerContainer: { marginHorizontal: 20 },
  btnNext: {
    width: "93%",
    height: 47,
    backgroundColor: skyBlueColor,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
    lineHeight: 19,
  },
  bottomOptionContainer: {
    bottom: 0,
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingBottom: SCREEN_HEIGHT * 0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  backIconView: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    left: 0,
  },
  backIcon: { width: 6, height: 14, tintColor: "#000000" },
  headertext: {
    fontSize: 20,
    fontFamily: GILROY_MEDIUM,
    color: "#000000",
  },
  textStyle: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: "#242424",
    lineHeight: 22,
  },
  suggestionText: {
    fontSize: 16,
    fontFamily: GILROY_SEMIBOLD,
    color: "#242424",
    lineHeight: 22,
  },
  clearAll: {
    fontSize: 16,
    fontFamily: GILROY_REGULAR,
    color: "#242424",
    lineHeight: 22,
  },
  searchBar: { width: "93%", alignSelf: "center", marginTop: 25, gap: 12 },
  subContainer: {
    marginTop: 25,
    width: "93%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listContainer: { flex: 1, marginTop: 25 },
  emptyContainer: {
    marginTop: 10,
    width: "93%",
    alignSelf: "center",
  },
  emptyContainerText: {
    fontSize: 18,
    fontFamily: GILROY_MEDIUM,
    color: "red",
  },
});
