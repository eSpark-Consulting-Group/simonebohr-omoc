import { StyleSheet, SafeAreaView, View, FlatList } from "react-native";
import React from "react";
import { whiteColor, lightGrey } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import SearchTabBar from "../searchScreen/SearchTabBar";
import { country_list } from "../../sampleData/CountryName";
import CountryComponent from "../../components/settingComponent/CountryComponent";

const CountryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomHeaderShown title={strings.COUNTRY} navigation={navigation} />
      </View>
      <View style={styles.searchBar}>
        <SearchTabBar placeholder={strings.SEARCH} />
      </View>
      <View style={styles.viewFlastlist}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={country_list}
          renderItem={(item) => <CountryComponent value={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default CountryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  header: {
    marginHorizontal: 15,
  },
  searchBar: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  viewFlastlist: {
    marginTop: 10,
    flex: 1,
  },
});
