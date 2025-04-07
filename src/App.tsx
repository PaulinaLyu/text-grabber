import { Header, ImagePreview, ImageUploader } from '@/components';
import { useImageProcessing } from './hooks/useImageProcessing';

function App() {
  const { imageUrl, isProcessing, isDeleting, handleImageUpload, handleDeleteImage } = useImageProcessing();

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
      </div>
    </div>
  );
}

export default App;
