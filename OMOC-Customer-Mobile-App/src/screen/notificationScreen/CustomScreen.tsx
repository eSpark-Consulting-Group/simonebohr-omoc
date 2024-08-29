import { StyleSheet, Text, View,} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { strings } from "../../assets/string/strings";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { whiteColor, midGray } from "../../utils/colors";
import { Switch } from "react-native-paper";
import VectorImage from "react-native-vector-image";
import { next_icon } from "../../utils/images";

const CustomScreen = ({ navigation }) => {
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomHeaderShown
          title={strings.CUSTOM_NOTIFICATION}
          navigation={navigation}
        />
      </View>
      <View style={styles.toggleView}>
        <Text>{strings.SHOPS_NOTIFICATION}</Text>
        <Switch
          trackColor={{ true: "#0094FF" }}
          value={switchOn}
          onValueChange={() => {
            setSwitchOn(!switchOn);
          }}
        />
      </View>
      <View style={styles.viewText}>
        <Text>{strings.SELECT_CUSTOM_SHOPS}</Text>
        <VectorImage style={{ height: 13, width: 13 }} source={next_icon} />
      </View>
    </SafeAreaView>
  );
};

export default CustomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginTop: 50,
    marginHorizontal: 15,
  },
  toggleView: {
    marginTop: 25,
    width: "90%",
    padding: 12,
    paddingRight: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: midGray,
  },
  viewText: {
    marginTop: 20,
    width: "90%",
    padding: 12,
    paddingRight: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: midGray,
  },
});
