'use client';

import { motion } from 'framer-motion';
import { ScanFace } from 'lucide-react';
import Image from 'next/image';
import { forwardRef, useState } from 'react';

import { ClassSpecialization } from '../data';

type ClassSpecializationsSectionProps = {
  inView: boolean;
  specializations: ClassSpecialization[];
};

// Цвета для сложности
const difficultyColors = {
  Легкий: 'bg-green-500/20 text-green-400 border-green-500/30',
  Средний: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Сложный: 'bg-red-500/20 text-red-400 border-red-500/30',
};

// Цвета для ролей
const roleColors = {
  Танк: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Боец: 'bg-red-500/20 text-red-400 border-red-500/30',
  Маг: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Поддержка: 'bg-green-500/20 text-green-400 border-green-500/30',
  Стрелок: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

const ClassSpecializationsSection = forwardRef<HTMLElement, ClassSpecializationsSectionProps>(
  ({ inView, specializations }, ref) => {
    const [activeSpecIndex, setActiveSpecIndex] = useState(0);

    if (!specializations || specializations.length === 0) {
      return (
        <section id="specializations" ref={ref} className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-400">
                Информация о специализациях готовится
              </h2>
              <p className="mt-4 text-gray-500">Данные будут доступны в ближайшее время</p>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section id="specializations" ref={ref} className="py-20 relative overflow-hidden">
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
                <ScanFace className="h-7 w-7 text-indigo-400" />
              </div>
            </div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Специализации
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Выберите путь развития вашего персонажа и освойте уникальные способности
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Селектор специализаций (боковая панель) */}
            <div className="lg:col-span-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {specializations.map((spec, index) => (
                <motion.div
                  key={spec.id}
                  className={`bg-gray-800/60 backdrop-blur-sm border ${
                    activeSpecIndex === index
                      ? 'border-indigo-500 shadow-lg shadow-indigo-500/10'
                      : 'border-gray-700 hover:border-indigo-500/50'
                  } rounded-xl p-4 cursor-pointer transition-all duration-300 flex-shrink-0 lg:flex-shrink lg:w-auto w-60`}
                  onClick={() => setActiveSpecIndex(index)}
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.1)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <h3
                    className={`font-bold text-xl mb-2 ${
                      activeSpecIndex === index ? 'text-indigo-400' : 'text-white'
                    }`}
                  >
                    {spec.name}
                  </h3>
                  <div className="flex gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        difficultyColors[spec.difficulty]
                      }`}
                    >
                      {spec.difficulty}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${roleColors[spec.role]}`}
                    >
                      {spec.role}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Детальная информация о специализации */}
            <motion.div
              className="lg:col-span-4 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              key={specializations[activeSpecIndex].id}
            >
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Изображение специализации */}
                <div className="md:w-2/5 h-[300px] md:h-auto rounded-xl overflow-hidden relative">
                  <Image
                    src={specializations[activeSpecIndex].image}
                    alt={specializations[activeSpecIndex].name}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>

                {/* Описание специализации */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {specializations[activeSpecIndex].name}
                    </h3>
                    <span
                      className={`text-sm px-3 py-1 rounded-full border ${
                        difficultyColors[specializations[activeSpecIndex].difficulty]
                      }`}
                    >
                      Сложность: {specializations[activeSpecIndex].difficulty}
                    </span>
                    <span
                      className={`text-sm px-3 py-1 rounded-full border ${
                        roleColors[specializations[activeSpecIndex].role]
                      }`}
                    >
                      Роль: {specializations[activeSpecIndex].role}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6 text-lg">
                    {specializations[activeSpecIndex].description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-indigo-400">Стиль игры:</h4>
                    <p className="text-gray-300">{specializations[activeSpecIndex].playstyle}</p>
                  </div>

                  <motion.button
                    className="bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 font-medium py-2 px-6 rounded-lg transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ y: 0 }}
                  >
                    Узнать о способностях
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
);

ClassSpecializationsSection.displayName = 'ClassSpecializationsSection';

export default ClassSpecializationsSection;
