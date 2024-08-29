import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { offwhite, skyBlueColor, whiteColor } from "../utils/colors";
import { Text } from "react-native";
import { GILROY_MEDIUM } from "../utils/fonts";

const CustomTabBar = ({
  selectedTabIndex = 0,
  tabs = [],
  onTabChangeAction,
  scrollEnabled = false,
}) => {
  const [currentTab, setCurrentTab] = useState(selectedTabIndex);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    setCurrentTab(selectedTabIndex);
  }, [selectedTabIndex]);

  return (
    <View style={styles.tabContainer}>
      <ScrollView
        ref={(ref) => (scrollViewRef.current = ref)}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
      >
        {tabs.map((tabTitle, index) => {
          return (
            <View
              style={[
                styles.tab,
                {
                  borderBottomColor:
                    currentTab === index ? skyBlueColor : offwhite,
                  paddingVertical: 10,
                  backgroundColor: whiteColor,
                },
              ]}
              key={index}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setCurrentTab(index);
                  onTabChangeAction && onTabChangeAction(index);
                }}
              >
                <Text
                  style={
                    currentTab === index
                      ? styles.selectedTabLabel
                      : styles.tabLabel
                  }
                >
                  {tabTitle}
                </Text>
                {currentTab === index ? <View style={styles.divider} /> : null}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabContainer: {
    paddingTop: 20,
  },
  tab: {
    paddingHorizontal: 15,
    borderBottomWidth: 2,
  },
  selectedTabLabel: {
    color: skyBlueColor,
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
  tabLabel: {
    color: "#AEAEAE",
    fontSize: 16,
    fontFamily: GILROY_MEDIUM,
  },
  divider: {
    backgroundColor: skyBlueColor,
  },
});
