import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NewPostForm from '../components/post/NewPostForm';
import CameraScreen from '../screens/CameraScreen';

const Stack = createStackNavigator();

const NewPostStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Camera' component={CameraScreen} />
      <Stack.Screen name='NewPostForm' component={NewPostForm} />
    </Stack.Navigator>
  );
};

export default NewPostStack;
