import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import MyProfile from './MyProfile';
import { blackColor } from '../../utils/colors';

const Profile = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content"
      />
      <MyProfile navigation={navigation}/>
    </SafeAreaView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:blackColor
  }
})
