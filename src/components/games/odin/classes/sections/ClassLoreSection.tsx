'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { forwardRef } from 'react';

import { ClassInfo } from '../data';

type ClassLoreSectionProps = {
  inView: boolean;
  classInfo: ClassInfo;
};

const ClassLoreSection = forwardRef<HTMLElement, ClassLoreSectionProps>(
  ({ inView, classInfo }, ref) => {
    return (
      <section ref={ref} className="py-20 bg-gray-800/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="bg-indigo-500/20 h-14 w-14 rounded-full flex items-center justify-center">
                <BookOpen className="h-7 w-7 text-indigo-400" />
              </div>
            </div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              История {classInfo.name.toLowerCase()}а
            </motion.h2>

            <motion.div
              className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="text-gray-300 text-lg leading-relaxed space-y-4"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {classInfo.lore.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </motion.div>

              <motion.div
                className="mt-8 p-4 bg-indigo-900/20 border border-indigo-900/30 rounded-lg"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-indigo-300 italic">
                  <span className="font-semibold">&quot;</span>
                  {classInfo.name === 'ВОИН'
                    ? 'Сила воина не в его оружии, а в его решимости. Даже самая острая сталь бесполезна в руках колеблющегося.'
                    : classInfo.name === 'ЧАРОДЕЙКА'
                    ? 'Истинная магия — это не просто знание заклинаний, это понимание того, как тонкая нить реальности может быть переплетена заново.'
                    : classInfo.name === 'РАЗБОЙНИК'
                    ? 'В тени кроется не только опасность, но и возможность. Мудрый разбойник знает, когда оставаться незамеченным, а когда нанести решающий удар.'
                    : 'Свет исцеления доступен не каждому. Только те, чьи сердца чисты, могут направлять божественную энергию, не сгорая в её сиянии.'}
                  <span className="font-semibold">&quot;</span>
                </p>
                <p className="text-right text-indigo-300/70 mt-2 text-sm">
                  —{' '}
                  {classInfo.name === 'ВОИН'
                    ? 'Торгрим Железный Кулак, наставник воинов'
                    : classInfo.name === 'ЧАРОДЕЙКА'
                    ? 'Лириэль, архимаг ордена Эмблазон'
                    : classInfo.name === 'РАЗБОЙНИК'
                    ? 'Ниро Тихий Клинок, мастер-ассасин'
                    : 'Верховная жрица Аурелия'}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }
);

ClassLoreSection.displayName = 'ClassLoreSection';

export default ClassLoreSection;
