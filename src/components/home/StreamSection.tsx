'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Play, Twitch, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const StreamSection = () => {
  const [activeTab, setActiveTab] = useState('twitch');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: 'spring', stiffness: 100 },
    },
  };

  // Данные по последним трансляциям и видео
  const twitchStreams = [
    {
      id: 1,
      title: 'ODIN: Valhalla Rising - Рейд на босса "Огненный колосс"',
      thumbnail: '/banner/1200x600/banner-odin.png',
      date: '20 апреля 2025',
      viewers: 1248,
      duration: '3ч 25мин',
    },
    {
      id: 2,
      title: 'Throne and Liberty - Изучаем новую систему трансформации',
      thumbnail: '/banner/1200x600/banner-tl.jpg',
      date: '18 апреля 2025',
      viewers: 952,
      duration: '2ч 10мин',
    },
    {
      id: 3,
      title: 'Lost Ark - Гайд по новому классу "Иллюзионист"',
      thumbnail: '/banner/1200x600/banner-lostark.jpg',
      date: '15 апреля 2025',
      viewers: 1576,
      duration: '4ч 05мин',
    },
  ];

  const youtubeVideos = [
    {
      id: 1,
      title: 'Полный гайд по классу Берсерк в ODIN: Valhalla Rising (2025)',
      thumbnail: '/banner/1200x600/banner-odin.png',
      date: '19 апреля 2025',
      views: 24853,
      duration: '18:42',
    },
    {
      id: 2,
      title: 'ТОП-5 способов фарма золота в Throne and Liberty',
      thumbnail: '/banner/1200x600/banner-odin.png',
      date: '16 апреля 2025',
      views: 19684,
      duration: '12:37',
    },
    {
      id: 3,
      title: 'Обзор нового обновления Lost Ark - Все, что нужно знать!',
      thumbnail: '/banner/1200x600/banner-odin.png',
      date: '12 апреля 2025',
      views: 31265,
      duration: '22:15',
    },
  ];

  const formatNumber = (num: number | bigint) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gray-900">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-purple-900/10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-purple-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-600/10 blur-3xl rounded-full"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Прямые трансляции и видео
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Присоединяйтесь к ZeЛяве Братству на стриминговых платформах, где мы делимся опытом,
            проходим сложный контент и обсуждаем новости мира онлайн-игр
          </motion.p>

          {/* Табы */}
          <div className="flex justify-center mt-8 mb-12">
            <div className="bg-gray-800 p-1 rounded-lg inline-flex">
              <motion.button
                className={`px-6 py-2 rounded-md font-medium flex items-center ${
                  activeTab === 'twitch'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveTab('twitch')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Twitch className="h-5 w-5 mr-2" />
                Twitch
              </motion.button>
              <motion.button
                className={`px-6 py-2 rounded-md font-medium flex items-center ${
                  activeTab === 'youtube'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveTab('youtube')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Youtube className="h-5 w-5 mr-2" />
                YouTube
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {activeTab === 'twitch' &&
            twitchStreams.map(stream => (
              <motion.div
                key={stream.id}
                className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="w-full h-48 relative">
                  <Image
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="object-cover"
                    fill
                    sizes="h-48 w-full"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <motion.div
                      className="h-16 w-16 rounded-full bg-indigo-600/80 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Play className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded font-medium flex items-center">
                    <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse"></div>
                    LIVE
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {stream.duration}
                  </div>
                </div>

                <div className="p-4 h-full">
                  <div className="flex items-center text-xs text-gray-400 mb-2">
                    <Twitch className="h-4 w-4 text-purple-500 mr-1" />
                    <span>{stream.date}</span>
                    <span className="mx-2">•</span>
                    <span>{formatNumber(stream.viewers)} зрителей</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
                    {stream.title}
                  </h3>
                  <motion.button
                    className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium group"
                    whileHover={{ x: 5 }}
                  >
                    <span>Смотреть трансляцию</span>
                    <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            ))}

          {activeTab === 'youtube' &&
            youtubeVideos.map(video => (
              <motion.div
                key={video.id}
                className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="w-full h-48 relative">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    className="object-cover"
                    fill={true}
                    sizes="h-48 w-full"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <motion.div
                      className="h-16 w-16 rounded-full bg-red-600/80 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Play className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-400 mb-2">
                    <Youtube className="h-4 w-4 text-red-500 mr-1" />
                    <span>{video.date}</span>
                    <span className="mx-2">•</span>
                    <span>{formatNumber(video.views)} просмотров</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
                    {video.title}
                  </h3>
                  <motion.button
                    className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium group"
                    whileHover={{ x: 5 }}
                  >
                    <span>Смотреть видео</span>
                    <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Кнопка "Подписаться" */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.a
            href={
              activeTab === 'twitch' ? 'https://twitch.tv/@ZeLya' : 'https://youtube.com/@ZeLya'
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`py-3 px-8 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
              activeTab === 'twitch'
                ? 'bg-purple-600 hover:bg-purple-500 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white'
            }`}
            whileHover={{
              y: -5,
              boxShadow: `0 10px 15px -3px ${
                activeTab === 'twitch' ? 'rgba(147, 51, 234, 0.4)' : 'rgba(239, 68, 68, 0.4)'
              }`,
            }}
            whileTap={{ y: 0, boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' }}
          >
            {activeTab === 'twitch' ? (
              <>
                <Twitch className="h-5 w-5 mr-2" />
                <span>Подписаться на Twitch</span>
              </>
            ) : (
              <>
                <Youtube className="h-5 w-5 mr-2" />
                <span>Подписаться на YouTube</span>
              </>
            )}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default StreamSection;
