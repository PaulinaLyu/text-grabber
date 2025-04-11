import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function LanguageSelector() {
  const { selectedLanguage, changeLanguage, languages } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2">
      <Languages className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      <select
        value={selectedLanguage}
        onChange={e => changeLanguage(e.target.value)}
        className="text-sm text-gray-700 dark:text-gray-300 bg-transparent border-none focus:ring-0 cursor-pointer outline-none">
        {languages.map(language => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}
