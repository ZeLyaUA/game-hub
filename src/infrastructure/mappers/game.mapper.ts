// src/infrastructure/mappers/game.mapper.ts
import { GameEntity, GameStatus } from '@/domain/entities/game';
import { Game as PrismaGame } from '@/generated/prisma';

export class GameMapper {
  static toDomain(prismaGame: PrismaGame): GameEntity {
    return {
      id: prismaGame.id,
      title: prismaGame.title,
      status: prismaGame.status as GameStatus,
      image: prismaGame.image,
      description: prismaGame.description,
      color: prismaGame.color,
      accent: prismaGame.accent,
      createdAt: prismaGame.createdAt,
      updatedAt: prismaGame.updatedAt,
    };
  }

  static toPersistence(domainGame: Partial<GameEntity>): Partial<PrismaGame> {
    return {
      id: domainGame.id,
      title: domainGame.title,
      status: domainGame.status,
      image: domainGame.image,
      description: domainGame.description || null,
      color: domainGame.color,
      accent: domainGame.accent,
    };
  }
}
