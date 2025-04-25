// src/presentation/components/games/GameStats.tsx
import { Archive, Clock, Gamepad2, TrendingUp } from 'lucide-react';
import { Card } from '../ui';

interface GameStatsProps {
  total: number;
  active: number;
  coming: number;
  archived: number;
}

export function GameStats({ total, active, coming, archived }: GameStatsProps) {
  const stats = [
    {
      name: 'Всего игр',
      value: total,
      icon: Gamepad2,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      name: 'Активные игры',
      value: active,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      name: 'Скоро выйдут',
      value: coming,
      icon: Clock,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
    },
    {
      name: 'В архиве',
      value: archived,
      icon: Archive,
      color: 'from-gray-500 to-gray-400',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <Card
          key={stat.name}
          variant="gradient"
          className={`relative overflow-hidden ${stat.borderColor}`}
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
        </Card>
      ))}
    </div>
  );
}
