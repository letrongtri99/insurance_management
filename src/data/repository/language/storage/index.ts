import StorageGateway from 'data/gateway/storage';
import { TokenType } from 'data/constants';

const changeLanguageStorage = (lang: string) => {
  return StorageGateway.doUpdate(TokenType.Locale, lang);
};

export default {
  changeLanguageStorage,
};
