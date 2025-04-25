'use client';

import { addGame } from '@/app/actions/games';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, FileText, Image as ImageIcon, Tag, Upload, X } from 'lucide-react';
import { useState } from 'react';

export function AddGameForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение');
      return;
    }

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Файл слишком большой. Максимальный размер: 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при загрузке файла');
      }

      setPreviewImage(data.url);

      // Устанавливаем значение в скрытый input
      const imageInput = document.getElementById('image') as HTMLInputElement;
      if (imageInput) {
        imageInput.value = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке файла');
    } finally {
      setIsUploading(false);
    }
  }

  async function handleRemoveImage() {
    if (!previewImage) return;

    try {
      // Удаляем файл с сервера, если это загруженное изображение
      if (previewImage.startsWith('/uploads/')) {
        const response = await fetch('/api/upload/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filePath: previewImage }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Ошибка при удалении файла');
        }
      }

      setPreviewImage('');

      // Очищаем скрытый input
      const imageInput = document.getElementById('image') as HTMLInputElement;
      if (imageInput) {
        imageInput.value = '';
      }
    } catch (err) {
      console.error(err);
      setError('Не удалось удалить изображение');
    }
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addGame(formData);
      setSuccess(true);

      // Очищаем форму после успешного добавления
      const form = document.querySelector('form') as HTMLFormElement;
      form?.reset();
      setPreviewImage('');

      // Убираем сообщение об успехе через 3 секунды
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
        >
          <Tag className="w-4 h-4" />
          Название игры
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg 
                   focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                   text-white placeholder-gray-500 transition-colors"
          placeholder="Например: World of Warcraft"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label
          htmlFor="imageFile"
          className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
        >
          <ImageIcon className="w-4 h-4" />
          Постер игры
        </label>
        <div className="space-y-2">
          <input type="hidden" id="image" name="image" value={previewImage} />

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="imageFile"
              className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed 
                       rounded-lg cursor-pointer transition-colors
                       ${
                         previewImage
                           ? 'border-indigo-500 bg-gray-800/30'
                           : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800/70'
                       }
                       ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {previewImage ? (
                <>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {!isUploading && (
                    <button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP до 5MB</p>
                </div>
              )}
              <input
                id="imageFile"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
          </div>

          {isUploading && (
            <div className="text-center mt-2">
              <div className="inline-flex items-center gap-2 text-sm text-indigo-400">
                <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                Загрузка и оптимизация...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
        >
          <FileText className="w-4 h-4" />
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg 
                   focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                   text-white placeholder-gray-500 resize-none transition-colors"
          placeholder="Краткое описание игры"
        />
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
        >
          <AlertCircle className="w-4 h-4" />
          Статус
        </label>
        <select
          id="status"
          name="status"
          className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg 
                   focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                   text-white transition-colors"
        >
          <option value="active">Активна</option>
          <option value="coming">Скоро выйдет</option>
        </select>
      </div>

      {/* Messages */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            Игра успешно добавлена!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading || isUploading}
        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 
                 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-lg font-medium 
                 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                 disabled:hover:from-indigo-600 disabled:hover:to-indigo-500
                 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Добавление...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Добавить игру
          </>
        )}
      </button>
    </form>
  );
}
