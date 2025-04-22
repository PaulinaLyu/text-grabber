import { useCallback } from 'react';
import { useStore } from '@/store/useStore';

export const useImageProcessing = () => {
  const { imageUrl, isProcessing, setImageUrl, processImage, deleteImage } = useStore();

  const uploadImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        processImage();
      }
    },
    [setImageUrl],
  );

  return {
    imageUrl,
    isProcessing,
    uploadImage,
    deleteImage,
  };
};
