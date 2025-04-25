'use client';

import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Save,
  Tag,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface GameData {
  id: string;
  title: string;
  image: string;
  description: string;
  status: string;
  color: string;
  accent: string;
}

export default function EditGamePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // В реальном приложении здесь был бы запрос к API
  const [gameData, setGameData] = useState<GameData>({
    id: params.id,
    title: 'Odin: Valhalla Rising',
    image: '/odin-800x1200.jpg',
    description: 'Масштабная MMORPG с открытым миром и эпическими сражениями',
    status: 'active',
    color: 'from-blue-800/80 to-indigo-600/80',
    accent: 'blue-500',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // Здесь должен быть вызов API для сохранения
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
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
      // Здесь должен быть вызов API для удаления
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard/games');
    } catch (err) {
      console.error(err);
      setError('Не удалось удалить игру');
    }
  };

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

            {/* Image */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <ImageIcon className="w-4 h-4" />
                URL постера
              </label>
              <div className="space-y-4">
                <input
                  type="text"
                  value={gameData.image}
                  onChange={e => setGameData({ ...gameData, image: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:border-indigo-500"
                />
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-700">
                  <img
                    src={gameData.image || '/api/placeholder/400/200'}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src = '/api/placeholder/400/200';
                    }}
                  />
                </div>
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
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm"
            >
              Изменения сохранены!
            </motion.div>
          )}

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
              disabled={isSaving}
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

      {/* Additional Information */}
      <div className="mt-8 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Дополнительная информация</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-400">ID игры</p>
            <p className="text-white font-mono">{gameData.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Дата добавления</p>
            <p className="text-white">25 января 2025</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Последнее обновление</p>
            <p className="text-white">25 апреля 2025</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Версия</p>
            <p className="text-white">1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
