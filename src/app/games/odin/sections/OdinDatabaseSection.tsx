'use client';

import { Section, SectionHeader } from '@/components/ui/Section';
import { DatabaseSection } from '@/data/games/odin/database';
import { motion } from 'framer-motion';
import { ChevronRight, Database, FileText, Sword, User } from 'lucide-react';
import { forwardRef, useState } from 'react';

interface OdinDatabaseSectionProps {
  inView: boolean;
  databaseSections: DatabaseSection[];
}

const OdinDatabaseSection = forwardRef<HTMLElement, OdinDatabaseSectionProps>(
  ({ inView, databaseSections }, ref) => {
    const [activeDatabaseSection, setActiveDatabaseSection] = useState<string>(
      databaseSections[0]?.id || 'equipment'
    );

    // Функция для получения иконки по строковому идентификатору
    const getSectionIcon = (iconType: string) => {
      switch (iconType) {
        case 'sword':
          return <Sword className="h-6 w-6" />;
        case 'user':
          return <User className="h-6 w-6" />;
        case 'scroll':
          return <FileText className="h-6 w-6" />;
        default:
          return <Database className="h-6 w-6" />;
      }
    };

    const currentSection =
      databaseSections.find(s => s.id === activeDatabaseSection) || databaseSections[0];

    return (
      <Section className="relative overflow-hidden bg-gray-800/50" ref={ref}>
        <div className="absolute inset-0 bg-indigo-900/5 skew-y-3 z-0"></div>

        <SectionHeader
          title="База данных"
          description="Исчерпывающая информация о снаряжении, предметах и механиках игры"
          withAnimation={inView}
        />

        <motion.div
          className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Навигация по базе данных */}
            <div className="bg-gray-900/50 p-6 space-y-2">
              <h3 className="font-bold text-xl mb-4 text-white">Категории</h3>

              {databaseSections.map(section => (
                <motion.div
                  key={section.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center ${
                    activeDatabaseSection === section.id
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'hover:bg-gray-700/50 text-gray-300'
                  }`}
                  onClick={() => setActiveDatabaseSection(section.id)}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="mr-3">{getSectionIcon(section.iconType)}</div>
                  <span>{section.title}</span>
                </motion.div>
              ))}
            </div>

            {/* Подразделы выбранной категории */}
            <div className="md:col-span-2 p-6">
              <h3 className="font-bold text-xl mb-6 text-white">{currentSection?.title}</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentSection?.subsections.map((subsection, idx) => (
                  <motion.div
                    key={subsection.id}
                    className="bg-gray-700/50 hover:bg-gray-700/80 border border-gray-600 hover:border-indigo-500/50 rounded-lg p-4 cursor-pointer transition-all duration-300"
                    whileHover={{
                      y: -5,
                      boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.1)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                  >
                    <h4 className="font-medium text-white mb-2">{subsection.title}</h4>
                    <p className="text-sm text-gray-400 mb-3">{subsection.description}</p>
                    {subsection.itemCount && (
                      <span className="text-xs text-indigo-400 font-medium">
                        {subsection.itemCount} предметов
                      </span>
                    )}
                    <motion.div
                      className="text-indigo-400 text-sm font-medium flex items-center group mt-2"
                      whileHover={{ x: 5 }}
                    >
                      <span>Открыть</span>
                      <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>
    );
  }
);

OdinDatabaseSection.displayName = 'OdinDatabaseSection';

export default OdinDatabaseSection;
