import React from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/auth/LoginForm';
import LandingFooter from '../components/common/LandingFooter';

const LoginScreen = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <LoginForm />
      <LandingFooter
        description={t('signupSuggestion')}
        status={t('signup')}
        screenNavigateTo={'Signup'}
      />
    </>
  );
};

export default LoginScreen;
