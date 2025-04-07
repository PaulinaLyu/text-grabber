import { Loader2, Trash2 } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';

interface ImagePreviewProps {
  imageUrl: string;
  isProcessing: boolean;
  onDelete: () => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImagePreview = ({ imageUrl, isProcessing, onDelete, onUpload }: ImagePreviewProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full flex flex-col transition-transform duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Загруженное изображение</h2>
        <button
          onClick={onDelete}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors duration-200 hover:scale-105">
          <Trash2 className="w-4 h-4 mr-2" />
          Удалить
        </button>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <ImageUploader onUpload={onUpload} />
        </div>
        <div className="flex-1 relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] min-h-[200px]">
          <img src={imageUrl} alt="Uploaded" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 mt-4 animate-fade-in">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Обработка изображения...</span>
        </div>
      )}
    </div>
  );
};
