import { Header, TextEditor, ImageUploadPreview } from '@/widgets';
import { useImageProcessing } from '@/hooks/useImageProcessing';
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

  const showEditor = extractedText && imageUrl;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-6">
        <Header />
        {!imageUrl ? (
          <ImageUploadPreview
            imageUrl=""
            isProcessing={isProcessing}
            onUpload={uploadImage}
            onDelete={deleteImage}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 transition-opacity duration-300">
            <ImageUploadPreview
              imageUrl={imageUrl}
              isProcessing={isProcessing}
              onUpload={uploadImage}
              onDelete={deleteImage}
            />
            {showEditor && (
              <TextEditor
                text={extractedText}
                onEditableTextChange={handleTextChange}
                onSaveAsPDF={saveAsPDF}
                onSaveAsWord={saveAsWord}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
