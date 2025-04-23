'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { forwardRef } from 'react';

type OdinHeroSectionProps = {
  inView: boolean;
};

const OdinHeroSection = forwardRef<HTMLElement, OdinHeroSectionProps>(({ inView }, ref) => {
  return (
    <motion.section
      ref={ref}
      className="relative h-[80vh] flex items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gray-900"
          style={{
            backgroundImage: `url('/banner/1200x600/banner-odin.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <motion.div
              className="inline-block mb-3 bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-sm font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              MMORPG с открытым миром
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              ODIN: Valhalla Rising
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Погрузитесь в эпический мир, вдохновленный скандинавской мифологией, с невероятной
              графикой и захватывающими сражениями
            </motion.p>
          </div>

          <motion.div
            className="mt-6 flex items-center bg-indigo-500/10 p-3 rounded-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="mr-3 bg-indigo-500/20 p-2 rounded-full">
              <Award className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-indigo-300 font-medium">Обновление: Огненные земли</p>
              <p className="text-sm text-gray-400">Новая зона, босс и комплекты экипировки</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
});

OdinHeroSection.displayName = 'OdinHeroSection';

export default OdinHeroSection;
