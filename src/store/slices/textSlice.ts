import { StateCreator } from 'zustand';
import { Document as DocxDocument, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';

export interface TextSlice {
  extractedText: string;
  editableText: string;
  isEditing: boolean;
  selectedLanguage: string;
  setExtractedText: (text: string) => void;
  setEditableText: (text: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  setSelectedLanguage: (language: string) => void;
  handleEdit: () => void;
  handleSave: () => void;
  handleCancel: () => void;
  saveAsPDF: () => void;
  saveAsWord: () => void;
}

export const createTextSlice: StateCreator<TextSlice> = (set, get) => ({
  extractedText: '',
  editableText: '',
  isEditing: false,
  selectedLanguage: 'rus',

  setExtractedText: text => set({ extractedText: text }),
  setEditableText: text => set({ editableText: text }),
  setIsEditing: isEditing => set({ isEditing }),
  setSelectedLanguage: language => set({ selectedLanguage: language }),

  handleEdit: () => set({ isEditing: true }),

  handleSave: () => {
    set(state => ({
      extractedText: state.editableText,
      isEditing: false,
    }));
  },

  handleCancel: () => {
    set(state => ({
      editableText: state.extractedText,
      isEditing: false,
    }));
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
});
