'use client';

import { BackgroundAnimation } from '@/components/BackgroundAnimation';
import { GameCard } from '@/components/GameCard';
import { HeroTitle } from '@/components/HeroTitle';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Clock, Gamepad2, Swords } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeGame, setActiveGame] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const games = [
    {
      id: 'odin',
      title: 'Odin: Valhalla Rising',
      status: 'active',
      image: '/odin-800x1200.jpg',
      description: 'Масштабная MMORPG с открытым миром и эпическими сражениями',
      color: 'from-blue-800/80 to-indigo-600/80',
      accent: 'blue-500',
      icon: <Swords className="w-6 h-6" />,
    },
    {
      id: 'chrono',
      title: 'Chrono Odyssey',
      status: 'coming',
      image: '/odin-800x1200.jpg',
      description: 'Революционная RPG с манипуляцией временем',
      color: 'from-cyan-700/80 to-teal-600/80',
      accent: 'cyan-500',
      icon: <Clock className="w-6 h-6" />,
    },
    {
      id: 'archeage',
      title: 'Archeage 2',
      status: 'coming',
      image: '/archeage2-800x1200.jpg',
      description: 'Продолжение легендарной песочницы с бесконечными возможностями',
      color: 'from-amber-800/80 to-orange-700/80',
      accent: 'amber-500',
      icon: <Gamepad2 className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <BackgroundAnimation mousePosition={mousePosition} />
      <Navbar />

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
