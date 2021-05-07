import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SearchProfileScreen from '../screens/SearchProfileScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='SearchProfile' component={SearchProfileScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
