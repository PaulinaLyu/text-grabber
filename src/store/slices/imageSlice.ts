import { StateCreator } from 'zustand';

export interface ImageSlice {
  imageUrl: string;
  editableText: string;
  isProcessing: boolean;
  // isDeleting: boolean;
  setImageUrl: (url: string) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  // setIsDeleting: (isDeleting: boolean) => void;
  processImage: () => void;
  handleDeleteImage: () => void;
}

export const createImageSlice: StateCreator<ImageSlice> = (set, get) => ({
  imageUrl: '',
  editableText: '',
  isProcessing: false,
  isDeleting: false,

  setImageUrl: url => set({ imageUrl: url }),
  setIsProcessing: isProcessing => set({ isProcessing }),
  // setIsDeleting: isDeleting => set({ isDeleting }),

  processImage: async () => {
    set({ isProcessing: true });
    set({ editableText: 'текст' });
    set({ isProcessing: false });
  },

  handleDeleteImage: () => {
    // set({ isDeleting: true });
    setTimeout(() => {
      const { imageUrl } = get();
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      set({
        imageUrl: '',
        editableText: '',
        // isDeleting: false,
      });
    }, 300);
  },
});
