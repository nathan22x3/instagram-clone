import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FeedItemLeftAction = ({ color }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons
          name={'md-heart-outline'}
          size={30}
          color={color}
          style={styles.button}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
        <Ionicons
          name={'md-chatbubble-outline'}
          size={26}
          color={color}
          style={styles.button}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
        <Feather
          name={'send'}
          size={26}
          color={color}
          style={[
            styles.button,
            { transform: [{ rotate: '20deg' }, { translateY: -3 }] },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FeedItemLeftAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginRight: 14,
  },
});
