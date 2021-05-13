import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../contexts/ThemeContext';

const PostAction = ({ handleNavigateToComment }) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons
            name={'md-heart-outline'}
            size={30}
            color={theme.label}
            style={styles.leftButton}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={handleNavigateToComment}>
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
    paddingHorizontal: 14,
    marginTop: 16,
    marginBottom: 6,
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
