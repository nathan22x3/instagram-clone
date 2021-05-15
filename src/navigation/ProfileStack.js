import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PostDetail from '../components/post/PostDetail';
import ProfileScreen from '../screens/ProfileScreen';
import CommentScreen from '../screens/CommentScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='PostDetail' component={PostDetail} />
      <Stack.Screen name='Comments' component={CommentScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
