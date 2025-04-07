import React from 'react';
import { ImagePlus } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fullScreen?: boolean;
}

export function ImageUploader({ onUpload, fullScreen = false }: ImageUploaderProps) {
  const containerClasses = fullScreen
    ? 'flex items-center justify-center min-h-[calc(100vh-10rem)] animate-fade-in'
    : 'flex flex-col items-center justify-center w-full h-full';

  const labelClasses = fullScreen
    ? 'flex flex-col items-center justify-center w-full max-w-2xl h-96 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'
    : 'flex flex-col items-center justify-center w-full h-full min-h-[200px] border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200';

  const iconSize = fullScreen ? 'w-16 h-16' : 'w-10 h-10';
  const textSize = fullScreen ? 'text-xl' : 'text-sm';

  return (
    <div className={containerClasses}>
      <label className={labelClasses}>
        <div className="flex flex-col items-center justify-center px-4 py-6">
          <ImagePlus className={`${iconSize} mb-4 text-gray-400 dark:text-gray-500`} />
          <p className={`mb-2 ${textSize} text-gray-500 dark:text-gray-400`}>
            <span className="font-semibold">Загрузи</span> или перетяни с рабочего стола
          </p>
          {fullScreen && (
            <p className="text-sm text-gray-400 dark:text-gray-500">Поддерживает PNG, JPG, JPEG</p>
          )}
        </div>
        <input type="file" className="hidden" accept="image/*" onChange={onUpload} />
      </label>
    </div>
  );
}
