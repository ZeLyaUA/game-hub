// src/presentation/components/games/GameList.tsx
import { GameEntity, GameStatus } from '@/domain/entities/game';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { LoadingSpinner, Select } from '../ui';
import { GameCard } from './GameCard';

interface GameListProps {
  games: GameEntity[];
  onEdit: (game: GameEntity) => void;
  onDelete: (game: GameEntity) => void;
  isLoading?: boolean;
}

export function GameList({ games, onEdit, onDelete, isLoading }: GameListProps) {
  const [filter, setFilter] = useState<'all' | GameStatus>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  const filteredGames = games
    .filter(game => filter === 'all' || game.status === filter)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white mb-1">Управление играми</h2>
          <p className="text-sm text-gray-400">Список всех добавленных игр</p>
        </div>

        <div className="flex gap-3">
          <Select
            value={filter}
            onChange={e => setFilter(e.target.value as 'all' | GameStatus)}
            options={[
              { value: 'all', label: 'Все игры' },
              { value: GameStatus.ACTIVE, label: 'Активные' },
              { value: GameStatus.COMING, label: 'Скоро' },
              { value: GameStatus.ARCHIVED, label: 'В архиве' },
            ]}
          />

          <Select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'date' | 'title')}
            options={[
              { value: 'date', label: 'По дате' },
              { value: 'title', label: 'По названию' },
            ]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredGames.map(game => (
            <motion.div
              key={game.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GameCard game={game} onEdit={() => onEdit(game)} onDelete={() => onDelete(game)} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredGames.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
            {filter === 'all'
              ? 'Нет добавленных игр'
              : `Нет ${
                  filter === GameStatus.ACTIVE
                    ? 'активных'
                    : filter === GameStatus.COMING
                    ? 'предстоящих'
                    : 'архивных'
                } игр`}
          </div>
        )}
      </div>
    </div>
  );
}
