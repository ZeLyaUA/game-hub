// src/presentation/contexts/GameContext.tsx
import { GameEntity, GameStatus } from '@/domain/entities/game';
import { Pagination, SortOptions } from '@/domain/types/common';
import { createContext, ReactNode, useContext } from 'react';
import { useGames } from '../hooks/useGames';

interface GameContextValue {
  games: GameEntity[];
  isLoading: boolean;
  error: string | null;
  total: number;
  fetchGames: (
    filters?: { status?: GameStatus; search?: string },
    pagination?: Partial<Pagination>,
    sort?: SortOptions<GameEntity>
  ) => Promise<void>;
  createGame: (data: Omit<GameEntity, 'id' | 'createdAt' | 'updatedAt'>) => Promise<GameEntity>;
  updateGame: (id: string, data: Partial<GameEntity>) => Promise<GameEntity>;
  deleteGame: (id: string) => Promise<void>;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const gameHook = useGames();

  return <GameContext.Provider value={gameHook}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }

  return context;
}
