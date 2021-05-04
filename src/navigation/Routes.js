import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import AppTab from './AppTab';

const Routes = () => {
  const theme = useContext(ThemeContext);

  return (
    <NavigationContainer theme={{ colors: { background: theme.background } }}>
      <AppTab />
    </NavigationContainer>
  );
};

export default Routes;
