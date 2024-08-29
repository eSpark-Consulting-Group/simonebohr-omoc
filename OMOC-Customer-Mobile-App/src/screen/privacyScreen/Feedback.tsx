import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { midGray, neutralBlack, whiteColor } from "../../utils/colors";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import VectorImage from "react-native-vector-image";
import { next_icon } from "../../utils/images";
import { GILROY_REGULAR } from "../../utils/fonts";
import FeedbakBottomSheet from "../../components/FeedbakBottomSheet";

const Feedback = ({ navigation }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const handleBottomSheet = () => {
    setShowBottomSheet(true);
  };
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <CustomHeaderShown title={strings.FEEDBACK} navigation={navigation} />
      </View>
      <TouchableOpacity style={styles.container} onPress={handleBottomSheet}>
        <Text style={styles.headingText}>{strings.TELL_US_FEEDBACK}</Text>
        <TouchableOpacity>
          <VectorImage source={next_icon} />
        </TouchableOpacity>
      </TouchableOpacity>
      {showBottomSheet && (
        <FeedbakBottomSheet hideMe={() => setShowBottomSheet(false)} />
      )}
    </SafeAreaView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  header: {
    marginHorizontal: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width:"92%",
    alignSelf:'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: midGray,
    paddingVertical: 12,
    marginTop: 20,
  },
  headingText: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: GILROY_REGULAR,
    color:neutralBlack
  },
});
