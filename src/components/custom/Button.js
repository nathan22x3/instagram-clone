import React, { useContext } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { shade } from '../../utils';

const Button = ({
  backgroundColor,
  color,
  icon,
  children,
  loading,
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
          backgroundColor:
            finalBackgroundColor === 'transparent'
              ? finalBackgroundColor
              : shade(finalBackgroundColor, alpha),
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.9}
    >
      {icon}
      <View
        style={[
          styles.content,
          {
            marginLeft: icon ? 10 : 0,
          },
        ]}
      >
        <Text
          style={[
            styles.contentText,
            { color: shade(color || theme.label, alpha) },
          ]}
        >
          {children}
        </Text>
        {loading && (
          <ActivityIndicator
            style={{ marginLeft: 10 }}
            size={20}
            color={shade(color || theme.label, alpha)}
          />
        )}
      </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentText: {
    fontFamily: 'Roboto_700Bold',
  },
});
