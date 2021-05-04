import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ellipsisText } from '../../utils';

const StoryItem = ({ avatarUri, username }) => {
  const theme = useContext(ThemeContext);

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View style={styles.container}>
        <LinearGradient
          colors={[theme.pink, theme.red, theme.orange]}
          style={styles.avatarBorder}
        >
          <Image
            source={{ uri: avatarUri }}
            style={[styles.avatar, { borderColor: theme.background }]}
          />
        </LinearGradient>
        <Text style={[styles.username, { color: theme.label }]}>
          {ellipsisText(username, 12)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default StoryItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 18,
    alignItems: 'center',
  },
  avatarBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 4,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
  },
  username: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 12,
  },
});
