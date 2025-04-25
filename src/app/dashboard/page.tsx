'use client';

// src/app/dashboard/page.tsx
import { QuickActions, RecentActivity, SystemStatus } from '@/presentation/components/dashboard';
import { GameStats } from '@/presentation/components/games';
import { Card, LoadingSpinner } from '@/presentation/components/ui';
import { useGameContext } from '@/presentation/contexts/GameContext';
import { useGameStats } from '@/presentation/hooks/useGameStats';
import { Gamepad2 } from 'lucide-react';
import { useEffect } from 'react';

import Image from 'next/image';

export default function DashboardPage() {
  const { games, fetchGames } = useGameContext();
  const { stats, fetchStats, isLoading: isLoadingStats } = useGameStats();

  useEffect(() => {
    fetchGames();
    fetchStats();
  }, [fetchGames, fetchStats]);

  if (isLoadingStats) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Панель управления</h1>
        <p className="text-gray-400 mt-1">Общий обзор системы</p>
      </div>

      <GameStats {...stats} />

      <div className="mt-8">
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold text-white mb-6">Последние игры</h2>
            <div className="space-y-4">
              {games.slice(0, 5).map(game => (
                <div key={game.id} className="flex items-center gap-4">
                  {game.image ? (
                    <Image
                      src={game.image}
                      alt={game.title}
                      className="w-16 h-16 rounded-lg object-cover"
                      width={160}
                      height={160}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <Gamepad2 className="w-8 h-8 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-white font-medium">{game.title}</h3>
                    <p className="text-sm text-gray-400">
                      {game.status === 'active' ? 'Активна' : 'Скоро'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-xl font-semibold text-white mb-6">Быстрые действия</h2>
            <QuickActions compact />
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <RecentActivity />
      </div>

      <div className="mt-8">
        <SystemStatus />
      </div>
    </div>
  );
}
