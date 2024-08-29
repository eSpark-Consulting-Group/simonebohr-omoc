import { StyleSheet, SafeAreaView, View } from "react-native";
import React from "react";
import { whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import SearchTabBar from "../searchScreen/SearchTabBar";

const LanguagesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomHeaderShown title={strings.LANGUAGES} navigation={navigation} />
      </View>
      <View style={styles.searchBar}>
        <SearchTabBar placeholder={strings.SEARCH} />
      </View>
    </SafeAreaView>
  );
};

export default LanguagesScreen;

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
  },
});
