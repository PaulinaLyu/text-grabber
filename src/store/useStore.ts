import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Document as DocxDocument, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';

interface StoreTypes {
  imageUrl: string;
  isProcessing: boolean;
  extractedText: string;
  selectedLanguage: string;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  setSelectedLanguage: (language: string) => void;
  setImageUrl: (url: string) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setExtractedText: (text: string) => void;
  processImage: () => void;
  deleteImage: () => void;
  saveAsPDF: () => void;
  saveAsWord: () => void;
}

export const useStore = create<StoreTypes>()(
  devtools((set, get) => ({
    imageUrl: '',
    extractedText: '',
    isProcessing: false,
    selectedLanguage: 'rus',
    isDark:
      typeof window !== 'undefined'
        ? localStorage.getItem('theme') === 'dark' ||
          (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
        : false,
    setImageUrl: url => set({ imageUrl: url }),
    setIsProcessing: isProcessing => set({ isProcessing }),
    setExtractedText: text => set({ extractedText: text }),
    setSelectedLanguage: language => set({ selectedLanguage: language }),
    setIsDark: isDark => set({ isDark }),

    processImage: async () => {
      set({ isProcessing: true });
      set({ isProcessing: false });
    },

    deleteImage: () => {
      setTimeout(() => {
        const { imageUrl } = get();
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
        set({
          imageUrl: '',
          extractedText: '',
        });
      }, 300);
    },

    saveAsPDF: () => {
      const { extractedText } = get();
      const blob = new Blob([extractedText], { type: 'application/pdf' });
      saveAs(blob, 'extracted-text.pdf');
    },

    saveAsWord: () => {
      const { extractedText } = get();
      const doc = new DocxDocument({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: extractedText,
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob: Blob | string) => {
        saveAs(blob, 'extracted-text.docx');
      });
    },
  })),
);
