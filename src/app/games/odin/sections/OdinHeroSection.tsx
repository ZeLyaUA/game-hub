'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Game } from '@/data/games/games-list';
import { formatNumber } from '@/utils/format';
import { motion } from 'framer-motion';
import { Award, Calendar, Download, Shield, Star, Users } from 'lucide-react';
import { forwardRef } from 'react';

interface OdinHeroSectionProps {
  inView: boolean;
  game: Game;
}

const OdinHeroSection = forwardRef<HTMLElement, OdinHeroSectionProps>(({ inView, game }, ref) => {
  return (
    <motion.section
      ref={ref}
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-gray-900"
          style={{
            backgroundImage: `url('${game.banner}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: '1s' }}
            ></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-xl shadow-indigo-500/10">
            {/* Логотип и название */}
            <div className="flex items-center mb-6">
              <div className="relative h-20 w-20 rounded-lg overflow-hidden border-2 border-indigo-500 mr-4">
                <img
                  src={game.logo}
                  alt={`${game.title} logo`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {game.title}
                </motion.h1>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, index) => (
                    <Badge
                      key={tag}
                      variant={index === 0 ? 'indigo' : index === 1 ? 'purple' : 'blue'}
                      animate={true}
                      delay={0.1 * (index + 1)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Описание */}
            <motion.p
              className="text-xl text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {game.description}
            </motion.p>

            {/* Статистика */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="bg-gray-800/80 p-3 rounded-lg border border-gray-700 flex items-center">
                <Users className="h-5 w-5 text-indigo-400 mr-2" />
                <div>
                  <div className="text-sm text-gray-400">Онлайн</div>
                  <div className="font-semibold">{formatNumber(game.onlineCount)}</div>
                </div>
              </div>
              <div className="bg-gray-800/80 p-3 rounded-lg border border-gray-700 flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-2" />
                <div>
                  <div className="text-sm text-gray-400">Рейтинг</div>
                  <div className="font-semibold">{game.rating}/5.0</div>
                </div>
              </div>
              <div className="bg-gray-800/80 p-3 rounded-lg border border-gray-700 flex items-center">
                <Calendar className="h-5 w-5 text-green-400 mr-2" />
                <div>
                  <div className="text-sm text-gray-400">Релиз</div>
                  <div className="font-semibold">29.06.2023</div>
                </div>
              </div>
            </motion.div>

            {/* Обновление */}
            {game.highlight && (
              <motion.div
                className="flex items-center bg-indigo-500/10 p-3 rounded-lg mb-6"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="mr-3 bg-indigo-500/20 p-2 rounded-full">
                  <Award className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-indigo-300 font-medium">{game.highlight}</p>
                  <p className="text-sm text-gray-400">Обновление доступно сейчас</p>
                </div>
              </motion.div>
            )}

            {/* Кнопки действий */}
            <motion.div
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Button variant="indigo" icon={Download} animate={true} fullWidth>
                Скачать клиент
              </Button>
              <Button variant="outline" icon={Shield} animate={true} fullWidth>
                Системные требования
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});

OdinHeroSection.displayName = 'OdinHeroSection';

export default OdinHeroSection;
