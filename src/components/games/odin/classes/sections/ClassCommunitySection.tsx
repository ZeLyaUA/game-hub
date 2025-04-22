'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Trophy, Users } from 'lucide-react';
import { forwardRef } from 'react';

type ClassCommunitySectionProps = {
  inView: boolean;
  className: string;
};

const ClassCommunitySection = forwardRef<HTMLElement, ClassCommunitySectionProps>(
  ({ inView, className }, ref) => {
    return (
      <section
        ref={ref}
        className="py-20 px-4 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-indigo-500/20 h-14 w-14 rounded-full flex items-center justify-center">
                <Users className="h-7 w-7 text-indigo-400" />
              </div>
            </div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Сообщество {className.toLowerCase()}ов
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Присоединяйтесь к другим игрокам этого класса для обмена опытом и стратегиями
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  className="bg-gray-700/80 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-indigo-500/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Форум класса</h3>
                  <p className="text-gray-400 mb-4">
                    Обсуждайте билды, стратегии и тактики с опытными игроками
                  </p>
                  <motion.button
                    className="w-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 font-medium py-2 px-4 rounded-lg transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ y: 0 }}
                  >
                    Перейти на форум
                  </motion.button>
                </motion.div>

                <motion.div
                  className="bg-gray-700/80 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="bg-indigo-500/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Гильдии</h3>
                  <p className="text-gray-400 mb-4">
                    Найдите гильдию, в которой ценят ваш класс и игровой стиль
                  </p>
                  <motion.button
                    className="w-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 font-medium py-2 px-4 rounded-lg transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ y: 0 }}
                  >
                    Каталог гильдий
                  </motion.button>
                </motion.div>

                <motion.div
                  className="bg-gray-700/80 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="bg-indigo-500/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Турниры</h3>
                  <p className="text-gray-400 mb-4">
                    Участвуйте в соревнованиях и покажите свое мастерство
                  </p>
                  <motion.button
                    className="w-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 font-medium py-2 px-4 rounded-lg transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ y: 0 }}
                  >
                    Календарь турниров
                  </motion.button>
                </motion.div>
              </div>

              <motion.div
                className="mt-10 p-6 bg-indigo-900/20 border border-indigo-900/30 rounded-lg"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-center text-white">
                  Лучшие игроки класса {className}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name:
                        className === 'ВОИН'
                          ? 'IronViking'
                          : className === 'ЧАРОДЕЙКА'
                          ? 'ArcaneQueen'
                          : className === 'РАЗБОЙНИК'
                          ? 'ShadowBlade'
                          : 'LightBringer',
                      level: 60,
                      score: 32567,
                    },
                    {
                      name:
                        className === 'ВОИН'
                          ? 'AxeMaster'
                          : className === 'ЧАРОДЕЙКА'
                          ? 'ElementalWitch'
                          : className === 'РАЗБОЙНИК'
                          ? 'NightAssassin'
                          : 'HolyPriest',
                      level: 58,
                      score: 29854,
                    },
                    {
                      name:
                        className === 'ВОИН'
                          ? 'ShieldWall'
                          : className === 'ЧАРОДЕЙКА'
                          ? 'SpellWeaver'
                          : className === 'РАЗБОЙНИК'
                          ? 'SilentKiller'
                          : 'DivineHealer',
                      level: 57,
                      score: 28731,
                    },
                  ].map((player, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center">
                        <div className="bg-indigo-500/30 h-8 w-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-medium text-white">{player.name}</div>
                          <div className="text-xs text-gray-400">Уровень {player.level}</div>
                        </div>
                      </div>
                      <div className="text-indigo-400 font-medium">
                        {player.score.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center group relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)' }}
                  whileTap={{ y: 0, boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' }}
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span>Присоединиться к Discord-серверу</span>
                </motion.button>

                <p className="mt-4 text-gray-400">
                  Более 5000 активных игроков класса {className} онлайн
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ClassCommunitySection.displayName = 'ClassCommunitySection';

export default ClassCommunitySection;
