import { GochiHand_400Regular, useFonts } from '@expo-google-fonts/gochi-hand';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Dimensions, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ThemeContext, themes } from './src/contexts/ThemeContext';
import i18n from './src/locales/i18n';
import Routes from './src/navigation/Routes';

const { width } = Dimensions.get('window');

const App = () => {
  const [fontsLoaded] = useFonts({ GochiHand_400Regular, Roboto_500Medium });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
                <Routes />
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
