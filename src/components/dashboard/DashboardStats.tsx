'use client';

import { motion } from 'framer-motion';
import { Clock, Gamepad2, TrendingUp, Users } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  status: string;
  image: string;
  description: string | null;
  color: string;
  accent: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DashboardStatsProps {
  games: Game[];
}

export function DashboardStats({ games }: DashboardStatsProps) {
  const activeGames = games.filter(game => game.status === 'active').length;
  const comingGames = games.filter(game => game.status === 'coming').length;
  const totalGames = games.length;

  const stats = [
    {
      name: 'Всего игр',
      value: totalGames,
      icon: Gamepad2,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      name: 'Активные игры',
      value: activeGames,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      name: 'Скоро выйдут',
      value: comingGames,
      icon: Clock,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
    },
    {
      name: 'Пользователи',
      value: '2.3K',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`
            relative overflow-hidden rounded-xl border ${stat.borderColor}
            ${stat.bgColor} backdrop-blur-sm p-6
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">{stat.name}</p>
              <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Decorative gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
        </motion.div>
      ))}
    </div>
  );
}
