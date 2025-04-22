import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Select } from '@/ui';

export const LanguageSelector = () => {
  const { selectedLanguage, changeLanguage, languages } = useLanguage();

  const languageOptions = languages.map(lang => ({
    value: lang.code,
    label: lang.name,
  }));

  return (
    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
      <Languages className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      <Select
        value={selectedLanguage}
        options={languageOptions}
        onChange={changeLanguage}
        placeholder="Выберите язык"
        ariaLabel="Language selector"
      />
    </div>
  );
};
