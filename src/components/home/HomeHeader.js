import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ThemeContext } from '../../contexts/ThemeContext';

const HomeHeader = () => {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.logo, { color: theme.label }]}>Instagram Clone</Text>
      <View style={styles.actions}>
        <TouchableOpacity activeOpacity={0.7}>
          <FontAwesome5
            name={'facebook-messenger'}
            size={26}
            color={theme.label}
            style={{ marginLeft: 24 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    height: 70,
    paddingHorizontal: 20,
  },
  logo: {
    fontFamily: 'BLue-Vinyl',
    fontSize: 30,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
