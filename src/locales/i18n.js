import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/common.json';
import vi from './vi/common.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: { common: en },
    vi: { common: vi },
  },
});

export default i18n;
