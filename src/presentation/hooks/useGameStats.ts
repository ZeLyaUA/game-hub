// src/presentation/hooks/useGameStats.ts
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

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Используем API вместо прямого доступа к сервису на клиенте
      const response = await fetch('/api/games/stats');
      const result = await response.json();
      setStats(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    stats,
    isLoading,
    error,
    fetchStats,
  };
}
