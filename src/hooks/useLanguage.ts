import { useCallback } from 'react';
import { useStore } from '@/store/useStore';

export interface Language {
  code: string;
  name: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'rus', name: 'Русский' },
  { code: 'eng', name: 'English' },
  { code: 'deu', name: 'Deutsch' },
  { code: 'fra', name: 'Français' },
];

export const useLanguage = () => {
  const { selectedLanguage, setSelectedLanguage } = useStore();

  const changeLanguage = useCallback(
    (language: string) => {
      setSelectedLanguage(language);
    },
    [setSelectedLanguage],
  );

  return {
    selectedLanguage,
    changeLanguage,
    languages: SUPPORTED_LANGUAGES,
  };
};
