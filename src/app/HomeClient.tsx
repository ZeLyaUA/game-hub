'use client';

import { BackgroundAnimation } from '@/components/BackgroundAnimation';
import { GameCard } from '@/components/GameCard';
import { HeroTitle } from '@/components/HeroTitle';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Game {
  id: string;
  title: string;
  status: string;
  image: string;
  description: string | null; // Изменено с string на string | null
  color: string;
  accent: string;
  icon: React.ReactNode;
}

interface HomeClientProps {
  games: Game[];
}

export default function HomeClient({ games }: HomeClientProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeGame, setActiveGame] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <BackgroundAnimation mousePosition={mousePosition} />
      <Navbar showDashboard />

      {/* Main content */}
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-20 md:pt-20 md:pb-0">
        <HeroTitle />

        {/* Games grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 px-4 md:px-8 w-full max-w-[1400px] mt-8">
          {games.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              index={index}
              activeGame={activeGame}
              onMouseEnter={() => setActiveGame(game.id)}
              onMouseLeave={() => setActiveGame(null)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-center"
      >
        <p className="text-gray-500 text-xs md:text-sm">© 2025 ZeЛяве. Все права защищены.</p>
      </motion.footer>

      {/* Animated background effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}
