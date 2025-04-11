import { FileText } from 'lucide-react';
import { LanguageSelector } from '../LanguageSelector';

export const Header = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Text Grabber</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Загрузите изображение для извлечения текста
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};
