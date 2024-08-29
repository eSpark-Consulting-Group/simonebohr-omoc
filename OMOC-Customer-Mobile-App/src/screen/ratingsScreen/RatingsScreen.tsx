import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeaderShown from "../../components/CustomHeaderShown";
import { strings } from "../../assets/string/strings";
import { skyBlueColor, whiteColor } from "../../utils/colors";
import { FlatList } from "react-native";
import { RatingData } from "../../sampleData/RatingsData";
import RatingsDetails from "../../components/RatingsDetails";
import { HistoryData } from "../../sampleData/HistoryData";
import HeaderTabBar from "../../components/HeaderTabBar";
import Historydetails from "../../components/Historydetails";
import ApiService from "../../services/api.service";
import RatingShare from "../../components/RatingShare";
import Spinner from "../../components/Spinner";

const RatingsScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ratingData, setRatingData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [modelShow, setModelShow] = useState(false);
  const [selectedId, setSelectId] = useState(null);
  const [loder, setLoader] = useState(false);

  useEffect(() => {
    if (selectedIndex === 0 && !ratingData) {
      getRatingdata(false);
    }
    if (selectedIndex === 1 && !historyData) {
      getRatingdata(true);
    }
  }, [selectedIndex]);

  const getRatingdata = async (status) => {
    try {
      setLoader(true)
      const response = await ApiService.getRating(status);
      if (status) {
        setHistoryData(response.data);
      } else {
        setRatingData(response.data);
      }
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  };

  const buttonTab = [
    {
      label: strings.NEED_TO_RATE,
    },
    {
      label: strings.HISTORY,
    },
  ];

  return (
    <SafeAreaView style={styles.backBtn}>
      <View style={styles.headerView}>
        <CustomHeaderShown title={strings.RATINGS} navigation={navigation} />
      </View>
      <View style={styles.mainBtn}>
        <HeaderTabBar
          selectedIndex={selectedIndex}
          buttonTab={buttonTab}
          fullWidth={true}
          onChangeTab={(index) => {
            setSelectedIndex(index);
          }}
          bgColor={skyBlueColor}
        />
      </View>

      {selectedIndex === 0 ? (
        <View style={styles.flatStyle}>
          <FlatList
            data={ratingData}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => (
              <RatingsDetails
                data={item}
                onPress={() => {
                  setLikePerson(true);
                }}
                onRate={(value) => {
                  setSelectId(value);
                  setModelShow(true);
                }}
              />
            )}
          />
        </View>
      ) : selectedIndex === 1 ? (
        <View style={styles.historyListView}>
          <FlatList
            data={historyData}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => <Historydetails data={item} />}
          />
        </View>
      ) : null}
      {modelShow && (
        <RatingShare hideMe={() => setModelShow(false)} id={selectedId} />
      )}
       {loder && <Spinner animating={loder} />}
    </SafeAreaView>
  );
};

export default RatingsScreen;

const styles = StyleSheet.create({
  backBtn: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  mainBtn: { marginTop: 30, width: "92%", alignSelf: "center" },
  btnText: {
    textAlign: "center",
    padding: 15,
  },
  historyBtn: {
    width: "45%",
    height: 49,
    backgroundColor: skyBlueColor,
    borderRadius: 24,
    marginLeft: 30,
  },
  flatStyle: {
    marginTop: 10,
    alignSelf: "center",
    flex: 1,
  },
  headerView: {
    width: "92%",
    alignSelf: "center",
  },
  historyListView: { width: "92%", alignSelf: "center", marginTop: 10 },
});
