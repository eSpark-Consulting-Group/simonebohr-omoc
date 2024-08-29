import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import Order from '../screens/order/Index';
import OrderDetailScreen from '../screens/order/OrderDetailScreen';

const Stack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="order"
        component={Order}
        options={{ headerShown: false }}
      />
   
    </Stack.Navigator>
  );
};
export default OrderStackNavigator;