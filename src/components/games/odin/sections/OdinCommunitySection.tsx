'use client';

import { motion } from 'framer-motion';
import { Award, Sword, User } from 'lucide-react';
import { forwardRef } from 'react';

import { formatNumber } from '@/utils/format';

type OdinCommunitySectionProps = {
  inView: boolean;
};

const OdinCommunitySection = forwardRef<HTMLElement, OdinCommunitySectionProps>(
  ({ inView }, ref) => {
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
          <div className="max-w-4xl mx-auto bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7 }}
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Присоединяйтесь к сообществу
                </motion.h2>
                <motion.p
                  className="text-gray-300 mx-auto text-lg"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Станьте частью растущего сообщества игроков ODIN
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  className="bg-gray-700/80 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-indigo-500/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Игровые чаты</h3>
                  <p className="text-gray-400 mb-4">Общайтесь с другими игроками в нашем Discord</p>
                  <motion.button
                    className="w-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 font-medium py-2 px-4 rounded-lg transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ y: 0 }}
                  >
                    Присоединиться
                  </motion.button>
                </motion.div>

                <motion.div
                  className="bg-gray-700/80 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="bg-indigo-500/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sword className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Поиск гильдии</h3>
                  <p className="text-gray-400 mb-4">Найдите гильдию или создайте свою</p>
                  <motion.button
                    className="w-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 font-medium py-2 px-4 rounded-lg transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ y: 0 }}
                  >
                    Найти гильдию
                  </motion.button>
                </motion.div>

                <motion.div
                  className="bg-gray-700/80 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="bg-indigo-500/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Турниры</h3>
                  <p className="text-gray-400 mb-4">Участвуйте в PvP соревнованиях и турнирах</p>
                  <motion.button
                    className="w-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 font-medium py-2 px-4 rounded-lg transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ y: 0 }}
                  >
                    Расписание турниров
                  </motion.button>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <p className="text-gray-400 mb-4">
                  Приглашайте друзей и получайте уникальные награды в игре
                </p>
                <motion.button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center group relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)' }}
                  whileTap={{ y: 0, boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' }}
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span>Пригласить друзей</span>
                </motion.button>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-white/70 text-lg">Более {formatNumber(250000)} игроков уже в игре</p>
            <div className="flex justify-center space-x-4 mt-4">
              <motion.a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Официальный сайт
              </motion.a>
              <span className="text-gray-600">•</span>
              <motion.a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Поддержка
              </motion.a>
              <span className="text-gray-600">•</span>
              <motion.a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Скачать
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }
);

OdinCommunitySection.displayName = 'OdinCommunitySection';

export default OdinCommunitySection;
