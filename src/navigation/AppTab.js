import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { Image, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../contexts/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
// import NewPostStack from './NewPostStack';

const Tab = createBottomTabNavigator();

const AppTab = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'Home') {
            return <Feather name={'home'} size={24} {...{ color }} />;
          } else if (route.name === 'NewPost') {
            return <Feather name={'plus-square'} size={26} {...{ color }} />;
          } else if (route.name === 'Profile') {
            return (
              <Image
                source={{
                  uri: 'https://i.ibb.co/qdzxPjf/user-2.jpg',
                }}
                style={[styles.avatar, { borderColor: theme.label }]}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: theme.label,
        inactiveTintColor: theme.secondaryLabel,
        style: {
          backgroundColor: theme.background,
          paddingTop: 10,
          borderTopWidth: 0.5,
          borderTopColor: 'transparent',
        },
      }}
      sceneContainerStyle={{ backgroundColor: theme.background }}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      {/* <Tab.Screen
        name="NewPost"
        component={NewPostStack}
        options={{ tabBarVisible: false }}
      /> */}
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppTab;

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderWidth: 0.5,
    borderRadius: 16,
  },
});
