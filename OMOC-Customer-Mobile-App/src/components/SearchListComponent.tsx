import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import BrandName from "./BrandName";
import FastImage from "react-native-fast-image";
const data = [
  {
    id: "1",
    row1: {
      column1: require("../assets/pdp_cover.png"), // Replace with your 170x152 image
      column2: [
        require("../assets/singleImage.png"), // Replace with your 80x72 image
        require("../assets/singleImage.png"), // Replace with your 80x72 image
        require("../assets/singleImage.png"), // Replace with your 80x72 image
        require("../assets/singleImage.png"), // Replace with your 80x72 image
      ],
    },
    row2: {
      component: (
        <BrandName
          imageSource={require("../assets/brandIcon.png")}
          title={"OmocOfficial"}
          buttText={"$98.00"}
        />
      ), // Replace with your custom component
    },
  },
  // Add more data items as needed
];

const YourCustomComponent = () => (
  <View style={styles.customComponent}>
    <Text>Custom Component</Text>
    {/* Add your custom component's content here */}
  </View>
);

const SearchListComponent = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <View style={styles.column}>
            <FastImage source={item.row1.column1} style={styles.imageLarge} />
          </View>
          <View style={styles.column}>
            {item.row1.column2.map((image, index) => (
              <FastImage key={index} source={image} style={styles.imageSmall} />
            ))}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    flex: 1,
  },
  imageLarge: {
    width: 170,
    height: 152,
  },
  imageSmall: {
    width: 80,
    height: 72,
  },
  customComponent: {
    flex: 1,
    marginLeft: 10,
    // Add additional styling for your custom component
  },
});

export default SearchListComponent;
