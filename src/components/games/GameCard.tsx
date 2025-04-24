'use client';

import { Badge } from '@/components/ui/Badge';
import { Game } from '@/data/games/games-list';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface GameCardProps {
  game: Game;
  index: number;
  isHovered: boolean;
  onHover: (id: number) => void;
}

export default function GameCard({ game, index, isHovered, onHover }: GameCardProps) {
  return (
    <motion.div
      key={game.id}
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 group"
      onMouseEnter={() => onHover(game.id)}
      onMouseLeave={() => onHover(0)}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, type: 'spring', delay: index * 0.1 },
        },
      }}
      whileHover={{ y: -10 }}
    >
      <div className="relative h-48">
        {/* Контейнер для баннера с overflow: hidden */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="w-full h-full relative"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={game.banner}
              alt={game.title}
              className="object-cover"
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </div>

        <div className="absolute -bottom-6 left-4">
          <motion.div
            className="h-12 w-12 rounded-lg bg-gray-900 p-1 border-2 border-indigo-500 z-10 relative"
            whileHover={{ scale: 1.1, rotate: 3 }}
          >
            <Image
              src={game.logo}
              alt={`${game.title} logo`}
              className="rounded"
              fill={true}
              sizes="48px"
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

        {/* Анимированная обводка при наведении */}
        <motion.div
          className="absolute inset-0 border-2 border-indigo-500/0 rounded-t-xl z-0"
          animate={{
            borderColor: isHovered ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0)',
          }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
      <div className="p-4 pt-8">
        <motion.h3
          className="font-bold text-lg mb-2 group-hover:text-indigo-400 transition-colors duration-300"
          animate={{
            color: isHovered ? '#a5b4fc' : '#ffffff',
          }}
          transition={{ duration: 0.3 }}
        >
          {game.title}
        </motion.h3>
        <p className="text-gray-400 text-sm mb-3">{game.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {game.tags.map(tag => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between">
          <Link href={`/games/${game.title.toLowerCase().replace(/\s+/g, '-')}`}>
            <motion.button
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center group"
              whileHover={{ x: 5 }}
            >
              <span>Подробнее</span>
              <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm">{game.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
