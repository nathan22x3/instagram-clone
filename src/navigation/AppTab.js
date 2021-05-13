import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeContext } from '../contexts/ThemeContext';
import { fetchUserPosts, getUserInfo } from '../redux/actions/user';
import HomeStack from './HomeStack';
import NewPostStack from './NewPostStack';
import ProfileStack from './ProfileStack';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

const AppTab = ({ getUserInfo, getUserPosts }) => {
  const theme = useContext(ThemeContext);
  const [tabBarVisible, setTabBarVisible] = useState(true);

  useEffect(() => {
    getUserInfo();
    getUserPosts();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === 'Home') {
            return <Feather name={'home'} size={24} {...{ color }} />;
          } else if (route.name === 'Search') {
            return <Feather name={'search'} size={26} {...{ color }} />;
          } else if (route.name === 'New') {
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
        tabBarVisible,
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: theme.label,
        inactiveTintColor: theme.secondaryLabel,
        style: {
          height: 60,
          backgroundColor: theme.background,
          borderTopWidth: 0.5,
          borderTopColor: theme.grey,
        },
      }}
      initialRouteName={'Home'}
    >
      <Tab.Screen
        name='Home'
        component={HomeStack}
        listeners={{
          state: (e) => {
            setTabBarVisible(
              e.data.state.routes[0].state?.routes[1]?.name !== 'Comments'
            );
          },
        }}
      />
      <Tab.Screen name='Search' component={SearchStack} />
      <Tab.Screen
        name='New'
        component={NewPostStack}
        options={{ tabBarVisible: false }}
      />
      <Tab.Screen name='Profile' component={ProfileStack} />
    </Tab.Navigator>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUserInfo, getUserPosts: fetchUserPosts }, dispatch);

export default connect(null, mapDispatchToProps)(AppTab);

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderWidth: 0.5,
    borderRadius: 16,
  },
});
