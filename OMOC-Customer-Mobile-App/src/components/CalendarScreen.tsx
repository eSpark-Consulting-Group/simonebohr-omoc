import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const CalendarScreen = () => {
  const [selected, setSelected] = useState('');

  return (
    <SafeAreaView style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
      <View>
        <Text>{selected}</Text>
      </View>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
        }}
      />
    </SafeAreaView>
  );
};
export default CalendarScreen;
