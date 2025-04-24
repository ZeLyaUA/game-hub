'use client';

import { Section, SectionHeader } from '@/components/ui/Section';
import { OdinClassInfo } from '@/data/games/odin/classes';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { forwardRef, useState } from 'react';

interface OdinClassesSectionProps {
  inView: boolean;
  classes: OdinClassInfo[];
}

const OdinClassesSection = forwardRef<HTMLElement, OdinClassesSectionProps>(
  ({ inView, classes }, ref) => {
    const [activeClassIndex, setActiveClassIndex] = useState<number>(0);

    // Получение цветов для отображения бейджей преимуществ/недостатков
    const advantageColors = [
      'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'bg-blue-500/20 text-blue-400 border-blue-500/30',
    ];

    const difficultyColors: Record<string, string> = {
      Легкий: 'bg-green-500/20 text-green-400 border-green-500/30',
      Средний: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Сложный: 'bg-red-500/20 text-red-400 border-red-500/30',
    };

    const roleColors: Record<string, string> = {
      Танк: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Урон: 'bg-red-500/20 text-red-400 border-red-500/30',
      Поддержка: 'bg-green-500/20 text-green-400 border-green-500/30',
      Контроль: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };

    return (
      <Section className="relative overflow-hidden bg-gray-800/50" ref={ref}>
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <SectionHeader
          title="Классы персонажей"
          description="Выберите свой путь в мире ODIN: Valhalla Rising с уникальными классами"
          withAnimation={inView}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Селектор классов */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
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
                    <img
                      src={classItem.icon}
                      width={50}
                      height={50}
                      alt={classItem.name}
                      className="rounded"
                    />
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
                      {classItem.advantages.slice(0, 3).map((advantage, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-0.5 rounded-full border ${
                            advantageColors[idx % advantageColors.length]
                          }`}
                        >
                          {advantage.length > 15 ? advantage.substring(0, 15) + '...' : advantage}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

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
                <img
                  src={classes[activeClassIndex].banner}
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
                    <span
                      className={`text-sm px-3 py-1 rounded-full border ${
                        difficultyColors[classes[activeClassIndex].difficulty]
                      }`}
                    >
                      {classes[activeClassIndex].difficulty}
                    </span>

                    {classes[activeClassIndex].roles.map((role, idx) => (
                      <span
                        key={idx}
                        className={`text-sm px-3 py-1 rounded-full border ${roleColors[role]}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{classes[activeClassIndex].description}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-indigo-400">Специализации:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {classes[activeClassIndex].specializations.map(spec => (
                      <div
                        key={spec.id}
                        className="bg-gray-700/50 border border-gray-600 rounded-lg p-4"
                      >
                        <h5 className="font-medium text-white mb-2">{spec.name}</h5>
                        <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                          {spec.description}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border inline-block ${
                            difficultyColors[spec.difficulty]
                          }`}
                        >
                          {spec.difficulty}
                        </span>
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
        </div>
      </Section>
    );
  }
);

OdinClassesSection.displayName = 'OdinClassesSection';

export default OdinClassesSection;
