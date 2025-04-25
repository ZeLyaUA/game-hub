'use client';

// src/app/HomeClient.tsx
import { GameEntity } from '@/domain/entities/game';
import { BackgroundAnimation } from '@/presentation/components/effects/BackgroundAnimation';
import { Navbar } from '@/presentation/components/layout/Navbar';
import { HeroTitle } from '@/presentation/components/ui/HeroTitle';
import { motion } from 'framer-motion';
import { Clock, Gamepad2, Swords } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface HomeClientProps {
  games: GameEntity[];
}

interface GameWithIcon extends GameEntity {
  icon: React.ReactNode;
}

const gameIcons: Record<string, React.ReactNode> = {
  odin: <Swords className="w-6 h-6" />,
  chrono: <Clock className="w-6 h-6" />,
  archeage: <Gamepad2 className="w-6 h-6" />,
  default: <Gamepad2 className="w-6 h-6" />,
};

function getGameIcon(gameId: string): React.ReactNode {
  return gameIcons[gameId] ?? gameIcons.default;
}

export default function HomeClient({ games }: HomeClientProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Добавляем иконки к играм
  const gamesWithIcons: GameWithIcon[] = games.map(game => ({
    ...game,
    icon: getGameIcon(game.id),
  }));

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
          {gamesWithIcons.map((game, index) => (
            <motion.div
              key={game.id}
              className={`relative group ${game.status === 'coming' ? 'opacity-80' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
              onMouseEnter={() => setActiveGame(game.id)}
              onMouseLeave={() => setActiveGame(null)}
            >
              <Link href={`/game/${game.id}`}>
                <motion.div
                  className="relative overflow-hidden rounded-2xl w-[280px] md:w-64"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <div className="relative w-full h-[420px] md:h-96">
                    {game.image ? (
                      <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 280px, 256px"
                        priority={game.status === 'active'}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <Gamepad2 className="w-16 h-16 text-gray-600" />
                      </div>
                    )}

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
                          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-yellow-500/90 via-orange-500/90 to-red-500/90 text-white text-sm font-bold rounded-full mb-4 shadow-lg">
                            COMING SOON
                          </div>
                        )}

                        <h3 className="text-2xl font-bold text-white mb-2">{game.title}</h3>
                        <p className="text-gray-200 text-sm mb-4 opacity-90">
                          {game.description ?? ''}
                        </p>

                        <motion.div
                          className="flex items-center gap-2 text-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <span className="text-sm font-medium">
                            {game.status === 'active' ? 'Перейти к игре' : 'Узнать больше'}
                          </span>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>

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
    </div>
  );
}
