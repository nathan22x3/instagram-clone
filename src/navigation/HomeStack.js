import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CommentScreen from '../screens/CommentScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Comments' component={CommentScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
