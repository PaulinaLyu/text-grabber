import { useCallback, useRef, useState } from 'react';
import { ImagePlus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/ui';

interface ImageUploadPreviewProps {
  imageUrl: string;
  isProcessing: boolean;
  maxSize?: number;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

export const ImageUploadPreview = ({
  imageUrl,
  isProcessing,
  onUpload,
  onDelete,
  maxSize = 5 * 1024 * 1024,
}: ImageUploadPreviewProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFile = (file: File): boolean => {
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста загрузите сообщения');
      return false;
    }

    if (file.size > maxSize) {
      setError(`Размер файла должен быть менее ${maxSize / 1024 / 1024}MB`);
      return false;
    }

    return true;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        const input = document.createElement('input');
        input.type = 'file';
        input.files = dataTransfer.files;

        const event = {
          target: input,
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        onUpload(event);
      }
    },
    [onUpload, maxSize],
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] animate-fade-in">
        <button
          onClick={handleClick}
          className={`flex flex-col items-center justify-center w-full max-w-2xl h-96 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="opacity-0 absolute z-[-1]"
            onChange={onUpload}
          />
          <div className="flex flex-col items-center justify-center px-4 py-6">
            <ImagePlus className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500" />
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-1">
              <span className="font-semibold">Загрузи</span> или перетяни изображение
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Поддерживается PNG, JPG, JPEG</p>
            <p className="mt-1 text-xs text-white">Максимальный размер файла: {maxSize / 1024 / 1024}MB</p>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full flex flex-col transition-transform duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Изображение</h2>
        <Button onClick={onDelete} variant="danger" icon={Trash2}>
          Удалить
        </Button>
      </div>

      <div
        className="relative flex-1 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer overflow-hidden group min-h-[200px]
          border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-600 transition"
        onClick={handleClick}>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onUpload} />
        <img
          src={imageUrl}
          alt="Uploaded"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
          <ImagePlus className="w-10 h-10 mb-2" />
          <p className="text-sm">
            <span>Загрузи</span> или перетяни изображение
          </p>
          <p className="mt-1 text-xs text-white">Максимальный размер файла: {maxSize / 1024 / 1024}MB</p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
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
