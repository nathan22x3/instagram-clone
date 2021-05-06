import { GochiHand_400Regular, useFonts } from '@expo-google-fonts/gochi-hand';
import { Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import * as firebase from 'firebase';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Dimensions, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ThemeContext, themes } from './src/contexts/ThemeContext';
import i18n from './src/locales/i18n';
import Routes from './src/navigation/Routes';
import reducers from './src/redux/reducers';
import firebaseConfig from './src/config/firebaseConfig.json';

const { width } = Dimensions.get('window');

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const store = createStore(reducers, applyMiddleware(thunk));

const App = () => {
  const [fontsLoaded] = useFonts({
    GochiHand_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <ThemeContext.Provider value={themes.dark}>
      <ThemeContext.Consumer>
        {(theme) => (
          <>
            <StatusBar
              barStyle='light-content'
              backgroundColor={theme.toolbar}
            />
            <SafeAreaView style={styles.container}>
              <I18nextProvider {...{ i18n }}>
                <Provider {...{ store }}>
                  <Routes />
                </Provider>
              </I18nextProvider>
            </SafeAreaView>
          </>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
});
