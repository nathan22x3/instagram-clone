import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PostDetail from '../components/post/PostDetail';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='PostDetail' component={PostDetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;
