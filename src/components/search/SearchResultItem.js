import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

const SearchResultItem = ({ user }) => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('SearchProfile', { userInfo: user })}
    >
      <Image
        source={{
          uri: 'https://i.ibb.co/qdzxPjf/user-2.jpg',
        }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={[styles.description, { color: theme.label }]}>
          {user.username}
        </Text>
        {user.bio && (
          <Text style={[styles.description, { color: theme.placeholder }]}>
            {user.bio}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});
