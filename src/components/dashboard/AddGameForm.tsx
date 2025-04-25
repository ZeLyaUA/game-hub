'use client';

import { addGame } from '@/app/actions/games';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, FileText, Image as ImageIcon, Tag, Upload } from 'lucide-react';
import { useState } from 'react';

export function AddGameForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPreviewImage(value);
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

      {/* Image URL */}
      <div>
        <label
          htmlFor="image"
          className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
        >
          <ImageIcon className="w-4 h-4" />
          URL постера
        </label>
        <div className="relative">
          <input
            type="text"
            id="image"
            name="image"
            required
            onChange={handleImageChange}
            className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg 
                     focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                     text-white placeholder-gray-500 transition-colors"
            placeholder="/images/game-poster.jpg"
          />
          {previewImage && (
            <div className="mt-2 relative w-full h-40 rounded-lg overflow-hidden border border-gray-700">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={e => {
                  (e.target as HTMLImageElement).src = '/api/placeholder/400/200';
                }}
              />
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
        disabled={isLoading}
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
