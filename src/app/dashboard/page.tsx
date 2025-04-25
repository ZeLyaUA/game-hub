import { getGames } from '@/app/actions/games';
import { AddGameForm } from '@/components/dashboard/AddGameForm';
import { GamesList } from '@/components/dashboard/GamesList';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const games = await getGames();

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Управление играми</p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться на главную
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add game form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-6">Добавить игру</h2>
              <AddGameForm />
            </div>
          </div>

          {/* Games list */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-6">Список игр</h2>
              <GamesList games={games} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
