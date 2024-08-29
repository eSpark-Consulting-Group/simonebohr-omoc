import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import More from '../screens/more/Index';

const Stack = createNativeStackNavigator();

const MoreStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="more"
        component={More}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default MoreStackNavigator;