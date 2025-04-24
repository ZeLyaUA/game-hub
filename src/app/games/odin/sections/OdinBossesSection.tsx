'use client';

import { Badge } from '@/components/ui/Badge';
import { Section, SectionHeader } from '@/components/ui/Section';
import { BossInfo } from '@/data/games/odin/database';
import { motion } from 'framer-motion';
import { ChevronDown, Clock, MapPin, Skull, Star, Target } from 'lucide-react';
import { forwardRef, useState } from 'react';

interface OdinBossesSectionProps {
  inView: boolean;
  bosses: BossInfo[];
}

const OdinBossesSection = forwardRef<HTMLElement, OdinBossesSectionProps>(
  ({ inView, bosses }, ref) => {
    const [expandedBoss, setExpandedBoss] = useState<string | null>(null);

    const toggleBoss = (bossId: string) => {
      if (expandedBoss === bossId) {
        setExpandedBoss(null);
      } else {
        setExpandedBoss(bossId);
      }
    };

    const difficultyColors: Record<string, string> = {
      Легкий: 'bg-green-500/20 text-green-400 border-green-500/30',
      Средний: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Сложный: 'bg-red-500/20 text-red-400 border-red-500/30',
      Рейдовый: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };

    return (
      <Section className="relative overflow-hidden" ref={ref}>
        <SectionHeader
          title="Боссы"
          description="Сразитесь с могущественными врагами в ODIN: Valhalla Rising"
          withAnimation={inView}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bosses.map((boss, index) => (
            <motion.div
              key={boss.id}
              className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              {/* Верхняя часть с изображением */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={boss.image || '/bosses/default.jpg'}
                  alt={boss.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold text-white">{boss.name}</h3>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-indigo-400 mr-1" />
                      <span className="text-sm text-gray-300">{boss.region}</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      difficultyColors[boss.difficulty]
                    }`}
                  >
                    {boss.difficulty}
                  </span>
                </div>
              </div>

              {/* Информация о боссе */}
              <div className="p-5">
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center text-sm">
                    <Target className="h-4 w-4 text-red-400 mr-1" />
                    <span>Уровень {boss.level}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Skull className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{boss.type}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-indigo-400 mr-1" />
                    <span>{boss.respawnTime}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{boss.description}</p>

                {/* Кнопка раскрытия деталей */}
                <button
                  onClick={() => toggleBoss(boss.id)}
                  className="flex items-center justify-between w-full py-2 px-3 bg-gray-700/50 rounded-lg text-sm font-medium transition-colors hover:bg-gray-700"
                >
                  <span>Подробнее о боссе</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedBoss === boss.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Раскрывающаяся часть */}
                {expandedBoss === boss.id && (
                  <motion.div
                    className="mt-4 space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Механики */}
                    <div>
                      <h4 className="font-medium mb-2 text-indigo-400">Механики боя</h4>
                      <ul className="space-y-2">
                        {boss.mechanics.map((mechanic, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-300">
                            <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{mechanic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Добыча */}
                    <div>
                      <h4 className="font-medium mb-2 text-indigo-400">Добыча</h4>
                      <div className="flex flex-wrap gap-2">
                        {boss.drops.map((drop, idx) => (
                          <Badge
                            key={idx}
                            variant={
                              idx % 4 === 0
                                ? 'purple'
                                : idx % 3 === 0
                                ? 'indigo'
                                : idx % 2 === 0
                                ? 'blue'
                                : 'green'
                            }
                          >
                            {drop}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Дополнительная информация */}
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-indigo-400 mr-2" />
                      <span className="text-gray-300">
                        Локация: <span className="font-medium">{boss.location}</span>
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    );
  }
);

OdinBossesSection.displayName = 'OdinBossesSection';

export default OdinBossesSection;
