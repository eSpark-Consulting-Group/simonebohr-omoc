import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SquareSkeleton = ({}) =>
  Array.from({length: 4}).map((_, index) => (
    <View key={index} style={{marginHorizontal: 12,marginBottom:5}}>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection="row">
          <SkeletonPlaceholder.Item width={100} height={100} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  ));

SquareSkeleton.propTypes = {};
SquareSkeleton.defaultProps = {};

export default SquareSkeleton;
