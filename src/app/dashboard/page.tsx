import { getGames } from '@/app/actions/games';
import { AddGameForm } from '@/components/dashboard/AddGameForm';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { GamesList } from '@/components/dashboard/GamesList';
import { QuickActionsDashboard } from '@/components/dashboard/QuickActionsDashboard';
import { RecentActivityDashboard } from '@/components/dashboard/RecentActivityDashboard';
import { SystemStatusDashboard } from '@/components/dashboard/SystemStatusDashboard';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

async function GamesData() {
  const games = await getGames();

  return (
    <>
      <DashboardStats games={games} />

      <QuickActionsDashboard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Games list */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <GamesList games={games} />
          </div>
        </div>

        {/* Add game form */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 sticky top-8">
            <h2 className="text-xl font-semibold text-white mb-6">Добавить игру</h2>
            <AddGameForm />
          </div>
        </div>
      </div>

      <RecentActivityDashboard />

      <SystemStatusDashboard />
    </>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Панель управления</h1>
        <p className="text-gray-400 mt-1">Общий обзор системы</p>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
          </div>
        }
      >
        <GamesData />
      </Suspense>
    </div>
  );
}
