export function Header() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Text Grabber</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Загрузите изображение для извлечения текста
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
