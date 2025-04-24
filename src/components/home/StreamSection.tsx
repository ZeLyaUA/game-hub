'use client';

import { motion } from 'framer-motion';

const StreamSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gray-900">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-purple-900/10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/3 bg-purple-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-600/10 blur-3xl rounded-full"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
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
            Прямые трансляции и видео
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Присоединяйтесь к ZeЛяве Братству на стриминговых платформах, где мы делимся опытом,
            проходим сложный контент и обсуждаем новости мира онлайн-игр
          </motion.p>

          <div className="min-h-[300px] flex justify-center items-center">
            <p className="text-gray-400">Раздел находится в разработке</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StreamSection;
