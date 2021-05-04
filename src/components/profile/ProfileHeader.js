import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ellipsisText } from '../../utils';

const ProfileHeader = () => {
  const theme = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7}>
        <View style={styles.switchAccount}>
          <Text style={[styles.username, { color: theme.label }]}>
            {ellipsisText('cyberbot_66', 16)}
          </Text>
          <Feather name={'chevron-down'} size={22} color={theme.label} />
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name={'plus'} size={28} color={theme.label} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Feather
            name={'menu'}
            size={26}
            color={theme.label}
            style={{ marginLeft: 24 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  switchAccount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginRight: 8,
    fontFamily: 'Roboto_500Medium',
    fontSize: 22,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
