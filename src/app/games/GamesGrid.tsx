'use client';

import GameCard from '@/components/games/GameCard';
import { Game } from '@/data/games/games-list';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface GamesGridProps {
  initialGames: Game[];
}

export default function GamesGrid({ initialGames }: GamesGridProps) {
  const [games] = useState<Game[]>(initialGames);
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Фильтрация игр по тегам
  const filteredGames =
    filter === 'all'
      ? games
      : games.filter(game => game.tags.some(tag => tag.toLowerCase() === filter.toLowerCase()));

  // Уникальные теги для фильтрации
  const uniqueTags = Array.from(new Set(games.flatMap(game => game.tags)));

  return (
    <div>
      {/* Фильтры */}
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
          Все игры
        </FilterButton>

        {uniqueTags.map(tag => (
          <FilterButton key={tag} active={filter === tag} onClick={() => setFilter(tag)}>
            {tag}
          </FilterButton>
        ))}
      </div>

      {/* Сетка игр */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {filteredGames.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            index={index}
            isHovered={hoveredGame === game.id}
            onHover={setHoveredGame}
          />
        ))}

        {filteredGames.length === 0 && (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-400">Игры не найдены. Попробуйте другой фильтр.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function FilterButton({ children, active, onClick }: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {children}
    </motion.button>
  );
}
