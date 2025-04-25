// src/app/game/[id]/page.tsx
import { getGameById } from '@/app/actions/games';
import { Navbar } from '@/components/Navbar';
import { ArrowLeft, Calendar, GamepadIcon, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const game = await getGameById(resolvedParams.id);

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image src={game.image} alt={game.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />

        {/* Back button */}
        <Link
          href="/"
          className="absolute top-20 left-8 flex items-center gap-2 text-white hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              {game.status === 'coming' ? (
                <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-500/90 via-orange-500/90 to-red-500/90 text-white text-sm font-bold rounded-full shadow-lg">
                  COMING SOON
                </span>
              ) : (
                <span className="px-4 py-1.5 bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white text-sm font-bold rounded-full shadow-lg">
                  ACTIVE
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{game.title}</h1>
            <p className="text-xl text-gray-300 max-w-2xl">{game.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-indigo-400" />
                Об игре
              </h2>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <p className="text-gray-300 leading-relaxed">
                  {game.description || 'Описание скоро будет добавлено...'}
                </p>
              </div>
            </section>

            {game.status === 'active' && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <GamepadIcon className="w-6 h-6 text-indigo-400" />
                  База знаний
                </h2>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <p className="text-gray-300">
                    База знаний находится в разработке. Скоро здесь появятся гайды, новости и другая
                    полезная информация.
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Информация</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Добавлено</p>
                    <p className="text-white">
                      {new Date(game.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {game.status === 'active' && (
              <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
                Перейти к базе знаний
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
