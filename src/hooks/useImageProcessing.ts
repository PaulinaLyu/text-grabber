import { useCallback } from 'react';
import { useStore } from '../store/useStore';

export const useImageProcessing = () => {
  const { imageUrl, isProcessing, setImageUrl, setExtractedText, deleteImage } = useStore();

  const uploadImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setExtractedText(
          'А ещё сторонники тоталитаризма в науке освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, представлены в исключительно положительном свете. Значимость этих проблем настолько очевидна, что реализация намеченных плановых заданий не даёт нам иного выбора, кроме определения модели развития. Однозначно, представители современных социальных резервов, инициированные исключительно синтетически, рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок.',
        );
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
