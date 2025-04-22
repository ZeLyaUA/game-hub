'use client';

import { motion } from 'framer-motion';
import { ArrowRightLeft, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import { forwardRef } from 'react';

import { ClassGear } from '../data';

type ClassGearSectionProps = {
  inView: boolean;
  gear: ClassGear[];
};

// Цвета для редкости снаряжения
const rarityColors = {
  Обычный: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  Редкий: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Эпический: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Легендарный: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

// Цвета для типа снаряжения
const gearTypeColors = {
  Оружие: 'bg-red-500/20 text-red-400 border-red-500/30',
  Броня: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Аксессуар: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const ClassGearSection = forwardRef<HTMLElement, ClassGearSectionProps>(({ inView, gear }, ref) => {
  if (!gear || gear.length === 0) {
    return (
      <section ref={ref} className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-400">Информация о снаряжении готовится</h2>
            <p className="mt-4 text-gray-500">Данные будут доступны в ближайшее время</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-900/5 skew-y-3 z-0"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-indigo-500/20 h-14 w-14 rounded-full flex items-center justify-center">
              <ShieldAlert className="h-7 w-7 text-indigo-400" />
            </div>
          </div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Рекомендуемое снаряжение
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Соберите лучшую экипировку для максимальной эффективности вашего персонажа
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gear.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.2)' }}
            >
              <div className="h-64 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-gray-900/70 to-transparent">
                  <span
                    className={`px-3 py-1 rounded-full text-xs border ${gearTypeColors[item.type]}`}
                  >
                    {item.type}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs border ${rarityColors[item.rarity]}`}
                  >
                    {item.rarity}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-20"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                  {item.name}
                </h3>

                <div className="mt-4 space-y-2">
                  {item.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex items-center">
                      <ArrowRightLeft className="h-4 w-4 text-indigo-400 mr-2" />
                      <span className="text-gray-300">{stat}</span>
                    </div>
                  ))}
                </div>

                <motion.div className="mt-6 text-center" whileHover={{ scale: 1.05 }}>
                  <button className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors duration-300">
                    Подробнее о предмете
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
            Открыть полный каталог снаряжения
          </button>
        </motion.div>
      </div>
    </section>
  );
});

ClassGearSection.displayName = 'ClassGearSection';

export default ClassGearSection;
