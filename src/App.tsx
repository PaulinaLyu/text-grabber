import { Header, ImageUploader } from '@/components';
import { useCallback, useState } from 'react';

function App() {
  const [imageUrl, setImageUrl] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-6">
        <Header />
        <ImageUploader onUpload={handleImageUpload} fullScreen />
        <div>{imageUrl}</div>
      </div>
    </div>
  );
}

export default App;
