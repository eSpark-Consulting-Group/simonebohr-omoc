import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Shop from '../screens/shop/Index';

const Stack = createNativeStackNavigator();

const ShopStackNavigator = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen
      name="shop"
      component={Shop}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
  );
};
export default ShopStackNavigator;