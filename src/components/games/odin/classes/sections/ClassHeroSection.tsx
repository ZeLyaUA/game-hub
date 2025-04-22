'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';

import {
  advantageColors,
  difficultyColors,
  disadvantageColors,
  roleColors,
} from '@/utils/colorMapping';
import { ClassInfo } from '../data';

type ClassHeroSectionProps = {
  inView: boolean;
  classInfo: ClassInfo;
};

const ClassHeroSection = forwardRef<HTMLElement, ClassHeroSectionProps>(
  ({ inView, classInfo }, ref) => {
    return (
      <motion.section
        ref={ref}
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Фоновое изображение */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-gray-900"
            style={{
              backgroundImage: `url('${classInfo.heroBanner}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-24">
          <div className="mb-10">
            <Link
              href="/games/odin"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Назад к классам</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <motion.div
              className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700 flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 mr-6 p-2 rounded-xl bg-gray-700/50 border border-gray-600">
                  <Image
                    src={classInfo.icon}
                    width={80}
                    height={80}
                    alt={classInfo.name}
                    className="rounded"
                  />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {classInfo.name}
                  </h1>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <span
                      className={`text-sm px-3 py-1 rounded-full border ${
                        difficultyColors[classInfo.difficulty]
                      }`}
                    >
                      Сложность: {classInfo.difficulty}
                    </span>

                    {classInfo.roles.map((role, index) => (
                      <span
                        key={index}
                        className={`text-sm px-3 py-1 rounded-full border ${roleColors[role]}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">{classInfo.description}</p>

              {/* Сильные и слабые стороны */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="flex items-center text-lg font-semibold mb-3 text-green-400">
                    <Zap className="h-5 w-5 mr-2" />
                    Сильные стороны
                  </h3>
                  <div className="space-y-2">
                    {classInfo.advantages.map((advantage, idx) => (
                      <motion.div
                        key={idx}
                        className={`px-3 py-2 rounded-lg border ${
                          advantageColors[idx % advantageColors.length]
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      >
                        {advantage}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center text-lg font-semibold mb-3 text-red-400">
                    <Shield className="h-5 w-5 mr-2" />
                    Слабые стороны
                  </h3>
                  <div className="space-y-2">
                    {classInfo.disadvantages.map((disadvantage, idx) => (
                      <motion.div
                        key={idx}
                        className={`px-3 py-2 rounded-lg border ${
                          disadvantageColors[idx % disadvantageColors.length]
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      >
                        {disadvantage}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between flex-wrap gap-4 mt-8">
                <motion.button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)' }}
                  whileTap={{ y: 0, boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' }}
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                  <span>Создать персонажа</span>
                </motion.button>

                <motion.a
                  href="#specializations"
                  className="bg-gray-700/70 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                  whileHover={{ y: -5 }}
                  whileTap={{ y: 0 }}
                >
                  <span>Узнать о специализациях</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/3 hidden md:block"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
                <Image
                  src={classInfo.banner}
                  alt={classInfo.name}
                  fill
                  className="object-cover rounded-xl border border-gray-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  }
);

ClassHeroSection.displayName = 'ClassHeroSection';

export default ClassHeroSection;
