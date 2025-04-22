'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { forwardRef } from 'react';

// Новости игры
const gameNews = [
  {
    id: 1,
    title: 'Огненные земли: обзор новой зоны',
    date: '21 апреля 2025',
    image: '/api/placeholder/400/200',
    excerpt: 'Подробное руководство по исследованию новой зоны Огненные земли и скрытым секретам.',
    type: 'guide',
  },
  {
    id: 2,
    title: 'Обновление 2.5: Путь Валькирии',
    date: '19 апреля 2025',
    image: '/api/placeholder/400/200',
    excerpt: 'Детали нового крупного обновления, которое добавит новый класс, зону и рейд.',
    type: 'news',
  },
  {
    id: 3,
    title: 'Гайд: Лучший билд берсерка',
    date: '17 апреля 2025',
    image: '/api/placeholder/400/200',
    excerpt:
      'Оптимальное распределение характеристик, навыков и экипировки для берсерка в PvP и PvE.',
    type: 'guide',
  },
];

type OdinNewsSectionProps = {
  inView: boolean;
};

const OdinNewsSection = forwardRef<HTMLElement, OdinNewsSectionProps>(({ inView }, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 bg-gray-800/50 relative overflow-hidden">
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
            Новости и гайды ODIN
          </h2>
          <motion.a
            href="#"
            className="flex items-center text-indigo-400 hover:text-indigo-300 font-medium group"
            whileHover={{ x: 5 }}
          >
            <span>Все публикации</span>
            <ChevronRight className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>

        <motion.div
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
          {gameNews.map(item => (
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
                  {item.type === 'guide' ? 'Гайд' : 'Новость'}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>

              <div className="p-5">
                <div className="text-xs text-gray-400 mb-2">{item.date}</div>
                <motion.h3 className="font-bold text-lg mb-3 group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
                  {item.title}
                </motion.h3>
                <p className="text-gray-400 text-sm mb-4">{item.excerpt}</p>
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
});

OdinNewsSection.displayName = 'OdinNewsSection';

export default OdinNewsSection;
