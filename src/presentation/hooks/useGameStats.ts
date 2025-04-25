// src/presentation/hooks/useGameStats.ts
import { IGameService } from '@/domain/services/game.service';
import { container } from '@/infrastructure/di/container';
import { useCallback, useState } from 'react';

export function useGameStats() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    coming: 0,
    archived: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gameService = container.resolve<IGameService>('GameService');

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await gameService.getStats();
      setStats(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setIsLoading(false);
    }
  }, [gameService]);

  return {
    stats,
    isLoading,
    error,
    fetchStats,
  };
}
