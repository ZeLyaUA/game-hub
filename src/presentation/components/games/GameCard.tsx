// src/presentation/components/games/GameCard.tsx
import { GameEntity, GameStatus } from '@/domain/entities/game';
import { Edit2, ExternalLink, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '../ui';

interface GameCardProps {
  game: GameEntity;
  onEdit: () => void;
  onDelete: () => void;
}

export function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  return (
    <Card className="group overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <Link href={`/game/${game.id}`} className="relative w-full sm:w-48 h-48 sm:h-32">
          <Image src={game.image} alt={game.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent sm:hidden" />
        </Link>

        <div className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <Link href={`/game/${game.id}`} className="group">
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                  {game.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-400 line-clamp-2">
                {game.description || 'Нет описания'}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <span
                  className={`
                  inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                  ${
                    game.status === GameStatus.ACTIVE
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : game.status === GameStatus.COMING
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                  }
                `}
                >
                  {game.status === GameStatus.ACTIVE
                    ? 'Активна'
                    : game.status === GameStatus.COMING
                    ? 'Скоро'
                    : 'В архиве'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/game/${game.id}`}
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 
                         rounded-lg transition-colors"
                title="Открыть"
              >
                <ExternalLink className="w-5 h-5" />
              </Link>

              <button
                onClick={onEdit}
                className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 
                         rounded-lg transition-colors"
                title="Редактировать"
              >
                <Edit2 className="w-5 h-5" />
              </button>

              <button
                onClick={onDelete}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 
                         rounded-lg transition-colors"
                title="Удалить"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
