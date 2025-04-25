'use client';

import { deleteGame } from '@/app/actions/games';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Game {
  id: string;
  title: string;
  image: string;
  description?: string;
  status: string;
}

interface GamesListProps {
  games: Game[];
}

export function GamesList({ games }: GamesListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm('Вы уверены, что хотите удалить эту игру?')) return;

    setDeletingId(id);
    try {
      await deleteGame(id);
    } catch (error) {
      console.error('Failed to delete game:', error);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map(game => (
        <div
          key={game.id}
          className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
        >
          <div className="relative h-48">
            <Image
              src={game.image}
              alt={game.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {game.status === 'coming' && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500/90 text-white text-xs font-bold rounded-full">
                COMING SOON
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2">{game.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {game.description || 'Нет описания'}
            </p>

            <div className="flex justify-between items-center">
              <span
                className={`text-sm ${
                  game.status === 'active' ? 'text-green-400' : 'text-yellow-400'
                }`}
              >
                {game.status === 'active' ? 'Активна' : 'Скоро'}
              </span>

              <button
                onClick={() => handleDelete(game.id)}
                disabled={deletingId === game.id}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-300 disabled:opacity-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {games.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-400">Нет добавленных игр</div>
      )}
    </div>
  );
}
