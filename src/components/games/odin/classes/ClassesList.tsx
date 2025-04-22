'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Coffee, Shield, Users2, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import { ClassInfo } from './data';

type ClassesListProps = {
  classes: ClassInfo[];
};

// Цвета для сложности
const difficultyColors = {
  Легкий: 'bg-green-500/20 text-green-400 border-green-500/30',
  Средний: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Сложный: 'bg-red-500/20 text-red-400 border-red-500/30',
};

// Иконки для ролей
const roleIcons = {
  Танк: <Shield className="h-4 w-4" />,
  Урон: <Zap className="h-4 w-4" />,
  Поддержка: <Coffee className="h-4 w-4" />,
  Контроль: <Users2 className="h-4 w-4" />,
};

export default function ClassesList({ classes }: ClassesListProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="pt-16 bg-gray-900 min-h-screen">
      {/* Героическая секция */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-gray-900"
            style={{
              backgroundImage: `url('/api/placeholder/1920/1080')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Классы ODIN: Valhalla Rising
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Выберите свой путь в эпическом мире ODIN: Valhalla Rising. Каждый класс предлагает
              уникальный игровой опыт с собственными способностями, специализациями и ролями.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Список классов */}
      <section ref={ref} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/5 skew-y-3 z-0"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 gap-12">
            {classes.map((classInfo, index) => (
              <motion.div
                key={classInfo.id}
                className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10, boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.2)' }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                    <Image
                      src={classInfo.banner}
                      alt={classInfo.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900 hidden md:block"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent md:hidden"></div>
                  </div>

                  <div className="p-6 md:p-8 flex-1 md:pl-0">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 mr-4">
                        <Image
                          src={classInfo.icon}
                          width={60}
                          height={60}
                          alt={classInfo.name}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                          {classInfo.name}
                        </h2>

                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`text-xs px-3 py-1 rounded-full border ${
                              difficultyColors[classInfo.difficulty]
                            }`}
                          >
                            Сложность: {classInfo.difficulty}
                          </span>

                          {classInfo.roles.map((role, roleIndex) => (
                            <span
                              key={roleIndex}
                              className="text-xs px-3 py-1 rounded-full border bg-gray-700/50 text-gray-300 border-gray-600 flex items-center"
                            >
                              <span className="mr-1">{roleIcons[role]}</span>
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 line-clamp-3">{classInfo.description}</p>

                    <div className="mb-6">
                      <h3 className="text-sm uppercase text-gray-500 mb-2">Специализации:</h3>
                      <div className="flex flex-wrap gap-2">
                        {classInfo.specializations.length > 0 ? (
                          classInfo.specializations.map((spec, specIndex) => (
                            <span
                              key={specIndex}
                              className="text-sm px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400"
                            >
                              {spec.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500 italic">Информация готовится</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm uppercase text-gray-500 mb-2">
                          Основные преимущества:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {classInfo.advantages.slice(0, 3).map((advantage, advIndex) => (
                            <span
                              key={advIndex}
                              className="text-sm px-3 py-1 rounded-lg bg-green-500/10 text-green-400"
                            >
                              {advantage}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link href={`/games/odin/classes/${classInfo.slug}`} passHref>
                        <motion.a
                          className="bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center"
                          whileHover={{ x: 5 }}
                        >
                          <span>Подробнее</span>
                          <ChevronRight className="h-5 w-5 ml-1" />
                        </motion.a>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция с дополнительной информацией */}
      <section className="py-20 bg-gray-800/30 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Выбор класса имеет значение
            </h2>
            <p className="text-gray-300 mb-8">
              Ваш выбор класса определит не только ваш игровой стиль, но и роль в группе, доступ к
              определенным заданиям и многое другое. Изучите каждый класс подробно, прежде чем
              сделать выбор.
            </p>
            <Link href="/games/odin" passHref>
              <motion.a
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center"
                whileHover={{ y: -5 }}
                whileTap={{ y: 0 }}
              >
                Вернуться к игре
              </motion.a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
