'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const news = [
  {
    id: 1,
    title: 'Анонс нового обновления для ODIN: Valhalla Rising',
    date: '20 апреля 2025',
    image: '/banner/1200x600/banner-odin.png',
    excerpt:
      'Разработчики анонсировали крупное обновление, которое добавит новую зону "Огненные земли" и рейдового босса.',
    readTime: '4 мин',
    category: 'Новости',
  },
  {
    id: 2,
    title: 'Гайд: Лучшие сборки для берсерка в ODIN',
    date: '18 апреля 2025',
    image: '/banner/1200x600/banner-tl.jpg',
    excerpt:
      'Подробный разбор оптимальных билдов берсерка для PvP и PvE контента после последнего патча.',
    readTime: '8 мин',
    category: 'Гайды',
  },
  {
    id: 3,
    title: 'Турнир по ODIN с призовым фондом $10,000',
    date: '15 апреля 2025',
    image: '/banner/1200x600/banner-lostark.jpg',
    excerpt: 'Официальный турнир по PvP 3x3 стартует в следующем месяце. Регистрация уже открыта!',
    readTime: '3 мин',
    category: 'Киберспорт',
  },
];

export default function NewsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4 bg-gray-800 relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-indigo-900/10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/10 blur-3xl rounded-full"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="flex justify-between items-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Последние новости
          </h2>
          <motion.a
            href="#"
            className="flex items-center text-indigo-400 hover:text-indigo-300 font-medium group"
            whileHover={{ x: 5 }}
          >
            <span>Все новости</span>
            <ChevronRight className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
          {news.map(item => (
            <motion.div
              key={item.id}
              className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 group"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, type: 'spring' },
                },
              }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.2)' }}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute top-3 left-3 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>

              <div className="p-5">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>{item.date}</span>
                  <span>{item.readTime}</span>
                </div>
                <motion.h3 className="font-bold text-lg mb-3 group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
                  {item.title}
                </motion.h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                <motion.a
                  href="#"
                  className="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium group"
                  whileHover={{ x: 5 }}
                >
                  <span>Читать далее</span>
                  <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
