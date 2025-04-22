'use client';

import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Swords } from 'lucide-react';
import Link from 'next/link';
import { forwardRef } from 'react';

import { ClassGuide } from '../data';

type ClassGuidesSectionProps = {
  inView: boolean;
  guides: ClassGuide[];
};

// Цвета для типов гайдов
const guideTypeColors = {
  PvE: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  PvP: 'bg-red-500/20 text-red-400 border-red-500/30',
  Гибрид: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

// Цвета для уровней сложности
const levelColors = {
  Начальный: 'bg-green-500/20 text-green-400 border-green-500/30',
  Средний: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Продвинутый: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const ClassGuidesSection = forwardRef<HTMLElement, ClassGuidesSectionProps>(
  ({ inView, guides }, ref) => {
    if (!guides || guides.length === 0) {
      return (
        <section ref={ref} className="py-20 bg-gray-800/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-400">
                Информация о руководствах готовится
              </h2>
              <p className="mt-4 text-gray-500">Данные будут доступны в ближайшее время</p>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section ref={ref} className="py-20 bg-gray-800/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-indigo-500/20 h-14 w-14 rounded-full flex items-center justify-center">
                <BookOpen className="h-7 w-7 text-indigo-400" />
              </div>
            </div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Руководства и гайды
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Изучите наиболее эффективные стратегии игры за класс от опытных игроков
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.id}
                className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 group"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.2)' }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <div
                      className={`px-3 py-1 rounded-full text-xs border ${
                        guideTypeColors[guide.type]
                      }`}
                    >
                      {guide.type}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs border ${
                        levelColors[guide.level]
                      }`}
                    >
                      {guide.level}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>{guide.date}</span>
                    <div className="flex items-center">
                      <Swords className="h-3 w-3 mr-1" />
                      <span>Автор: {guide.author}</span>
                    </div>
                  </div>
                  <motion.h3 className="font-bold text-lg mb-3 group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
                    {guide.title}
                  </motion.h3>
                  <Link href={guide.url} passHref>
                    <motion.a
                      className="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium group"
                      whileHover={{ x: 5 }}
                    >
                      <span>Читать руководство</span>
                      <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.a>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/guides" passHref>
              <motion.a
                className="inline-flex items-center bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 font-medium py-3 px-6 rounded-lg transition-all duration-300"
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
              >
                Все руководства
                <ChevronRight className="h-5 w-5 ml-1" />
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }
);

ClassGuidesSection.displayName = 'ClassGuidesSection';

export default ClassGuidesSection;
