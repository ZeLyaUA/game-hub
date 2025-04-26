// src/infrastructure/di/getServerContainer.ts
import { PrismaClient } from '@/generated/prisma';
import { GameRepositoryImpl } from '../repositories/game.repository.impl';
import { GameServiceImpl } from '../services/game.service.impl';
import { ImageServiceServerImpl } from '../services/image.service.server';
import { Container, IContainer } from './types';

// Создаем глобальный экземпляр PrismaClient для переиспользования
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export function getServerContainer(): IContainer {
  const container = new Container();

  const gameRepository = new GameRepositoryImpl(prisma);
  const gameService = new GameServiceImpl(gameRepository);
  const imageService = new ImageServiceServerImpl();

  container.register('PrismaClient', prisma);
  container.register('GameRepository', gameRepository);
  container.register('GameService', gameService);
  container.register('ImageService', imageService);

  return container;
}
