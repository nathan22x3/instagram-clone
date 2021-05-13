import React, { useContext } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

const TextInput = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <RNTextInput
      {...props}
      style={[
        styles.container,
        {
          backgroundColor: theme.textInput,
          borderColor: theme.grey,
          color: theme.label,
        },
        props.style,
      ]}
      placeholderTextColor={theme.placeholder}
      underlineColorAndroid={'transparent'}
      ref={props.ref}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 15,

    fontFamily: 'Roboto_500Medium',
  },
});
