import { useLanguage } from '../contexts/LanguageContext';
import ptTranslations from '../locales/pt.json';
import enTranslations from '../locales/en.json';

const translations = {
  pt: ptTranslations,
  en: enTranslations
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Retorna a chave se não encontrar a tradução
      }
    }
    
    return value || key;
  };

  return { t, language };
};
