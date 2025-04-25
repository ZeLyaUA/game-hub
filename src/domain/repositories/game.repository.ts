// src/domain/repositories/game.repository.ts
import { GameEntity, GameStatus } from '../entities/game';
import { Pagination, SortOptions } from '../types/common';

export interface GameFilters {
  status?: GameStatus;
  search?: string;
}

export interface IGameRepository {
  findAll(
    filters?: GameFilters,
    pagination?: Partial<Pagination>,
    sort?: SortOptions<GameEntity>
  ): Promise<GameEntity[]>;

  findById(id: string): Promise<GameEntity | null>;

  create(data: Omit<GameEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<GameEntity>;

  update(id: string, data: Partial<GameEntity>): Promise<GameEntity>;

  delete(id: string): Promise<void>;

  count(filters?: GameFilters): Promise<number>;
}
