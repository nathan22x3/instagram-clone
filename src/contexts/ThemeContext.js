import { createContext } from 'react';
import { Appearance } from 'react-native';

const lightTheme = {
  label: '#000000',
  secondaryLabel: '#3c3c4399',
  placeholder: '#3c3c434c',
  link: '#007aff',
  toolbar: '#e9eaed',
  background: '#f3f8ff',
  border: '#202020',
  red: '#ff3b30',
  orange: '#f2703F',
  green: '#34c759',
  blue: '#005dff',
  pink: '#ca1d7e',
  grey: '#262626',
  textInput: '#e3e3e3',
};

const darkTheme = {
  label: '#f6f6f6',
  secondaryLabel: '#737373',
  placeholder: '#a9a9a9',
  link: '#aaccff',
  toolbar: '#000000',
  background: '#000000',
  border: '#202020',
  red: '#e35157',
  orange: '#f2703F',
  green: '#87e2a1',
  blue: '#3c97ea',
  pink: '#ca1d7e',
  grey: '#262626',
  textInput: '#313131',
};

export const themes = { light: lightTheme, dark: darkTheme };
export const ThemeContext = createContext(
  Appearance.getColorScheme() === 'dark' ? themes.dark : themes.light
);
