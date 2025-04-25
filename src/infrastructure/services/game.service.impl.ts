// src/infrastructure/services/game.service.impl.ts
import { GameEntity, GameStatus } from '@/domain/entities/game';
import { IGameRepository } from '@/domain/repositories/game.repository';
import { IGameService } from '@/domain/services/game.service';
import { Pagination, SortOptions } from '@/domain/types/common';

export class GameServiceImpl implements IGameService {
  constructor(private readonly gameRepository: IGameRepository) {}

  async getGames(
    filters?: { status?: GameStatus; search?: string },
    pagination?: Partial<Pagination>,
    sort?: SortOptions<GameEntity>
  ): Promise<{ games: GameEntity[]; total: number }> {
    const [games, total] = await Promise.all([
      this.gameRepository.findAll(filters, pagination, sort),
      this.gameRepository.count(filters),
    ]);

    return { games, total };
  }

  async getGame(id: string): Promise<GameEntity> {
    const game = await this.gameRepository.findById(id);

    if (!game) {
      throw new Error('Game not found');
    }

    return game;
  }

  async createGame(data: Omit<GameEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<GameEntity> {
    return this.gameRepository.create(data);
  }

  async updateGame(id: string, data: Partial<GameEntity>): Promise<GameEntity> {
    const game = await this.gameRepository.findById(id);

    if (!game) {
      throw new Error('Game not found');
    }

    return this.gameRepository.update(id, data);
  }

  async deleteGame(id: string): Promise<void> {
    const game = await this.gameRepository.findById(id);

    if (!game) {
      throw new Error('Game not found');
    }

    await this.gameRepository.delete(id);
  }

  async getStats(): Promise<{
    total: number;
    active: number;
    coming: number;
    archived: number;
  }> {
    const [total, active, coming, archived] = await Promise.all([
      this.gameRepository.count(),
      this.gameRepository.count({ status: GameStatus.ACTIVE }),
      this.gameRepository.count({ status: GameStatus.COMING }),
      this.gameRepository.count({ status: GameStatus.ARCHIVED }),
    ]);

    return { total, active, coming, archived };
  }
}
