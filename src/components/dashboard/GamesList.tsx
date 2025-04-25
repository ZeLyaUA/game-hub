'use client';

import { deleteGame } from '@/app/actions/games';
import { formatDate } from '@/lib/utils/date';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Clock, Edit2, ExternalLink, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Game {
  id: string;
  title: string;
  image: string;
  description: string | null;
  status: string;
  createdAt: Date;
}

interface GamesListProps {
  games: Game[];
}

export function GamesList({ games }: GamesListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'coming'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  async function handleDelete(id: string) {
    if (!confirm('Вы уверены, что хотите удалить эту игру?')) return;

    setDeletingId(id);
    try {
      await deleteGame(id);
    } catch (error) {
      console.error('Failed to delete game:', error);
      alert('Не удалось удалить игру');
    } finally {
      setDeletingId(null);
    }
  }

  const filteredGames = games
    .filter(game => {
      if (filter === 'all') return true;
      return game.status === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  return (
    <div>
      {/* Filters and sorting */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white mb-1">Управление играми</h2>
          <p className="text-sm text-gray-400">Список всех добавленных игр</p>
        </div>

        <div className="flex gap-3">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value as 'all' | 'active' | 'coming')}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm
                     focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Все игры</option>
            <option value="active">Активные</option>
            <option value="coming">Скоро</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'date' | 'title')}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm
                     focus:outline-none focus:border-indigo-500"
          >
            <option value="date">По дате</option>
            <option value="title">По названию</option>
          </select>
        </div>
      </div>

      {/* Games list */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredGames.map(game => (
            <motion.div
              key={game.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden
                         hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-32">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent sm:hidden" />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{game.title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {game.description || 'Нет описания'}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <span
                          className={`
                          inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                          ${
                            game.status === 'active'
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                          }
                        `}
                        >
                          {game.status === 'active' ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          {game.status === 'active' ? 'Активна' : 'Скоро'}
                        </span>

                        <span className="text-xs text-gray-500">
                          Добавлено: {formatDate(game.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 
                                 rounded-lg transition-colors"
                        title="Открыть"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>

                      <button
                        className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 
                                 rounded-lg transition-colors"
                        title="Редактировать"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => handleDelete(game.id)}
                        disabled={deletingId === game.id}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 
                                 rounded-lg transition-colors disabled:opacity-50"
                        title="Удалить"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredGames.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
            {filter === 'all'
              ? 'Нет добавленных игр'
              : `Нет ${filter === 'active' ? 'активных' : 'предстоящих'} игр`}
          </div>
        )}
      </div>
    </div>
  );
}
