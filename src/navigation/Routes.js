import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import firebase from 'firebase';
import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeContext } from '../contexts/ThemeContext';
import { setCurrentUser } from '../redux/actions/user';
import AppTab from './AppTab';
import AuthStack from './AuthStack';

const Routes = ({ currentUser, setCurrentUser }) => {
  const theme = useContext(ThemeContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setLoaded(true);
      }
    });

    return subscriber;
  }, []);

  while (!loaded) return <AppLoading />;

  return (
    <NavigationContainer theme={{ colors: { background: theme.background } }}>
      {currentUser ? <AppTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setCurrentUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
