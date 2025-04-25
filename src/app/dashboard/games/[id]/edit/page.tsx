'use client';

import { deleteGame, getGameById, updateGame } from '@/app/actions/games';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Save,
  Tag,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import Image from 'next/image';

interface GameData {
  id: string;
  title: string;
  image: string;
  description: string;
  status: string;
  color: string;
  accent: string;
}

export default function EditGamePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [, setOriginalImage] = useState<string>('');

  const [gameData, setGameData] = useState<GameData>({
    id: resolvedParams.id,
    title: '',
    image: '',
    description: '',
    status: 'active',
    color: 'from-indigo-800/80 to-purple-600/80',
    accent: 'indigo-500',
  });

  // Загружаем данные об игре
  useEffect(() => {
    async function loadGame() {
      try {
        const game = await getGameById(resolvedParams.id);
        if (game) {
          setGameData({
            id: game.id,
            title: game.title,
            image: game.image,
            description: game.description || '',
            status: game.status,
            color: game.color,
            accent: game.accent,
          });
          setPreviewImage(game.image);
          setOriginalImage(game.image); // Сохраняем оригинальное изображение
        } else {
          setError('Игра не найдена');
        }
      } catch (err) {
        console.error(err);
        setError('Ошибка при загрузке данных');
      } finally {
        setIsLoading(false);
      }
    }

    loadGame();
  }, [resolvedParams.id]);

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

      // Отправляем текущий путь изображения для удаления
      if (gameData.image && gameData.image.startsWith('/uploads/')) {
        formData.append('oldImagePath', gameData.image);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при загрузке файла');
      }

      setPreviewImage(data.url);
      setGameData(prev => ({ ...prev, image: data.url }));
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
      setGameData(prev => ({ ...prev, image: '' }));
    } catch (err) {
      console.error(err);
      setError('Не удалось удалить изображение');
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('id', gameData.id);
      formData.append('title', gameData.title);
      formData.append('image', gameData.image);
      formData.append('description', gameData.description);
      formData.append('status', gameData.status);
      formData.append('color', gameData.color);
      formData.append('accent', gameData.accent);

      await updateGame(formData);
      setSuccess(true);
      setOriginalImage(gameData.image); // Обновляем оригинальное изображение
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError('Не удалось сохранить изменения');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Вы уверены, что хотите удалить эту игру?')) return;

    try {
      // Удаляем изображение, если оно загружено
      if (gameData.image && gameData.image.startsWith('/uploads/')) {
        await fetch('/api/upload/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filePath: gameData.image }),
        });
      }

      await deleteGame(gameData.id);
      router.push('/dashboard/games');
    } catch (err) {
      console.error(err);
      setError('Не удалось удалить игру');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Редактирование игры</h1>
            <p className="text-gray-400 mt-1">{gameData.title}</p>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 
                   hover:bg-red-500/20 rounded-lg transition-colors duration-200"
        >
          <Trash2 className="w-5 h-5" />
          Удалить игру
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Tag className="w-4 h-4" />
                Название игры
              </label>
              <input
                type="text"
                value={gameData.title}
                onChange={e => setGameData({ ...gameData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                         text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <ImageIcon className="w-4 h-4" />
                Постер игры
              </label>
              <div className="space-y-4">
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
                        <Image
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                          fill
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
                          <span className="font-semibold">Нажмите для загрузки</span> или перетащите
                          файл
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
                  <div className="text-center">
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
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <FileText className="w-4 h-4" />
                Описание
              </label>
              <textarea
                value={gameData.description}
                onChange={e => setGameData({ ...gameData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                         text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <AlertCircle className="w-4 h-4" />
                Статус
              </label>
              <select
                value={gameData.status}
                onChange={e => setGameData({ ...gameData, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                         text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="active">Активна</option>
                <option value="coming">Скоро выйдет</option>
              </select>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Градиент фона
                </label>
                <select
                  value={gameData.color}
                  onChange={e => setGameData({ ...gameData, color: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="from-blue-800/80 to-indigo-600/80">Синий</option>
                  <option value="from-cyan-700/80 to-teal-600/80">Бирюзовый</option>
                  <option value="from-amber-800/80 to-orange-700/80">Оранжевый</option>
                  <option value="from-purple-800/80 to-pink-600/80">Фиолетовый</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Акцентный цвет
                </label>
                <select
                  value={gameData.accent}
                  onChange={e => setGameData({ ...gameData, accent: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="blue-500">Синий</option>
                  <option value="cyan-500">Бирюзовый</option>
                  <option value="amber-500">Оранжевый</option>
                  <option value="purple-500">Фиолетовый</option>
                </select>
              </div>
            </div>
          </div>

          {/* Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm"
              >
                Изменения сохранены!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 
                       hover:text-white transition-colors duration-200"
            >
              Отмена
            </button>

            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 
                       text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Сохранение...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Сохранить изменения
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
