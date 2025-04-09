import { Header, ImagePreview, ImageUploader, TextEditor } from '@/components';
import { useImageProcessing } from './hooks/useImageProcessing';
import { useCallback } from 'react';
import { useStore } from '@/store/useStore';

function App() {
  const { imageUrl, isProcessing, uploadImage, deleteImage } = useImageProcessing();
  const { extractedText, saveAsPDF, saveAsWord, setExtractedText } = useStore();

  const handleTextChange = useCallback(
    (text: string) => {
      setExtractedText(text);
    },
    [setExtractedText],
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-6">
        <Header />
        {!imageUrl ? (
          <ImageUploader onUpload={uploadImage} fullScreen />
        ) : (
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity duration-300`}>
            <ImagePreview
              imageUrl={imageUrl}
              isProcessing={isProcessing}
              onDelete={deleteImage}
              onUpload={uploadImage}
            />
          </div>
        )}
        {extractedText && (
          <TextEditor
            text={extractedText}
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
