import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Pagination } from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../contexts/ThemeContext';

const PostAction = ({ dotsLength, activeDotIndex }) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.container, { marginTop: dotsLength === 1 ? 16 : 0 }]}>
      <View style={styles.left}>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons
            name={'md-heart-outline'}
            size={30}
            color={theme.label}
            style={styles.leftButton}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons
            name={'md-chatbubble-outline'}
            size={26}
            color={theme.label}
            style={styles.leftButton}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Feather
            name={'send'}
            size={26}
            color={theme.label}
            style={[
              styles.leftButton,
              { transform: [{ rotate: '20deg' }, { translateY: -3 }] },
            ]}
          />
        </TouchableOpacity>
      </View>
      <Pagination
        {...{ dotsLength }}
        {...{ activeDotIndex }}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: theme.blue,
        }}
        inactiveDotStyle={{ backgroundColor: theme.secondaryLabel }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={{ flex: 1 }}
      />
      <View style={styles.right}>
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name={'bookmark'} size={26} color={theme.label} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostAction;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButton: {
    marginRight: 14,
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
