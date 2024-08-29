import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Colors } from "../utils/colors";

const GraphChartComponent = () => {
  return (
    <View style={{ marginTop: 30 }}>
      <LineChart
        data={{
          labels: [
            "4am",
            "6am",
            "8am",
            "10am",
            "12pm",
            "2pm",
            "4pm",
            "8pm",
            "10pm",
          ],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
              color: (opacity = 10) => `rgba(0, 148, 255, 1)`,
            },
          ],
        }}
        width={400}
        height={250}
        yAxisLabel="10"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#000",
          backgroundGradientFrom: "#FFFFF",
          backgroundGradientTo: Colors.whiteColor,
          color: (opacity = 0.8) => ` rgb(199, 199, 190),`,
          labelColor: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,

          style: {
            borderRadius: 16,
          },

          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#0094FF",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        withVerticalLines={false}
      />
    </View>
  );
};

export default GraphChartComponent;

const styles = StyleSheet.create({});
