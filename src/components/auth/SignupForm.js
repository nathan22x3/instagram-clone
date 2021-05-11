import React, { useContext, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
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
      <View style={styles.logo}>
        <Image
          source={require('../../../assets/logo-text.png')}
          resizeMode='center'
        />
      </View>
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
        onPress={() =>
          signup(userInfo.username, userInfo.email, userInfo.password)
        }
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
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 25,
  },
  button: { width: '100%' },
});
