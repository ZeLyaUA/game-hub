// src/components/ui/ImageUpload.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onError?: (error: string) => void;
  className?: string;
  aspectRatio?: 'square' | 'poster' | 'video' | 'auto';
}

export function ImageUpload({
  value,
  onChange,
  onError,
  className = '',
  aspectRatio = 'poster',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');

  const aspectRatioClasses = {
    square: 'aspect-square',
    poster: 'aspect-[2/3]',
    video: 'aspect-video',
    auto: '',
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      onError?.('Пожалуйста, выберите изображение');
      return;
    }

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onError?.('Файл слишком большой. Максимальный размер: 5MB');
      return;
    }

    setIsUploading(true);

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

      setPreview(data.url);
      onChange(data.url);
    } catch (err) {
      onError?.(err instanceof Error ? err.message : 'Ошибка при загрузке файла');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!preview) return;

    try {
      // Удаляем файл с сервера, если это загруженное изображение
      if (preview.startsWith('/uploads/')) {
        const response = await fetch('/api/upload/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filePath: preview }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Ошибка при удалении файла');
        }
      }

      setPreview('');
      onChange('');
    } catch (err) {
      console.error(err);
      onError?.('Не удалось удалить изображение');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <label
          htmlFor="imageFile"
          className={`
            relative flex flex-col items-center justify-center border-2 border-dashed 
            rounded-lg cursor-pointer transition-colors overflow-hidden
            ${aspectRatioClasses[aspectRatio] || 'h-64'}
            ${
              preview
                ? 'border-indigo-500 bg-gray-800/30'
                : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800/70'
            }
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <AnimatePresence mode="wait">
            {preview ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full"
              >
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center pt-5 pb-6"
              >
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Нажмите для загрузки</span> или перетащите файл
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP до 5MB</p>
              </motion.div>
            )}
          </AnimatePresence>

          <input
            id="imageFile"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="text-center">
              <LoadingSpinner />
              <div className="mt-2 text-sm text-indigo-400">Загрузка и оптимизация...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
