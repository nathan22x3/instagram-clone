import React, { useContext, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeContext } from '../../contexts/ThemeContext';
import { signup } from '../../redux/actions/auth';
import Button from '../custom/Button';
import TextInput from '../custom/TextInput';

const { width } = Dimensions.get('window');

const SignupForm = ({ signup }) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);

  const [userInfo, setUserInfo] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { username: '', email: '', password: '' }
  );

  const handleInputChange = (key, value) => {
    setUserInfo({ [key]: value });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={[styles.logo, { color: theme.label }]}>Instagram Clone</Text>
      <TextInput
        placeholder={t('username')}
        onChangeText={(value) => handleInputChange('username', value)}
      />
      <TextInput
        placeholder={t('phoneEmailUsername')}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <TextInput
        placeholder={t('password')}
        secureTextEntry={true}
        onChangeText={(value) => handleInputChange('password', value)}
      />
      <Button
        style={styles.button}
        color={theme.label}
        onPress={() => signup(userInfo.user, userInfo.email, userInfo.password)}
      >
        {t('signup')}
      </Button>
    </KeyboardAvoidingView>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ signup }, dispatch);

export default connect(null, mapDispatchToProps)(SignupForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 25,
    fontFamily: 'GochiHand_400Regular',
    fontSize: 40,
  },
  button: { width: '100%' },
});
