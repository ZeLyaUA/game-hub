'use client';

import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { skillTypeColors } from '@/utils/colorMapping';

// Типы для навыков
type SkillType =
  | 'Атакующий'
  | 'Защитный'
  | 'Поддержка'
  | 'Контроль'
  | 'Движение'
  | 'Усиление'
  | 'Пассивный';

type Skill = {
  id: string;
  name: string;
  description: string;
  cooldown?: string;
  type: SkillType;
  image: string;
  isPassive?: boolean; // Сделаем это свойство опциональным
};

type ClassSkillsProps = {
  skills: Skill[];
};

const ClassSkills: React.FC<ClassSkillsProps> = ({ skills }) => {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(
    skills.find(skill => !skill?.isPassive) || null
  );

  // Разделяем на активные и пассивные навыки
  const activeSkills = skills.filter(skill => !skill?.isPassive);
  const passiveSkills = skills.filter(skill => skill?.isPassive);

  // Функция для получения цвета на основе типа навыка
  const getColorClass = (type: SkillType): string => {
    return skillTypeColors[type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div>
      {/* Активные навыки */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-3 text-gray-300">Активные навыки</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {activeSkills.map(skill => (
            <motion.div
              key={skill.id}
              className={`cursor-pointer relative group ${
                activeSkill?.id === skill.id
                  ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-gray-800'
                  : ''
              }`}
              onClick={() => setActiveSkill(skill)}
              whileHover={{ y: -5 }}
              whileTap={{ y: 0 }}
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-700 group-hover:border-indigo-500 transition-all duration-300">
                <Image
                  src={skill.image}
                  alt={skill.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-gray-900/80 text-xs px-2 py-0.5 rounded">
                {skill.cooldown}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Пассивные навыки */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-3 text-gray-300">Пассивные навыки</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {passiveSkills.map(skill => (
            <motion.div
              key={skill.id}
              className={`cursor-pointer relative group ${
                activeSkill?.id === skill.id
                  ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-gray-800'
                  : ''
              }`}
              onClick={() => setActiveSkill(skill)}
              whileHover={{ y: -5 }}
              whileTap={{ y: 0 }}
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-700 group-hover:border-indigo-500 transition-all duration-300">
                <Image
                  src={skill.image}
                  alt={skill.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-indigo-900/30 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-indigo-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Детальная информация о выбранном навыке */}
      {activeSkill && (
        <motion.div
          className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
          key={activeSkill.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={activeSkill.image}
                alt={activeSkill.name}
                fill
                className="object-cover rounded-lg"
                sizes="64px"
              />
              {activeSkill.isPassive && (
                <div className="absolute inset-0 bg-indigo-900/30 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-indigo-400" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="font-bold text-lg">{activeSkill.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${getColorClass(
                    activeSkill.type
                  )}`}
                >
                  {activeSkill.type}
                </span>
                {!activeSkill.isPassive && activeSkill.cooldown && (
                  <div className="flex items-center text-gray-400 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Перезарядка: {activeSkill.cooldown}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-300 text-sm">{activeSkill.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ClassSkills;
