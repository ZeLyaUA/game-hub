// src/infrastructure/di/getServerContainer.ts
import { PrismaClient } from '@/generated/prisma';
import { GameRepositoryImpl } from '../repositories/game.repository.impl';
import { GameServiceImpl } from '../services/game.service.impl';
import { ImageServiceServerImpl } from '../services/image.service.server';

export function getServerContainer() {
  const container = new Map<string, any>();

  const prisma = new PrismaClient();
  const gameRepository = new GameRepositoryImpl(prisma);
  const gameService = new GameServiceImpl(gameRepository);
  const imageService = new ImageServiceServerImpl();

  container.set('PrismaClient', prisma);
  container.set('GameRepository', gameRepository);
  container.set('GameService', gameService);
  container.set('ImageService', imageService);

  return {
    resolve: <T>(token: string): T => {
      const instance = container.get(token);
      if (!instance) {
        throw new Error(`No instance found for token: ${token}`);
      }
      return instance;
    },
  };
}
