import { Header, ImagePreview, ImageUploader, TextEditor } from '@/components';
import { useImageProcessing } from './hooks/useImageProcessing';
import { useCallback } from 'react';
import { useStore } from '@/store/useStore';

function App() {
  const { imageUrl, isProcessing, isDeleting, handleImageUpload, handleDeleteImage } = useImageProcessing();
  const {
    extractedText,
    editableText,
    isEditing,
    handleEdit,
    handleSave,
    handleCancel,
    setEditableText,
    saveAsPDF,
    saveAsWord,
  } = useStore();

  const handleTextChange = useCallback(
    (text: string) => {
      setEditableText(text);
    },
    [setEditableText],
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-6">
        <Header />
        {!imageUrl ? (
          <ImageUploader onUpload={handleImageUpload} fullScreen />
        ) : (
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity duration-300 ${isDeleting ? 'opacity-0' : 'opacity-100'}`}>
            <ImagePreview
              imageUrl={imageUrl}
              isProcessing={isProcessing}
              onDelete={handleDeleteImage}
              onUpload={handleImageUpload}
            />
          </div>
        )}
        {extractedText && (
          <TextEditor
            text={extractedText}
            editableText={editableText}
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            onEditableTextChange={handleTextChange}
            onSaveAsPDF={saveAsPDF}
            onSaveAsWord={saveAsWord}
          />
        )}
      </div>
    </div>
  );
}

export default App;
