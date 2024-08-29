import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

const CustomScrollView = ({ data, renderItem, keyExtractor, ...rest }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomScrollView;
