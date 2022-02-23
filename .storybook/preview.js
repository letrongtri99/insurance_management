import React, { useEffect } from 'react';
import {
  configureLocalization,
  changeLanguage,
} from '../src/presentation/theme/localization/index';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { configureStore } from 'presentation/redux/store';

const store = configureStore();
configureLocalization();

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'th', right: 'th', title: 'Thai' },
      ],
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

// your-addon-register-file.js
export const decorators = [
  (Story, { globals: { locale } }) => {
    useEffect(() => {
      changeLanguage(locale);
    }, [locale]);

    const { t, i18n } = useTranslation();
    return (
      <Provider store={store}>
        <Story />
      </Provider>
    );
  },
];
