'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface GameCardProps {
  game: {
    id: string;
    title: string;
    status: string;
    image: string;
    description: string | null; // Изменено с string на string | null
    color: string;
    accent: string;
    icon: React.ReactNode;
  };
  index: number;
  activeGame: string | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function GameCard({ game, index, activeGame, onMouseEnter, onMouseLeave }: GameCardProps) {
  return (
    <motion.div
      className={`relative group ${game.status === 'coming' ? 'opacity-80' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: 'easeOut',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Game card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl w-[280px] md:w-64"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Game image */}
        <div className="relative w-full h-[420px] md:h-96">
          <Image
            src={game.image}
            alt={game.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 280px, 256px"
            priority={game.status === 'active'}
            style={{ objectFit: 'cover' }}
          />

          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${game.color} opacity-60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-70`}
          />

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <motion.div
              className="transform transition-transform duration-500"
              animate={{ y: activeGame === game.id ? -8 : 0 }}
            >
              {game.status === 'coming' && (
                <motion.div
                  className="inline-block px-4 py-1.5 bg-gradient-to-r from-yellow-500/90 via-orange-500/90 to-red-500/90 text-white text-sm font-bold rounded-full mb-4 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    boxShadow: [
                      '0 0 20px rgba(249, 115, 22, 0.5)',
                      '0 0 30px rgba(249, 115, 22, 0.3)',
                      '0 0 20px rgba(249, 115, 22, 0.5)',
                    ],
                  }}
                  transition={{
                    opacity: { delay: 0.3 },
                    scale: { delay: 0.3 },
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  COMING SOON
                </motion.div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
              <p className="text-gray-200 text-sm mb-4 opacity-90">{game.description || ''}</p>

              {game.status === 'active' && (
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full text-sm font-medium hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300"
                  whileHover={{ gap: '12px' }}
                >
                  База знаний
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Hover glow effect */}
          <motion.div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            style={{
              background: `radial-gradient(circle at 50% 50%, ${
                activeGame === game.id ? 'rgba(99, 102, 241, 0.2)' : 'transparent'
              } 0%, transparent 70%)`,
            }}
          />
        </div>
      </motion.div>

      {/* Animated border */}
      <motion.div
        className={`absolute inset-0 rounded-2xl border-2 border-${game.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{
          transform: 'scale(1.05)',
        }}
      />

      {/* Floating icon */}
      <motion.div
        className={`absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-r ${game.color} rounded-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500`}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {game.icon}
      </motion.div>
    </motion.div>
  );
}
