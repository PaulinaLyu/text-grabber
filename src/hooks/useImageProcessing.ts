import { useCallback } from 'react';
import { useStore } from '../store/useStore';

export const useImageProcessing = () => {
  const { imageUrl, isProcessing, isDeleting, setImageUrl, processImage, handleDeleteImage } = useStore();

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        processImage(url);
      }
    },
    [setImageUrl, processImage],
  );

  return {
    imageUrl,
    isProcessing,
    isDeleting,
    handleImageUpload,
    handleDeleteImage,
  };
};
