// src/infrastructure/di/container.ts
import { PrismaClient } from '@/generated/prisma';
import { GameRepositoryImpl } from '../repositories/game.repository.impl';
import { GameServiceImpl } from '../services/game.service.impl';
import { Container } from './types';

// Создаем глобальный контейнер
const container = new Container();

// Базовые зависимости
const prisma = new PrismaClient();
const gameRepository = new GameRepositoryImpl(prisma);
const gameService = new GameServiceImpl(gameRepository);

// Регистрируем зависимости
container.register('PrismaClient', prisma);
container.register('GameRepository', gameRepository);
container.register('GameService', gameService);

// Динамически выбираем реализацию ImageService в зависимости от среды
if (typeof window === 'undefined') {
  // На сервере используем серверную реализацию
  import('@/infrastructure/services/image.service.server').then(({ ImageServiceServerImpl }) => {
    const imageService = new ImageServiceServerImpl();
    container.register('ImageService', imageService);
  });
} else {
  // На клиенте используем клиентскую реализацию
  import('@/infrastructure/services/image.service.client').then(({ ImageServiceClientImpl }) => {
    const imageService = new ImageServiceClientImpl();
    container.register('ImageService', imageService);
  });
}

export { container };
