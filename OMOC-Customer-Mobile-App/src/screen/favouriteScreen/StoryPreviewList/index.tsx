import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Animated} from 'react-native';
import StoryAdderItem from './StoryAdderItem';
import StoryPreviewItem from './StoryPreviewItem';
import { SCREEN_WIDTH } from '../../../utils';

const StoryPreviewList = ({storyList,navigation,loadingStoryList}) => {
  const _loadingDeg = new Animated.Value(0);
  const _onAnimateDeg = () => {
    Animated.timing(_loadingDeg, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      if (loadingStoryList) {
        _loadingDeg.setValue(0);
        _onAnimateDeg();
      }
    });
  };

  
  return (
    <View style={styles.container}>
      {loadingStoryList && (
        <Animated.Image
          onLayout={_onAnimateDeg}
          style={{
            ...styles.loading,
            transform: [
              {
                rotate: _loadingDeg.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
          source={require('./../../../assets/waiting.png')}
        />
      )}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        bounces={false}>
        <StoryAdderItem navigation={navigation}/>
        {storyList.map((story, index) => (
          <StoryPreviewItem index={index} item={story} key={index} navigation={navigation} stories={storyList}/>
        ))}
      </ScrollView>
    </View>
  );
};

export default StoryPreviewList;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: 10,
    height: 104,
  },
  loading: {
    position: 'absolute',
    width: 30,
    height: 30,
    left: (SCREEN_WIDTH - 30) / 2,
    top: (104 - 30) / 2,
    zIndex: 999,
  },
});
