'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Scroll, Sword, User } from 'lucide-react';
import { forwardRef, useState } from 'react';

// Данные о разделах базы данных
const databaseSections = [
  {
    id: 'equipment',
    title: 'Снаряжение',
    icon: <Sword className="h-6 w-6" />,
    subsections: ['Оружие', 'Броня', 'Украшения'],
  },
  {
    id: 'cosmetics',
    title: 'Косметика',
    icon: <User className="h-6 w-6" />,
    subsections: ['Аватар', 'Оружейный Аватар', 'Верховые животные'],
  },
  {
    id: 'skills',
    title: 'Умения',
    icon: <Scroll className="h-6 w-6" />,
    subsections: ['Навыки', 'Каталог коллекции', 'Предметы'],
  },
];

type OdinDatabaseSectionProps = {
  inView: boolean;
};

const OdinDatabaseSection = forwardRef<HTMLElement, OdinDatabaseSectionProps>(({ inView }, ref) => {
  const [activeDatabaseSection, setActiveDatabaseSection] = useState('equipment');

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-900/5 skew-y-3 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
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
            База данных
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Исчерпывающая информация о снаряжении, предметах и механиках игры
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Навигация по базе данных */}
            <div className="bg-gray-900/50 p-6 space-y-2">
              <h3 className="font-bold text-xl mb-4 text-white">Категории</h3>

              {databaseSections.map(section => (
                <motion.div
                  key={section.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center ${
                    activeDatabaseSection === section.id
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'hover:bg-gray-700/50 text-gray-300'
                  }`}
                  onClick={() => setActiveDatabaseSection(section.id)}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="mr-3">{section.icon}</div>
                  <span>{section.title}</span>
                </motion.div>
              ))}
            </div>

            {/* Подразделы выбранной категории */}
            <div className="md:col-span-2 p-6">
              <h3 className="font-bold text-xl mb-6 text-white">
                {databaseSections.find(s => s.id === activeDatabaseSection)?.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {databaseSections
                  .find(s => s.id === activeDatabaseSection)
                  ?.subsections.map((subsection, idx) => (
                    <motion.div
                      key={subsection}
                      className="bg-gray-700/50 hover:bg-gray-700/80 border border-gray-600 hover:border-indigo-500/50 rounded-lg p-4 cursor-pointer transition-all duration-300"
                      whileHover={{
                        y: -5,
                        boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.1)',
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                    >
                      <h4 className="font-medium text-white mb-2">{subsection}</h4>
                      <p className="text-sm text-gray-400 mb-3">
                        Подробная информация о всех {subsection.toLowerCase()} в игре
                      </p>
                      <motion.div
                        className="text-indigo-400 text-sm font-medium flex items-center group"
                        whileHover={{ x: 5 }}
                      >
                        <span>Открыть</span>
                        <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

OdinDatabaseSection.displayName = 'OdinDatabaseSection';

export default OdinDatabaseSection;
