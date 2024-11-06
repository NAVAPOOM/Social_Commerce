// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/utils/languages/en.json';
import th from '@/utils/languages/th.json';

const resources = {
  en: {
    translation: en,
  },
  th: {
    translation: th,
  },

};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;