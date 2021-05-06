import React from 'react';
import { useTranslation } from 'react-i18next';
import SignupForm from '../components/auth/SignupForm';
import LandingFooter from '../components/common/LandingFooter';

const Signup = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <SignupForm />
      <LandingFooter
        description={t('loginSuggestion')}
        status={t('login')}
        screenNavigateTo={'Login'}
      />
    </>
  );
};

export default Signup;
