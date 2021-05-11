import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PostDetail from '../components/post/PostDetail';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='PostDetail' component={PostDetail} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
