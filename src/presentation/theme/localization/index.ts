import i18n from 'i18next';
import { getI18n, initReactI18next } from 'react-i18next';
import en from './resources/en';
import th from './resources/thai';
import LocalStorage, {
  LOCALSTORAGE_KEY,
} from '../../../shared/helper/LocalStorage';

const localStorage = new LocalStorage();

export enum LANGUAGES {
  ENGLISH = 'en',
  THAI = 'th',
}

export const configureLocalization = () => {
  return i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',

    resources: {
      en: {
        translation: en,
      },
      th: {
        translation: th,
      },
    },

    debug: false,

    cache: {
      enabled: true,
    },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
    react: {
      defaultTransParent: 'div',
      transEmptyNodeValue: '',
      transKeepBasicHtmlNodesFor: ['b'],
    },
  });
};

export const getString = (key: string, params?: any) => {
  if (getI18n()) {
    return getI18n().t(key, params);
  }
  return key;
};

export const isValidLanguage = (language: string) => {
  if (language) {
    return Object.values(LANGUAGES).includes(language as LANGUAGES);
  }
  return false;
};

export const initialLanguage = () => {
  const language = localStorage.getItemByKey(LOCALSTORAGE_KEY.LOCALE);
  if (!isValidLanguage(language)) {
    localStorage.setItemByKey(LOCALSTORAGE_KEY.LOCALE, LANGUAGES.ENGLISH);
  }
};

export const getLanguage = (): string => {
  return (
    localStorage.getItemByKey(LOCALSTORAGE_KEY.LOCALE) || LANGUAGES.ENGLISH
  );
};

export const getUrlLanguage = () => {
  const splitPathName = window.location.pathname
    .split('/')
    .filter((item) => !!item);
  const localesString = '/:locale(th|en)?';
  if (localesString.match(splitPathName?.[0])) {
    return splitPathName[0];
  }
  return null;
};

export const setLanguageToStorage = () => {
  const language = getUrlLanguage();
  const authPathNameCollection = ['/auth/sign-in', '/auth/404', '/auth/500'];
  const isAuth = authPathNameCollection.find(
    (item) => window.location.pathname.indexOf(item) !== -1
  );
  if (isAuth && language) {
    localStorage.setItemByKey(LOCALSTORAGE_KEY.LOCALE, language);
  }
};

export const changeLanguage = (language: string): Promise<string> => {
  if (isValidLanguage(language)) {
    return i18n.changeLanguage(language).catch((error) => error.toString());
  }
  return Promise.reject();
};
