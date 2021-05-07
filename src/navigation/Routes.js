import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeContext } from '../contexts/ThemeContext';
import { setUserCredentials } from '../redux/actions/user';
import AppTab from './AppTab';
import AuthStack from './AuthStack';

const Routes = ({ userCredentials, setUserCredentials }) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(setUserCredentials);
    return subscriber;
  }, []);

  return (
    <NavigationContainer theme={{ colors: { background: theme.background } }}>
      {userCredentials ? <AppTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

const mapStateToProps = ({ user }) => ({
  userCredentials: user.userCredentials,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setUserCredentials }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
