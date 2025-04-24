'use client';

import { Section } from '@/components/ui/Section';
import { useGames } from '@/hooks/useData';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function GamesList() {
  const { isLoading } = useGames();

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

      <div className="min-h-[300px] flex justify-center items-center">
        <p className="text-gray-400">Раздел находится в разработке</p>
      </div>
    </Section>
  );
}
