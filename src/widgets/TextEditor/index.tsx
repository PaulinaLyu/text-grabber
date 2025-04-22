import { useState } from 'react';
import { FileText, Download, Edit2, Save, X, Copy, Check } from 'lucide-react';
import { Button } from '@/ui';

interface TextEditorProps {
  text: string;
  onEditableTextChange: (text: string) => void;
  onSaveAsPDF: () => void;
  onSaveAsWord: () => void;
}

export const TextEditor = ({ text, onEditableTextChange, onSaveAsPDF, onSaveAsWord }: TextEditorProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка при попытке скопировать в буфер обмена:', err);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditingStart = () => {
    setIsEditing(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full flex flex-col transition-transform duration-300 hover:shadow-md animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          <FileText className="inline w-5 h-5 mr-2" />
          Сгенерированный текст
        </h2>
        <div className="space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} variant="primary" icon={Save}>
                Cохранить
              </Button>
              <Button onClick={handleCancel} icon={X}>
                Отменить
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleEditingStart} icon={Edit2}>
                Редактировать
              </Button>
              <Button onClick={onSaveAsPDF} icon={Download}>
                PDF
              </Button>
              <Button onClick={onSaveAsWord} icon={Download}>
                Word
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded p-4 relative overflow-hidden">
        {!isEditing && (
          <Button
            onClick={handleCopy}
            size="sm"
            className="absolute top-4 right-4 !p-2 !hover:scale-110"
            icon={isCopied ? Check : Copy}
          />
        )}
        {isEditing ? (
          <textarea
            value={text}
            onChange={e => onEditableTextChange(e.target.value)}
            className="w-full h-full min-h-[200px] p-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-500/30 rounded focus:border-blue-400 dark:focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500/20 focus:ring-opacity-50 transition-all duration-200"
            style={{ height: 'calc(100% - 2rem)' }}
          />
        ) : (
          <div className="h-full overflow-y-auto pr-8">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
};
