'use client';

import GameCard from '@/components/games/GameCard';
import { Section } from '@/components/ui/Section';
import { useGames } from '@/hooks/useData';
import useIntersection from '@/hooks/useIntersection';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function GamesList() {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);
  const [ref, inView] = useIntersection({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { games, isLoading } = useGames();

  if (isLoading) {
    return (
      <Section className="min-h-[400px]">
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <motion.div
        className="flex justify-between items-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gradient">Популярные игры</h2>
        <Link href="/games">
          <motion.div
            className="flex items-center text-indigo-400 hover:text-indigo-300 font-medium group"
            whileHover={{ x: 5 }}
          >
            <span>Показать все</span>
            <ChevronRight className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </Link>
      </motion.div>

      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {games.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            index={index}
            isHovered={hoveredGame === game.id}
            onHover={setHoveredGame}
          />
        ))}
      </motion.div>
    </Section>
  );
}
