import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { shade } from '../../utils';

const Button = ({
  backgroundColor,
  color,
  icon,
  children,
  disabled,
  onPress,
  style,
}) => {
  const theme = useContext(ThemeContext);
  const alpha = disabled ? -80 : 0;
  const finalBackgroundColor = backgroundColor ?? theme.blue;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: shade(finalBackgroundColor, alpha),
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.9}
    >
      {icon}
      <Text
        style={[
          styles.content,
          {
            color: shade(color || theme.label, alpha),
            marginLeft: icon ? 10 : 0,
          },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: 50,
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  content: {
    fontFamily: 'Roboto_700Bold',
  },
});
