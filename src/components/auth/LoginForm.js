import React, { useContext, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeContext } from '../../contexts/ThemeContext';
import { login } from '../../redux/actions/auth';
import Button from '../custom/Button';
import TextInput from '../custom/TextInput';

const { width } = Dimensions.get('window');

const LoginForm = ({ login }) => {
  const { t } = useTranslation('common');
  const theme = useContext(ThemeContext);
  const [userInfo, setUserInfo] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { email: '', password: '' }
  );

  const handleInputChange = (key, value) => {
    setUserInfo({ [key]: value });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={[styles.logo, { color: theme.label }]}>Instagram Clone</Text>
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
        color={theme.label}
        onPress={() => login(userInfo.email, userInfo.password)}
      >
        {t('login')}
      </Button>
      <View style={[styles.separator, { borderTopColor: theme.border }]}>
        <Text
          style={[
            styles.separatorText,
            {
              backgroundColor: theme.background,
              color: theme.secondaryLabel,
            },
          ]}
        >
          {t('or')}
        </Text>
      </View>
      <Button
        icon={
          <FontAwesome5Brands name={'facebook'} size={24} color={theme.label} />
        }
        color={theme.label}
      >
        {t('loginWith', { socialNetwork: 'Facebook' })}
      </Button>
    </KeyboardAvoidingView>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ login }, dispatch);

export default connect(null, mapDispatchToProps)(LoginForm);

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
  separator: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0.7,
    marginTop: 15,
    marginBottom: 25,
  },
  separatorText: {
    position: 'absolute',
    padding: 10,
    transform: [{ translateY: -20 }],
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
});
