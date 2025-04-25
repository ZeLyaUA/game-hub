import { getGames } from '@/app/actions/games';
import { AddGameForm } from '@/components/dashboard/AddGameForm';
import { GamesList } from '@/components/dashboard/GamesList';
import { Plus } from 'lucide-react';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

function GamesContent({ games }: { games: any[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
          <GamesList games={games} />
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 sticky top-8">
          <h2 className="text-xl font-semibold text-white mb-6">Быстрое добавление</h2>
          <AddGameForm />
        </div>
      </div>
    </div>
  );
}

export default async function GamesDashboardPage() {
  const games = await getGames();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Игры</h1>
          <p className="text-gray-400 mt-1">Управление библиотекой игр</p>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 
                   text-white rounded-lg transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
          Добавить игру
        </button>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
          </div>
        }
      >
        <GamesContent games={games} />
      </Suspense>
    </div>
  );
}
