'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useState } from 'react';

// Данные о классах с преимуществами в виде массива
const classes = [
  {
    id: 1,
    slug: 'warrior',
    name: 'ВОИН',
    icon: '/classes/warrior-icon.webp',
    banner: '/classes/Warrior02_1080x1080.png',
    branches: ['Берсерк', 'Рыцарь'],
    description:
      'Класс, который защищает союзников и контролирует поле боя. Развивается в специализированную профессию, такую как оборонительно-ориентированный танк, универсальный танк с наступательными и оборонительными возможностями, и другие.',
    advantages: ['Ближний бой', ' Защита', 'Выживание'],
  },
  {
    id: 2,
    slug: 'sorceress',
    name: 'ЧАРОДЕЙКА',
    icon: '/classes/sorceress-icon.webp',
    banner: '/classes/Sorceress02_1080x1080.png',
    branches: ['Архимаг', 'Ведьма'],
    description:
      'Класс, который наносит огромный урон нескольким противникам, используя разнообразные заклинания. Развивается в специализированную профессию, сосредоточенную на одном из различных типов заклинаний, таких как взрывной урон, контроль толпы, призыв существ и многое другое.',
    advantages: ['Магия', 'АОЕ', 'Контроль толпы'],
  },
  {
    id: 3,
    slug: 'rogue',
    name: 'РАЗБОЙНИК',
    icon: '/classes/rogue-icon.webp',
    banner: '/classes/Rogue02_1080x1080.png',
    branches: ['Лучник', 'Убийца'],
    description:
      'Класс, который наносит огромный урон мощными физическими атаками. Развивается в специализированную профессию, сосредоточенную на дальних атаках или ближнем бою.',
    advantages: ['Одиночная цель', 'Нападение', 'Уклонение'],
  },
  {
    id: 4,
    slug: 'priest',
    name: 'ЖРЕЦ',
    icon: '/classes/priest-icon.webp',
    banner: '/classes/priest.png',
    branches: ['Епископ', 'Паладин'],
    description:
      'Класс, который лечит союзников и помогает выживать. Развивается в специализированную профессию, такую как специалист, сосредоточенный на исцелении, универсальный защитный танк, и другие.',
    advantages: ['Усиления', 'Исцеление', 'Защита'],
  },
];

// Цвета для бейджей преимуществ
const advantageColors = [
  'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'bg-green-500/20 text-green-400 border-green-500/30',
  'bg-red-500/20 text-red-400 border-red-500/30',
];

type OdinClassesSectionProps = {
  inView: boolean;
};

const OdinClassesSection = forwardRef<HTMLElement, OdinClassesSectionProps>(({ inView }, ref) => {
  const [activeClassIndex, setActiveClassIndex] = useState(0);

  return (
    <section ref={ref} className="py-20 bg-gray-800/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
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
            Классы персонажей
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Выберите свой путь в мире ODIN: Valhalla Rising с четырьмя уникальными классами, каждый
            из которых имеет две специализации
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Селектор классов */}
          <div className="space-y-4">
            {classes.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                className={`bg-gray-700/80 backdrop-blur-sm border ${
                  activeClassIndex === index
                    ? 'border-indigo-500 shadow-lg shadow-indigo-500/10'
                    : 'border-gray-600 hover:border-indigo-500/50'
                } rounded-xl p-4 cursor-pointer transition-all duration-300`}
                onClick={() => setActiveClassIndex(index)}
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.1)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center mr-4">
                    <Image src={classItem.icon} width={50} height={50} alt={classItem.name} />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-lg ${
                        activeClassIndex === index ? 'text-indigo-400' : 'text-white'
                      }`}
                    >
                      {classItem.name}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {classItem.advantages.map((advantage, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-0.5 rounded-full border ${
                            advantageColors[idx % advantageColors.length]
                          }`}
                        >
                          {advantage}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Детальная информация о классе */}
          <motion.div
            className="lg:col-span-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            key={classes[activeClassIndex].id}
          >
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-64 h-64 rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src={classes[activeClassIndex].banner}
                  width={300}
                  height={300}
                  alt={classes[activeClassIndex].name}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {classes[activeClassIndex].name}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {classes[activeClassIndex].advantages.map((advantage, idx) => (
                      <motion.span
                        key={idx}
                        className={`text-sm px-3 py-1 rounded-full border ${
                          advantageColors[idx % advantageColors.length]
                        }`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 * idx }}
                      >
                        {advantage}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{classes[activeClassIndex].description}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-indigo-400">Специализации:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {classes[activeClassIndex].branches.map((branch, idx) => (
                      <div
                        key={branch}
                        className="bg-gray-700/50 border border-gray-600 rounded-lg p-4"
                      >
                        <h5 className="font-medium text-white mb-2">{branch}</h5>
                        <p className="text-sm text-gray-400">
                          {idx === 0
                            ? 'Специализация на нанесении максимального урона и агрессивном стиле игры'
                            : 'Специализация на выживаемости и поддержке команды'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={`/games/odin/classes/${classes[activeClassIndex].slug}`}>
                  <motion.button
                    className="bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    <span>Подробнее о классе</span>
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

OdinClassesSection.displayName = 'OdinClassesSection';

export default OdinClassesSection;
