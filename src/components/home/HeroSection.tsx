'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Gamepad2, Shield, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

const games = [
  {
    id: 1,
    title: 'ODIN: Valhalla Rising',
    banner: '/banner/1200x600/banner-odin.png',
    logo: '/odin-logo.webp',
    description: 'Погрузитесь в скандинавский мир MMORPG с открытым миром и потрясающей графикой',
    tags: ['MMORPG', 'Викинги', 'Открытый мир'],
    highlight: 'Новое обновление: Огненные земли',
  },
  {
    id: 2,
    title: 'Throne and Liberty',
    banner: '/banner/1200x600/banner-tl.jpg',
    logo: '/throneandliberty-logo.png',
    description: 'Фэнтезийная MMORPG с акцентом на трансформацию персонажей и динамичные бои',
    tags: ['MMORPG', 'Фэнтези', 'PvP'],
    highlight: 'Скоро ЗБТ 2.0',
  },
  {
    id: 3,
    title: 'Lost Ark',
    banner: '/banner/1200x600/banner-lostark.jpg',
    logo: '/lostark-logo.png',
    description: 'Изометрическая MMORPG с быстрыми боями и множеством классов',
    tags: ['MMORPG', 'Изометрия', 'Рейды'],
    highlight: 'Новый класс доступен',
  },
];

export default function HeroSection() {
  const [activeGameIndex, setActiveGameIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setIsImageLoaded] = useState(false);
  const bannersLoaded = useRef<Record<number, boolean>>({});

  // Предзагрузка изображений
  useEffect(() => {
    games.forEach((game, index) => {
      const img = new globalThis.Image();
      img.src = game.banner;
      img.onload = () => {
        bannersLoaded.current[index] = true;
        if (index === activeGameIndex) {
          setIsImageLoaded(true);
        }
      };
    });
  }, [activeGameIndex]);

  // Имитация загрузки и автопереключение
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 700);

    const autoSlideInterval = setInterval(() => {
      setActiveGameIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % games.length;
        setIsImageLoaded(!!bannersLoaded.current[newIndex]);
        return newIndex;
      });
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearInterval(autoSlideInterval);
    };
  }, []);

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Экран загрузки
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Gamepad2 className="h-16 w-16 text-indigo-500 animate-bounce" />
          <motion.div
            className="absolute -top-2 -right-2 h-5 w-5 bg-purple-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.div>
        <motion.div
          className="mt-4 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            ZeЛяве
          </h1>
          <span className="text-sm text-gray-400">Братство</span>
        </motion.div>
        <motion.div
          className="mt-8 w-64 h-2 bg-gray-800 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: '16rem' }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-indigo-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '75%' }}
            transition={{ delay: 0.8, duration: 1.5 }}
          />
        </motion.div>
        <motion.p
          className="mt-2 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Загрузка игрового мира...
        </motion.p>
      </div>
    );
  }

  return (
    <section className="pt-16 relative overflow-hidden h-screen max-h-[900px]">
      {/* Фоновые изображения с анимированными переходами */}
      <div className="absolute inset-0 z-0">
        {games.map((game, index) => (
          <AnimatePresence key={game.id}>
            {activeGameIndex === index && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 bg-gray-900"
                style={{
                  backgroundImage: `url(${game.banner})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Частицы/световые эффекты */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900"></div>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
                  <div
                    className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '1s' }}
                  ></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Фирменные элементы ZeЛяве Братство */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <motion.div
          className="absolute top-32 right-10 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-12 pb-24 h-full flex flex-col justify-center">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between h-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Информация об игре */}
          <motion.div className="w-full md:w-1/2 mb-8 md:mb-0" variants={itemVariants}>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 relative overflow-hidden">
              {/* Декоративный элемент в стиле ZeЛяве */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

              <motion.div className="flex items-center mb-4" variants={itemVariants}>
                <motion.div
                  className="relative h-16 w-16 rounded-lg overflow-hidden border-2 border-indigo-500 shadow-lg shadow-indigo-500/30 mr-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Image
                    src={games[activeGameIndex].logo}
                    alt={`${games[activeGameIndex].title} logo`}
                    className="object-cover"
                    fill={true}
                    sizes="64px" // Добавлено для оптимизации
                  />
                </motion.div>

                <motion.h1
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                  key={games[activeGameIndex].title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {games[activeGameIndex].title}
                </motion.h1>
              </motion.div>

              <motion.p
                className="text-gray-300 mb-6 text-lg"
                variants={itemVariants}
                key={games[activeGameIndex].description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {games[activeGameIndex].description}
              </motion.p>

              <motion.div className="flex flex-wrap gap-2 mb-6" variants={itemVariants}>
                {games[activeGameIndex].tags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-500/30"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3"
                variants={itemVariants}
              >
                <motion.button
                  className="bg-gray-700/70 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer"
                  whileHover={{ y: -5 }}
                  whileTap={{ y: 0 }}
                >
                  База знаний
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Специальное предложение */}
          <motion.div className="w-full md:w-5/12" variants={itemVariants}>
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-5 rounded-xl border border-indigo-500/30 shadow-xl relative overflow-hidden group hover:shadow-indigo-500/20 hover:border-indigo-500/50 transition-all duration-500">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl group-hover:bg-indigo-600/40 transition-all duration-500"></div>

              {/* Бейдж ZeЛяве Братство */}
              <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-bl-lg font-medium text-sm z-10">
                Discord ZeЛяве
              </div>

              <div className="pt-6 relative z-10">
                <motion.div className="flex items-center mb-2" variants={itemVariants}>
                  <Shield className="h-5 w-5 text-indigo-400 mr-2" />
                  <h2 className="text-2xl font-bold">Набор Братства</h2>
                </motion.div>

                <motion.p className="text-gray-300 mb-4" variants={itemVariants}>
                  Получите эксклюзивный набор новичка для членов Братства
                </motion.p>

                <motion.ul className="space-y-2 mb-4">
                  {[
                    '7 дней премиум-статуса',
                    'Эксклюзивный питомец ZeЛяве',
                    '1000 единиц игровой валюты',
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
                    >
                      <Star className="h-5 w-5 text-yellow-500 mr-2" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.button
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span>Присоединиться к Братству</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Индикаторы слайдера */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {games.map((game, index) => (
            <motion.button
              key={game.id}
              onClick={() => setActiveGameIndex(index)}
              className={`h-3 rounded-full mx-2 transition-all duration-500 ${
                activeGameIndex === index
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 w-8'
                  : 'bg-gray-600 hover:bg-gray-500 w-3'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Переключиться на ${game.title}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
