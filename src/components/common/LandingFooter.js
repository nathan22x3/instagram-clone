import { NavigationContext } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

const LandingFooter = ({ description, status, screenNavigateTo }) => {
  const theme = useContext(ThemeContext);
  const navigation = useContext(NavigationContext);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
        borderTopWidth: 0.5,
        borderTopColor: theme.border,
      }}
    >
      <Text
        style={{ fontFamily: 'Roboto_500Medium', color: theme.secondaryLabel }}
      >
        {description}
      </Text>
      <Text> </Text>
      <TouchableOpacity onPress={() => navigation.navigate(screenNavigateTo)}>
        <Text style={{ fontFamily: 'Roboto_500Medium', color: theme.label }}>
          {status}.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingFooter;
