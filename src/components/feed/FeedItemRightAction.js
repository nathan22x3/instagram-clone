import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const FeedItemRightAction = ({ color }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7}>
        <Feather name={'bookmark'} size={26} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default FeedItemRightAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
