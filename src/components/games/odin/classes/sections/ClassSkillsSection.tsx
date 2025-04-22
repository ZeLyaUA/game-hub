'use client';

import { motion } from 'framer-motion';
import { Clock, Flame } from 'lucide-react';
import Image from 'next/image';
import { forwardRef, useState } from 'react';

import { skillTypeColors } from '@/utils/colorMapping';

import { ClassSkill } from '../data';

type ClassSkillsSectionProps = {
  inView: boolean;
  skills: ClassSkill[];
};

const ClassSkillsSection = forwardRef<HTMLElement, ClassSkillsSectionProps>(
  ({ inView, skills }, ref) => {
    const [activeSkillIndex, setActiveSkillIndex] = useState(0);

    if (!skills || skills.length === 0) {
      return (
        <section ref={ref} className="py-20 bg-gray-800/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-400">Информация об умениях готовится</h2>
              <p className="mt-4 text-gray-500">Данные будут доступны в ближайшее время</p>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section ref={ref} className="py-20 bg-gray-800/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-indigo-500/20 h-14 w-14 rounded-full flex items-center justify-center">
                <Flame className="h-7 w-7 text-indigo-400" />
              </div>
            </div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Способности и умения
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Изучите уникальные способности класса и создайте мощную боевую сборку
            </motion.p>
          </motion.div>

          {/* Горизонтальный список иконок умений для навигации */}
          <motion.div
            className="flex justify-center gap-4 mb-10 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className={`relative cursor-pointer transition-all duration-300 group`}
                onClick={() => setActiveSkillIndex(index)}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div
                  className={`h-16 w-16 rounded-xl overflow-hidden border-2 ${
                    activeSkillIndex === index
                      ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                      : 'border-gray-700 group-hover:border-indigo-500/50'
                  }`}
                >
                  <Image
                    src={skill.image}
                    alt={skill.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className={`absolute -bottom-1 left-0 right-0 h-1 rounded-full ${
                    activeSkillIndex === index ? 'bg-indigo-500' : 'bg-transparent'
                  }`}
                ></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Детальная информация о выбранном умении */}
          <motion.div
            className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            key={skills[activeSkillIndex].id}
          >
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-xl overflow-hidden border-2 border-gray-700">
                  <Image
                    src={skills[activeSkillIndex].image}
                    alt={skills[activeSkillIndex].name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-white">{skills[activeSkillIndex].name}</h3>
                  <span
                    className={`text-sm px-3 py-1 rounded-full border ${
                      skillTypeColors[skills[activeSkillIndex].type]
                    }`}
                  >
                    {skills[activeSkillIndex].type}
                  </span>
                </div>

                <p className="text-gray-300 mb-4 text-lg">{skills[activeSkillIndex].description}</p>

                <div className="flex items-center text-gray-400">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Перезарядка: {skills[activeSkillIndex].cooldown}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="text-lg font-semibold mb-4 text-indigo-400">
                Советы по использованию:
              </h4>
              <ul className="space-y-2 text-gray-300">
                {skills[activeSkillIndex].type === 'Атакующий' ? (
                  <>
                    <li>
                      • Используйте это умение для нанесения максимального урона по основной цели
                    </li>
                    <li>
                      • Комбинируйте с другими атакующими умениями для создания усиленных комбо-атак
                    </li>
                    <li>
                      • Старайтесь использовать это умение, когда противник уязвим или оглушен
                    </li>
                  </>
                ) : skills[activeSkillIndex].type === 'Защитный' ? (
                  <>
                    <li>• Активируйте это умение перед получением большого урона от противников</li>
                    <li>
                      • Старайтесь использовать умение не только для себя, но и для защиты союзников
                    </li>
                    <li>• Помните о времени перезарядки и не тратьте защитные умения впустую</li>
                  </>
                ) : skills[activeSkillIndex].type === 'Поддержка' ? (
                  <>
                    <li>• Используйте это умение для поддержки союзников в критические моменты</li>
                    <li>
                      • Координируйте использование с остальной командой для максимальной
                      эффективности
                    </li>
                    <li>
                      • Учитывайте радиус действия и позиционируйтесь так, чтобы охватить максимум
                      союзников
                    </li>
                  </>
                ) : skills[activeSkillIndex].type === 'Контроль' ? (
                  <>
                    <li>
                      • Используйте это умение для прерывания опасных способностей противников
                    </li>
                    <li>• Применяйте контроль для создания возможностей атаки для вашей команды</li>
                    <li>
                      • Комбинируйте с другими контролирующими умениями для создания цепочек
                      контроля
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      • Используйте это умение для быстрого перемещения к цели или ухода от
                      опасности
                    </li>
                    <li>
                      • Помните, что умение перемещения часто служит не только для мобильности, но и
                      для уклонения
                    </li>
                    <li>
                      • Держите это умение в запасе для экстренных ситуаций, а не используйте при
                      первой возможности
                    </li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-gray-400">
              Комбинируйте различные умения для создания уникального стиля игры.
              <br />
              Экспериментируйте с разными сборками, чтобы найти наиболее эффективные комбинации.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }
);

ClassSkillsSection.displayName = 'ClassSkillsSection';

export default ClassSkillsSection;
