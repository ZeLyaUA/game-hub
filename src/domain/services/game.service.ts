// src/domain/services/game.service.ts
import { GameEntity, GameStatus } from '../entities/game';
import { Pagination, SortOptions } from '../types/common';

export interface IGameService {
  getGames(
    filters?: { status?: GameStatus; search?: string },
    pagination?: Partial<Pagination>,
    sort?: SortOptions<GameEntity>
  ): Promise<{ games: GameEntity[]; total: number }>;

  getGame(id: string): Promise<GameEntity>;

  createGame(data: Omit<GameEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<GameEntity>;

  updateGame(id: string, data: Partial<GameEntity>): Promise<GameEntity>;

  deleteGame(id: string): Promise<void>;

  getStats(): Promise<{
    total: number;
    active: number;
    coming: number;
    archived: number;
  }>;
}
