'use client';

import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import { forwardRef } from 'react';

type OdinDownloadSectionProps = {
  inView: boolean;
};

const OdinDownloadSection = forwardRef<HTMLElement, OdinDownloadSectionProps>(({ inView }, ref) => {
  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-8 rounded-xl border border-indigo-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl"></div>

          <div className="md:w-2/3 mb-6 md:mb-0 relative z-10">
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              Готовы начать приключение?
            </motion.h2>
            <motion.p
              className="text-gray-300"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Скачайте клиент игры и присоединяйтесь к тысячам игроков в мире ODIN: Valhalla Rising
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
              whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ y: 0, boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' }}
            >
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
              <Gamepad2 className="h-5 w-5 mr-2" />
              <span>Скачать для Windows</span>
            </motion.button>

            <motion.button
              className="bg-gray-700/70 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
              whileHover={{ y: -5 }}
              whileTap={{ y: 0 }}
            >
              Системные требования
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

OdinDownloadSection.displayName = 'OdinDownloadSection';

export default OdinDownloadSection;
