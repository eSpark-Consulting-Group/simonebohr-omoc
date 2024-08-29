import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import Product from '../screens/product/Index';

const Stack = createNativeStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="product"
        component={Product}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default ProductStackNavigator;