// src/app/dashboard/games/page.tsx
'use client';

import { GameEntity } from '@/domain/entities/game';
import { GameForm, GameList, GameStats } from '@/presentation/components/games';
import { Button, Modal } from '@/presentation/components/ui';
import { useToast } from '@/presentation/components/ui/Toast';
import { useGameContext } from '@/presentation/contexts/GameContext';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function GamesPage() {
  const { games, isLoading, error, fetchGames, createGame, updateGame, deleteGame } =
    useGameContext();

  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameEntity | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    coming: 0,
    archived: 0,
  });

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    // Calculate stats
    setStats({
      total: games.length,
      active: games.filter(g => g.status === 'active').length,
      coming: games.filter(g => g.status === 'coming').length,
      archived: games.filter(g => g.status === 'archived').length,
    });
  }, [games]);

  const handleCreate = async (data: Omit<GameEntity, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createGame(data);
      setIsModalOpen(false);
      showToast('success', 'Игра успешно добавлена');
    } catch (err) {
      console.error(err);
      showToast('error', 'Не удалось добавить игру');
    }
  };

  const handleUpdate = async (data: Omit<GameEntity, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedGame) return;

    try {
      await updateGame(selectedGame.id, data);
      setSelectedGame(null);
      showToast('success', 'Игра успешно обновлена');
    } catch (err) {
      console.error(err);
      showToast('error', 'Не удалось обновить игру');
    }
  };

  const handleDelete = async (game: GameEntity) => {
    if (!confirm('Вы уверены, что хотите удалить эту игру?')) return;

    try {
      await deleteGame(game.id);
      showToast('success', 'Игра успешно удалена');
    } catch (err) {
      console.error(err);
      showToast('error', 'Не удалось удалить игру');
    }
  };

  if (error) {
    return <div className="text-center py-12 text-red-400">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Игры</h1>
          <p className="text-gray-400 mt-1">Управление библиотекой игр</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Добавить игру
        </Button>
      </div>

      <GameStats {...stats} />

      <div className="mt-8">
        <GameList
          games={games}
          onEdit={game => setSelectedGame(game)}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить игру"
        size="lg"
      >
        <GameForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        title="Редактировать игру"
        size="lg"
      >
        {selectedGame && (
          <GameForm
            initialData={selectedGame}
            onSubmit={handleUpdate}
            onCancel={() => setSelectedGame(null)}
            isLoading={isLoading}
          />
        )}
      </Modal>
    </div>
  );
}
