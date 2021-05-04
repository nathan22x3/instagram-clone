import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { ThemeContext } from '../../contexts/ThemeContext';

const FeedItemHeader = ({ userInfo }) => {
  const theme = useContext(ThemeContext);
  const { avatarUri, username } = userInfo;

  return (
    <View style={[styles.container]}>
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.userInfo}>
          <LinearGradient
            colors={[theme.pink, theme.red, theme.orange]}
            style={styles.avatarBorder}
          >
            <Image
              source={{ uri: avatarUri }}
              style={[styles.avatar, { borderColor: theme.background }]}
            />
          </LinearGradient>
          <Text style={{ color: theme.label, fontFamily: 'Roboto_500Medium' }}>
            {username}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
        <Entypo name={'dots-three-vertical'} size={20} color={theme.label} />
      </TouchableOpacity>
    </View>
  );
};

export default FeedItemHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBorder: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderWidth: 2,
    borderRadius: 20,
  },
});
