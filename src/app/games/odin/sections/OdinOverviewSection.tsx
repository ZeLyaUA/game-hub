'use client';

import { Section, SectionHeader } from '@/components/ui/Section';
import { Game } from '@/data/games/games-list';
import { motion } from 'framer-motion';
import { Cpu, Globe, Layers, Server } from 'lucide-react';
import { forwardRef } from 'react';

interface OdinOverviewSectionProps {
  inView: boolean;
  game: Game;
}

const OdinOverviewSection = forwardRef<HTMLElement, OdinOverviewSectionProps>(
  ({ inView, game }, ref) => {
    // Используем дополнительные данные из odinGameData, если они есть
    const features = (game as any).features || [
      'Обширный открытый мир с уникальными регионами',
      'Детальная система крафта и экономики',
      'PvP и PvE контент с рейдами и массовыми сражениями',
      'Разнообразные классы с уникальными умениями',
      'Кросс-платформенный геймплей между PC и мобильными устройствами',
    ];

    const systemRequirements = (game as any).systemRequirements || {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i5-7400 / AMD Ryzen 3 1200',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1050 / AMD Radeon RX 560',
        storage: '50 GB',
      },
      recommended: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i7-8700K / AMD Ryzen 5 3600',
        memory: '16 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1660 / AMD Radeon RX 590',
        storage: '50 GB SSD',
      },
    };

    const longDescription =
      (game as any).longDescription ||
      `ODIN: Valhalla Rising — это масштабная MMORPG в скандинавском сеттинге, 
      где вы отправитесь в эпическое путешествие по миру, вдохновленному 
      скандинавской мифологией. Игра сочетает в себе превосходную графику, 
      огромный открытый мир и глубокие системы развития персонажа.`;

    return (
      <Section className="relative overflow-hidden" ref={ref}>
        <SectionHeader
          title="Об игре"
          description="Узнайте больше о мире ODIN: Valhalla Rising"
          withAnimation={inView}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Описание */}
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Описание</h3>
              <p className="text-gray-300 mb-4">{longDescription}</p>

              <h3 className="text-xl font-semibold mb-3">Особенности</h3>
              <ul className="space-y-2">
                {features.map((feature: string, index: number) => (
                  <motion.li
                    key={index}
                    className="flex items-start text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <span className="text-indigo-400 mr-2">•</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Скриншоты */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Скриншоты</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(num => (
                  <motion.div
                    key={num}
                    className="rounded-lg overflow-hidden"
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 * num }}
                  >
                    <img
                      src={game.banner}
                      alt={`ODIN: Valhalla Rising screenshot ${num}`}
                      className="w-full h-40 object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Системные требования и информация */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Информация</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                  <div>
                    <div className="text-sm text-gray-400">Разработчик</div>
                    <div className="font-medium">Lionheart Studio</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Server className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                  <div>
                    <div className="text-sm text-gray-400">Издатель</div>
                    <div className="font-medium">Kakao Games</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Layers className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                  <div>
                    <div className="text-sm text-gray-400">Жанр</div>
                    <div className="font-medium">MMORPG, Открытый мир</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Cpu className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                  <div>
                    <div className="text-sm text-gray-400">Платформы</div>
                    <div className="font-medium">PC, Mobile</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Системные требования</h3>

              <div className="mb-4">
                <h4 className="text-indigo-400 font-medium mb-2">Минимальные</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">ОС:</span>
                    <span className="text-right">{systemRequirements.minimum.os}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Процессор:</span>
                    <span className="text-right">{systemRequirements.minimum.processor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Память:</span>
                    <span className="text-right">{systemRequirements.minimum.memory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Видеокарта:</span>
                    <span className="text-right">{systemRequirements.minimum.graphics}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Диск:</span>
                    <span className="text-right">{systemRequirements.minimum.storage}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-indigo-400 font-medium mb-2">Рекомендуемые</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">ОС:</span>
                    <span className="text-right">{systemRequirements.recommended.os}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Процессор:</span>
                    <span className="text-right">{systemRequirements.recommended.processor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Память:</span>
                    <span className="text-right">{systemRequirements.recommended.memory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Видеокарта:</span>
                    <span className="text-right">{systemRequirements.recommended.graphics}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Диск:</span>
                    <span className="text-right">{systemRequirements.recommended.storage}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    );
  }
);

OdinOverviewSection.displayName = 'OdinOverviewSection';

export default OdinOverviewSection;
