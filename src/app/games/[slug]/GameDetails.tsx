'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Game } from '@/data/games/games-list';
import { motion } from 'framer-motion';
import { ChevronLeft, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface GameDetailsProps {
  game: Game;
}

export default function GameDetails({ game }: GameDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'community' | 'guides'>('overview');

  return (
    <div className="space-y-8">
      {/* Навигация */}
      <div className="mb-6">
        <Link href="/games">
          <motion.div
            className="flex items-center text-gray-400 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            <span>Назад к играм</span>
          </motion.div>
        </Link>
      </div>

      {/* Главный баннер */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl mb-8">
        <Image
          src={game.banner}
          alt={game.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

        <div className="absolute bottom-6 left-6 flex items-center">
          <div className="h-16 w-16 rounded-lg bg-gray-900 p-1 border-2 border-indigo-500 relative mr-4">
            <Image
              src={game.logo}
              alt={`${game.title} logo`}
              className="rounded"
              fill={true}
              sizes="64px"
            />
          </div>

          <div className="flex items-center mb-2">
            <div className="flex items-center bg-black/50 rounded-full px-3 py-1 text-xs">
              <Star className="h-3 w-3 text-yellow-500 mr-1" />
              <span>{game.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Табы */}
      <div className="border-b border-gray-700 mb-8">
        <div className="flex space-x-8">
          <TabButton isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            Обзор
          </TabButton>
          <TabButton isActive={activeTab === 'community'} onClick={() => setActiveTab('community')}>
            Сообщество
          </TabButton>
          <TabButton isActive={activeTab === 'guides'} onClick={() => setActiveTab('guides')}>
            Гайды
          </TabButton>
        </div>
      </div>

      {/* Контент таба */}
      <div>
        {activeTab === 'overview' && <OverviewTab game={game} />}

        {activeTab === 'community' && <CommunityTab />}

        {activeTab === 'guides' && <GuidesTab />}
      </div>
    </div>
  );
}

interface TabButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ children, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-4 relative font-medium ${
        isActive ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
          layoutId="tabIndicator"
        />
      )}
    </button>
  );
}

function OverviewTab({ game }: { game: Game }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Об игре</h2>
            <p className="text-gray-300">{game.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Особенности</h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">•</span>
                <span>Открытый мир с реалистичной графикой и динамической погодой</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">•</span>
                <span>Разнообразные классы персонажей с уникальными умениями</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">•</span>
                <span>PvP и PvE контент с регулярными обновлениями</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">•</span>
                <span>Гильдии и социальные взаимодействия</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Теги</h2>
            <div className="flex flex-wrap gap-2">
              {game.tags.map(tag => (
                <Badge key={tag} variant="indigo">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Начать игру</h2>
            <Button variant="indigo" fullWidth>
              Скачать клиент
            </Button>
            <div className="mt-2 text-xs text-gray-400 text-center">Windows / MacOS / Linux</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityTab() {
  return (
    <div className="min-h-[300px] flex justify-center items-center">
      <p className="text-gray-400">Раздел сообщества находится в разработке</p>
    </div>
  );
}

function GuidesTab() {
  return (
    <div className="min-h-[300px] flex justify-center items-center">
      <p className="text-gray-400">Раздел гайдов находится в разработке</p>
    </div>
  );
}
