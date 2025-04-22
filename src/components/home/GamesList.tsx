'use client';

import { formatNumber } from '@/utils/format';
import { motion } from 'framer-motion';
import { ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const games = [
  {
    id: 1,
    title: 'ODIN: Valhalla Rising',
    banner: '/banner/1200x600/banner-odin.png',
    logo: '/odin-logo.webp',
    description: 'Погрузитесь в скандинавский мир MMORPG с открытым миром и потрясающей графикой',
    onlineCount: 25438,
    tags: ['MMORPG', 'Викинги', 'Открытый мир'],
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Throne and Liberty',
    banner: '/banner/1200x600/banner-tl.jpg',
    logo: '/throneandliberty-logo.png',
    description: 'Фэнтезийная MMORPG с акцентом на трансформацию персонажей и динамичные бои',
    onlineCount: 17863,
    tags: ['MMORPG', 'Фэнтези', 'PvP'],
    rating: 4.3,
  },
  {
    id: 3,
    title: 'Lost Ark',
    banner: '/banner/1200x600/banner-lostark.jpg',
    logo: '/lostark-logo.png',
    description: 'Изометрическая MMORPG с быстрыми боями и множеством классов',
    onlineCount: 32105,
    tags: ['MMORPG', 'Изометрия', 'Рейды'],
    rating: 4.6,
  },
];

export default function GamesList() {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="flex justify-between items-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gradient">Популярные игры</h2>
          <motion.a
            href="#"
            className="flex items-center text-indigo-400 hover:text-indigo-300 font-medium group"
            whileHover={{ x: 5 }}
          >
            <span>Показать все</span>
            <ChevronRight className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
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
          {games.map(game => (
            <motion.div
              key={game.id}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 group"
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, type: 'spring' },
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
                      scale: hoveredGame === game.id ? 1.1 : 1,
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

                {/* Остальные элементы без overflow: hidden */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs">
                  {formatNumber(game.onlineCount)} онлайн
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
                    borderColor:
                      hoveredGame === game.id ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0)',
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
              <div className="p-4 pt-8">
                <motion.h3
                  className="font-bold text-lg mb-2 group-hover:text-indigo-400 transition-colors duration-300"
                  animate={{
                    color: hoveredGame === game.id ? '#a5b4fc' : '#ffffff',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {game.title}
                </motion.h3>
                <p className="text-gray-400 text-sm mb-3">{game.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.tags.map(tag => (
                    <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <motion.button
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <span>Подробнее</span>
                    <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm">{game.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
