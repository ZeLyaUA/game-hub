// src/presentation/hooks/useGames.ts
import { GameEntity, GameStatus } from '@/domain/entities/game';
import { Pagination, SortOptions } from '@/domain/types/common';
import { useCallback, useState } from 'react';

export function useGames() {
  const [games, setGames] = useState<GameEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchGames = useCallback(
    async (
      filters?: { status?: GameStatus; search?: string },
      pagination?: Partial<Pagination>,
      sort?: SortOptions<GameEntity>
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (filters?.status) params.append('status', filters.status);
        if (filters?.search) params.append('search', filters.search);
        if (pagination?.page) params.append('page', pagination.page.toString());
        if (pagination?.limit) params.append('limit', pagination.limit.toString());
        if (sort?.field) params.append('sortBy', sort.field.toString());
        if (sort?.order) params.append('sortOrder', sort.order);

        const response = await fetch(`/api/games?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch games');

        const result = await response.json();
        setGames(result.games);
        setTotal(result.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch games');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const createGame = useCallback(
    async (data: Omit<GameEntity, 'id' | 'createdAt' | 'updatedAt'>) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to create game');

        const newGame = await response.json();
        setGames(prev => [...prev, newGame]);
        return newGame;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create game');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateGame = useCallback(async (id: string, data: Partial<GameEntity>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/games/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update game');

      const updatedGame = await response.json();
      setGames(prev => prev.map(game => (game.id === id ? updatedGame : game)));
      return updatedGame;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update game');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteGame = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/games/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete game');

      setGames(prev => prev.filter(game => game.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete game');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    games,
    isLoading,
    error,
    total,
    fetchGames,
    createGame,
    updateGame,
    deleteGame,
  };
}
