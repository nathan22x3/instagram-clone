import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ellipsisText } from '../../utils';

const SearchProfileHeader = ({ userInfo }) => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  if (!userInfo) return <AppLoading />;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name={'arrowleft'} color={theme.label} size={27} />
        </TouchableOpacity>
        <Text style={[styles.username, { color: theme.label }]}>
          {ellipsisText(userInfo.username, 16)}
        </Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name={'bell'} size={28} color={theme.label} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Feather
            name={'more-vertical'}
            size={26}
            color={theme.label}
            style={{ marginLeft: 24 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 20,
    fontFamily: 'Roboto_500Medium',
    fontSize: 22,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
