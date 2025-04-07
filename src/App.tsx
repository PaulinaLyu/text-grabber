import { Header, ImagePreview, ImageUploader } from '@/components';
import { useCallback, useState } from 'react';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
      }
    },
    [setImageUrl],
  );

  const handleDelete = () => {
    setIsDeleting(true);
    setImageUrl('');
  };

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
              isProcessing={false}
              onDelete={handleDelete}
              onUpload={handleImageUpload}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
