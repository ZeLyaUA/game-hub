// src/infrastructure/repositories/game.repository.impl.ts
import { GameEntity, GameStatus } from '@/domain/entities/game';
import { GameFilters, IGameRepository } from '@/domain/repositories/game.repository';
import { Pagination, SortOptions } from '@/domain/types/common';
import { Prisma, PrismaClient, Game as PrismaGame } from '@/generated/prisma';

export class GameRepositoryImpl implements IGameRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(
    filters?: GameFilters,
    pagination?: Partial<Pagination>,
    sort?: SortOptions<GameEntity>
  ): Promise<GameEntity[]> {
    const where = this.buildWhereClause(filters);
    const skip =
      pagination?.page && pagination?.limit ? (pagination.page - 1) * pagination.limit : undefined;

    const games = await this.prisma.game.findMany({
      where,
      skip,
      take: pagination?.limit,
      orderBy: sort ? { [sort.field]: sort.order } : undefined,
    });

    return games.map(this.mapToEntity);
  }

  async findById(id: string): Promise<GameEntity | null> {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    return game ? this.mapToEntity(game) : null;
  }

  async create(data: Omit<GameEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<GameEntity> {
    const game = await this.prisma.game.create({
      data: {
        ...data,
        status: data.status.toString(),
      },
    });

    return this.mapToEntity(game);
  }

  async update(id: string, data: Partial<GameEntity>): Promise<GameEntity> {
    const updateData = {
      ...data,
      status: data.status?.toString(),
    };

    const game = await this.prisma.game.update({
      where: { id },
      data: updateData,
    });

    return this.mapToEntity(game);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.game.delete({
      where: { id },
    });
  }

  async count(filters?: GameFilters): Promise<number> {
    const where = this.buildWhereClause(filters);
    return this.prisma.game.count({ where });
  }

  private buildWhereClause(filters?: GameFilters): Prisma.GameWhereInput {
    const where: Prisma.GameWhereInput = {};

    if (filters?.status) {
      where.status = filters.status.toString();
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  private mapToEntity(game: PrismaGame): GameEntity {
    return {
      id: game.id,
      title: game.title,
      status: game.status as GameStatus,
      image: game.image,
      description: game.description,
      color: game.color,
      accent: game.accent,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
    };
  }
}
