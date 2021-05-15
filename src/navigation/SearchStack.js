import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SearchProfileScreen from '../screens/SearchProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import CommentScreen from '../screens/CommentScreen';
import PostDetail from '../components/post/PostDetail';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='SearchProfile' component={SearchProfileScreen} />
      <Stack.Screen name='PostDetail' component={PostDetail} />
      <Stack.Screen name='Comments' component={CommentScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
